import { defineConfig } from 'astro/config';

// Minimal, mirroring the ecology hub and the other spokes. The spoke ships
// static HTML/CSS; interactivity comes from the hub's Lit web components
// (self-registering) and any island scripts a prototype adds.
//
// Intended to publish to GitHub Pages as a project site, so production builds
// need the subpath as `base`. Dev stays at root for clean local URLs —
// withBase() (src/lib/base.ts) reads whichever base is active.
const base = process.env.NODE_ENV === 'production' ? '/ps-info-design/' : '/';

// Report URLs published before the SHI reports moved under indicator-reports/.
// Each becomes a static page that forwards to the new home; reports with no
// page anymore forward to the SHI landing page.
const SHI = 'prototypes/salmon-habitat-indicators';
const movedReports = {
  'fish-passage': `${SHI}/indicator-reports/fish-passage`,
  'large-wood': `${SHI}/indicator-reports/large-wood`,
  'summer-low-flow': `${SHI}/indicator-reports/summer-low-flow`,
  'estuary-area': SHI,
  'stream-temperature': SHI,
};

export default defineConfig({
  site: 'https://esassoc.github.io',
  base,
  server: { port: 4330 },
  redirects: Object.fromEntries(
    Object.entries(movedReports).map(([slug, to]) => [`/${SHI}/reports/${slug}`, `${base}${to}`]),
  ),
});
