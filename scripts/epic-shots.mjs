#!/usr/bin/env node
// epic-shots: screenshots each story's example page, cropped to the parts the
// story marks in the page's own markup (data-epic-mark), and records where
// those marks sit so the story pages can outline and number them.
//
//   node scripts/epic-shots.mjs                          serve dist/ (run after astro build)
//   node scripts/epic-shots.mjs --url http://localhost:4327   shoot a running dev server
//
// Writes public/epic-shots/<epic>/<story>/*.jpg and src/data/epics/shots/<epic>.json,
// replacing what the last run wrote for each epic. `npm run build` runs it
// between two astro builds, so the shots follow every design change.

import { createServer } from 'node:http';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VIEWPORT = { width: 1280, height: 900 };
const SCALE = 2;
const PAD = { top: 28, side: 24, bottom: 24 }; // top clears the number badge on the corner
const MIN_WIDTH = 720;
const MIN_HEIGHT = 360; // enough of the page around one small mark to show where it sits
const CLUSTER_GAP = 200;

const { EPICS, EPIC_SHOT_TALL, exampleOf, gateStorageKey, measureMarks, storySlug } = await import(
  pathToFileURL(path.join(ROOT, 'src/data/epics/index.ts')).href
);

// ---------- where the pages come from ----------
const urlArg = process.argv.indexOf('--url');
let origin;
let base;
let server;
if (urlArg > -1) {
  const u = new URL(process.argv[urlArg + 1]);
  origin = u.origin;
  base = u.pathname.endsWith('/') ? u.pathname : `${u.pathname}/`;
} else {
  process.env.NODE_ENV ??= 'production';
  const { default: config } = await import(pathToFileURL(path.join(ROOT, 'astro.config.mjs')).href);
  base = config.base ?? '/';
  ({ server, origin } = await serveDist(path.join(ROOT, 'dist'), base));
}

const browser = await launch();
try {
  for (const epic of EPICS) await shootEpic(epic);
} finally {
  await browser.close();
  server?.close();
}

async function shootEpic(epic) {
  const epicSlug = epic.key.toLowerCase();
  const outDir = path.join(ROOT, 'public/epic-shots', epicSlug);
  await rm(outDir, { recursive: true, force: true });

  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: SCALE });
  if (epic.password) {
    await context.addInitScript((key) => sessionStorage.setItem(key, '1'), gateStorageKey(epic));
  }
  const page = await context.newPage();
  const result = {};
  let count = 0;

  // One illustrative page per story: the one its story page shows.
  for (const story of epic.stories) {
    const epicPage = exampleOf(story);
    await page.goto(`${origin}${base}${epicPage.route.replace(/^\//, '')}?bar=off`, { waitUntil: 'load' });
    const selector = `[data-epic-mark="${story.key}"]`;
    if (!(await page.locator(selector).count())) continue;
    await Promise.race([settle(page), page.waitForTimeout(20000)]);
    await hideFixed(page);
    // The bar's own measurement, so the numbers here match the live outlines.
    const measured = await page.evaluate(measureMarks, story.key);
    const scroll = await page.evaluate(() => ({ x: scrollX, y: scrollY, docWidth: document.documentElement.scrollWidth }));
    const marks = measured
      .filter((m) => m.rect)
      .map(({ n, label, rect }) => ({ n, label, x: rect.x + scroll.x, y: rect.y + scroll.y, w: rect.w, h: rect.h }));
    if (!marks.length) continue;

    const docWidth = scroll.docWidth;
    const shots = [];
    const fitted = [];
    for (const group of clusters(marks)) fitted.push(...(await fit(page, group, docWidth)));
    for (const [i, { group, clip }] of fitted.entries()) {
      const file = `${slugFor(epicPage.route)}-${i + 1}.jpg`;
      const dir = path.join(outDir, storySlug(story));
      await mkdir(dir, { recursive: true });
      await page.screenshot({ path: path.join(dir, file), type: 'jpeg', quality: 82, fullPage: true, clip });
      shots.push({
        src: `/epic-shots/${epicSlug}/${storySlug(story)}/${file}`,
        width: Math.round(clip.width),
        height: Math.round(clip.height),
        marks: group.map((m) => ({
          n: m.n,
          label: m.label,
          x: pct(m.x - clip.x, clip.width),
          y: pct(m.y - clip.y, clip.height),
          w: pct(m.w, clip.width),
          h: pct(m.h, clip.height),
        })),
      });
      count++;
    }
    (result[story.key] ??= {})[epicPage.route] = shots;
  }

  await context.close();
  const dataFile = path.join(ROOT, 'src/data/epics/shots', `${epicSlug}.json`);
  await mkdir(path.dirname(dataFile), { recursive: true });
  await writeFile(dataFile, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`epic-shots: ${epic.key}, ${count} screenshot${count === 1 ? '' : 's'}`);
}

/** Lazy images, web fonts and late layout all settled before measuring. */
async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = innerHeight;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 60));
    }
    const pending = [...document.images].filter((img) => !img.complete);
    const loaded = Promise.all(
      pending.map((img) => new Promise((r) => {
        img.addEventListener('load', r, { once: true });
        img.addEventListener('error', r, { once: true });
      })),
    );
    // A lazy image that never came into view never fires either event.
    await Promise.race([loaded, new Promise((r) => setTimeout(r, 3000))]);
    scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(250);
}

/** Fixed chrome (the skip link, a back-to-top button) is not part of the page
    a story changes, and a full-page capture of a very tall page can paint it
    in the middle of the crop. Hidden for the screenshots only. */
async function hideFixed(page) {
  await page.evaluate(() => {
    for (const el of document.body.querySelectorAll('*')) {
      if (getComputedStyle(el).position === 'fixed') el.style.setProperty('visibility', 'hidden', 'important');
    }
  });
}

/** Moves the crop's edges until none cuts through a line of text, an image or a
    control. Beside the marks, an edge backs off a neighbour (another column)
    when it can without cutting into the marks, and otherwise moves out to take
    it whole. Above and below the marks is context: what would widen the crop or
    cut a chart is trimmed off instead. What is taken whole stays in and what is
    trimmed stays out, so no move undoes another. */
async function snapClip(page, clip, group, docWidth) {
  const keep = {
    left: Math.min(...group.map((m) => m.x)) - PAD.side,
    right: Math.max(...group.map((m) => m.x + m.w)) + PAD.side,
    top: Math.min(...group.map((m) => m.y)) - PAD.top,
    bottom: Math.max(...group.map((m) => m.y + m.h)) + PAD.bottom,
  };
  return page.evaluate(({ clip: { x, y, width, height }, keep, docWidth }) => {
    const toPage = (r) => ({ top: r.top + scrollY, bottom: r.bottom + scrollY, left: r.left + scrollX, right: r.right + scrollX });
    const seen = (el) => {
      const r = el.getBoundingClientRect();
      // A 1px box is visually hidden text (sr-only); its lines paint nowhere.
      return r.width > 1 && r.height > 1 && el.checkVisibility({ opacityProperty: true, visibilityProperty: true });
    };
    const lines = [];
    const range = document.createRange();
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let t = walk.nextNode(); t; t = walk.nextNode()) {
      if (!t.data.trim() || !t.parentElement || !seen(t.parentElement)) continue;
      range.selectNodeContents(t);
      for (const r of range.getClientRects()) if (r.width && r.height) lines.push(toPage(r));
    }
    const boxOf = (el) => toPage(el.getBoundingClientRect());
    const all = (sel) => Array.from(document.querySelectorAll(sel)).filter(seen).map(boxOf);
    const short = (boxes) => boxes.filter((b) => b.bottom - b.top < 120);
    // A web component's text sits in its shadow root, out of the walk above: take its host whole.
    const hosts = short(Array.from(document.querySelectorAll('*')).filter((el) => el.shadowRoot && seen(el)).map(boxOf));
    // Top and bottom: short blocks whole, then every line of text.
    const rows = [...short(all('h1, h2, h3, h4, h5, h6, p, dt, dd, figcaption, label, a, button, img, svg')), ...hosts, ...lines];
    // Sides: lines, controls and images only; a block's box is wider than what it shows.
    const sides = [...short(all('button, img, svg, input, select, textarea')), ...hosts, ...lines];
    // Charts, photos and maps: too tall to take whole, so an edge on one backs off it.
    const media = all('img, svg, canvas, video, iframe').filter((b) => b.bottom - b.top >= 120);

    const edge = { top: y, bottom: y + height, left: x, right: x + width };
    const limit = { top: 0, bottom: Infinity, left: 0, right: docWidth };
    let moved = false;
    const set = (side, value) => {
      if (edge[side] !== value) { edge[side] = value; moved = true; }
    };
    const trimTop = (to) => { limit.top = Math.max(limit.top, to); if (edge.top < limit.top) set('top', limit.top); };
    const trimBottom = (to) => { limit.bottom = Math.min(limit.bottom, to); if (edge.bottom > limit.bottom) set('bottom', limit.bottom); };
    for (let pass = 0; pass < 6; pass++) {
      moved = false;
      for (const b of sides) {
        if (b.bottom <= edge.top || b.top >= edge.bottom) continue;
        if (b.left < edge.left && b.right > edge.right) continue; // wider than the crop: full-bleed art
        const cutsRight = b.left < edge.right && b.right > edge.right;
        const cutsLeft = b.left < edge.left && b.right > edge.left;
        if (!cutsRight && !cutsLeft) continue;
        if (b.bottom <= keep.top) { trimTop(b.bottom + 8); continue; }
        if (b.top >= keep.bottom) { trimBottom(b.top - 8); continue; }
        if (cutsRight) {
          if (b.left - 8 >= keep.right) { set('right', b.left - 8); limit.right = Math.min(limit.right, edge.right); }
          else { set('right', Math.min(limit.right, b.right + 8)); keep.right = Math.max(keep.right, edge.right); }
        }
        if (cutsLeft) {
          if (b.right + 8 <= keep.left) { set('left', b.right + 8); limit.left = Math.max(limit.left, edge.left); }
          else { set('left', Math.max(limit.left, b.left - 8)); keep.left = Math.min(keep.left, edge.left); }
        }
      }
      for (const b of media) {
        if (b.right <= edge.left || b.left >= edge.right) continue;
        if (b.top < edge.bottom && b.bottom > edge.bottom && b.top - 8 >= keep.bottom) trimBottom(b.top - 8);
        if (b.top < edge.top && b.bottom > edge.top && b.bottom + 8 <= keep.top) trimTop(b.bottom + 8);
      }
      for (const b of rows) {
        if (b.right <= edge.left || b.left >= edge.right) continue;
        if (b.top < edge.top && b.bottom > edge.top) {
          if (b.top - 8 >= limit.top) { set('top', Math.max(0, b.top - 8)); keep.top = Math.min(keep.top, edge.top); }
          else if (b.bottom + 8 <= keep.top) trimTop(b.bottom + 8);
        }
        if (b.top < edge.bottom && b.bottom > edge.bottom) {
          if (b.bottom + 8 <= limit.bottom) { set('bottom', b.bottom + 8); keep.bottom = Math.max(keep.bottom, edge.bottom); }
          else if (b.top - 8 >= keep.bottom) trimBottom(b.top - 8);
        }
      }
      if (!moved) break;
    }
    return {
      x: Math.round(edge.left),
      y: Math.round(edge.top),
      width: Math.round(edge.right - edge.left),
      height: Math.round(edge.bottom - edge.top),
    };
  }, { clip, keep, docWidth });
}

/** One shot per group, split at the widest gap between its marks while the shot
    would be too tall to show whole on the story page. */
async function fit(page, group, docWidth) {
  const clip = await snapClip(page, clipFor(group, docWidth), group, docWidth);
  if (clip.height <= EPIC_SHOT_TALL || group.length < 2) return [{ group, clip }];
  const byTop = [...group].sort((a, b) => a.y - b.y);
  let at = 1;
  let widest = -Infinity;
  let bottom = -Infinity;
  for (let i = 1; i < byTop.length; i++) {
    bottom = Math.max(bottom, byTop[i - 1].y + byTop[i - 1].h);
    if (byTop[i].y - bottom > widest) {
      widest = byTop[i].y - bottom;
      at = i;
    }
  }
  const byN = (g) => g.sort((a, b) => a.n - b.n);
  return [...(await fit(page, byN(byTop.slice(0, at)), docWidth)), ...(await fit(page, byN(byTop.slice(at)), docWidth))];
}

/** Marks that sit near each other share one screenshot. */
function clusters(marks) {
  const byTop = [...marks].sort((a, b) => a.y - b.y);
  const groups = [];
  for (const m of byTop) {
    const last = groups.at(-1);
    const bottom = last ? Math.max(...last.map((g) => g.y + g.h)) : -Infinity;
    if (last && m.y <= bottom + CLUSTER_GAP) last.push(m);
    else groups.push([m]);
  }
  return groups.map((g) => g.sort((a, b) => a.n - b.n));
}

function clipFor(group, docWidth) {
  let left = Math.min(...group.map((m) => m.x)) - PAD.side;
  let right = Math.max(...group.map((m) => m.x + m.w)) + PAD.side;
  let top = Math.max(0, Math.min(...group.map((m) => m.y)) - PAD.top);
  let bottom = Math.max(...group.map((m) => m.y + m.h)) + PAD.bottom;
  if (bottom - top < MIN_HEIGHT) {
    const grow = (MIN_HEIGHT - (bottom - top)) / 2;
    top -= grow;
    bottom += grow;
    if (top < 0) { bottom -= top; top = 0; }
  }
  if (right - left < MIN_WIDTH) {
    const grow = (MIN_WIDTH - (right - left)) / 2;
    left -= grow;
    right += grow;
  }
  // Width lost at one edge of the page goes to the other side.
  if (left < 0) { right -= left; left = 0; }
  if (right > docWidth) { left = Math.max(0, left - (right - docWidth)); right = docWidth; }
  return { x: Math.round(left), y: Math.round(top), width: Math.round(right - left), height: Math.round(bottom - top) };
}

function pct(v, total) {
  return Math.round((v / total) * 10000) / 100;
}

function slugFor(route) {
  return route.replace(/^\/+/, '').replace(/^prototypes\//, '').replace(/[^a-z0-9]+/gi, '-') || 'home';
}

/** Playwright's own Chromium if installed, else system Chrome, else the newest cached headless shell. */
async function launch() {
  try {
    return await chromium.launch();
  } catch {}
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {}
  const { readdir } = await import('node:fs/promises');
  const cache = path.join(process.env.HOME ?? '', 'Library/Caches/ms-playwright');
  const shells = (await readdir(cache).catch(() => [])).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse();
  for (const dir of shells) {
    for (const sub of ['chrome-headless-shell-mac-arm64', 'chrome-headless-shell-mac-x64', 'chrome-headless-shell-linux64']) {
      const exe = path.join(cache, dir, sub, 'chrome-headless-shell');
      if (await stat(exe).then(() => true, () => false)) return chromium.launch({ executablePath: exe });
    }
  }
  throw new Error('epic-shots: no Chromium found. Install Google Chrome or run `npx playwright install chromium`.');
}

/** A minimal static server for dist/, mounted at the site's base path. */
async function serveDist(dist, basePath) {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
  const srv = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.startsWith(basePath)) p = '/' + p.slice(basePath.length);
    const candidates = p.endsWith('/') ? [`${p}index.html`] : [p, `${p}/index.html`, `${p}.html`];
    for (const c of candidates) {
      const file = path.join(dist, c);
      if (!file.startsWith(dist)) break;
      try {
        if (!(await stat(file)).isFile()) continue;
        res.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' });
        res.end(await readFile(file));
        return;
      } catch {}
    }
    res.writeHead(404).end();
  });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  return { server: srv, origin: `http://127.0.0.1:${srv.address().port}` };
}
