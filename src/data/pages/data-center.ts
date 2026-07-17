// data-center.ts — content for src/pages/prototypes/data-center.astro.
//
// Sourced 2026-07-17 from https://www.pugetsoundinfo.wa.gov/DataCenter
// (server-rendered ASP.NET; no JS-gated content). The page is a hub: one
// intro paragraph, a 3x3 grid of icon tiles ("Active" resources), a divider,
// and a single archived tile. Every title, the intro sentence, and the
// "Archived" heading are copied verbatim from the source markup.
//
// GAP: every tile's <span class="sectionDetails"> is empty in the source —
// the live page renders icon + title only, with no blurb/description text
// for any of the 10 resources (active or archived). Nothing was omitted;
// there is no blurb to extract, and none is invented here.
//
// Icons: the source renders each tile with a Font Awesome glyph
// (fa-list, fa-chart-bar, etc.). This repo's icon convention is inline
// Lucide-equivalent SVG path data (see psinfo-nav.ts ICONS, home.astro
// TOOLS) — each `icon` value below is the Lucide glyph matching the source
// FA icon's meaning, not a literal FA-to-SVG trace.
//
// Link resolution: two tiles front destinations this prototype already
// builds/plans under its own IA (psinfo-nav.ts) — Puget Sound Indicators
// (-> /prototypes/indicators, built) and Web Services (-> /prototypes/web-
// services, registered route) — so their `href` is root-relative and internal.
// Every other tile fronts a live ASP.NET admin/list tool (Activities,
// Organizations, Funds, Topics, Activity Types, Legislative Bills, Ongoing
// Program Targets, and the archived Outcomes & Strategies) that this demo
// does not rebuild; their `href` is the absolute live URL, external.

export interface DataCenterHero {
  title: string;
  lede: string;
}

export interface DataCenterResource {
  id: string;
  /** Verbatim tile title from source. */
  title: string;
  /** Root-relative route (internal, resolve with withBase()) or absolute URL (external). */
  href: string;
  /** Inner Lucide SVG path markup for the tile glyph. */
  icon: string;
}

// ── Hero ─────────────────────────────────────────────────────────────────
// Title matches the page's own breadcrumb/<title> ("Data Center"); lede is
// the source's sole intro paragraph, verbatim.
export const DATA_CENTER_HERO: DataCenterHero = {
  title: 'Data Center',
  lede: 'Welcome to the Puget Sound Info Data Center, the main repository for restoration, protection and recovery data across Puget Sound Info programs.',
};

// ── Active resources, in source order (first grid, 9 tiles) ────────────────
export const DATA_CENTER_RESOURCES: DataCenterResource[] = [
  {
    id: 'activities',
    title: 'Activities',
    href: 'https://www.pugetsoundinfo.wa.gov/Activity/Index',
    icon: '<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>',
  },
  {
    id: 'indicators',
    title: 'Puget Sound Indicators',
    href: '/prototypes/indicators',
    icon: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  },
  {
    id: 'organizations',
    title: 'Organizations',
    href: 'https://www.pugetsoundinfo.wa.gov/Organization/Index',
    icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  },
  {
    id: 'funds',
    title: 'Funds',
    href: 'https://www.pugetsoundinfo.wa.gov/Fund/Index',
    icon: '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  },
  {
    id: 'web-services',
    title: 'Web Services',
    href: '/prototypes/web-services',
    icon: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
  },
  {
    id: 'action-agenda-topics',
    title: '2026-2030 Action Agenda Topics',
    href: 'https://www.pugetsoundinfo.wa.gov/Topic/Index',
    icon: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  },
  {
    id: 'activity-types',
    title: 'Activity Types',
    href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Index',
    icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  },
  {
    id: 'legislative-bills',
    title: 'Legislative Bills',
    href: 'https://www.pugetsoundinfo.wa.gov/LegislativeBill/Index',
    icon: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  },
  {
    id: 'ongoing-program-targets',
    title: 'Ongoing Program Targets',
    href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgramTarget/Index',
    icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  },
];

// ── Archived resources (second grid, below an "Archived" divider heading) ──
// Source heading text (verbatim, despite the source's own malformed
// `<d iv>` tag): "Archived".
export const DATA_CENTER_ARCHIVED_HEADING = 'Archived';

export const DATA_CENTER_ARCHIVED: DataCenterResource[] = [
  {
    id: 'outcomes-and-strategies',
    title: '2022-2026 Desired Outcomes and Strategies',
    href: 'https://www.pugetsoundinfo.wa.gov/OutcomeAndStrategy/Index',
    icon: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  },
];
