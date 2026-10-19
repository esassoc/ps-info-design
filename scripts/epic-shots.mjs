#!/usr/bin/env node
// epic-shots: screenshots every page each epic walks, cropped to the parts a
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
const CLUSTER_GAP = 200;

const { EPICS, epicSteps, gateStorageKey, measureMarks, storySlug } = await import(
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

  for (const { story, page: epicPage } of epicSteps(epic)) {
    await page.goto(`${origin}${base}${epicPage.route.replace(/^\//, '')}?bar=off`, { waitUntil: 'load' });
    const selector = `[data-epic-mark="${story.key}"]`;
    if (!(await page.locator(selector).count())) continue;
    await Promise.race([settle(page), page.waitForTimeout(20000)]);
    // The bar's own measurement, so the numbers here match the live outlines.
    const measured = await page.evaluate(measureMarks, story.key);
    const scroll = await page.evaluate(() => ({ x: scrollX, y: scrollY, docWidth: document.documentElement.scrollWidth }));
    const marks = measured
      .filter((m) => m.rect)
      .map(({ n, label, rect }) => ({ n, label, x: rect.x + scroll.x, y: rect.y + scroll.y, w: rect.w, h: rect.h }));
    if (!marks.length) continue;

    const docWidth = scroll.docWidth;
    const shots = [];
    for (const [i, group] of clusters(marks).entries()) {
      const clip = clipFor(group, docWidth);
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
      scrollTo(0, y);
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
    scrollTo(0, 0);
  });
  await page.waitForTimeout(250);
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
  const top = Math.max(0, Math.min(...group.map((m) => m.y)) - PAD.top);
  const bottom = Math.max(...group.map((m) => m.y + m.h)) + PAD.bottom;
  if (right - left < MIN_WIDTH) {
    const grow = (MIN_WIDTH - (right - left)) / 2;
    left -= grow;
    right += grow;
  }
  left = Math.max(0, left);
  right = Math.min(docWidth, right);
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
