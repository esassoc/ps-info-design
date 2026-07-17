---
name: wcag22-a11y
description: WCAG 2.2 AA discipline for every Puget Sound Info prototype — load BEFORE building or reviewing ANY page, component, or interaction in this repo. Covers the token contrast facts (which ps-info pairings pass), semantic HTML rules, keyboard/focus patterns, screen-reader conventions, the six new 2.2 success criteria, and the Playwright verification recipe. WA State agency work: accessibility is a hard requirement, not a polish pass.
---

# WCAG 2.2 AA — Puget Sound Info

This is an app for a Washington State agency (Puget Sound Partnership). WA
Policy #188 requires WCAG conformance for state IT — accessibility is part of
the definition of done for every prototype page, not a follow-up.

## Contrast — token facts (don't re-derive, don't guess)

Verified against this repo's `theme-ps-info.css` ramps on white / near-white:

| Use | Token | vs white | Verdict |
|---|---|---|---|
| Body/headings | `--color-text-primary` (gray-900) | ~15:1 | ✓ any size |
| Secondary text | `--color-text-secondary` (gray-700) | ~7.5:1 | ✓ any size |
| Tertiary text | `--color-text-tertiary` (gray-600) | ~5.6:1 | ✓ any size |
| Muted/meta | `--color-text-muted` (gray-500 #626e7a) | ~5.2:1 | ✓ small text (≥4.7:1 even on rail tint) |
| Links | `--color-text-link` (blue-600 #00549a) | ~7.7:1 | ✓ |
| Accent TEXT | `--color-secondary-strong` (orange-700) | ~4.8:1 | ✓ — the ONLY orange for text |
| Brand orange | `--color-secondary` (orange-500 #ef892e) | ~2.5:1 | ✗ text. Fills/dots/icons-with-labels only |
| Focus ring | `--focus-ring-color` (orange-600) | ~3.2:1 | ✓ non-text (3:1 floor) |

Rules of thumb:
- Never put `--color-secondary` (orange-500) or any goal hue behind or as text.
  Goal hues are dots/meters/chips next to a text label, never the label.
- On tinted surfaces (`--ps-info-rail-bg`, `--color-primary-subtle`) step text
  UP one token (muted → tertiary) — the tint eats ~0.3:1 of headroom.
- White text needs a backing of blue-700 or darker (photo scrims: verify at
  the LIGHTEST point the text can sit over — that's why the photo-header scrim
  runs 56% opacity at the text band).

## Semantic HTML (the non-negotiables)

- Interactive = `<a href>` (navigation) or `<button type="button">` (action).
  Never `<div onclick>`, never `role="button"` on a div.
- One `<h1>` per page (esa-page-header renders it); sections use `<h2>`+ in
  order — no skipping levels for looks (style with classes instead).
- Landmarks: one `<main>` (the shell provides `id="main-content"`), `<nav>`
  with `aria-label` when there's more than one (shell: "Modules", "Breadcrumb",
  "Page sections").
- Lists of things are `<ul>/<li>` (`role="list"` if `list-style: none` — Safari
  drops list semantics otherwise).
- Every `<img>` has `alt` — empty (`alt=""`) ONLY when genuinely decorative
  (photo behind text that repeats nothing). Data-bearing images (the region
  map) get a real description.
- Icon-only controls carry `aria-label`; decorative icons `aria-hidden="true"`
  (esa-icon does this automatically when no `label` prop is passed).

## Keyboard & focus

- Everything hover does, keyboard does: flyouts open on click/Enter of the
  head button, Escape closes (the shell already wires this — copy the pattern).
- `:focus-visible` outline on EVERY interactive element:
  `outline: 2px solid var(--focus-ring-color); outline-offset: 2px;`
  Never `outline: none` without a replacement in the same rule-set.
- Skip link first in the tab order (shell provides it) — don't add content
  before it.
- No positive `tabindex`. `tabindex="-1"` only for programmatic focus targets.
- Overlays: focus moves in on open, returns to the invoker on close, Esc
  closes (esa-dialog handles this — another reason to use the lego).

## New in WCAG 2.2 (the six that apply here)

- **2.4.11 Focus Not Obscured**: focused element can't be hidden under the
  fixed topbar/sticky bands — anchor targets inside the scrolling `.content`
  pane avoid this; verify when adding sticky elements.
- **2.5.7 Dragging Movements**: any drag interaction needs a click alternative.
- **2.5.8 Target Size (Minimum)**: interactive targets ≥ 24×24px (our nav
  rows, buttons, and cards clear this; watch tiny inline icon links).
- **3.2.6 Consistent Help**: Request Support stays in the same place on every
  page (the rail slot — don't move it per-page).
- **3.3.7 Redundant Entry**: don't ask users to re-enter info in a flow.
- **3.3.8 Accessible Authentication**: no cognitive tests for login mocks.

## Motion & preferences

- `prefers-reduced-motion` is wired globally in BaseLayout (kills transitions
  + smooth scroll). Don't add animation that bypasses CSS (JS-driven scroll or
  Web Animations) without checking the media query first.
- No autoplaying motion > 5s; no flashing.

## Verify (do this before calling a page done)

1. **Axe gate — MANDATORY, zero violations.** The Axe DevTools extension can't
   be driven by automation (DevTools UI is outside the page DOM), but its
   engine — axe-core — is vendored at `public/dev/axe.min.js` (devDependency;
   served by the dev server). Inject + run it on every changed page via
   browser tooling (Playwright `browser_evaluate` or claude-in-chrome
   `javascript_tool`):

   ```js
   await new Promise((res, rej) => {
     if (window.axe) return res();
     const s = document.createElement('script');
     s.src = '/dev/axe.min.js'; s.onload = res; s.onerror = rej;
     document.head.appendChild(s);
   });
   const r = await axe.run(document, {
     runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
   });
   return r.violations.map(v => ({ id: v.id, impact: v.impact,
     nodes: v.nodes.map(n => n.target.join(' ')) }));
   ```

   An empty array is the pass bar — fix violations at the TOKEN level when
   they're contrast (don't spot-patch one element and leave the token wrong).
2. Keyboard walk: Tab through the page — every interactive element reachable,
   visibly focused, in a sensible order; Escape closes anything it opened.
3. Zoom to 200% and 400% — no lost content, no horizontal scroll at 320px CSS
   width (1.4.10 Reflow).
4. Landmarks + headings: one h1, ordered h2+, labeled navs (check the
   Playwright accessibility snapshot — `browser_snapshot` shows the tree).
5. Contrast spot-check anything NOT using the token pairs in the table above.
6. The `check-a11y` PostToolUse hook flags mechanical misses (missing alt,
   icon-only controls without labels, outline:none, sub-13px text, positive
   tabindex, div-onclick) — treat its warnings as defects, not suggestions.
