// salmon-habitat-indicators.ts — data for the Salmon Habitat Indicator (SHI)
// pages, typed by src/data/shi-domain.ts.
//
// Vital Sign and Vital Sign Indicator names, ids, progress labels, and the two
// VSI detail pages (Eelgrass Area, Summer low flow) are public prod content
// from vitalsigns.pugetsoundinfo.wa.gov (fetched 2026-10-12). Which VSIs are
// SHIs, their relationship types, the two SHI indicators, all salmon
// narrative, and every gauge value in the SHI chart are invented for the
// prototype.

import type {
  HabitatCategory,
  HabitatCategorySlug,
  PugetSoundIndicator,
  SalmonHabitatIndicator,
  SalmonHabitatIndicatorField,
  ShiGauge,
  ShiSubfield,
  VitalSignRef,
  VsiDetail,
} from '../shi-domain';
import { SHI_RELATIONSHIP_LABEL, isShi } from '../shi-domain';

// ── Routing ────────────────────────────────────────────────────────────────
// The whole route group hangs off one base so moving SHI to its own subdomain
// is a one-line change.
export const SHI_BASE = '/prototypes/salmon-habitat-indicators';
export const VS_SITE = 'https://vitalsigns.pugetsoundinfo.wa.gov';
export const PSINFO_SITE = 'https://www.pugetsoundinfo.wa.gov';

export const shiRoutes = {
  landing: SHI_BASE,
  allIndicators: `${SHI_BASE}/all-indicators`,
  vsi: (slug: string) => `${SHI_BASE}/vital-sign-indicators/${slug}`,
  report: (slug: string) => `${SHI_BASE}/reports/${slug}`,
};

export const SHI_SITE_NAME = 'Puget Sound Salmon Habitat Indicators';
export const SHI_SUBTITLE = 'Measures of ecosystem conditions in salmon habitats';
export const SHI_LOGO = { src: '/photos/shi/shi-logo.png', alt: 'Salmon Habitat Indicators', width: 640, height: 546 };

// ── Habitat categories (deck order: left column, then right column) ───────
export const HABITAT_CATEGORIES: HabitatCategory[] = [
  { slug: 'beaches-marine-vegetation', label: 'Beaches & Marine Vegetation', colorGroup: 'purple' },
  { slug: 'estuaries', label: 'Estuaries', colorGroup: 'purple' },
  { slug: 'marine-water', label: 'Marine Water', colorGroup: 'purple' },
  { slug: 'freshwater', label: 'Freshwater', colorGroup: 'green' },
  { slug: 'streams-floodplains', label: 'Streams & Floodplains', colorGroup: 'green' },
  { slug: 'stream-structure', label: 'Stream Structure', colorGroup: 'blue' },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(
  HABITAT_CATEGORIES.map((c) => [c.slug, c]),
) as Record<HabitatCategorySlug, HabitatCategory>;

// ── Parent Vital Signs (prod ids) ─────────────────────────────────────────
const HABITAT_GOAL = { goalHueVar: '--ps-info-goal-habitat', goalName: 'Functioning Habitat', goalId: 7 };
const WATER_GOAL = { goalHueVar: '--ps-info-goal-water', goalName: 'Healthy Water Quality', goalId: 6 };

const VS: Record<'beaches' | 'estuaries' | 'streams' | 'freshwater' | 'marine', VitalSignRef> = {
  beaches: { id: 31, name: 'Beaches and Marine Vegetation', ...HABITAT_GOAL },
  estuaries: { id: 13, name: 'Estuaries', ...HABITAT_GOAL },
  streams: { id: 29, name: 'Streams and Floodplains', ...HABITAT_GOAL },
  freshwater: { id: 26, name: 'Freshwater', ...WATER_GOAL },
  marine: { id: 27, name: 'Marine Water', ...WATER_GOAL },
};

// ── Subfield switches ─────────────────────────────────────────────────────
const switches = (...on: ShiSubfield[]): Record<ShiSubfield, boolean> => ({
  importanceToSalmon: on.includes('importanceToSalmon'),
  chart: on.includes('chart'),
  description: on.includes('description'),
  keyResults: on.includes('keyResults'),
  methods: on.includes('methods'),
  interpretation: on.includes('interpretation'),
  additionalInformation: on.includes('additionalInformation'),
  datasets: on.includes('datasets'),
  reportingGuidance: on.includes('reportingGuidance'),
});

/** VSI: the only subfield on is Importance to Salmon. */
const importanceOnly = (paragraphs: string[]): SalmonHabitatIndicatorField => ({
  enabled: switches('importanceToSalmon'),
  importanceToSalmon: paragraphs,
});

// ── Summer low flow: the VSI+ chart (30 gauges, 18 shared with the VSI) ─
const FIRST_YEAR = 1999;
const LAST_YEAR = 2023;

const GAUGE_LIST: Omit<ShiGauge, 'pctBelowNormal'>[] = [
  { name: 'Chimacum Creek near Irondale', station: '12052210', source: 'rain', inVsi: false },
  { name: 'Huge Creek near Wauna', station: '12073500', source: 'rain', inVsi: true },
  { name: 'Big Soos Creek near Auburn', station: '12112600', source: 'rain', inVsi: false },
  { name: 'Newaukum Creek near Black Diamond', station: '12108500', source: 'rain', inVsi: false },
  { name: 'Issaquah Creek near Hobart', station: '12121600', source: 'rain', inVsi: false },
  { name: 'Taylor Creek near Selleck', station: '12117000', source: 'rain', inVsi: true },
  { name: 'Samish River near Burlington', station: '12201500', source: 'rain', inVsi: false },
  { name: 'Pilchuck River near Snohomish', station: '12155300', source: 'rain', inVsi: false },
  { name: 'Deschutes River near Rainier', station: '12079000', source: 'rain', inVsi: false },
  { name: 'NF Stillaguamish River near Arlington', station: '12167000', source: 'transitional', inVsi: true },
  { name: 'SF Stillaguamish River near Granite Falls', station: '12161000', source: 'transitional', inVsi: false },
  { name: 'NF Snoqualmie River near Snoqualmie Falls', station: '12142000', source: 'transitional', inVsi: true },
  { name: 'NF Tolt River near Carnation', station: '12147500', source: 'transitional', inVsi: false },
  { name: 'Skokomish River near Potlatch', station: '12061500', source: 'transitional', inVsi: false },
  { name: 'NF Skokomish River below Staircase Rapids', station: '12056500', source: 'transitional', inVsi: true },
  { name: 'Rex River near Cedar Falls', station: '12115500', source: 'transitional', inVsi: true },
  { name: 'Cedar River near Cedar Falls', station: '12115000', source: 'transitional', inVsi: true },
  { name: 'MF Snoqualmie River near Tanner', station: '12141300', source: 'transitional', inVsi: true },
  { name: 'SF Snoqualmie River at Garcia', station: '12143400', source: 'transitional', inVsi: true },
  { name: 'SF Nooksack River at Saxon Bridge', station: '12209000', source: 'transitional', inVsi: false },
  { name: 'Skykomish River near Gold Bar', station: '12134500', source: 'transitional', inVsi: true },
  { name: 'Duckabush River near Brinnon', station: '12054000', source: 'transitional', inVsi: true },
  { name: 'Nisqually River near National', station: '12082500', source: 'transitional', inVsi: true },
  { name: 'Greenwater River at Greenwater', station: '12097500', source: 'transitional', inVsi: true },
  { name: 'Puyallup River near Electron', station: '12093500', source: 'transitional', inVsi: true },
  { name: 'Sauk River near Darrington', station: '12186000', source: 'snow', inVsi: true },
  { name: 'Suiattle River near Mansford', station: '12189500', source: 'snow', inVsi: false },
  { name: 'Dungeness River near Sequim', station: '12048000', source: 'snow', inVsi: true },
  { name: 'NF Nooksack River near Glacier', station: '12205000', source: 'snow', inVsi: true },
  { name: 'Thunder Creek near Newhalem', station: '12175500', source: 'snow', inVsi: true },
];

/** Deterministic mock series: a rising share of below-normal days with
 *  year-to-year noise, damped for snow-fed gauges. */
function lowFlowSeries(gaugeIndex: number, source: ShiGauge['source']): number[] {
  let seed = 9301 + gaugeIndex * 49297;
  const next = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const damp = source === 'snow' ? 0.7 : source === 'transitional' ? 0.9 : 1;
  const years = LAST_YEAR - FIRST_YEAR + 1;
  return Array.from({ length: years }, (_, y) => {
    const trend = 18 + (y / (years - 1)) * 52;
    const value = (trend + (next() - 0.5) * 60) * damp;
    return Math.round(Math.max(0, Math.min(100, value)));
  });
}

export const LOW_FLOW_GAUGES: ShiGauge[] = GAUGE_LIST.map((g, i) => ({
  ...g,
  pctBelowNormal: lowFlowSeries(i, g.source),
}));

const lastYearIndex = LAST_YEAR - FIRST_YEAR;
const belowNormalLastYear = LOW_FLOW_GAUGES.filter((g) => g.pctBelowNormal[lastYearIndex] >= 50).length;
const sharedGauges = LOW_FLOW_GAUGES.filter((g) => g.inVsi).length;
const addedGauges = LOW_FLOW_GAUGES.length - sharedGauges;
const addedRainGauges = LOW_FLOW_GAUGES.filter((g) => !g.inVsi && g.source === 'rain').length;

const SUMMER_LOW_FLOW_FIELD: SalmonHabitatIndicatorField = {
  enabled: switches(
    'importanceToSalmon', 'chart', 'description', 'keyResults', 'methods',
    'interpretation', 'additionalInformation', 'datasets', 'reportingGuidance',
  ),
  importanceToSalmon: [
    'Juvenile coho, steelhead, and stream-type Chinook spend one or more summers in freshwater, and adult Chinook and sockeye hold in rivers through late summer before spawning. When summer flows drop, riffles go shallow, side channels disconnect from the main stem, and the area of usable rearing habitat shrinks.',
    'Low flows also warm faster and hold less dissolved oxygen. Crowding into the pools that remain raises competition and predation, and shallow riffles can block adult migration to upstream spawning grounds.',
  ],
  chart: {
    kind: 'gauge-grid',
    gauges: LOW_FLOW_GAUGES,
    firstYear: FIRST_YEAR,
    lastYear: LAST_YEAR,
    caption:
      'Share of summer days (July 15 to October 31) when the 7-day mean daily flow was below the 1948 to 1998 baseline 25th percentile, by streamgage and year. Gauges are grouped by flow source and ordered from lowest to highest basin elevation.',
  },
  description: `The salmon habitat version of the summer low flow indicator applies the Vital Sign method to ${LOW_FLOW_GAUGES.length} streamgages instead of ${sharedGauges}. The ${addedGauges} added gauges sit on lowland, rain-fed streams that carry most of the region's coho and steelhead rearing habitat and are under-represented in the Vital Sign gauge set.`,
  keyResults: [
    `In ${LAST_YEAR}, summer flows were below normal most of the time at ${belowNormalLastYear} of the ${LOW_FLOW_GAUGES.length} gauges in the salmon analysis.`,
    `The ${addedRainGauges} added rain-fed gauges show the same direction as the Vital Sign gauges, with longer runs of consecutive below-normal years since 2015.`,
    'Snow-fed gauges in the North Cascades show fewer below-normal summers, consistent with glacier melt temporarily supporting late-season flow.',
  ],
  methods: [
    'Daily discharge records come from the USGS streamgaging network. For each gauge and year, the 7-day mean daily flow is compared with the 25th percentile of the 1948 to 1998 baseline for the same calendar day.',
    'A year counts as below normal at a gauge when 50 percent or more of days between July 15 and October 31 fall below that baseline. Gauges are classed as rain, transitional, or snow sourced from mean basin elevation.',
    'Added gauges were selected for unregulated flow, a record of at least 25 years, and overlap with mapped coho and steelhead rearing reaches.',
  ],
  interpretation: [
    'Agreement between the shared and added gauges suggests the Vital Sign trend is not an artifact of its gauge selection. Lowland rain-fed streams reach below-normal conditions earlier in the season than the higher-elevation Vital Sign gauges.',
    'Because the added gauges have shorter records, their baseline percentiles carry wider uncertainty before 1970.',
  ],
  additionalInformation: [
    'Summer low flow is reported alongside water temperature in streams and rivers, which shares several of the same gauges.',
  ],
  datasets: [
    { name: 'USGS daily streamflow, Puget Sound unregulated gauges', steward: 'U.S. Geological Survey' },
    { name: 'Summer low flow baseline percentiles, 1948 to 1998', steward: 'Washington State Department of Ecology' },
    { name: 'Coho and steelhead rearing reaches', steward: 'Washington Department of Fish and Wildlife' },
  ],
  reportingGuidance: [
    'Report the Vital Sign and salmon habitat results together, and state the gauge count for each. Do not combine the two gauge sets into a single trend.',
  ],
};

// ── The 16 Salmon Habitat Indicators ──────────────────────────────────────
export const SALMON_HABITAT_INDICATORS: SalmonHabitatIndicator[] = [
  // Beaches & Marine Vegetation
  {
    slug: 'eelgrass-area',
    name: 'Eelgrass Area',
    summary: 'Soundwide area of native seagrass beds, a nearshore habitat sensitive to disturbance and water quality.',
    vitalSign: VS.beaches,
    vitalSignIndicator: { id: 10, progress: 'Mixed Results' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'beaches-marine-vegetation',
      field: importanceOnly([
        'Juvenile Chinook and chum leave their natal estuaries and move along shorelines in shallow water, where eelgrass beds offer cover from predators and a dense supply of small crustaceans and insects to feed on.',
        'Eelgrass also shelters Pacific herring spawn, an important prey for salmon in their first months at sea. Losses of eelgrass along migration corridors can lower early marine growth and survival.',
      ]),
    },
  },
  {
    slug: 'floating-kelp-bed-area',
    name: 'Floating kelp bed area',
    summary: 'Extent of bull kelp and giant kelp canopy along Puget Sound and Strait of Juan de Fuca shorelines.',
    vitalSign: VS.beaches,
    vitalSignIndicator: { id: 62, progress: 'Getting Worse' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'beaches-marine-vegetation',
      field: importanceOnly([
        'Kelp forests provide refuge and foraging habitat for juvenile salmon as they move into deeper nearshore waters.',
      ]),
    },
  },
  {
    slug: 'feeder-bluffs',
    name: 'Feeder bluffs in functional condition',
    summary: 'Share of eroding bluffs that still deliver sediment to beaches, free of armoring.',
    vitalSign: VS.beaches,
    vitalSignIndicator: { id: 63, progress: 'No Trend' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'beaches-marine-vegetation',
      field: importanceOnly([
        'Sediment from feeder bluffs builds the beaches where forage fish spawn, and forage fish are a main prey of juvenile and adult salmon.',
      ]),
    },
  },
  {
    slug: 'nearshore-riparian-forest',
    name: 'Extent of forest cover in nearshore marine riparian areas',
    summary: 'Tree canopy along marine shorelines that shades beaches and supplies wood and insects.',
    vitalSign: VS.beaches,
    vitalSignIndicator: { id: 64, progress: 'Indicator To Be Developed' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'beaches-marine-vegetation',
      field: importanceOnly([
        'Overhanging vegetation drops insects that juvenile salmon eat in nearshore waters and shades the upper beach used by spawning forage fish.',
      ]),
    },
  },
  // Estuaries
  {
    slug: 'estuary-area',
    name: 'Estuary area in functional condition',
    summary: 'Acres of tidal wetland in the major river deltas that function as estuary habitat.',
    vitalSign: VS.estuaries,
    vitalSignIndicator: { id: 65, progress: 'Getting Better' },
    salmonHabitatIndicator: {
      relationship: 'extended',
      category: 'estuaries',
      field: {
        enabled: switches('importanceToSalmon', 'description', 'keyResults', 'methods', 'datasets'),
        importanceToSalmon: [
          'River deltas are where juvenile salmon adjust to salt water. Tidal channels and marshes give them food, shelter, and time to grow before they enter Puget Sound, and larger fish at ocean entry survive at higher rates.',
        ],
        description:
          'The salmon habitat version reports functional estuary area for each of the 16 major river deltas separately and weights tidal channel edge, the habitat juvenile Chinook use most, more heavily than open marsh.',
        keyResults: [
          'Functional tidal channel edge increased in 9 of the 16 deltas since the 2016 baseline, led by the Skagit, Snohomish, and Nisqually.',
          'Gains in deltas of populations far from their recovery goals remain small.',
        ],
        methods: [
          'Tidal channel edge is mapped from aerial imagery and lidar on a six-year cycle, then summed by delta.',
          'Channel edge within restored sites is credited once vegetation and channel form meet the functional criteria used by the Vital Sign.',
        ],
        datasets: [
          { name: 'Puget Sound river delta tidal channel mapping', steward: 'Skagit River System Cooperative' },
          { name: 'Estuary restoration project footprints', steward: 'Puget Sound Partnership' },
        ],
      },
    },
  },
  {
    slug: 'pocket-estuaries',
    name: 'Number of accessible pocket estuaries and embayments',
    summary: 'Small estuaries and embayments along the shoreline that fish can reach at high tide.',
    vitalSign: VS.estuaries,
    vitalSignIndicator: { id: 77, progress: 'Indicator To Be Developed' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'estuaries',
      field: importanceOnly([
        'Juvenile Chinook from rivers without large deltas rely on pocket estuaries as rearing stops along their migration route.',
      ]),
    },
  },
  // Marine Water
  {
    slug: 'marine-water-temperature',
    name: 'Marine water temperature',
    summary: 'Surface and bottom water temperatures across the main basins of Puget Sound.',
    vitalSign: VS.marine,
    vitalSignIndicator: { id: 59, progress: 'Indicator To Be Developed' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'marine-water',
      field: importanceOnly([
        'Warm marine water raises the energy salmon need and shifts the timing and makeup of the plankton and forage fish they eat.',
      ]),
    },
  },
  {
    slug: 'dissolved-oxygen',
    name: 'Dissolved oxygen in marine water',
    summary: 'Oxygen concentration in marine waters, with emphasis on low-oxygen events in southern basins.',
    vitalSign: VS.marine,
    vitalSignIndicator: { id: 29, progress: 'Indicator To Be Developed' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'marine-water',
      field: importanceOnly([
        'Low oxygen pushes salmon and their prey out of affected water and can block migration through inlets in late summer.',
      ]),
    },
  },
  // Freshwater
  {
    slug: 'stream-temperature',
    name: 'Water temperature in streams and rivers',
    summary: 'Summer water temperatures in streams and rivers measured against state standards.',
    vitalSign: VS.freshwater,
    vitalSignIndicator: { id: 55, progress: 'Indicator To Be Developed' },
    salmonHabitatIndicator: {
      relationship: 'extended',
      category: 'freshwater',
      field: {
        enabled: switches('importanceToSalmon', 'description', 'keyResults', 'methods'),
        importanceToSalmon: [
          'Salmon are cold-water fish. Sustained temperatures above about 18°C slow growth and raise disease risk, and temperatures above about 21°C can stop adult migration.',
        ],
        description:
          'The salmon habitat version compares stream temperatures with the thresholds for each salmon life stage present in a reach, rather than with a single water quality standard.',
        keyResults: [
          'Rearing-reach thresholds were exceeded at more sites than the water quality standard alone suggests, mostly on lowland streams.',
        ],
        methods: [
          'Continuous loggers report the 7-day average of daily maximum temperature, matched to mapped spawning, rearing, and migration reaches.',
        ],
      },
    },
  },
  {
    slug: 'freshwater-bibi',
    name: 'Freshwater Benthic Index of Biotic Integrity',
    summary: 'Stream health scored from the insects and other invertebrates living on the streambed.',
    vitalSign: VS.freshwater,
    vitalSignIndicator: { id: 16, progress: 'Getting Better' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'freshwater',
      field: importanceOnly([
        'Streambed invertebrates are the main food of juvenile salmon in freshwater, so a healthy benthic community means more food for rearing fish.',
      ]),
    },
  },
  // Streams & Floodplains
  {
    slug: 'summer-low-flow',
    name: 'Summer low flow in streams and rivers',
    summary: 'How often summer streamflows fall below a 50-year baseline in unregulated streams and rivers.',
    vitalSign: VS.streams,
    vitalSignIndicator: { id: 46, progress: 'Getting Worse' },
    salmonHabitatIndicator: {
      relationship: 'extended',
      category: 'streams-floodplains',
      field: SUMMER_LOW_FLOW_FIELD,
    },
  },
  {
    slug: 'floodplain-function',
    name: 'Floodplain function in large and small river systems',
    summary: 'Condition of floodplains in large rivers and small streams, scored from land cover and connectivity.',
    vitalSign: VS.streams,
    vitalSignIndicator: { id: 14, progress: 'Getting Better' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'streams-floodplains',
      field: importanceOnly([
        'Connected floodplains hold side channels and wetlands where juvenile salmon shelter from high winter flows and grow quickly.',
      ]),
    },
  },
  {
    slug: 'freshwater-riparian-forest',
    name: 'Extent of forest cover in freshwater riparian zones',
    summary: 'Tree canopy along streams and rivers that shades water and supplies wood.',
    vitalSign: VS.streams,
    vitalSignIndicator: { id: 78, progress: 'Indicator To Be Developed' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'streams-floodplains',
      field: importanceOnly([
        'Riparian forest keeps streams cool, stabilizes banks, and is the long-term source of the large wood that forms pools.',
      ]),
    },
  },
  {
    slug: 'hydrologic-regime',
    name: 'Changes in hydrologic regime in streams and rivers',
    summary: 'Shifts in the timing and size of high and low flows across the year.',
    vitalSign: VS.streams,
    vitalSignIndicator: { id: 89, progress: 'Indicator To Be Developed' },
    salmonHabitatIndicator: {
      relationship: 'same',
      category: 'streams-floodplains',
      field: importanceOnly([
        'Salmon life cycles are timed to river flows. Earlier peaks and longer low-flow seasons can scour redds and strand juveniles.',
      ]),
    },
  },
  // Stream Structure (no Vital Sign analog yet; nests under Streams and Floodplains)
  {
    slug: 'large-wood',
    name: 'Large wood in streams',
    summary: 'Pieces of large wood per stream length in salmon-bearing reaches.',
    vitalSign: VS.streams,
    salmonHabitatIndicator: {
      relationship: 'independent',
      category: 'stream-structure',
      field: {
        enabled: switches('importanceToSalmon', 'description', 'reportingGuidance'),
        importanceToSalmon: [
          'Logs and jams create the pools, gravel bars, and cover that spawning adults and rearing juveniles need. Many Puget Sound streams hold a fraction of the wood they carried historically.',
        ],
        description:
          'Counts of large wood pieces and jams per 100 meters of channel in salmon-bearing reaches, summarized by watershed.',
        reportingGuidance: [
          'Methods are in development. Report survey results by watershed until a soundwide sampling design is adopted.',
        ],
      },
    },
  },
  {
    slug: 'fish-passage',
    name: 'Fish passage at road crossings',
    summary: 'Stream habitat opened upstream of culverts and other barriers that have been corrected.',
    vitalSign: VS.streams,
    salmonHabitatIndicator: {
      relationship: 'independent',
      category: 'stream-structure',
      field: {
        enabled: switches('importanceToSalmon', 'description'),
        importanceToSalmon: [
          'Culverts that are too steep, too small, or perched above the stream keep adults from spawning grounds and juveniles from upstream rearing habitat.',
        ],
        description:
          'Miles of potential salmon habitat upstream of corrected barriers, compared with the miles still blocked.',
      },
    },
  },
];

export const SHI_BY_SLUG = Object.fromEntries(
  SALMON_HABITAT_INDICATORS.map((i) => [i.slug, i]),
) as Record<string, SalmonHabitatIndicator>;

// ── Link targets (per the deck: VSI goes to the VSI page, the other
//    two types go to the SHI report) ──────────────────────────────────────
/** Indicators with an in-prototype Vital Sign Indicator page. */
export const VSI_DETAIL_SLUGS = ['eelgrass-area', 'summer-low-flow'] as const;

export const vsiHref = (i: PugetSoundIndicator): string | undefined => {
  if (!i.vitalSignIndicator) return undefined;
  return (VSI_DETAIL_SLUGS as readonly string[]).includes(i.slug)
    ? shiRoutes.vsi(i.slug)
    : `${VS_SITE}/VitalSignIndicator/Detail/${i.vitalSignIndicator.id}`;
};

export const hasShiReport = (i: SalmonHabitatIndicator): boolean =>
  i.salmonHabitatIndicator.relationship !== 'same';

export const shiHref = (i: SalmonHabitatIndicator): string =>
  hasShiReport(i) ? shiRoutes.report(i.slug) : vsiHref(i)!;

export const vitalSignHref = (v: VitalSignRef) => `${VS_SITE}/VitalSign/Detail/${v.id}`;
export const goalHref = (v: VitalSignRef) => `${VS_SITE}/VitalSignGoal/Detail/${v.goalId}`;
export const completeReportHref = (vsiId: number) => `${PSINFO_SITE}/Indicator/Detail/${vsiId}`;

/** Salmon relationship for a prod VSI id (drives the All Indicators marker). */
export const SHI_BY_VSI_ID: Record<number, SalmonHabitatIndicator> = Object.fromEntries(
  SALMON_HABITAT_INDICATORS.filter((i) => i.vitalSignIndicator).map((i) => [i.vitalSignIndicator!.id, i]),
);

export { isShi };

// ── Indicator table ───────────────────────────────────────────────────────
export const SHI_GRID_HEADING = 'Explore all Salmon Habitat Indicators';
export const SHI_GRID_EXPORT_FILE_NAME = 'salmon-habitat-indicators-export';

export interface ShiGridRow {
  slug: string;
  indicator: string;
  href: string;
  description: string;
  category: HabitatCategorySlug;
  categoryLabel: string;
  vitalSign: string;
  vitalSignHref: string;
  relationship: string;
}

export const SHI_GRID_ROWS: ShiGridRow[] = SALMON_HABITAT_INDICATORS.map((i) => ({
  slug: i.slug,
  indicator: i.name,
  href: shiHref(i),
  description: i.summary,
  category: i.salmonHabitatIndicator.category,
  categoryLabel: CATEGORY_BY_SLUG[i.salmonHabitatIndicator.category].label,
  vitalSign: i.vitalSign.name,
  vitalSignHref: vitalSignHref(i.vitalSign),
  relationship: SHI_RELATIONSHIP_LABEL[i.salmonHabitatIndicator.relationship],
}));

// ── Landing About text (placeholder copy) ──────────────────────────────────────
export const SHI_ABOUT: string[] = [
  'Salmon Habitat Indicators measure the condition of the places Puget Sound salmon depend on, from mountain headwaters to the open waters of the Sound. Most are Vital Sign Indicators already reported here; some add an analysis focused on salmon, and a few are new.',
  'The indicators were chosen with salmon recovery and monitoring partners to track the habitats salmon use at each stage of their life cycle. They are reported on the same schedule as the Vital Signs, and each one nests under the Vital Sign it measures.',
];

// ── Vital Sign Indicator detail pages (prod content, fetched 2026-10-12) ──
const PARTNER_ECOLOGY = {
  name: 'Washington State Department of Ecology',
  logo: '/photos/shi/partner-ecology.png',
  href: `${PSINFO_SITE}/Organization/Detail/10`,
};
const PARTNER_DNR = {
  name: 'Washington State Department of Natural Resources',
  logo: '/photos/shi/partner-dnr.png',
  href: `${PSINFO_SITE}/Organization/Detail/12`,
};

export const VSI_DETAILS: VsiDetail[] = [
  {
    indicatorSlug: 'eelgrass-area',
    description:
      'Soundwide eelgrass area is a metric for the overall health of native seagrass beds in greater Puget Sound. Seagrass is an important component of nearshore habitats and is sensitive to human disturbance and declines in water quality.',
    chart: {
      src: '/photos/shi/eelgrass-area-chart.png',
      alt: 'Line chart of annual soundwide eelgrass area estimates from 2004 to 2023, varying around a long-term average near 52,000 acres, rising to 2016 and declining slightly after.',
      width: 2125,
      height: 1062,
      caption:
        'Annual estimates of soundwide eelgrass area (acres) in greater Puget Sound. The dashed line is the long-term average of annual estimates from 2004 to 2023. Error bars are standard error.',
    },
    keyResults: [
      'The current best estimate of eelgrass area in greater Puget Sound is approximately 51,700 acres (pooled 3-year average 2021-2023).',
      'Soundwide eelgrass area showed an increasing trend between 2004 and 2016, and a declining trend between 2016 and 2023. The magnitude of these changes was relatively small compared to the total amount of eelgrass present in greater Puget Sound. The relative stability is reassuring and sets Puget Sound apart from many other developed areas, where substantial system-wide declines are ongoing.',
      'While most sites appear stable, the spatial pattern in site level trends suggests that eelgrass is susceptible to declines in certain areas of greater Puget Sound. For more information on regional patterns, see the short and long-term change at eelgrass sites indicator.',
    ],
    target: 'No targets are currently set for this indicator.',
    dataSource: 'Nearshore Habitat Program Data & Apps (arcgis.com)',
    reporter: {
      name: 'Bart Christiaen',
      email: 'Bart.Christiaen@dnr.wa.gov',
      organization: 'Washington State Department of Natural Resources',
      organizationHref: `${PSINFO_SITE}/Organization/Detail/12`,
    },
    lastUpdated: '12/30/2024',
    partners: [PARTNER_DNR],
  },
  {
    indicatorSlug: 'summer-low-flow',
    description:
      'The summer low flow indicator measures current conditions and long-term trends in streamflows that occur during summer months when there is less rain and temperatures are warmer. The indicator tells us how often summer flows are below normal, relative to a 50-year baseline, in unregulated streams and rivers across Puget Sound. When flows are below normal, less water is available for people and wildlife to use, less habitat is available for salmon, and it can contribute to increased water temperatures and lower water quality.',
    chart: {
      src: '/photos/shi/summer-low-flow-chart.png',
      alt: 'Grid of 18 streamgages by year from 1948 to 2023. Cells shaded purple, marking years when most summer days were below normal flow, become more frequent after 1985 and dominate after 2015.',
      width: 1830,
      height: 675,
      caption:
        'Status of annual summer low flow at indicator streamgages. Each cell is color coded for a category of frequency of below normal flow. Categories are based on the percentage of days each year between July 15th and October 31st where the 7-day mean daily flow was below normal (i.e., below the 1948-1998 baseline 25th percentile). When most days (50% or more) were below normal, the cell is shaded purple. When fewer than 50% of the days were below normal, the cell is shaded blue. Streamgages are highlighted as 1) (R) rain sourced, 2) (T) transitional (between rain and snow sourced), or 3) (S) snow sourced. Streams with substantial glaciers in their headwaters are denoted with an asterisk. Streams are arranged in order from streams with lowest mean basin elevation to highest.',
    },
    keyResults: [
      'The occurrence of below normal summer flows is increasing in unregulated streams and rivers across Puget Sound. In 2023, summer flows were below normal most of the time at 16 of the 18 indicator gages (see Interpretation of Results for more details). Thus, we determine this indicator to be GETTING WORSE.',
      'Consecutive years with below normal summer flows have increased since 1985 and especially since 2015. Since 2015, most of the rain, transitional, and snow-fed watersheds had below normal summer flows over 60% of the time.',
      'Accelerated glacial melt may temporarily offset diminishing low flows in some rivers. Summer flows are enhanced by glacier meltwater at four of the indicator gages. These systems have generally fewer occurrences of below normal flows during the summer flow period.',
      'Flows below 1948-1998 baseline minimums were observed at least once at all indicator gages during the 1999-2023 study period. The occurrences of flows below baseline minimums have increased since 2015. In 2023, 7-day mean daily flows below baseline minimums occurred greater than 50 percent of the time at 9 of the 18 gages in the analysis.',
      'Supporting analysis shows that the timing of streamflow is changing in Puget Sound. Between 1948 and 2023, the center of timing (CT) at most indicator gages regressed to earlier occurrences over time. This means the low flow season in our region is becoming longer as larger fractions of total annual runoff occur progressively earlier in the year (see Interpretation of Results – Changes in Streamflow Timing for more details).',
    ],
    target: 'No targets are currently set for this indicator.',
    dataSource:
      'U.S. Geological Survey Groundwater and Streamflow Information Program - Streamgaging Network, compiled by the Streamflow Monitoring Program at the Washington Department of Ecology',
    reporter: {
      name: 'Jim Shedd',
      email: 'jish461@ECY.WA.GOV',
      organization: 'Washington State Department of Ecology',
      organizationHref: `${PSINFO_SITE}/Organization/Detail/10`,
    },
    lastUpdated: '04/14/2025',
    partners: [PARTNER_ECOLOGY],
  },
];

export const VSI_DETAIL_BY_SLUG = Object.fromEntries(
  VSI_DETAILS.map((d) => [d.indicatorSlug, d]),
) as Record<string, VsiDetail>;

/** Prod help text for the trend icon (Indicator Trend "?" popup). */
export const PROGRESS_ICON: Record<string, string> = {
  'Getting Better': 'progress-gettingbetter.png',
  'Mixed Results': 'progress-mixedresults.png',
  'No Trend': 'progress-notrend.png',
  'Getting Worse': 'progress-gettingworse.png',
  'Limited Data': 'progress-limiteddata.png',
  'Indicator To Be Developed': 'progress-status-tobedeveloped.png',
};
