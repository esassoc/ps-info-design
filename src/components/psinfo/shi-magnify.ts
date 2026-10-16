// shi-magnify.ts — magnification options for psinfo-shi-habitat-explorer, one per mode:
//   lens    a round loupe follows the mouse over the scene (pointer only; Escape hides it)
//   zoom    selecting a habitat eases the scene in to that habitat; clearing eases back out
//   detail  hovering or focusing a landmark shows it enlarged in a round window on the far side
// The mode comes from the page (?mag=lens|zoom|detail) while the options are being compared.
// The magnified views are aria-hidden copies of the scene: the scene itself keeps every name,
// link and focus stop, so magnification adds nothing a screen reader or keyboard user misses.

export type MagnifyMode = 'lens' | 'zoom' | 'detail';

const LENS_ZOOM = 2.4;
const DETAIL_ZOOM = 3;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** An inert, unlabelled copy of the scene to magnify. */
function cloneScene(art: SVGSVGElement): SVGSVGElement {
  const copy = art.cloneNode(true) as SVGSVGElement;
  copy.removeAttribute('class');
  copy.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
  copy.querySelectorAll('[role], [aria-labelledby]').forEach((el) => {
    el.removeAttribute('role');
    el.removeAttribute('aria-labelledby');
  });
  copy.querySelectorAll('title, desc').forEach((el) => el.remove());
  copy.querySelectorAll('a').forEach((a) => a.removeAttribute('href'));
  return copy;
}

function makeWindow(frame: HTMLElement, cls: string): HTMLDivElement {
  const win = document.createElement('div');
  win.className = `shix-mag ${cls}`;
  win.setAttribute('aria-hidden', 'true');
  win.inert = true;
  frame.append(win);
  return win;
}

/** Place the copy so scene point (sx, sy) sits at the window's center, at `zoom` times the on-screen scale. */
function aim(win: HTMLElement, copy: SVGSVGElement, art: SVGSVGElement, sx: number, sy: number, zoom: number) {
  const rect = art.getBoundingClientRect();
  const vb = art.viewBox.baseVal;
  const scale = (rect.width / vb.width) * zoom;
  const r = win.clientWidth / 2;
  copy.style.width = `${vb.width * scale}px`;
  copy.style.height = `${vb.height * scale}px`;
  copy.style.transform = `translate(${r - (sx - vb.x) * scale}px, ${r - (sy - vb.y) * scale}px)`;
}

function initLens(frame: HTMLElement, art: SVGSVGElement) {
  const win = makeWindow(frame, 'shix-mag--lens');
  let copy: SVGSVGElement | null = null;
  let dismissed = false;
  const hide = () => win.classList.remove('is-shown');
  frame.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'touch') return;
    dismissed = false;
    copy?.remove();
    copy = cloneScene(art); // fresh, so selected habitats and open plaques show in the lens too
    win.replaceChildren(copy);
  });
  frame.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' || !copy || dismissed) return;
    const rect = art.getBoundingClientRect();
    const fr = frame.getBoundingClientRect();
    const vb = art.viewBox.baseVal;
    const sx = vb.x + ((e.clientX - rect.left) / rect.width) * vb.width;
    const sy = vb.y + ((e.clientY - rect.top) / rect.height) * vb.height;
    win.style.left = `${e.clientX - fr.left}px`;
    win.style.top = `${e.clientY - fr.top}px`;
    aim(win, copy, art, sx, sy, LENS_ZOOM);
    win.classList.add('is-shown');
  });
  frame.addEventListener('pointerleave', hide);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && win.classList.contains('is-shown')) {
      dismissed = true;
      hide();
    }
  });
}

function initDetail(frame: HTMLElement, art: SVGSVGElement, marks: SVGAElement[]) {
  const win = makeWindow(frame, 'shix-mag--detail');
  const vb = art.viewBox.baseVal;
  const show = (m: SVGAElement) => {
    const at = m.querySelector('.lm__mark')?.getAttribute('transform')?.match(/translate\(([-\d.]+) ([-\d.]+)\)/);
    if (!at) return;
    const x = parseFloat(at[1]);
    const y = parseFloat(at[2]);
    const copy = cloneScene(art);
    win.replaceChildren(copy);
    // the window sits on the side of the frame away from the landmark, so it never covers it
    win.classList.toggle('is-left', x > vb.x + vb.width / 2);
    aim(win, copy, art, x, y, DETAIL_ZOOM);
    win.classList.add('is-shown');
  };
  const hide = () => win.classList.remove('is-shown');
  marks.forEach((m) => {
    m.addEventListener('mouseenter', () => show(m));
    m.addEventListener('focus', () => show(m));
    m.addEventListener('mouseleave', hide);
    m.addEventListener('blur', hide);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hide();
  });
}

function initZoom(root: HTMLElement, art: SVGSVGElement) {
  const vb = art.viewBox.baseVal;
  const full = { x: vb.x, y: vb.y, w: vb.width, h: vb.height };
  const aspect = full.w / full.h;
  let now = { ...full };
  let raf = 0;

  const targetFor = (slug: string | null) => {
    if (!slug) return full;
    const parts = [
      root.querySelector<SVGGraphicsElement>(`[data-shi-cat-zone="${slug}"] .zone__line`),
      root.querySelector<SVGGraphicsElement>(`[data-shi-exhibit="${slug}"]`),
      ...root.querySelectorAll<SVGGraphicsElement>(`[data-shi-cat="${slug}"]`),
    ].filter(Boolean) as SVGGraphicsElement[];
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    parts.forEach((el) => {
      const b = el.getBBox();
      x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height);
    });
    const pad = 28;
    let w = x1 - x0 + pad * 2;
    let h = y1 - y0 + pad * 2;
    // keep the scene's shape, never zoom past 2.2x, never show past the scene's edges
    if (w / h < aspect) w = h * aspect; else h = w / aspect;
    w = Math.min(full.w, Math.max(w, full.w / 2.2));
    h = w / aspect;
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    return {
      x: Math.min(Math.max(cx - w / 2, full.x), full.x + full.w - w),
      y: Math.min(Math.max(cy - h / 2, full.y), full.y + full.h - h),
      w,
      h,
    };
  };

  const set = (v: typeof now) => {
    now = v;
    art.setAttribute('viewBox', `${v.x} ${v.y} ${v.w} ${v.h}`);
  };
  const go = (slug: string | null) => {
    cancelAnimationFrame(raf);
    const from = { ...now };
    const to = targetFor(slug);
    if (reducedMotion()) return set(to);
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 520);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      set({
        x: from.x + (to.x - from.x) * e,
        y: from.y + (to.y - from.y) * e,
        w: from.w + (to.w - from.w) * e,
        h: from.h + (to.h - from.h) * e,
      });
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  document.addEventListener('shi:filter', (e) => go((e as CustomEvent<{ category: string | null }>).detail.category));
}

export function initMagnify(root: HTMLElement, mode: MagnifyMode) {
  const frame = root.querySelector<HTMLElement>('.shix__frame');
  const art = root.querySelector<SVGSVGElement>('.shix__art');
  if (!frame || !art) return;
  root.dataset.mag = mode;
  if (mode === 'lens') initLens(frame, art);
  if (mode === 'detail') initDetail(frame, art, [...root.querySelectorAll<SVGAElement>('[data-shi-landmark]')]);
  if (mode === 'zoom') initZoom(root, art);
}
