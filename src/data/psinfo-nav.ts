// psinfo-nav.ts — the UNIFIED information architecture for Puget Sound Info.
//
// This is the redesign's core artifact: the five apps that today live on five
// separate subdomains (Core, Action Agenda, Vital Signs, Progress Indicators,
// NEP Atlas) — connected only by a repeated "Explore" mega-menu — modeled here
// as ONE navigable structure. Each module is a first-class peer in a single
// persistent sidenav; the topbar carries the one thing no app offers today: a
// search that reaches across all five.
//
// Structure is REAL (mapped from the live sites, 2026-07-15). Only three pages
// are built as working screens (home, vital-signs, action-agenda); the rest are
// href-less nav stubs so the model reads coherently without every leaf existing.

import { withBase } from '../lib/base';

export interface NavLeaf {
  id: string;
  label: string;
  /** Root-relative route for a BUILT page; omit for a stub (renders inert). */
  route?: string;
  /** Sets this leaf apart with a hairline above it. */
  divider?: boolean;
}

export interface NavModule {
  id: string;
  label: string;
  /** One-line description of what the module is (used on the overview page). */
  blurb: string;
  /** The live subdomain this module runs on today. */
  domain: string;
  /** Inner Lucide SVG markup (paths/rects) for the module glyph. */
  icon: string;
  pages: NavLeaf[];
}

// ── Lucide glyphs (inner markup only) ──────────────────────────────────────
export const ICONS: Record<string, string> = {
  compass:
    '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  'list-checks':
    '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  activity:
    '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  'trending-up':
    '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  'map-pinned':
    '<path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/>',
  home:
    '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  search:
    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'circle-user':
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'life-buoy':
    '<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
};

// ── The five modules, in Puget Sound recovery reading order ────────────────
export const MODULES: NavModule[] = [
  {
    id: 'overview',
    label: 'Overview',
    blurb: 'The front door — recovery goals, plans, funding, and the data center in one place.',
    domain: 'pugetsoundinfo.wa.gov',
    icon: ICONS.compass,
    pages: [
      { id: 'home', label: 'Home', route: '/prototypes/home' },
      { id: 'about', label: 'About Puget Sound Info' },
      { id: 'goals', label: 'Recovery Goals' },
      { id: 'plans', label: 'Plans' },
      { id: 'funding', label: 'Implementation & Funding' },
      { id: 'data-tools', label: 'Data & Tools' },
      { id: 'data-center', label: 'Data Center' },
    ],
  },
  {
    id: 'action-agenda',
    label: 'Action Agenda',
    blurb: 'The regional recovery plan — topics, strategies, and partner commitments (2026–2030).',
    domain: 'actionagenda.pugetsoundinfo.wa.gov',
    icon: ICONS['list-checks'],
    pages: [
      { id: 'aa-topics', label: 'Topics', route: '/prototypes/action-agenda' },
      { id: 'aa-strategies', label: 'Strategies' },
      { id: 'aa-commitments', label: 'Commitments' },
      { id: 'aa-local-plans', label: 'Local Recovery Plans' },
      { id: 'aa-federal', label: 'Federal Task Force' },
    ],
  },
  {
    id: 'vital-signs',
    label: 'Vital Signs',
    blurb: 'Measures of ecosystem health — 22 Vital Signs and their indicators, by recovery goal.',
    domain: 'vitalsigns.pugetsoundinfo.wa.gov',
    icon: ICONS.activity,
    pages: [
      { id: 'vs-all', label: 'All Vital Signs', route: '/prototypes/vital-signs' },
      { id: 'vs-indicators', label: 'Indicators' },
      { id: 'vs-targets', label: 'Recovery Targets' },
      { id: 'vs-methods', label: 'Background & Methods' },
    ],
  },
  {
    id: 'progress-indicators',
    label: 'Progress Indicators',
    blurb: 'Measures of the human activities that shape ecosystem health — the pressure side.',
    domain: 'progressindicators.pugetsoundinfo.wa.gov',
    icon: ICONS['trending-up'],
    pages: [
      { id: 'pi-overview', label: 'Overview' },
      { id: 'pi-indicators', label: 'Indicators' },
      { id: 'pi-data', label: 'Data Tables' },
    ],
  },
  {
    id: 'nep-atlas',
    label: 'NEP Atlas',
    blurb: 'National Estuary Program-funded activities and investments across the Sound.',
    domain: 'nepatlas.pugetsoundinfo.wa.gov',
    icon: ICONS['map-pinned'],
    pages: [
      { id: 'nep-map', label: 'Activities Map' },
      { id: 'nep-list', label: 'Activities List' },
      { id: 'nep-awards', label: 'NEP Awards' },
      { id: 'nep-summary', label: 'Investment Summary' },
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
      href: p.route ? withBase(p.route) : undefined,
      active: p.id === active.leafId,
      divider: p.divider,
    })),
  }));
}

// ── Cross-module search index — the unification payoff ─────────────────────
// One flat index that spans all five apps. Today this search is impossible:
// each subdomain searches only itself. `category` is the module label.
export interface SearchEntry {
  title: string;
  subtitle: string;
  category: string;
  route?: string;
}

export const SEARCH_INDEX: SearchEntry[] = [
  { title: 'Chinook Salmon', subtitle: 'Vital Sign · Thriving Species & Food Web', category: 'Vital Signs', route: '/prototypes/vital-signs' },
  { title: 'Marine Water Quality', subtitle: 'Vital Sign · Healthy Water Quality', category: 'Vital Signs', route: '/prototypes/vital-signs' },
  { title: 'Estuaries', subtitle: 'Vital Sign · Functioning Habitat', category: 'Vital Signs', route: '/prototypes/vital-signs' },
  { title: 'Orcas', subtitle: 'Vital Sign · Thriving Species & Food Web', category: 'Vital Signs', route: '/prototypes/vital-signs' },
  { title: 'Shellfish Beds', subtitle: 'Vital Sign · Healthy Human Population', category: 'Vital Signs', route: '/prototypes/vital-signs' },
  { title: 'Habitat Protection & Restoration', subtitle: 'Strategy · Foundations of Recovery', category: 'Action Agenda', route: '/prototypes/action-agenda' },
  { title: 'Shellfish Bed Reopening', subtitle: 'Commitment · 3 partners', category: 'Action Agenda', route: '/prototypes/action-agenda' },
  { title: 'Stormwater Management', subtitle: 'Strategy · Foundations of Recovery', category: 'Action Agenda', route: '/prototypes/action-agenda' },
  { title: 'Floodplains & Estuaries', subtitle: 'Topic · pressure indicators', category: 'Progress Indicators' },
  { title: 'On-site Sewage Systems', subtitle: 'Topic · pressure indicators', category: 'Progress Indicators' },
  { title: 'Nearshore Restoration — Skagit Delta', subtitle: 'Activity · NEP-funded', category: 'NEP Atlas' },
  { title: 'Investment Summary 2007–2025', subtitle: '$254M across 600+ projects', category: 'NEP Atlas' },
  { title: 'Recovery Goals', subtitle: 'Six statutory goals for Puget Sound', category: 'Overview', route: '/prototypes/home' },
  { title: 'Data Center', subtitle: 'Downloads, APIs, spatial data hub', category: 'Overview' },
];
