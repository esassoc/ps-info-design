// src/data/pages/indicators.ts — content for the Indicators unit (Progress
// module). Scraped verbatim 2026-07-17 from:
//   - https://www.pugetsoundinfo.wa.gov/Indicator/Index (page copy + the
//     86-row indicator listing, pulled from its IndexGridJsonData endpoint —
//     the ag-grid table is populated by client-side fetch, not present in the
//     static HTML)
//   - https://www.pugetsoundinfo.wa.gov/Indicator/Detail/32 (the exemplar
//     detail page: "Number of Southern Resident killer whales")
//
// Every string is verbatim from those pages (typos in source text, e.g. "it's
// Year Two" in the 2019 report blurb, are preserved as-is). Nothing here is
// invented. Where content could not be extracted (the chart's full 1973–2025
// numeric time series, embedded in a large Google Charts JSON config, and a
// few thin/empty cards — Datasets, Reporting Guidance) it is omitted; the
// narrative numbers that ARE quoted in "Key Vital Sign Indicator Results" are
// captured verbatim instead.
//
// RE-AUDIT 2026-07-22: content re-verified against
// https://qa.pugetsoundinfo.wa.gov/Indicator/Index + its
// /Indicator/IndexGridJsonData endpoint, which folded in QA-only regressions
// (title "Indicators", portal card 2 "Progress Indicators", 10 rows' topics
// emptied/reduced).
// RE-AUDIT 2026-07-23 (revision direction): the live www page is the source
// of truth — https://www.pugetsoundinfo.wa.gov/Indicator/Index carries what
// QA dropped, so the QA fold-in is reversed: page title "Puget Sound
// Indicators" (title bar, breadcrumb, <title> "PS Info | Puget Sound
// Indicators"); portal card 2 "Puget Sound Progress Indicators" (matching its
// own alt text); the 10 rows' Action Agenda Topics restored verbatim from the
// www grid DOM.
// Normalizations recorded: intro paragraphs each carry a trailing &nbsp; in
// QA source — stripped; QA's grid names for ids 2 and 4 carry a trailing
// space — normalized away (unchanged here, already trimmed); QA's portal
// hrefs use qa-vitalsigns.pugetsoundinfo.wa.gov / qa-progressindicators.
// pugetsoundinfo.wa.gov (its QA-environment subdomains) — kept as their prod-
// host equivalents, then routed internally to the built prototype pages (see
// PORTALS below).

export const SOURCE_URL = 'https://www.pugetsoundinfo.wa.gov/Indicator/Index';
export const PAGE_TITLE = 'Puget Sound Indicators'; // www title bar/breadcrumb/<title> (QA reads bare "Indicators"; www is source of truth).

// ── Intro copy (verbatim from the page body) ────────────────────────────────
export const INTRO_PARAGRAPH =
  "Puget Sound Partnership's system of indicators help us understand whether we are seeing short-term progress to achieve long-term Puget Sound recovery goals.";

export interface IndicatorTypeDefinition {
  /** The bold+underlined term in source copy. */
  term: string;
  /** Internal route the term links to — the same destination as its portal
   *  card below (revision direction 2026-07-23: the source underlines the
   *  terms without linking them; here they are real links, styled as links). */
  href: string;
  definition: string;
}

export const INDICATOR_TYPE_DEFINITIONS: IndicatorTypeDefinition[] = [
  {
    term: 'Vital Sign Indicators',
    href: '/prototypes/vital-signs',
    definition: 'measure the status and trends of ecosystem components over years and decades.',
  },
  {
    term: 'Progress Indicators',
    href: '/prototypes/progress-indicators',
    definition: 'measure human activities that influence ecosystem health (both positively and negatively) over years.',
  },
];

export const CLOSING_PARAGRAPH =
  'The data underlying this indicator system help the Partnership make data-informed recommendations to improve and accelerate recovery outcomes.';

// ── The two portal cards (psiButtonCards on the source page) ───────────────
export interface PortalCard {
  title: string;
  blurb: string;
  /** Root-relative internal route to the built prototype equivalent. QA's
      verbatim hrefs were https://qa-vitalsigns.pugetsoundinfo.wa.gov and
      https://qa-progressindicators.pugetsoundinfo.wa.gov (prod:
      vitalsigns./progressindicators.pugetsoundinfo.wa.gov) — internal-in-prod
      links, so no external mark; internal routing mirrors the grid's
      exemplar-row precedent. */
  href: string;
  /** Root-relative path into public/ — the source page's own portal image. */
  image: string;
  /** Verbatim alt text from the source page. */
  imageAlt: string;
}

// Each card is logo + title + blurb only (definitions live in the intro
// prose, not in these cards). Card 2's title is "Puget Sound Progress
// Indicators" per www 2026-07-23 (QA drops the "Puget Sound " prefix — QA-
// only regression, reversed with the rest of the 07-23 re-audit).
export const PORTALS: PortalCard[] = [
  {
    title: 'Vital Signs',
    blurb: 'Measures of ecosystem health and progress toward Puget Sound recovery goals',
    href: '/prototypes/vital-signs',
    image: '/logos/vital-signs-indicator-landing.png',
    imageAlt: 'An image representing the Vital Signs section of the application.',
  },
  {
    title: 'Puget Sound Progress Indicators',
    blurb: 'Measures of human activities that influence ecosystem health',
    href: '/prototypes/progress-indicators',
    image: '/logos/pi-logo-hexagon-only-2026-white-background.png',
    imageAlt: 'An image representing the Puget Sound Progress Indicators section of the application.',
  },
];

// ── The full indicator listing (86 rows, from IndexGridJsonData) ───────────
// Columns exported by the source grid: Indicator Type, Puget Sound Indicator,
// Reporting Organization, Vital Sign, Action Agenda Topics, 2022 Action
// Agenda Strategies. There is NO status column on the index — status
// (Indicator Progress / Target Status) only appears per-indicator on its own
// Detail page (captured for the exemplar below).
export type IndicatorKind = 'Vital Sign Indicator' | 'Progress Indicator';

export interface IndicatorTag {
  name: string;
  href: string;
}

export interface IndicatorRow {
  /** Numeric id parsed from the source /Indicator/Detail/{id} link. */
  id: number;
  type: IndicatorKind;
  name: string;
  /** Absolute URL to the indicator's real detail page on pugetsoundinfo.wa.gov.
      Every row resolves here EXCEPT the exemplar (id 32), which the build
      stage should route internally to the built prototype detail page. */
  detailUrl: string;
  org: string | null;
  orgHref: string | null;
  /** Vital Sign name — populated for Vital Sign Indicators only; Progress
      Indicators carry no Vital Sign in the source data. */
  vitalSign: string | null;
  topics: IndicatorTag[];
  /** "2022 Action Agenda Strategies" column — empty for most rows; a few
      Progress Indicators (and a handful of toxics/habitat Vital Sign
      Indicators) carry legacy 2022-cycle strategy tags. Preserved verbatim,
      including source duplicates within a single row. */
  strategies2022: IndicatorTag[];
}

// Topics re-synced to the live www grid DOM 2026-07-23, reversing the 2026-07-22 QA sync that emptied 9 rows and reduced id 114 — see contract.
export const INDICATORS: IndicatorRow[] = [
  { id: 121, type: 'Vital Sign Indicator', name: 'Abundance and biomass of benthic marine invertebrates', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/121', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Groundfish and Benthic Invertebrates', topics: [{ name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }], strategies2022: [] },
  { id: 120, type: 'Vital Sign Indicator', name: 'Abundance and biomass of groundfish', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/120', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Groundfish and Benthic Invertebrates', topics: [{ name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }], strategies2022: [] },
  { id: 3, type: 'Vital Sign Indicator', name: 'Abundance of marine bird populations', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/3', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Birds', topics: [{ name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [] },
  { id: 2, type: 'Vital Sign Indicator', name: 'Abundance of terrestrial bird populations', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/2', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Birds', topics: [{ name: '07 - Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' }], strategies2022: [] },
  { id: 176, type: 'Progress Indicator', name: 'All floodplain habitat acquisition', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/176', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }], strategies2022: [{ name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }] },
  { id: 143, type: 'Progress Indicator', name: 'All floodplains habitat restoration', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/143', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }], strategies2022: [{ name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }, { name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }] },
  { id: 172, type: 'Vital Sign Indicator', name: 'Annual average zooplankton biomass', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/172', org: 'University of Washington', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/17', vitalSign: 'Zooplankton', topics: [], strategies2022: [] },
  { id: 40, type: 'Vital Sign Indicator', name: 'Area of harvestable shellfish beds', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/40', org: 'Washington State Department of Health', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/11', vitalSign: 'Shellfish Beds', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [] },
  { id: 36, type: 'Vital Sign Indicator', name: 'Biomass of spawning Pacific Herring', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/36', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Forage Fish', topics: [{ name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [] },
  { id: 24, type: 'Vital Sign Indicator', name: 'Bivalve harvest for personal use', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/24', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Local Foods', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '04 - Shared Landscapes', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/04/Overview' }, { name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }], strategies2022: [] },
  { id: 166, type: 'Vital Sign Indicator', name: 'Changes in hydrologic regime in streams and rivers', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/166', org: null, orgHref: null, vitalSign: 'Streams and Floodplains', topics: [], strategies2022: [] },
  { id: 35, type: 'Vital Sign Indicator', name: 'Condition of swimming beaches', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/35', org: 'Washington State Department of Ecology', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/10', vitalSign: 'Outdoor Activity', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '04 - Shared Landscapes', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/04/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }], strategies2022: [] },
  { id: 47, type: 'Vital Sign Indicator', name: 'Contaminants in adult salmon', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/47', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Toxics in Aquatic Life', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '8 - Toxic Chemical Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/8' }] },
  { id: 129, type: 'Vital Sign Indicator', name: 'Contaminants in caged mussels', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/129', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Toxics in Aquatic Life', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '8 - Toxic Chemical Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/8' }] },
  { id: 48, type: 'Vital Sign Indicator', name: 'Contaminants in English sole', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/48', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Toxics in Aquatic Life', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '8 - Toxic Chemical Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/8' }] },
  { id: 49, type: 'Vital Sign Indicator', name: 'Contaminants in juvenile salmon', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/49', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Toxics in Aquatic Life', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '8 - Toxic Chemical Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/8' }] },
  { id: 50, type: 'Vital Sign Indicator', name: 'Contaminants in Pacific herring', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/50', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Toxics in Aquatic Life', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '8 - Toxic Chemical Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/8' }] },
  { id: 29, type: 'Vital Sign Indicator', name: 'Dissolved oxygen in marine water', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/29', org: 'Washington State Department of Ecology', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/10', vitalSign: 'Marine Water', topics: [], strategies2022: [] },
  { id: 157, type: 'Vital Sign Indicator', name: 'Drift cells in functional condition', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/157', org: null, orgHref: null, vitalSign: 'Beaches and Marine Vegetation', topics: [{ name: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }, { name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }, { name: '13 - Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview' }], strategies2022: [] },
  { id: 87, type: 'Vital Sign Indicator', name: 'Dungeness crab catch for personal use', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/87', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Local Foods', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '04 - Shared Landscapes', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/04/Overview' }, { name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }], strategies2022: [] },
  { id: 10, type: 'Vital Sign Indicator', name: 'Eelgrass Area', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/10', org: 'Washington State Department of Natural Resources', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/12', vitalSign: 'Beaches and Marine Vegetation', topics: [{ name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '16 - Submerged Aquatic Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/16' }] },
  { id: 180, type: 'Progress Indicator', name: 'Emergency response equipment funding', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/180', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '13 - Oil Spills', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/13' }] },
  { id: 8, type: 'Vital Sign Indicator', name: 'Employment in natural resource industries', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/8', org: 'Greene Economics, LLC', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/420', vitalSign: 'Economic Vitality', topics: [{ name: '06 - Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' }, { name: '07 - Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' }], strategies2022: [] },
  { id: 44, type: 'Vital Sign Indicator', name: 'Engagement in stewardship activities', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/44', org: 'Oregon State University', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8', vitalSign: 'Sound Stewardship', topics: [{ name: '04 - Shared Landscapes', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/04/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }], strategies2022: [{ name: '22 - Outdoor Recreation & Stewardship', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/22' }] },
  { id: 162, type: 'Vital Sign Indicator', name: 'Estuarine birds', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/162', org: null, orgHref: null, vitalSign: 'Birds', topics: [], strategies2022: [] },
  { id: 170, type: 'Progress Indicator', name: 'Estuarine/nearshore habitat acquisition', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/170', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }], strategies2022: [{ name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }, { name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }] },
  { id: 168, type: 'Progress Indicator', name: 'Estuarine/nearshore habitat restoration', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/168', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }], strategies2022: [{ name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }, { name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }] },
  { id: 118, type: 'Vital Sign Indicator', name: 'Estuary area in functional condition', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/118', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: 'Estuaries', topics: [{ name: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }, { name: '13 - Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview' }], strategies2022: [{ name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }] },
  { id: 1, type: 'Vital Sign Indicator', name: 'Exposure to impaired air quality', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/1', org: 'Washington State Department of Ecology', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/10', vitalSign: 'Air Quality', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }], strategies2022: [] },
  { id: 131, type: 'Vital Sign Indicator', name: 'Extent of forest cover in freshwater riparian zones', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/131', org: null, orgHref: null, vitalSign: 'Streams and Floodplains', topics: [], strategies2022: [] },
  { id: 117, type: 'Vital Sign Indicator', name: 'Extent of forest cover in nearshore marine riparian areas', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/117', org: null, orgHref: null, vitalSign: 'Beaches and Marine Vegetation', topics: [{ name: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }, { name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }, { name: '13 - Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview' }], strategies2022: [{ name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }] },
  { id: 119, type: 'Vital Sign Indicator', name: 'Extent of forest cover in the upper, middle, and lower areas of watersheds', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/119', org: null, orgHref: null, vitalSign: 'Forests and Wetlands', topics: [{ name: '07 - Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }], strategies2022: [{ name: '1 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/1' }] },
  { id: 181, type: 'Progress Indicator', name: 'Farmland conversion', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/181', org: null, orgHref: null, vitalSign: null, topics: [{ name: '06 - Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' }], strategies2022: [{ name: '2 - Working Lands', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/2' }] },
  { id: 182, type: 'Progress Indicator', name: 'Farmland protection', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/182', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '06 - Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' }], strategies2022: [{ name: '2 - Working Lands', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/2' }] },
  { id: 116, type: 'Vital Sign Indicator', name: 'Feeder bluffs in functional condition', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/116', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: 'Beaches and Marine Vegetation', topics: [{ name: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '13 - Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview' }], strategies2022: [{ name: '3 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/3' }] },
  { id: 115, type: 'Vital Sign Indicator', name: 'Floating kelp bed area', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/115', org: 'Washington State Department of Natural Resources', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/12', vitalSign: 'Beaches and Marine Vegetation', topics: [{ name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '16 - Submerged Aquatic Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/16' }] },
  { id: 14, type: 'Vital Sign Indicator', name: 'Floodplain function in large and small river systems', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/14', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: 'Streams and Floodplains', topics: [{ name: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }, { name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }, { name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }, { name: '12 - Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/12/Overview' }, { name: '13 - Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }], strategies2022: [{ name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }] },
  { id: 159, type: 'Vital Sign Indicator', name: 'Forest condition', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/159', org: null, orgHref: null, vitalSign: 'Forests and Wetlands', topics: [], strategies2022: [] },
  { id: 161, type: 'Vital Sign Indicator', name: 'Frequency of flood events', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/161', org: null, orgHref: null, vitalSign: 'Streams and Floodplains', topics: [], strategies2022: [] },
  { id: 16, type: 'Vital Sign Indicator', name: 'Freshwater Benthic Index of Biotic Integrity', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/16', org: 'King County', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/9', vitalSign: 'Freshwater', topics: [{ name: '07 - Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' }, { name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }, { name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }, { name: '12 - Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/12/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '17 - Forest Roads Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/17/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }], strategies2022: [] },
  { id: 18, type: 'Vital Sign Indicator', name: 'Good Governance Index', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/18', org: 'Oregon State University', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8', vitalSign: 'Good Governance', topics: [], strategies2022: [{ name: '23 - Good Governance', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/23' }] },
  { id: 188, type: 'Progress Indicator', name: 'Housing diversity', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/188', org: null, orgHref: null, vitalSign: null, topics: [{ name: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }], strategies2022: [{ name: '1 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/1' }] },
  { id: 88, type: 'Vital Sign Indicator', name: 'Index of Vulnerability for Elevated Nitrates in Groundwater', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/88', org: 'U.S. Geological Survey', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/354', vitalSign: 'Drinking Water', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '07 - Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' }, { name: '12 - Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/12/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '17 - Forest Roads Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/17/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }], strategies2022: [] },
  { id: 187, type: 'Progress Indicator', name: 'Infill development', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/187', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }], strategies2022: [{ name: '1 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/1' }] },
  { id: 23, type: 'Vital Sign Indicator', name: 'Locally harvestable foods', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/23', org: 'Oregon State University', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8', vitalSign: 'Local Foods', topics: [{ name: '01 - Abundant and Harvestable Salmon', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/01/Overview' }, { name: '04 - Shared Landscapes', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/04/Overview' }, { name: '06 - Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }], strategies2022: [] },
  { id: 113, type: 'Vital Sign Indicator', name: 'Marine Benthic Index', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/113', org: 'Washington State Department of Ecology', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/10', vitalSign: 'Marine Water', topics: [{ name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [] },
  { id: 112, type: 'Vital Sign Indicator', name: 'Marine water temperature', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/112', org: null, orgHref: null, vitalSign: 'Marine Water', topics: [], strategies2022: [] },
  { id: 165, type: 'Vital Sign Indicator', name: 'Miles of intertidal beach in functional condition', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/165', org: null, orgHref: null, vitalSign: 'Beaches and Marine Vegetation', topics: [], strategies2022: [] },
  { id: 9, type: 'Vital Sign Indicator', name: 'Natural resource industry output', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/9', org: 'Greene Economics, LLC', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/420', vitalSign: 'Economic Vitality', topics: [{ name: '06 - Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' }, { name: '07 - Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }], strategies2022: [] },
  { id: 33, type: 'Vital Sign Indicator', name: 'Nature-based recreation', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/33', org: 'Oregon State University', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8', vitalSign: 'Outdoor Activity', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '04 - Shared Landscapes', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/04/Overview' }, { name: '07 - Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' }, { name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }], strategies2022: [{ name: '22 - Outdoor Recreation & Stewardship', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/22' }] },
  { id: 34, type: 'Vital Sign Indicator', name: 'Nature-based work', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/34', org: 'Oregon State University', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8', vitalSign: 'Outdoor Activity', topics: [{ name: '01 - Abundant and Harvestable Salmon', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/01/Overview' }, { name: '04 - Shared Landscapes', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/04/Overview' }, { name: '07 - Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' }], strategies2022: [] },
  { id: 6, type: 'Vital Sign Indicator', name: 'Nitrate concentration in source water', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/6', org: 'Washington State Department of Health', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/11', vitalSign: 'Drinking Water', topics: [{ name: '02 - Human Health', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview' }, { name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '07 - Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' }, { name: '12 - Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/12/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '17 - Forest Roads Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/17/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }], strategies2022: [] },
  { id: 127, type: 'Vital Sign Indicator', name: 'Noise in marine water', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/127', org: null, orgHref: null, vitalSign: 'Marine Water', topics: [], strategies2022: [{ name: '17 - Responsible Boating', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/17' }] },
  { id: 130, type: 'Vital Sign Indicator', name: 'Number of accessible pocket estuaries and embayments', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/130', org: null, orgHref: null, vitalSign: 'Estuaries', topics: [{ name: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }, { name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }, { name: '13 - Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview' }], strategies2022: [{ name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }] },
  { id: 4, type: 'Vital Sign Indicator', name: 'Number of natural-origin Chinook salmon on spawning grounds', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/4', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Salmon', topics: [{ name: '01 - Abundant and Harvestable Salmon', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/01/Overview' }, { name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }, { name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }, { name: '12 - Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/12/Overview' }, { name: '13 - Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }], strategies2022: [] },
  { id: 125, type: 'Vital Sign Indicator', name: 'Number of natural-origin coho salmon on spawning grounds', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/125', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Salmon', topics: [{ name: '01 - Abundant and Harvestable Salmon', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/01/Overview' }, { name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }, { name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }, { name: '12 - Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/12/Overview' }, { name: '13 - Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }], strategies2022: [] },
  { id: 124, type: 'Vital Sign Indicator', name: 'Number of natural-origin Puget Sound steelhead on spawning grounds', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/124', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Salmon', topics: [{ name: '01 - Abundant and Harvestable Salmon', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/01/Overview' }, { name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }, { name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }, { name: '12 - Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/12/Overview' }, { name: '13 - Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }], strategies2022: [] },
  { id: 123, type: 'Vital Sign Indicator', name: 'Number of natural-origin summer chum salmon on spawning grounds', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/123', org: 'Washington Department of Fish and Wildlife', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', vitalSign: 'Salmon', topics: [{ name: '01 - Abundant and Harvestable Salmon', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/01/Overview' }, { name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }, { name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }, { name: '12 - Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/12/Overview' }, { name: '13 - Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }], strategies2022: [] },
  { id: 32, type: 'Vital Sign Indicator', name: 'Number of Southern Resident killer whales', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/32', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: 'Orcas', topics: [{ name: '01 - Abundant and Harvestable Salmon', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/01/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [] },
  { id: 111, type: 'Vital Sign Indicator', name: 'Nutrient balance in marine water', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/111', org: null, orgHref: null, vitalSign: 'Marine Water', topics: [], strategies2022: [{ name: '11 - Wastewater Systems', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/11' }, { name: '12 - Working Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/12' }] },
  { id: 109, type: 'Vital Sign Indicator', name: 'Nutrient concentration in streams and rivers', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/109', org: null, orgHref: null, vitalSign: 'Freshwater', topics: [], strategies2022: [] },
  { id: 122, type: 'Vital Sign Indicator', name: 'Occupancy/residency of orcas in Puget Sound', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/122', org: null, orgHref: null, vitalSign: 'Orcas', topics: [], strategies2022: [] },
  { id: 110, type: 'Vital Sign Indicator', name: 'Ocean acidification', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/110', org: null, orgHref: null, vitalSign: 'Marine Water', topics: [], strategies2022: [] },
  { id: 152, type: 'Progress Indicator', name: 'Oil spills', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/152', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '13 - Oil Spills', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/13' }] },
  { id: 178, type: 'Progress Indicator', name: 'On-site sewage system compliance', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/178', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }], strategies2022: [{ name: '11 - Wastewater Systems', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/11' }] },
  { id: 179, type: 'Progress Indicator', name: 'On-site sewage system failures', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/179', org: null, orgHref: null, vitalSign: null, topics: [{ name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }], strategies2022: [{ name: '11 - Wastewater Systems', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/11' }] },
  { id: 177, type: 'Progress Indicator', name: 'On-site sewage system inventory: known systems', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/177', org: null, orgHref: null, vitalSign: null, topics: [{ name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }], strategies2022: [{ name: '11 - Wastewater Systems', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/11' }] },
  { id: 37, type: 'Vital Sign Indicator', name: 'Overall life satisfaction', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/37', org: 'Oregon State University', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8', vitalSign: 'Sense of Place', topics: [], strategies2022: [] },
  { id: 5, type: 'Vital Sign Indicator', name: 'Participation in cultural practices', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/5', org: 'Oregon State University', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8', vitalSign: 'Cultural Wellbeing', topics: [{ name: '01 - Abundant and Harvestable Salmon', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/01/Overview' }, { name: '04 - Shared Landscapes', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/04/Overview' }, { name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }], strategies2022: [] },
  { id: 7, type: 'Vital Sign Indicator', name: 'Percent of employment in natural resource industries', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/7', org: 'Greene Economics, LLC', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/420', vitalSign: 'Economic Vitality', topics: [{ name: '06 - Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' }, { name: '07 - Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' }], strategies2022: [] },
  { id: 128, type: 'Vital Sign Indicator', name: 'Primary production in marine water', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/128', org: null, orgHref: null, vitalSign: 'Marine Water', topics: [], strategies2022: [] },
  { id: 38, type: 'Vital Sign Indicator', name: 'Psychological Wellbeing Index', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/38', org: 'Oregon State University', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8', vitalSign: 'Sense of Place', topics: [], strategies2022: [] },
  { id: 163, type: 'Vital Sign Indicator', name: 'Regional index of the stock presence and health of forage fish species', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/163', org: null, orgHref: null, vitalSign: 'Forage Fish', topics: [], strategies2022: [] },
  { id: 175, type: 'Progress Indicator', name: 'Riparian habitat acquisition', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/175', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }], strategies2022: [{ name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }] },
  { id: 169, type: 'Progress Indicator', name: 'Riparian habitat restoration', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/169', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }], strategies2022: [{ name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }, { name: '5 - Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' }] },
  { id: 126, type: 'Vital Sign Indicator', name: 'Seasonal average zooplankton biomass', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/126', org: 'University of Washington', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/17', vitalSign: 'Zooplankton', topics: [], strategies2022: [] },
  { id: 27, type: 'Vital Sign Indicator', name: 'Sediment Chemistry Index', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/27', org: 'Washington State Department of Ecology', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/10', vitalSign: 'Marine Water', topics: [{ name: '03 - Toxic Chemical Prevention', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview' }, { name: '15 - Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' }, { name: '16 - Agricultural Lands Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview' }, { name: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }, { name: '19 - Wastewater Treatment Plants', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [] },
  { id: 39, type: 'Vital Sign Indicator', name: 'Sense of Place Index', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/39', org: 'Oregon State University', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8', vitalSign: 'Sense of Place', topics: [{ name: '04 - Shared Landscapes', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/04/Overview' }, { name: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }, { name: '06 - Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' }], strategies2022: [{ name: '21 - Place Attachment', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/21' }] },
  { id: 114, type: 'Vital Sign Indicator', name: 'Short and long-term change at eelgrass sites', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/114', org: 'Washington State Department of Natural Resources', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/12', vitalSign: 'Beaches and Marine Vegetation', topics: [{ name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '16 - Submerged Aquatic Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/16' }] },
  { id: 45, type: 'Vital Sign Indicator', name: 'Sound Behavior Index', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/45', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: 'Sound Stewardship', topics: [{ name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [{ name: '22 - Outdoor Recreation & Stewardship', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/22' }] },
  { id: 46, type: 'Vital Sign Indicator', name: 'Summer low flow in streams and rivers', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/46', org: 'Washington State Department of Ecology', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/10', vitalSign: 'Streams and Floodplains', topics: [{ name: '12 - Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/12/Overview' }], strategies2022: [{ name: '7 - Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/7' }] },
  { id: 158, type: 'Vital Sign Indicator', name: 'Understory kelp abundance and condition', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/158', org: null, orgHref: null, vitalSign: 'Beaches and Marine Vegetation', topics: [{ name: '08 - Marine Vegetation', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview' }, { name: '09 - Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' }, { name: '14 - Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview' }, { name: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }], strategies2022: [] },
  { id: 186, type: 'Progress Indicator', name: 'Urban growth', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/186', org: 'Puget Sound Partnership', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', vitalSign: null, topics: [{ name: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }], strategies2022: [{ name: '1 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/1' }] },
  { id: 108, type: 'Vital Sign Indicator', name: 'Water temperature in streams and rivers', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/108', org: null, orgHref: null, vitalSign: 'Freshwater', topics: [], strategies2022: [{ name: '4 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' }] },
  { id: 160, type: 'Vital Sign Indicator', name: 'Wetlands extent and condition', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/160', org: null, orgHref: null, vitalSign: 'Forests and Wetlands', topics: [], strategies2022: [] },
  { id: 132, type: 'Vital Sign Indicator', name: 'Zooplankton Index', detailUrl: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/132', org: 'University of Washington', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/17', vitalSign: 'Zooplankton', topics: [], strategies2022: [] },
];
// ── Derived counts (computed from the real rows above — nothing invented) ──
export const TOTAL_INDICATORS = INDICATORS.length;
export const VITAL_SIGN_INDICATORS = INDICATORS.filter((i) => i.type === 'Vital Sign Indicator');
export const PROGRESS_INDICATORS = INDICATORS.filter((i) => i.type === 'Progress Indicator');
export const VITAL_SIGNS_COVERED = Array.from(
  new Set(VITAL_SIGN_INDICATORS.map((i) => i.vitalSign).filter((v): v is string => !!v)),
);

/** Vital Sign Indicators grouped by Vital Sign, in first-seen order. */
export function groupByVitalSign(rows: IndicatorRow[]): { vitalSign: string; indicators: IndicatorRow[] }[] {
  const order: string[] = [];
  const map = new Map<string, IndicatorRow[]>();
  for (const row of rows) {
    if (!row.vitalSign) continue;
    if (!map.has(row.vitalSign)) {
      map.set(row.vitalSign, []);
      order.push(row.vitalSign);
    }
    map.get(row.vitalSign)!.push(row);
  }
  return order.map((vitalSign) => ({ vitalSign, indicators: map.get(vitalSign)! }));
}

// ── Index grid chrome (verbatim from the source page's ag-grid setup) ───────
// Column headers, in source column order; colIds mirror the source's field
// names (also used as its CSV columnKeys).
export const GRID_COLUMNS = [
  { colId: 'IndicatorType', header: 'Indicator Type' },
  { colId: 'PugetSoundIndicator', header: 'Puget Sound Indicator' },
  { colId: 'ReportingOrganization', header: 'Reporting Organization' },
  { colId: 'VitalSign', header: 'Vital Sign' },
  { colId: 'ActionAgendaTopics', header: 'Action Agenda Topics' },
  { colId: 'ActionAgendaStrategies_2022', header: '2022 Action Agenda Strategies' },
] as const;

/** Toolbar row-count line, verbatim template from the source page. */
export const gridRowCountText = (shown: number, total: number): string =>
  `Currently Viewing ${shown} out of ${total} Indicators`;
export const GRID_CLEAR_FILTERS_LABEL = '(clear filters)';
export const GRID_DOWNLOAD_LABEL = 'Download Table';
/** Source exports as 'pugetSoundIndicatorsGrid' + 'Export'. */
export const GRID_EXPORT_FILE_NAME = 'pugetSoundIndicatorsGridExport';
export const GRID_EMPTY_MESSAGE = 'No records available'; // QA #pugetSoundIndicatorsGridEmptyMessageDivID text

// ── The exemplar: Indicator/Detail/32 ───────────────────────────────────────
// "Number of Southern Resident killer whales" — a Vital Sign Indicator under
// Orcas / Thriving Species and Food Web. Content below is verbatim from
// https://www.pugetsoundinfo.wa.gov/Indicator/Detail/32.

export const EXEMPLAR_ID = 32;
export const EXEMPLAR_SLUG = 'number-of-southern-resident-killer-whales';
/** Route the build stage should give the exemplar's built detail page. */
export const EXEMPLAR_ROUTE = `/prototypes/indicators/${EXEMPLAR_SLUG}`;

export interface ExemplarLink {
  text: string;
  href: string;
}

export interface ExemplarBasics {
  ecosystemRecoveryGoal: string;
  vitalSign: string;
  vitalSignHref: string;
  indicatorName: string;
  indicatorType: string;
  measurementUnit: string;
  /** "Indicator Progress" icon label. */
  indicatorProgress: string;
  /** "Target Status" icon label. */
  targetStatus: string;
  targetParagraphs: string[];
  targetLinks: ExemplarLink[];
  reporter: { name: string; email: string; org: string; orgHref: string };
  contributingPartners: { name: string; href: string }[];
  lastUpdated: string;
}

export const EXEMPLAR_BASICS: ExemplarBasics = {
  ecosystemRecoveryGoal: 'Thriving Species and Food Web',
  vitalSign: 'Orcas',
  vitalSignHref: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/19',
  indicatorName: 'Number of Southern Resident killer whales',
  indicatorType: 'Vital Sign Indicator',
  measurementUnit: 'Each Unit (number)',
  indicatorProgress: 'Getting Worse',
  targetStatus: 'Below Target',
  targetParagraphs: [
    'By 2030, increase the Southern Resident killer whale population from 74 individual whales in 2021 to 86 individuals.',
    'By 2050, increase the population to 110 individuals.',
  ],
  targetLinks: [
    { text: 'Target fact sheet', href: 'https://pspwa.box.com/s/fjl0vl84fbnctk1swvbn6mkovdd2fkot' },
    { text: 'Memo to Science Panel with rationale', href: 'https://pspwa.box.com/s/eqz47vp81hwcv84najsrxk4t5q74rbk7' },
  ],
  reporter: {
    name: 'Kenna Kuhn',
    email: 'kenna.kuhn@psp.wa.gov',
    org: 'Puget Sound Partnership',
    orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2',
  },
  contributingPartners: [
    { name: 'Center for Whale Research', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/6' },
    { name: 'National Oceanic and Atmospheric Administration', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/372' },
  ],
  lastUpdated: '11/05/2025 19:29:05',
};

export interface ExemplarMap {
  /** public/ path of the downloaded, resized map image. */
  imagePath: string;
  imageAlt: string;
  caption: string;
  overviewLink: ExemplarLink;
}

export const EXEMPLAR_MAP: ExemplarMap = {
  imagePath: '/photos/indicators/srkw-critical-habitat-map.jpg',
  imageAlt: 'Map of Southern Resident killer whale critical habitat in Washington and northern Oregon, showing inland waters and expanded coastal waters designated under the 2021 federal rule.',
  caption:
    'NOAA Fisheries revised the critical habitat designation for Southern Resident killer whales in 2021. The final rule maintains the previously designated critical habitat in inland waters of Washington and expands it to include certain coastal waters off Washington, Oregon, and California. This map shows a detailed view of the critical habitat in Washington and northern Oregon. Click the link below for an overview map of the full extent of Southern Resident killer whale critical habitat.',
  overviewLink: {
    text: '2021 Map Overview - Existing and Proposed Critical Habitat',
    href: 'https://media.fisheries.noaa.gov/2021-07/map-srkw-ch-overview-fedreg-final7.pdf?null=',
  },
};

export const EXEMPLAR_DESCRIPTION =
  'Southern Resident killer whales are a unique population of orcas that ranges in the Salish Sea and along the West Coast of the U.S. and Canada. They range in three pods known as J, K and L from California to Alaska in pursuit of fish, primarily adult Pacific salmon. In the late-1990s, Southern Resident killer whales experienced a dramatic decline. The combination of a precarious food supply and threats from pollution, vessel traffic, and noise continues to jeopardize their survival. As a result, they are federally listed as endangered.';

export interface ExemplarChart {
  heading: string;
  legendTitle: string;
  xAxisTitle: string;
  /** "Subcategories" table on the source page — the chart's pod breakdown. */
  subcategoryOptions: string[];
  caption: string;
}

export const EXEMPLAR_CHART: ExemplarChart = {
  heading: 'Vital Sign Indicator Chart',
  legendTitle: 'Pods',
  xAxisTitle: 'Census year',
  subcategoryOptions: ['K pod', 'J pod', 'L pod', 'All pods'],
  caption:
    'Population size of Southern Resident killer whales each year between 1973 and 2025, based on the annual July census, conducted by the Center for Whale Research. The Southern Resident Killer Whale population in Puget Sound is comprised of three pods: J, K, and L pods.',
};

export const EXEMPLAR_IMPORTANCE: string[] = [
  'Killer whales, also called orcas, are among Puget Sound’s most distinctive and charismatic inhabitants. They occupy an important niche at the top of the food web. Orcas are very important culturally and economically for the region.',
  'Southern Resident killer whales are a unique population of orcas that ranges in the Salish Sea and along the West Coast of the U.S. and Canada. These whales eat fish and depend heavily on Chinook salmon for food. In the late-1990s, Southern Resident killer whales experienced a dramatic decline. The combination of a precarious food supply and threats from pollution, vessel traffic, and noise continues to jeopardize their survival. As a result, they are federally listed as endangered.',
  'The Southern Resident Killer Whale population in Puget Sound is actually a large extended family, or clan, comprised of three pods: J, K, and L pods. Although they can be seen throughout the year in Puget Sound, they are most often seen during the summer, especially in Haro Strait west of San Juan Island, the Strait of Juan de Fuca, and in the Strait of Georgia near the Fraser River and in the fall in Puget Sound.',
  'Resident orcas were chosen as an indicator because they are top-level predators, spend a portion of the year in Puget Sound to feed and socialize, consume prey species that originate in Puget Sound, and are threatened by some of the pressures on the Sound, such as pollution, vessel traffic, and declining salmon and herring runs. Although a robust orca population is an important recovery goal both at the state and federal levels, there may be limits to how much the orca indicator can tell us about the overall health of Puget Sound. The Southern Resident Killer Whale population migrates in and out of the area, and thus is not entirely dependent on Puget Sound and its resources.',
  'Other populations of whales, such as Transients (Bigg’s) killer whale and Northern Resident killer whales, also frequent the Salish Sea, but their numbers are not reported here because the indicator and target focus only on Southern Resident killer whales.',
];

export interface ExemplarKeyResults {
  intro: string;
  provisionalUpdate: { label: string; bullets: string[] };
  pastResults: { label: string; bullets: string[] };
  links: ExemplarLink[];
}

export const EXEMPLAR_KEY_RESULTS: ExemplarKeyResults = {
  intro:
    'The status of the Southern Resident killer whale population remains fragile. In 2010, the Partnership’s baseline reference, the census reported 86 individuals. Every year since then the population size has been smaller, except in 2011.',
  provisionalUpdate: {
    label: 'Provisional Update (November, 2025):',
    bullets: [
      'The July 2025 census led by the Center for Whale Research reported 74 whales.',
      'This census reported 27 whales in J pod, 14 whales in K pod, and 33 whales in L pod.',
      'Additional information, authored by our partners at NOAA, will be available soon.',
    ],
  },
  pastResults: {
    label: 'Past Indicator Results:',
    bullets: [
      'Between the 2023 census and the 2024 census, the Southern Resident killer whale population decreased in size from 75 individuals to 73 individuals. This is the result of 2 deaths (K34, L85). J pod had one birth (J60); however, this male calf did not survive. There are currently 15 whales in K pod, 25 whales in J pod and 33 whales in L pod.',
      'The status of this endangered population continues to signal a struggle for survival. Until 2022, K pod, the smallest of the three pods, had not had a calf born since 2011. A significant level of unsuccessful pregnancies (75% on average) point to lack of adequate food as a main stressor. Finally, nearly half of the calves do not survive to maturity.',
      'The combination of a precarious food supply, exposure to pollution, and disturbance from noise and vessel traffic continues to jeopardize Southern Resident killer whale survival. As a result, they are federally listed as endangered. The health of individual whales is also an important factor which drives reproduction and survival and the small population size puts the Southern Residents at risk from genetic inbreeding.',
      'Recovery of the population depends on increasing availability and access to its main prey—Chinook salmon populations in the Salish Sea and along the West Coast. Puget Sound Chinook salmon is a threatened population and the subject of many recovery actions.',
    ],
  },
  links: [
    { text: 'Chinook salmon populations', href: 'https://www.pugetsoundinfo.wa.gov/VitalSign/Detail/18' },
    { text: 'recovery actions', href: 'https://www.psp.wa.gov/salmon-recovery-overview.php' },
  ],
};

export interface ExemplarMethods {
  monitoringProgram: { text: string; linkText: string; href: string };
  dataSource: { text: string; linkText: string; href: string };
  paragraphs: string[];
  links: ExemplarLink[];
}

export const EXEMPLAR_METHODS: ExemplarMethods = {
  monitoringProgram: {
    text: 'Center for Whale Research',
    linkText: 'Orca Survey',
    href: 'https://www.whaleresearch.com/orcasurvey',
  },
  dataSource: {
    text: 'Annual Census as reported to National Oceanographic and Atmospheric Administration (NOAA) by the',
    linkText: 'Center for Whale Research',
    href: 'https://www.whaleresearch.com/orca-population',
  },
  paragraphs: [
    'The census of the Southern Resident killer whale population, conducted annually by the Center for Whale Research, is an important method by which to assess the status and trends of this endangered population. The entire population is counted with a high degree of certainty using photo-identification techniques. Sighting networks throughout Puget Sound including Orca Network, the Whale Museum, and the Pacific Whale Watch Association, as well as the research community, report sightings and support the census.',
    'Other populations of whales, such as Transients (Bigg\'s) killer whales and Northern Resident killer whales, also frequent the Salish Sea, but their numbers are not reported here because the indicator and target focus only on Southern Resident killer whales.',
  ],
  links: [
    { text: 'Center for Whale Research', href: 'https://www.whaleresearch.com/' },
    { text: 'Orca Network', href: 'http://www.orcanetwork.org/Main/' },
    { text: 'Whale Museum', href: 'https://whalemuseum.org/' },
    { text: 'Pacific Whale Watch Association', href: 'https://www.pacificwhalewatchassociation.com/' },
  ],
};

export interface ExemplarInterpretation {
  paragraphs: string[];
  quote: { leadIn: string; leadInHref: string; text: string };
  links: ExemplarLink[];
  subsections: { heading: string; paragraph: string; links: ExemplarLink[] }[];
}

export const EXEMPLAR_INTERPRETATION: ExemplarInterpretation = {
  paragraphs: [
    'The combination of a precarious food supply, exposure to pollution, and disturbance from noise and vessel traffic continues to jeopardize Southern Resident killer whale survival. As a result, they are federally listed as endangered. The health of individual whales is also an important factor which drives reproduction and survival and the small population size puts the Southern Residents at risk from genetic inbreeding.',
    'On March 14, 2018, the governor signed Executive Order 18-02 designating state agencies to take several immediate actions to benefit Southern Residents, and establishing a task force to develop longer-term action recommendations for orca recovery and future sustainability. The governor invited members of the Legislature, the Government of Canada, representatives from tribal, federal, local and other state governments, the private sector and the non-profit sector to participate in the task force. The task force also includes designees from the lead state agencies, Washington Department of Fish and Wildlife and Puget Sound Partnership, and from multiple other state agencies.',
  ],
  quote: {
    leadIn: 'From the Orca Task Force November 2018 report:',
    leadInHref: 'https://www.governor.wa.gov/sites/default/files/OrcaTaskForce_reportandrecommendations_11.16.18.pdf',
    text:
      'In addition to these three key threats, climate change and ocean acidification are overarching threats that will exacerbate current stresses on the Southern Residents, primarily through the food web as warmer stream and ocean temperatures, lower summer stream flows, heavier winter rainstorms and sea-level rise impact salmon, forage fish and the entire ecosystem that orcas rely upon.',
  },
  links: [
    { text: 'Executive Order 18-02', href: 'https://www.governor.wa.gov/sites/default/files/exe_order/eo_18-02_1.pdf' },
  ],
  subsections: [
    {
      heading: '2019 - final report and recommendations',
      paragraph:
        "On November 8, 2019, the task force released it's Year Two final comprehensive report and recommendations for recovering Southern Residents. The task force shared the details of their final recommendations at a press conference on November 8, 2019.",
      links: [
        {
          text: 'final comprehensive report and recommendations',
          href: 'https://www.governor.wa.gov/sites/default/files/OrcaTaskForce_FinalReportandRecommendations_11.07.19.pdf',
        },
      ],
    },
    {
      heading: '2018 - final report and recommendations',
      paragraph:
        'On November 16, 2018, the task force released its Year One final comprehensive report and recommendations for recovering Southern Residents. The report details potential options to address the major threats to Southern Residents, including prey availability, toxic contaminants and disturbance from noise and vessel traffic.',
      links: [
        {
          text: 'final comprehensive report and recommendations',
          href: 'https://www.governor.wa.gov/sites/default/files/OrcaTaskForce_reportandrecommendations_11.16.18.pdf',
        },
      ],
    },
  ],
};

export interface ExemplarReference {
  citation: string;
  linkText: string;
  href: string;
}

export interface ExemplarAdditionalInformation {
  externalLinks: ExemplarLink[];
  references: ExemplarReference[];
}

export const EXEMPLAR_ADDITIONAL_INFORMATION: ExemplarAdditionalInformation = {
  externalLinks: [
    { text: "Southern Resident Task Force, Governor's Office", href: 'https://www.governor.wa.gov/issues/issues/energy-environment/southern-resident-orca-recovery/task-force' },
    { text: 'NOAA Fisheries Species in the Spotlight: Southern Resident Killer Whale', href: 'https://www.fisheries.noaa.gov/species/killer-whale#spotlight' },
    { text: 'Center for Whale Research', href: 'https://www.whaleresearch.com/' },
    { text: 'Orca Network', href: 'http://www.orcanetwork.org/Main/' },
    { text: 'Orca Behavior Institute', href: 'https://orcabehaviorinstitute.org/' },
  ],
  references: [
    {
      citation:
        'Lacy, R.C., R. Williams, E. Ashe, K. Balcomb III, L.J.N. Brent, C.W. Clark, D.P. Croft, D.A. Giles, M. MacDuffee & Paul C.Paquet. 2017. Evaluating anthropogenic threats to endangered killer whales to inform effective recovery plans. Scientific Reports 7:14119.',
      linkText: 'Scientific Reports 7:14119',
      href: 'https://rdcu.be/5AGI',
    },
    {
      citation:
        'NOAA Fisheries West Coast Region and Washington Department of Fish and Wildlife. 2018. Southern Resident Killer Whale Priority Chinook Stocks Report.',
      linkText: 'Southern Resident Killer Whale Priority Chinook Stocks Report',
      href: 'https://www.fisheries.noaa.gov/west-coast/endangered-species-conservation/southern-resident-killer-whale-priority-chinook-salmon',
    },
    {
      citation:
        'Pacific Fishery Management Council. 2020. Pacific Fishery Management Council Salmon Fishery Management Plan Impacts to Southern Resident Killer Whales: Risk Assessment. Ad-Hoc Southern Resident Killer Whale Workgroup, May 2020. SRKW Workgroup Report 1.',
      linkText: 'SRKW Workgroup Report 1',
      href: 'https://www.pcouncil.org/documents/2020/05/e-2-srkw-workgroup-report-1-pacific-fishery-management-council-salmon-fishery-management-plan-impacts-to-southern-resident-killer-whales-risk-assessment-electronic-only.pdf/',
    },
    {
      citation:
        'Wasser, S. K., J.I. Lundin, K. Ayres, E. Seely, D. Giles, K. Balcomb, J. Hempelmann, K. Parsons, R. Booth. 2017. Population growth is limited by nutritional impacts on pregnancy success in endangered Southern Resident killer whales (Orcinus orca). PLoS One 12, e0179824 (2017).',
      linkText: 'PLoS One 12, e0179824 (2017)',
      href: 'https://dx.plos.org/10.1371/journal.pone.0179824',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// SECOND EXEMPLAR — "Farmland protection" (Progress Indicator 182).
// Directed reproduction of https://www.pugetsoundinfo.wa.gov/Indicator/Detail/182
// (fetched 2026-07-23). Every string verbatim from the source DOM, including
// its own quirks (the "Reference period: 2021 through 2021" line, the
// 188-vs-201 parcel-count inconsistency, "2014 and 2024" in Key Results) —
// nothing normalized. Chart figures are the source's OWN images: one
// FileResource download plus six base64-embedded PNGs decoded to
// public/photos/indicators/farmland/, each carrying the source's full
// descriptive alt text. Footnote markers ([1]…[3]) stay inline in their
// paragraphs; the footnote bodies render at the card foot (source's own
// #_ftn anchor convention flattened to same-card footnotes).
// ═══════════════════════════════════════════════════════════════════════════

/** One inline run of rich Progress Indicator detail text. */
export interface PiRun {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  href?: string;
}

/** One block in a Progress Indicator detail card's content stream. */
export type PiBlock =
  | { kind: 'p'; runs: PiRun[] }
  | { kind: 'label'; text: string }
  | { kind: 'bullets'; items: PiRun[][] }
  | { kind: 'figure'; src: string; alt: string; caption: string }
  | { kind: 'icon'; src: string; alt: string }
  | { kind: 'footnote'; runs: PiRun[] };

export const FARMLAND_ID = 182;
export const FARMLAND_SLUG = 'farmland-protection';
export const FARMLAND_ROUTE = `/prototypes/indicators/${FARMLAND_SLUG}`;

export interface FarmlandBasics {
  indicatorName: string;
  indicatorType: string;
  measurementUnit: string;
  progressLabel: string;
  progressIcon: { src: string; alt: string };
  statusLabel: string;
  statusIcon: { src: string; alt: string };
  /** "Progress Indicator Target" row — empty on the source page. */
  target: string | null;
  topics: { text: string; href: string }[];
  reporter: { name: string; email: string; org: string; orgHref: string };
  /** Source renders partner names as links to their Organization pages. */
  contributingPartners: { name: string; href: string }[];
  lastUpdated: string;
}

export const FARMLAND_BASICS: FarmlandBasics = {
  indicatorName: 'Farmland protection',
  indicatorType: 'Progress Indicator',
  measurementUnit: 'Acre (acres)',
  progressLabel: 'Getting Worse',
  progressIcon: {
    src: '/photos/indicators/farmland/progress-gettingworse.png',
    alt: 'An image representing the progress of a Progress Indicator. Display name of the progress: Getting Worse',
  },
  statusLabel: 'No Target',
  statusIcon: {
    src: '/photos/indicators/farmland/status-notarget.png',
    alt: 'An image representing the status of a Progress Indicator. Display name of the status: No Target',
  },
  target: null,
  topics: [
    { text: 'Agricultural Land Protection', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/2' },
  ],
  reporter: {
    name: 'Laura Vary',
    email: 'laura.vary@psp.wa.gov',
    org: 'Puget Sound Partnership',
    orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2',
  },
  contributingPartners: [
    { name: 'American Farmland Trust', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/343' },
    { name: 'Blue Water GIS', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/559' },
    { name: 'Rivershed SPC', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/553' },
    { name: 'Washington State Conservation Commission', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/114' },
  ],
  lastUpdated: '11/07/2025 16:02:08',
};

/** Related Ongoing Programs — bulleted program links with their (org) suffix. */
export const FARMLAND_RELATED_PROGRAMS: PiRun[][] = [
  [
    { text: 'Agricultural Conservation Easement Program', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/98/Overview' },
    { text: ' (' },
    { text: 'USDA NRCS', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/86' },
    { text: ')' },
  ],
  [
    { text: 'Office of Farmland Preservation (OFP)', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/161/Overview' },
    { text: ' (' },
    { text: 'SCC', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/114' },
    { text: ')' },
  ],
  [
    { text: 'Puget Sound Conservation Districts (12)', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/158/Overview' },
    { text: ' (' },
    { text: 'SCC', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/114' },
    { text: ')' },
  ],
];

export const FARMLAND_CHART: PiBlock[] = [
  {
    kind: 'figure',
    src: '/photos/indicators/farmland/fig1-acres-by-reporting-period.png',
    alt: 'P2_AcresProtectedbyReportingPeriod.png',
    caption: 'Figure 1. Acres of farmland permanently protected through conservation easements in Puget Sound by two-year period between 2014 through 2023.',
  },
];

export const FARMLAND_DESCRIPTION: PiBlock[] = [
  { kind: 'p', runs: [{ text: 'This indicator measures the acres of farmland permanently protected from development through agricultural or conservation easements. Farmlands can provide wildlife habitat, reduce air pollution, and mitigate the spread of urban heat islands while providing quality, locally sourced foods. Protecting farmlands can help slow the conversion of farmlands to non-agricultural uses, though conservation easements do not increase the amount of farmland actively used nor ensure that the land produces crops in the future. This indicator can help us understand progress expanding the protection of farmland across the region.' }] },
];

export const FARMLAND_IMPORTANCE: PiBlock[] = [
  { kind: 'p', runs: [{ text: 'Conversion of farmland poses a major challenge to the health of Puget Sound and its communities. The loss of these important lands can undermine local and regional food security, reduce resilience to climate change, and disrupt wildlife habitats. Conservation easements – agreements which restrict the allowed uses on land and support landowners financially – play a critical role in protecting land from conversion. Agricultural easements and other types of conservation easements offer environmental, ecological, or scenic protections, which can benefit farming, habitat biodiversity, and the long-term viability of agricultural lands.' }] },
  { kind: 'p', runs: [
    { text: 'Agriculture in Puget Sound contributes markedly to the local economy and to food supply around the nation. Whatcom County grows more than 65 percent of the nation’s frozen red raspberry supply, while Skagit County contributes roughly 90 percent of all red potatoes grown in Washington state' },
    { text: '[1]', href: '#farmland-importance-ftn1' },
    { text: '. Counties with smaller agriculture footprints still contribute valuable meats, fruits, and vegetables to local markets. While the Puget Sound region boasts a vibrant local food scene, farmers are facing challenges that impact the sustainability and viability of agriculture ventures.' },
  ] },
  { kind: 'p', runs: [{ text: 'The Farmland Protection Progress Indicator combines federal, state, and local data sources on protected lands to measure the amount and rate of farmland protection through conservation easements in the Puget Sound region. Conservation easements are considered the most permanent form of protection afforded to a parcel of land. The indicator does not capture other types of protection offered through mechanisms like zoning, agricultural buffers, right-to-farm ordinances, local or state farmland mitigation requirements, and cluster or conservation development regulations. These additional mechanisms offer some protection but are often inconsistently enforced and less protective than easements.' }] },
  { kind: 'p', runs: [{ text: 'Conservation easements are not a silver bullet for protecting farmland. Farmland protection through conservation easements does not increase the land available for crop production, it maintains it. Once farmland is developed, it often cannot be regained, and farmland conversion is outpacing farmland protection. Easements also do not ensure that managing farmers will always have the interest and work force required to farm the land. Climate change, water availability, crop disease, and access to labor and food processing infrastructure are just a few factors that impact a farmer’s ability to maintain their land and business sustainably. While land may be protected with easements, additional strategies must be enacted across Puget Sound to support the viability of agriculture businesses.' }] },
  { kind: 'p', runs: [{ text: 'Despite these caveats, this indicator offers one way that local jurisdictions and the Puget Sound recovery community can evaluate progress towards permanently protecting its critical agricultural land. This indicator can help illuminate drivers of and challenges to protecting farmland for our communities and future generations. Complementary economic and social analyses would offer additional insights into trends in farmland protection and conversion in Puget Sound.' }] },
  { kind: 'footnote', runs: [
    { text: '[1]', href: '#farmland-importance-ftn1' },
    { text: ' Washington State University Extension (n.d.). ' },
    { text: 'Agriculture | Skagit County Extension. ', italic: true },
    { text: 'Retrieved March 16, 2025, from ' },
    { text: 'https://extension.wsu.edu/skagit/agriculture/', href: 'https://extension.wsu.edu/skagit/agriculture/' },
    { text: '.' },
  ] },
];

export const FARMLAND_KEY_RESULTS: PiBlock[] = [
  { kind: 'p', runs: [{ text: 'A substantial acreage of farmland was permanently protected through easements prior to 2013. In 2022 and 2023, the region protected 811 fewer acres of farmland than during the previous reporting period (2020-2021). The region is thus not making progress increasing the rate of farmland protected and this indicator is “getting worse”.', bold: true }] },
  { kind: 'p', runs: [{ text: 'As of 2023, 55,364 total acres of farmland have been protected through easements across all years in Puget Sound.' }] },
  { kind: 'p', runs: [{ text: 'Total acres of farmland protected vary markedly by county and two-year reporting period between 2014 through 2023. The majority of protected farmland was enrolled in easements in 2013 and prior (40,902 acres).' }] },
  { kind: 'bullets', items: [
    [{ text: 'The highest number of acres enrolled in conservation easements occurred between 2014 and 2015 (3,996 acres protected), though the 2020-2021 period also saw substantial protection (3,173 acres protected).' }],
    [{ text: 'King and Skagit counties had the highest totals of farmland protection between 2014-2023, with a total of 16,447 acres protected in King County and 16,182 acres protected in Skagit County. Mason and Kitsap counties saw the smallest totals of farmland protection over time (134 and 235 acres each, respectively).' }],
    [{ text: '40,902 acres (74 percent of total protected acres) were enrolled in easements in 2013 or prior, or through undated agreements. 14,462 acres (26 percent of total protected acres) were enrolled in easements between 2014 and 2024.' }],
  ] },
];

export const FARMLAND_METHODS: PiBlock[] = [
  { kind: 'label', text: 'Monitoring Program' },
  { kind: 'bullets', items: [
    [{ text: 'Farmland Information Center', href: 'https://farmlandinfo.org/' }, { text: ', American Farmland Trust' }],
    [{ text: 'Protected Areas', href: 'https://www.usgs.gov/programs/gap-analysis-project/science/protected-areas' }, { text: ', United States Geological Survey, U.S. Department of the Interior' }],
    [{ text: 'County and local land trust programs, Puget Sound counties' }],
  ] },
  { kind: 'label', text: 'Data Source' },
  { kind: 'bullets', items: [
    [{ text: 'Protected Agricultural Lands Database', href: 'https://farmlandinfo.org/statistics/pald/' }, { text: ' (PALD), Farmland Information Center, American Farmland Trust, accessed in Winter 2024-2025' }],
    [{ text: 'Protected Areas Data of the US', href: 'https://www.usgs.gov/programs/gap-analysis-project/science/pad-us-data-overview#overview' }, { text: ' (PAD-US), U.S. Geological Survey, U.S. Department of the Interior, accessed in Winter 2024-2025' }],
    [{ text: 'Compiled county and local land trust data, county programs, Puget Sound, accessed in Winter 2024-2025' }],
  ] },
  { kind: 'label', text: 'Methods' },
  { kind: 'p', runs: [{ text: 'The Farmland Protection Progress Indicator relies on the synthesis of three data sources to capture acres enrolled in conservation and agricultural easements across Puget Sound. The indicator team requested local sources of easement data from Puget Sound counties. These easement data were then paired with the national Protected Areas Data of the US (PAD-US) and Protected Agricultural Lands Database (PALD) datasets of established easements to create a comprehensive view of protected farmland acres.' }] },
  { kind: 'p', runs: [{ text: 'Once these data were compiled, the indicator team conducted a manual review to remove overlapping easements, prevent double-counting of easements, and ensure easements correctly pertain to land used for agriculture. Where there were inconsistent attributes related to easements across multiple data sources, the local data attributes were used. The indicator team researched any inconsistencies with parcel boundaries across datasets to determine accurate parcel locations.' }] },
  { kind: 'p', runs: [{ text: 'To ensure easements pertain to land used for agriculture, the indicator team used aerial imagery and looked for irrigated pastures with vibrant green, fine textured, or geometrically shaped fields with uniform color and defined boundaries. There are many farms that likely have other uses on their land (e.g., wedding venues, agrotourism, watershed restoration, etc.) in addition to farming activities. These lands are likely still important to the farm business overall and to the presence of agriculture across the Puget Sound region, so they are counted as part of the easement.' }] },
  { kind: 'p', runs: [{ text: 'The indicator team then completed spatial overlays of additional data (listed below) with easement data to determine whether a given protected parcel was in an urban growth area (UGA) and what zoning category the protected parcel fell within.' }] },
  { kind: 'bullets', items: [
    [{ text: 'Watershed Boundary Dataset – Hydrologic Unit Code (HUC) 6', href: 'https://www.arcgis.com/home/item.html?id=53a9a02a7e93406ba041c2c17f0b0e75' }, { text: ', U.S. Geological Survey, 2023. Puget Sound: HUC 171100.' }],
    [{ text: 'Washington State General Land Use', href: 'https://geo.wa.gov/datasets/a0ddbd4e0e2141b3841a6a42ff5aff46_0/about' }, { text: ', Washington State Department of Commerce, 2022.' }],
    [{ text: 'Washington State City Urban Growth Areas', href: 'https://geo.wa.gov/maps/81e4a257ff924bebbd2eb7ee2fd30d0b' }, { text: ', Washington State Department of Ecology and the Office of the Chief Information Officer Geospatial Program, 2023.' }],
    [{ text: 'Washington State Department of Transportation Freight Transportation System', href: 'https://data.wsdot.wa.gov/arcgis/rest/services/Shared/FreightSystem/MapServer' }, { text: ', Washington State Department of Transportation, 2023.' }],
  ] },
  { kind: 'p', runs: [{ text: 'Easements were sorted into two-year reporting periods between 2014 and 2024 based on enrollment date or characterized as enrolled “2013 or prior” or “year unknown” as appropriate. Results were calculated at the parcel scale and summarized at the county- and Puget Sound region-scale. Results relate to the total acreage of a parcel, though not all acres within a parcel may be actively farmed. This indicator does not describe the portion of protected acres that are actively farmed; instead, the indicator gives a signal of the magnitude of farmland protected by conservation easements.' }] },
  { kind: 'p', runs: [{ text: "We evaluate progress by comparing the region's performance in the current two-year reporting period to its performance during the prior two-year reporting period (reference period). We make this comparison as sustained (period-over-period) increases in farmland protection is consistent with Puget Sound recovery goals." }] },
  { kind: 'p', runs: [{ text: 'Reference period: 2021 through 2021', bold: true }] },
  { kind: 'p', runs: [{ text: 'Current reporting period: 2022 through 2023', bold: true }] },
  { kind: 'p', runs: [{ text: 'Two-year reporting periods in our dataset begin in 2014 through 2015. This roughly aligns with county comprehensive planning cycles; comprehensive plans are updated every 10 years and articulate land use goals in counties and cities across Puget Sound.' }] },
  { kind: 'p', runs: [{ text: 'Limitations:', italic: true }] },
  { kind: 'bullets', items: [
    [{ text: 'Confidentiality of some conservation easements.', bold: true }, { text: ' Some easement locations and details are confidential, which limits the associated data available for analysis. The indicator team worked to ensure all confidentiality needs were met while reporting accurate totals of acres enrolled in easements. Confidentiality also impacted access to the establishment dates of some easements, which limited our ability to analyze when some easements were put in place. Roughly 5 percent of total protected acres have an unknown establishment year.' }],
    [{ text: 'Manual review may have missed agriculture located in undesignated conservation easement categories.', bold: true }, { text: ' While we are reasonably confident that easements included in this study pertain to farmland, there were some easements without associated purposes. This impacted our ability to understand how specific easement programs and types (e.g., wetland conservation, general conservation, agriculture conservation) contribute to agriculture protection. Future research could explore different types of easements and easement programs and their effectiveness at protecting farmland in Puget Sound.' }],
  ] },
  { kind: 'p', runs: [{ text: 'Future Areas of Work:', italic: true }] },
  { kind: 'p', runs: [{ text: 'Despite limitations, this indicator helps demonstrate progress enrolling farmlands into permanent protection programs. Such protections may afford more opportunities to keep land in agricultural production. The development of this indicator yielded several priorities for future work to more accurately convey the drivers of and barriers to farmland protection.' }] },
  { kind: 'bullets', items: [
    [{ text: 'Plan for agriculture viability in Puget Sound, so that protected farmland still has necessary support to be profitable and productive.' }],
    [{ text: 'Explore characteristics of landowners enrolled in conservation easements and easement programs (e.g., land trusts) to better understand reasons for protection.' }],
    [{ text: 'Explore how habitat restoration efforts impact the land base of active farmland and identify examples of multi-benefit conservation solutions that improve farm and habitat health.' }],
    [{ text: 'Explore how easement enrollment has changed given rising costs of land; explore the economic dimensions of farmland protection and conservation easements.' }],
  ] },
  { kind: 'label', text: 'Critical Definitions' },
  { kind: 'p', runs: [{ text: 'Conservation easement: ', bold: true }, { text: 'a voluntary and legally binding agreement between a landowner and organization (land trusts, county governments, Tribal governments, Conservation Districts, and other entities) that limits or prohibits the type and amount of development that may occur on a property and protects certain property features. Easement duration is typically permanent and is recorded on a parcel or parcels. Conservation easements in this report refer to all types, including but not limited to agriculture, wetland, forestry, riparian, natural resource, and historic preservation easements.' }] },
  { kind: 'p', runs: [{ text: 'Conversion: ', bold: true }, { text: 'the transition of land formerly used for farmland into another non-agriculture land use, like residential housing or commercial warehouses. Conversion is typically permanent.' }] },
  { kind: 'p', runs: [{ text: 'Protection: ', bold: true }, { text: 'protection refers to measures meant to prevent conversion of a farmland parcel (or parcels) to other non-agriculture uses. Protection can include permanent measures such as conservation easements or less permanent methods such as zoning. ' }, { text: 'In this report, protection is defined as land held in conservation easements.', bold: true }] },
  { kind: 'p', runs: [{ text: 'Zoning: ', bold: true }, { text: 'municipal or local land use regulations that establish how land can be used or developed over time.' }] },
];

export const FARMLAND_INTERPRETATION: PiBlock[] = [
  { kind: 'p', runs: [
    { text: 'Between 2022-2023, 2,362 acres of farmland were protected. This is a decline from the previous period (2020-2021), in which 3,173 acres of farmland were protected. ', bold: true },
    { text: 'We conclude that performance in this indicator is "Getting Worse."' },
  ] },
  { kind: 'icon', src: '/photos/indicators/farmland/getting-worse-inline.png', alt: 'Red circle icon with bold text in the middle reading "Getting Worse"' },
  { kind: 'p', runs: [{ text: 'Between 2014 through 2023, farmland protection varies significantly by county (Figure 2).', underline: true }] },
  { kind: 'bullets', items: [
    [{ text: 'King and Skagit counties have the most farmland enrolled in conservation easements (2,691 acres protected in King and 5,226 acres protected in Skagit between 2014-2023). Across all years (2013 and prior, and 2014 through 2023), King and Skagit counties have the most farmland enrolled in conservation easements (Figure 3).' }],
    [{ text: "Clallam and Kitsap counties have the fewest acres of farmland enrolled in conservation easements (273 acres protected in Clallam and 132 acres protected in Kitsap between 2014-2023). Mason County had zero confirmed acres protected between 2014-2023, though all of Mason County's 134 protected acres were missing dates of enrollment (i.e., they may have been established between 2014-2023)." }],
    [
      { text: 'The amount of farmland a county protected does not necessarily relate to the total amount of farmland present. Per the USDA 2022 census' },
      { text: '[1]', href: '#farmland-interp-ftn1' },
      { text: ', Whatcom County had the most acres of land in farming across Puget Sound counties' },
      { text: '[2]', href: '#farmland-interp-ftn2' },
      { text: ' but has a relatively low number of acres enrolled in conservation easements (2,725 acres across all years). Meanwhile, King County has the highest acres of farmland enrolled in conservation easements (16,447 acres across all years) yet the amount of King County’s land in farming in 2022' },
      { text: '[3]', href: '#farmland-interp-ftn3' },
      { text: ' was close to the median across Puget Sound counties. The different totals of protected farmlands are likely affected by differing capacities of county agricultural and land protection programs.' },
    ],
  ] },
  { kind: 'figure', src: '/photos/indicators/farmland/fig2-acres-by-county.png',
    alt: 'Column chart displaying acres of farmland protected per county in Puget Sound. The counties are shown in alphabetical order. County totals, in order from most acres protected to least is as follows: Skagit (5,226 acres), King (2,691 acres), Jefferson (1,113 acres), San Juan (1,042 acres), Island (1,001 acres), Whatcom (973 acres), Snohomish (808 acres), Pierce (750 acres), Thurston (453 acres), Clallam (273 acres), and Kitsap (132 acres). Mason County is not shown on this figure as all easements (covering 134 acres) in Mason County are undated.',
    caption: "Figure 2. Acres of farmland permanently protected through conservation easements between 2014 through 2023 by county. Note: Mason County's 134 acres are protected through undated conservation easements, so they are not depicted in this figure." },
  { kind: 'figure', src: '/photos/indicators/farmland/fig3-acres-all-years.png',
    alt: 'Column bars showing acres of farmland enrolled in conservation easements across all years, by county. Numbers shown relate to conservation easements established in 2013 and prior and between 2014 through 2023. From most protected acres to least, the county totals are as follows: King County (16,447 protected acres), Skagit County (16,182 protected acres), San Juan County (7,687 protected acres), Island County (3,783 protected acres), Whatcom County (2,725 protected acres), Jefferson County (2,185 protected acres), Snohomish County (1,993 protected acres), Clallam County (1,602 protected acres), Pierce County (1,417 protected acres), Kitsap County (235 protected acres), and Mason County (134 protected acres).',
    caption: 'Figure 3. Acres of farmland permanently protected through conservation easements in all years (2013 and prior, 2014-2023) by county.' },
  { kind: 'p', runs: [{ text: 'Most of the protected parcels were smaller than 10 acres.', underline: true }] },
  { kind: 'bullets', items: [
    [{ text: '188 parcels of farmland were enrolled in conservation easements between 2014-2023. Of these, 201 parcels (54 percent of all protected farmland) were smaller than 10 acres.' }],
    [{ text: 'While smaller parcels represent the most parcels enrolled, larger parcels contribute a significant amount of acreage to the total of protected farmland. Only 10 parcels were larger than 499 acres, yet these 10 parcels represent 6,985 acres of protected farmland, or 48 percent of all protected farmland.' }],
  ] },
  { kind: 'figure', src: '/photos/indicators/farmland/fig4-parcels-by-size.png',
    alt: 'Column chart of protected parcels by size of individual parcels. The majority of protected parcels are less than 1 acre. In descending order, counts of parcels by size are as follows: less than 1 acre (59 parcels), 1 to 9 acres (43 parcels), 10 to 49 acres (35 parcels), 50 to 179 acres (26 parcels), 180 to 499 acres (15 parcels), and greater than 499 acres (10 parcels).',
    caption: 'Figure 4. Count of farmland parcels permanently protected between 2014 through 2023 through conservation easements by the size of each protected parcel.' },
  { kind: 'figure', src: '/photos/indicators/farmland/fig5-acres-by-year.png',
    alt: 'Column chart showing the number of acres protected by parcel size. Parcels greater than 499 acres represent the largest fraction of protected farmland. From least to greatest, the acres protected by parcel size are as follows: less than 1 acre parcels (24 acres), 1 to 9 acre parcels (155 acres), 10 to 49 acre parcels (915 acres), 50 to 179 acre parcels (2,217 acres), 180 to 499 acre parcels (4,167 acres), and parcels greater than 499 acres (6,985 acres).',
    caption: 'Figure 5. Acres of farmland permanently protected between 2014 through 2023 through conservation easements by the size of each protected parcel.' },
  { kind: 'p', runs: [{ text: 'Most acres of protected farmland were in active agricultural zones, though a substantial proportion of protected farmland were in residential or mixed-use zones.', underline: true }] },
  { kind: 'bullets', items: [
    [{ text: 'Most protected farmland are in zones planned for farming uses. 11,317 acres of protected farmland are in active agricultural zones (representing 78 percent of all protected farmland). 613 acres of protected farmland are in open space or other natural resource production zones.' }],
    [{ text: 'A sizable proportion of protected farmland is in zones planned for non-farming uses (e.g., development, transportation). 2,434 acres (16 percent) of protected farmland are in residential or mixed-use zones where development is encouraged.' }],
    [{ text: 'These results are somewhat expected, as many easement programs focus on land in agricultural zones.' }],
  ] },
  { kind: 'figure', src: '/photos/indicators/farmland/fig6-pie-easement-type.png',
    alt: 'Pie chart showing the proportion of acres protected in general zoning categories. From largest to smallest, the totals of farmland protected by zoning category are as follows: active agriculture (11,317 acres), residential/mixed use (2,434 acres), open space/other resource production (613 acres), transportation (83 acres), undesignated (10 acres), and commercial/industrial (5 acres).',
    caption: 'Figure 6. Acres of farmland permanently protected through conservation easements between 2014 through 2023 by zoning categories.' },
  { kind: 'p', runs: [{ text: 'Most protected acres were located outside of Urban Growth Areas (UGAs) across Puget Sound.', underline: true }] },
  { kind: 'bullets', items: [
    [{ text: '330 acres of protected farmland are within UGAs, while 14,130 protected acres lie outside of UGAs.' }],
    [{ text: '323 of these acres within UGAs are located in Island County. The remaining protected acres in UGAs are located in Thurston County (5 acres), King County (1 acre), and Whatcom County (1 acre).' }],
  ] },
  { kind: 'figure', src: '/photos/indicators/farmland/fig7-pct-by-zoning.png',
    alt: 'Bar chart showing the percentage of protected farmland acres, by county, in urban growth areas and outside of urban growth areas. The vast majority of protected farmlands are outside of urban growth areas. Island County (32 percent, 323 acres), Thurston County (1.1 percent, 5 acres), King County (0.1 percent, 1 acre), and Whatcom County (0.1 percent, 1 acre) are the only counties in which farmlands are protected within urban growth areas.',
    caption: 'Figure 7. Percentage of farmland acres permanently protected through conservation easements between 2014 through 2023 in urban growth areas (UGAs) or outside of UGAs, by county.' },
  { kind: 'footnote', runs: [
    { text: '[1]', href: '#farmland-interp-ftn1' },
    { text: ' U.S. Department of Agriculture (2024). 2022 Census Full Report, National Agricultural Statistics Service, United States Department of Agriculture. Accessed on August 18, 2025 at ' },
    { text: 'https://www.nass.usda.gov/Publications/AgCensus/2022/index.php#full_report', href: 'https://www.nass.usda.gov/Publications/AgCensus/2022/index.php#full_report' },
    { text: '.' },
  ] },
  { kind: 'footnote', runs: [
    { text: '[2]', href: '#farmland-interp-ftn2' },
    { text: ' Whatcom county had 102,886 acres of land in farming according to the ' },
    { text: '2022 USDA Census', href: 'https://www.nass.usda.gov/Publications/AgCensus/2022/index.php#full_report' },
    { text: '. Census numbers are self-reported by farmers whose farm generate $1,000 or more of agricultural products.' },
  ] },
  { kind: 'footnote', runs: [
    { text: '[3]', href: '#farmland-interp-ftn3' },
    { text: ' King county had 46,261 acres of land in farming according to the ' },
    { text: '2022 USDA Census', href: 'https://www.nass.usda.gov/Publications/AgCensus/2022/index.php#full_report' },
    { text: '. The median land in farming of Puget Sound counties was 41,563 acres. Census numbers are self-reported by farmers whose farm generates $1,000 or more of agricultural products.' },
  ] },
  { kind: 'label', text: 'Causes for Change' },
  { kind: 'p', runs: [{ text: 'To keep up with development pressures, it is essential to continue investments in land conservation programs and evaluate the successes and barriers impacting these programs. Strong and well-enforced land use plans can help protect farmland even without a conservation easement. Strong partnerships between local governments, land use planners, and farmers can help identify effective types of conservation easement agreements to improve the protection of farmland.' }] },
  { kind: 'p', runs: [{ text: 'The following strategies can help bolster conservation easement programs and ensure conserved land remains in active agricultural use:' }] },
  { kind: 'bullets', items: [
    [{ text: 'Increased funding, capacity, and outreach for land trust programs to increase enrollment of farmland in conservation easements.' }],
    [{ text: 'Strategic enrollment of productive and viable farmland and farmland more vulnerable to conversion in conservation programs to ensure protections are offered to priority agriculture areas.' }],
    [{ text: 'Support for increased financial gains from conservation easements for landowners to keep up with development pressure and the rising costs of land ownership.' }],
    [{ text: 'Agricultural and food system infrastructure near farms to support the production of crops, processing of agricultural products, and distribution and sale of agricultural products.' }],
  ] },
  { kind: 'label', text: 'Additional Information' },
  { kind: 'bullets', items: [
    [{ text: 'Farmland Indicator Selection Process', href: 'https://pspwa.box.com/s/sp8rd5xl8w02ruds5dmragmykhz5opim' }, { text: ', 2025' }],
    [{ text: 'Agriculture Viability', href: 'https://www.vsp.wa.gov/county-resources/agricultural-viability' }, { text: ', Washington State Conservation Commission' }],
    [{ text: 'Agriculture Viability in Puget Sound', href: 'https://farmland.org/agricultural-viability-in-puget-sound' }, { text: ', American Farmland Trust' }],
    [{ text: 'Agricultural Viability Action Plan for Puget Sound', href: 'https://farmland.org/files/puget-sound-ag-viability-action-plan_digital_final.pdf' }, { text: ', American Farmland Trust' }],
    [{ text: 'Land Development and Cover Implementation Strategy', href: 'https://pugetsoundestuary.wa.gov/land-development-and-cover/' }],
    [{ text: 'Conservation Easements', href: 'https://walandtrusts.org/conservation-easements/' }, { text: ', Washington Association of Land Trusts' }],
    [{ text: 'Agricultural Easements', href: 'https://www.scc.wa.gov/ofp/agricultural-easements' }, { text: ', Office of Farmland Preservation, Washington State Conservation Commission' }],
  ] },
];

// Trailing stub cards, verbatim.
export const FARMLAND_DATASETS: PiBlock[] = [
  { kind: 'p', runs: [{ text: 'No datasets uploaded.' }] },
];
export const FARMLAND_REPORTING_GUIDANCE: PiBlock[] = [
  { kind: 'label', text: 'Reporting Instructions' },
];
export const FARMLAND_SUBCATEGORIES: PiBlock[] = [
  { kind: 'p', runs: [{ text: 'No Subcategories for this Puget Sound Indicator.' }] },
];
