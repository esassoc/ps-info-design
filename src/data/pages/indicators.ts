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

export const SOURCE_URL = 'https://www.pugetsoundinfo.wa.gov/Indicator/Index';
export const PAGE_TITLE = 'Puget Sound Indicators';

// ── Intro copy (verbatim from the page body) ────────────────────────────────
export const INTRO_PARAGRAPH =
  "Puget Sound Partnership's system of indicators help us understand whether we are seeing short-term progress to achieve long-term Puget Sound recovery goals.";

export interface IndicatorTypeDefinition {
  /** The bold+underlined term in source copy. */
  term: string;
  definition: string;
}

export const INDICATOR_TYPE_DEFINITIONS: IndicatorTypeDefinition[] = [
  {
    term: 'Vital Sign Indicators',
    definition: 'measure the status and trends of ecosystem components over years and decades.',
  },
  {
    term: 'Progress Indicators',
    definition: 'measure human activities that influence ecosystem health (both positively and negatively) over years.',
  },
];

export const CLOSING_PARAGRAPH =
  'The data underlying this indicator system help the Partnership make data-informed recommendations to improve and accelerate recovery outcomes.';

// ── The two portal cards (psiButtonCards on the source page) ───────────────
export interface PortalCard {
  title: string;
  blurb: string;
  href: string;
}

export const PORTALS: PortalCard[] = [
  {
    title: 'Vital Signs',
    blurb: 'Measures of ecosystem health and progress toward Puget Sound recovery goals',
    href: 'https://vitalsigns.pugetsoundinfo.wa.gov',
  },
  {
    title: 'Puget Sound Progress Indicators',
    blurb: 'Measures of human activities that influence ecosystem health',
    href: 'https://progressindicators.pugetsoundinfo.wa.gov',
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
