// vital-signs-module.ts — shared structure for the Vital Signs module chrome:
// the color-coded goal sub-nav (with per-goal Vital Sign dropdowns), the
// Vital Signs "wheel" graphic, and the Contributing Partners logo wall.
//
// Everything here is scraped from vitalsigns.pugetsoundinfo.wa.gov
// (2026-07-17):
//   - Sub-nav structure + goal theme colors: the site header's
//     vitalSignsGoalsNavbar (5 dropdowns, background-color = goal ThemeColor —
//     byte-identical to our --ps-info-goal-* tokens).
//   - Wheel: /Content/img/vitalsigns_wheel.png (a square tile ring, NOT a
//     radial chart) + its <map name="Map"> areas — 23 rect tiles on a 7×7
//     grid, each linking to /VitalSign/Detail/{id}. Tile/band/center colors
//     sampled from the PNG itself.
//   - Partners: the CONTRIBUTING PARTNERS <img> list, downloaded in DOM order
//     to /photos/vital-signs/partners/p01–p33.png (names in
//     src/data/pages/vital-signs.ts CONTRIBUTING_PARTNERS, same order).
//
// Salmon (32) and Orcas (19) route to the in-prototype detail pages; every
// other Vital Sign links out to its live VitalSign/Detail page.

import { CONTRIBUTING_PARTNERS } from './vital-signs';

export const VS_SITE = 'https://vitalsigns.pugetsoundinfo.wa.gov';

/** In-prototype routes for Vital Signs that have dedicated pages. */
const INTERNAL_VS: Record<number, string> = {
  32: '/prototypes/vital-signs/chinook-salmon',
  19: '/prototypes/vital-signs/orcas',
};

export interface VsLink {
  label: string;
  /** Internal root-relative route, when the destination exists in-prototype. */
  route?: string;
  /** Live-site URL otherwise. */
  externalHref?: string;
}

const vs = (id: number, label: string): VsLink =>
  INTERNAL_VS[id]
    ? { label, route: INTERNAL_VS[id] }
    : { label, externalHref: `${VS_SITE}/VitalSign/Detail/${id}` };

// ── Sub-nav (the site header's goal navbar) ────────────────────────────────
export interface SubnavGoal {
  slug: string;
  label: string;
  /** --ps-info-goal-* token (equals the source's ThemeColor). */
  hueVar: string;
  route: string;
  vitalSigns: VsLink[];
}

export const SUBNAV_GOALS: SubnavGoal[] = [
  {
    slug: 'healthy-human-population',
    label: 'Healthy Human Population',
    hueVar: '--ps-info-goal-population',
    route: '/prototypes/goals/healthy-human-population',
    vitalSigns: [vs(2, 'Air Quality'), vs(3, 'Drinking Water'), vs(4, 'Local Foods'), vs(6, 'Outdoor Activity'), vs(7, 'Shellfish Beds')],
  },
  {
    slug: 'vibrant-human-quality-of-life',
    label: 'Vibrant Human Quality of Life',
    hueVar: '--ps-info-goal-quality',
    route: '/prototypes/goals/vibrant-human-quality-of-life',
    vitalSigns: [vs(21, 'Cultural Wellbeing'), vs(22, 'Economic Vitality'), vs(23, 'Good Governance'), vs(24, 'Sense of Place'), vs(25, 'Sound Stewardship')],
  },
  {
    slug: 'thriving-species-and-food-web',
    label: 'Thriving Species and Food Web',
    hueVar: '--ps-info-goal-species',
    route: '/prototypes/goals/thriving-species-and-food-web',
    vitalSigns: [vs(35, 'Zooplankton'), vs(32, 'Salmon'), vs(19, 'Orcas'), vs(34, 'Groundfish and Benthic Invertebrates'), vs(33, 'Forage Fish'), vs(17, 'Birds')],
  },
  {
    slug: 'functioning-habitat',
    label: 'Functioning Habitat',
    hueVar: '--ps-info-goal-habitat',
    route: '/prototypes/goals/functioning-habitat',
    vitalSigns: [vs(29, 'Streams and Floodplains'), vs(30, 'Forests and Wetlands'), vs(13, 'Estuaries'), vs(31, 'Beaches and Marine Vegetation')],
  },
  {
    slug: 'healthy-water-quality',
    label: 'Healthy Water Quality',
    hueVar: '--ps-info-goal-water',
    route: '/prototypes/goals/healthy-water-quality',
    vitalSigns: [vs(27, 'Marine Water'), vs(26, 'Freshwater'), vs(28, 'Toxics in Aquatic Life')],
  },
];

export const SUBNAV_BANNER = {
  title: 'Puget Sound Vital Signs',
  subtitle: 'Measures of ecosystem health and progress toward Puget Sound recovery goals',
  homeRoute: '/prototypes/vital-signs',
};

export const SUBNAV_LINKS = {
  about: { label: 'About the Vital Signs', externalHref: `${VS_SITE}/About` },
  allIndicators: { label: 'All Indicators', route: '/prototypes/vital-signs/all-indicators' },
};

// ── The wheel (vitalsigns_wheel.png reproduced natively) ───────────────────
// Colors sampled from the source PNG. Tiles are the bright variants; the
// outer goal-name bands are the darker variants; the center medallion is a
// two-tone blue disc inside a 5-arc donut.
export const WHEEL_COLORS = {
  tile: {
    population: '#71b749',
    quality: '#e96f31',
    species: '#ea237c',
    habitat: '#854d9f',
    water: '#00b7ab',
  },
  band: {
    // (population nudged from the sampled #52853c so white band text holds ≥4.5:1)
    population: '#4a7a36',
    quality: '#bc5a27',
    species: '#bb2364',
    habitat: '#613873',
    water: '#0d8077',
  },
  corner: '#58595b',
  centerTop: '#0f5da5',
  centerBottom: '#253774',
} as const;

export type WheelGoal = keyof typeof WHEEL_COLORS.tile;

export interface WheelTile {
  /** 1-based CSS grid position within the 7×7 tile ring. */
  row: number;
  col: number;
  goal: WheelGoal;
  link: VsLink;
}

/** The 23 Vital Sign tiles, positioned exactly as the source image map lays
 *  them out (7×7 ring read clockwise from the top-left corner tile). */
export const WHEEL_TILES: WheelTile[] = [
  { row: 1, col: 1, goal: 'water', link: vs(28, 'Toxics in Aquatic Life') },
  { row: 1, col: 2, goal: 'population', link: vs(2, 'Air Quality') },
  { row: 1, col: 3, goal: 'population', link: vs(3, 'Drinking Water') },
  { row: 1, col: 4, goal: 'population', link: vs(4, 'Local Foods') },
  { row: 1, col: 5, goal: 'population', link: vs(6, 'Outdoor Activity') },
  { row: 1, col: 6, goal: 'population', link: vs(7, 'Shellfish Beds') },
  { row: 2, col: 7, goal: 'quality', link: vs(21, 'Cultural Wellbeing') },
  { row: 3, col: 7, goal: 'quality', link: vs(22, 'Economic Vitality') },
  { row: 4, col: 7, goal: 'quality', link: vs(23, 'Good Governance') },
  { row: 5, col: 7, goal: 'quality', link: vs(24, 'Sense of Place') },
  { row: 6, col: 7, goal: 'quality', link: vs(25, 'Sound Stewardship') },
  { row: 7, col: 7, goal: 'species', link: vs(17, 'Birds') },
  { row: 7, col: 6, goal: 'species', link: vs(33, 'Forage Fish') },
  { row: 7, col: 5, goal: 'species', link: vs(34, 'Groundfish and Benthic Invertebrates') },
  { row: 7, col: 4, goal: 'species', link: vs(19, 'Orcas') },
  { row: 7, col: 3, goal: 'species', link: vs(32, 'Salmon') },
  { row: 7, col: 2, goal: 'species', link: vs(35, 'Zooplankton') },
  { row: 7, col: 1, goal: 'habitat', link: vs(31, 'Beaches and Marine Vegetation') },
  { row: 6, col: 1, goal: 'habitat', link: vs(13, 'Estuaries') },
  { row: 5, col: 1, goal: 'habitat', link: vs(30, 'Forests and Wetlands') },
  { row: 4, col: 1, goal: 'habitat', link: vs(29, 'Streams and Floodplains') },
  { row: 3, col: 1, goal: 'water', link: vs(26, 'Freshwater') },
  { row: 2, col: 1, goal: 'water', link: vs(27, 'Marine Water') },
];

// ── Contributing Partners (real logo files, DOM order) ────────────────────
export interface PartnerLogo {
  name: string;
  href: string;
  image: string;
}

export const PARTNER_LOGOS: PartnerLogo[] = CONTRIBUTING_PARTNERS.map((p, i) => ({
  name: p.name,
  href: p.href,
  image: `/photos/vital-signs/partners/p${String(i + 1).padStart(2, '0')}.png`,
}));
