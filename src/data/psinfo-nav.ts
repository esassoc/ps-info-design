// psinfo-nav.ts — the UNIFIED information architecture for Puget Sound Info.
//
// The rail MIRRORS the live pugetsoundinfo.wa.gov "Explore" menu (scraped
// 2026-07-17): Puget Sound Info (the program front door + data tools), then
// Goals / Plans / Implementation & Funding / Progress with prod's own
// sub-links. What the prototype adds is the delivery: today those links
// scatter across five subdomains connected only by a repeated mega-menu; here
// they live in ONE persistent rail with a cross-module search above.
//
// Built pages: home, vital-signs (all five goal links resolve to its by-goal
// listing), action-agenda (Plans > Action Agenda Explorer). Every other leaf
// is an href-less stub so the IA reads complete without every page existing.

import { withBase } from '../lib/base';

export interface NavLeaf {
  id: string;
  label: string;
  /** Root-relative route for a BUILT page; omit for a stub (renders inert). */
  route?: string;
  /** Absolute URL for a destination that stays OUTSIDE the prototype (opens
      in a new tab with an external mark). Mutually exclusive with `route`. */
  externalHref?: string;
  /** Sets this leaf apart with a hairline above it. */
  divider?: boolean;
}

export interface NavModule {
  id: string;
  label: string;
  /** One-line description of what the module is (used on overview surfaces). */
  blurb: string;
  /** The live destination this module fronts today. */
  domain: string;
  /** Inner Lucide SVG markup (paths/rects) for the module glyph. */
  icon: string;
  pages: NavLeaf[];
}

// ── Lucide glyphs (inner markup only) ──────────────────────────────────────
export const ICONS: Record<string, string> = {
  info:
    '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  target:
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  'list-checks':
    '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  banknote:
    '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  'trending-up':
    '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  search:
    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'circle-user':
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'life-buoy':
    '<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
};

// ── The five areas, in prod's reading order ─────────────────────────────────
export const MODULES: NavModule[] = [
  {
    id: 'overview',
    label: 'Puget Sound Info',
    blurb: 'The program front door — about, web services, spatial data, and the data center.',
    domain: 'pugetsoundinfo.wa.gov',
    icon: ICONS.info,
    pages: [
      { id: 'about', label: 'About', route: '/prototypes/about' },
      { id: 'web-services', label: 'Web Services', route: '/prototypes/web-services' },
      { id: 'spatial-data-hub', label: 'Spatial Data Hub', externalHref: 'https://data-wa-psp.hub.arcgis.com/' },
      { id: 'data-center', label: 'Data Center', route: '/prototypes/data-center' },
    ],
  },
  {
    id: 'goals',
    label: 'Goals',
    blurb: 'What are we trying to achieve? The statutory recovery goals and their Vital Signs.',
    domain: 'vitalsigns.pugetsoundinfo.wa.gov',
    icon: ICONS.target,
    pages: [
      { id: 'goal-population', label: 'Healthy Human Population', route: '/prototypes/goals/healthy-human-population' },
      { id: 'goal-quality', label: 'Vibrant Human Quality of Life', route: '/prototypes/goals/vibrant-human-quality-of-life' },
      { id: 'goal-species', label: 'Thriving Species and Food Web', route: '/prototypes/goals/thriving-species-and-food-web' },
      { id: 'goal-habitat', label: 'Functioning Habitat', route: '/prototypes/goals/functioning-habitat' },
      { id: 'goal-water', label: 'Healthy Water Quality', route: '/prototypes/goals/healthy-water-quality' },
    ],
  },
  {
    id: 'plans',
    label: 'Plans',
    blurb: 'What are we planning to do? Regional guidance and the plans implementing it.',
    domain: 'actionagenda.pugetsoundinfo.wa.gov',
    icon: ICONS['list-checks'],
    pages: [
      { id: 'aa-explorer', label: 'Action Agenda Explorer', route: '/prototypes/action-agenda' },
      { id: 'impl-strategies', label: 'Implementation Strategies', externalHref: 'https://pugetsoundestuary.wa.gov/recovering-puget-sound/' },
      { id: 'local-recovery-plans', label: 'Local Ecosystem Recovery Plans', route: '/prototypes/lios' },
      { id: 'federal-task-force', label: 'Puget Sound Federal Task Force Action Plan', externalHref: 'https://www.epa.gov/system/files/documents/2022-06/puget-sound-federal-task-force-action-plan-2022-2026.pdf' },
    ],
  },
  {
    id: 'implementation',
    label: 'Implementation & Funding',
    blurb: 'Funding opportunities and the investments implementing recovery on the ground.',
    domain: 'nepatlas.pugetsoundinfo.wa.gov',
    icon: ICONS.banknote,
    pages: [
      { id: 'funding-tool', label: 'Recovery Acceleration Funding Tool', externalHref: 'https://experience.arcgis.com/experience/6f12941d99644b0e93deaed86f1674f0/' },
      { id: 'nep-atlas', label: 'NEP Atlas', route: '/prototypes/nep-atlas' },
      { id: 'ongoing-programs', label: 'Ongoing Programs Portal', route: '/prototypes/ongoing-programs' },
    ],
  },
  {
    id: 'progress',
    label: 'Progress',
    blurb: 'Measures that track recovery progress and the biennial State of the Sound.',
    domain: 'stateofthesound.wa.gov',
    icon: ICONS['trending-up'],
    pages: [
      { id: 'indicators', label: 'Indicators', route: '/prototypes/indicators' },
      { id: 'state-of-the-sound', label: 'State of the Sound', externalHref: 'https://stateofthesound.wa.gov/' },
    ],
  },
];

/** The active module id and active leaf id, resolved for a page. */
export interface ActiveNav {
  moduleId: string;
  leafId?: string;
}

/**
 * The sidenav item list the shell renders: every module a parent, its pages the
 * children. `route` is withBase'd here; stubs get no href. The active module is
 * marked so the shell can expand + highlight it.
 */
export function navFor(active: ActiveNav) {
  return MODULES.map((m) => ({
    id: m.id,
    label: m.label,
    icon: m.icon,
    active: m.id === active.moduleId,
    children: m.pages.map((p) => ({
      id: p.id,
      label: p.label,
      href: p.route ? withBase(p.route) : p.externalHref,
      external: !!p.externalHref,
      active: p.id === active.leafId,
      divider: p.divider,
    })),
  }));
}

// ── Cross-module search index — the unification payoff ─────────────────────
// One flat index that spans all five areas. Today this search is impossible:
// each subdomain searches only itself. `category` is the area label.
export interface SearchEntry {
  title: string;
  subtitle: string;
  category: string;
  route?: string;
}

export const SEARCH_INDEX: SearchEntry[] = [
  { title: 'Chinook Salmon', subtitle: 'Vital Sign · Thriving Species & Food Web', category: 'Goals', route: '/prototypes/vital-signs' },
  { title: 'Marine Water Quality', subtitle: 'Vital Sign · Healthy Water Quality', category: 'Goals', route: '/prototypes/vital-signs' },
  { title: 'Estuaries', subtitle: 'Vital Sign · Functioning Habitat', category: 'Goals', route: '/prototypes/vital-signs' },
  { title: 'Orcas', subtitle: 'Vital Sign · Thriving Species & Food Web', category: 'Goals', route: '/prototypes/vital-signs' },
  { title: 'Shellfish Beds', subtitle: 'Vital Sign · Healthy Human Population', category: 'Goals', route: '/prototypes/vital-signs' },
  { title: 'Habitat Protection & Restoration', subtitle: 'Strategy · Foundations of Recovery', category: 'Plans', route: '/prototypes/action-agenda' },
  { title: 'Shellfish Bed Reopening', subtitle: 'Commitment · 3 partners', category: 'Plans', route: '/prototypes/action-agenda' },
  { title: 'Stormwater Management', subtitle: 'Strategy · Foundations of Recovery', category: 'Plans', route: '/prototypes/action-agenda' },
  { title: 'Floodplains & Estuaries', subtitle: 'Topic · pressure indicators', category: 'Progress' },
  { title: 'On-site Sewage Systems', subtitle: 'Topic · pressure indicators', category: 'Progress' },
  { title: 'Nearshore Restoration — Skagit Delta', subtitle: 'Activity · NEP-funded', category: 'Implementation & Funding' },
  { title: 'Investment Summary 2007–2025', subtitle: '$254M across 600+ projects', category: 'Implementation & Funding' },
  { title: 'Recovery Goals', subtitle: 'Six statutory goals for Puget Sound', category: 'Puget Sound Info', route: '/prototypes/home' },
  { title: 'Data Center', subtitle: 'Downloads, APIs, spatial data hub', category: 'Puget Sound Info' },
];
