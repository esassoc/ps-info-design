// salmon-habitat-indicators.ts — data for the Salmon Habitat Indicator (SHI)
// pages, typed by src/data/shi-domain.ts.
//
// Vital Sign and Vital Sign Indicator names, ids, progress labels, and the
// three VSI detail records (Eelgrass Area, Summer low flow, Floodplain
// function) are public prod content from vitalsigns.pugetsoundinfo.wa.gov and
// www.pugetsoundinfo.wa.gov (fetched 2026-10-12 and 2026-10-16). Which VSIs
// are SHIs, their types, the two standalone SHIs and everything on their
// pages, all salmon narrative, the gauge coordinates and every gauge value in
// the SHI chart are invented for the prototype. The official SHI list is
// still owed by PSP; these 16 are placeholders.

import type { GoalDetail, ProgressLabel, TargetStatusLabel } from './goals';
import { GOALS } from './goals';
import type {
  HabitatCategory,
  HabitatCategorySlug,
  PugetSoundIndicator,
  SalmonHabitatIndicator,
  SalmonHabitatIndicatorField,
  ShiGauge,
  ShiMapPoint,
  ShiSubfield,
  VitalSignRef,
  VsiDetail,
  VsiPartner,
} from '../shi-domain';
import { isShi } from '../shi-domain';

// ── Routing ────────────────────────────────────────────────────────────────
// The whole route group hangs off one base so moving SHI to its own subdomain
// is a one-line change.
export const SHI_BASE = '/prototypes/salmon-habitat-indicators';
export const VS_SITE = 'https://vitalsigns.pugetsoundinfo.wa.gov';
export const PSINFO_SITE = 'https://www.pugetsoundinfo.wa.gov';

export const shiRoutes = {
  landing: SHI_BASE,
  list: `${SHI_BASE}/list`,
  allIndicators: `${SHI_BASE}/all-indicators`,
  goal: (slug: string) => `${SHI_BASE}/vital-sign-goals/${slug}`,
  vsi: (slug: string) => `${SHI_BASE}/vital-sign-indicators/${slug}`,
  /** Complete Indicator Report (prod Indicator/Detail). */
  report: (slug: string) => `${SHI_BASE}/indicator-reports/${slug}`,
  /** SHI standalone page. */
  standalone: (slug: string) => `${SHI_BASE}/indicators/${slug}`,
};

/** Anchor of the Salmon Habitat Indicator field on a Complete Indicator Report. */
export const SHI_FIELD_ANCHOR = 'salmon-habitat-indicator';
/** Anchor of the Importance to Salmon section on a VSI page. */
export const SHI_IMPORTANCE_ANCHOR = 'importance-to-salmon';

/** Prod's trend and target-status icon files (public/photos/vital-signs/icons). */
export const PROGRESS_ICON: Record<string, string> = {
  'Getting Better': 'progress-gettingbetter.png',
  'Mixed Results': 'progress-mixedresults.png',
  'No Trend': 'progress-notrend.png',
  'Getting Worse': 'progress-gettingworse.png',
  'Limited Data': 'progress-limiteddata.png',
  'Indicator To Be Developed': 'progress-status-tobedeveloped.png',
};

export const TARGET_ICON: Record<TargetStatusLabel, string> = {
  'Near Or At Target': 'status-neartarget.png',
  'Below Target': 'status-belowtarget.png',
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
  map: on.includes('map'),
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

/** Approximate gauge locations for the SHI Map (invented to the nearest
 *  hundredth of a degree; good enough to place each river, not to survey it). */
const GAUGE_COORDS: Record<string, [number, number]> = {
  '12052210': [48.03, -122.78], '12073500': [47.39, -122.67], '12112600': [47.31, -122.17],
  '12108500': [47.27, -122.06], '12121600': [47.46, -122.0], '12117000': [47.39, -121.84],
  '12201500': [48.55, -122.34], '12155300': [47.94, -122.07], '12079000': [46.85, -122.67],
  '12167000': [48.26, -122.05], '12161000': [48.1, -121.95], '12142000': [47.61, -121.71],
  '12147500': [47.71, -121.79], '12061500': [47.31, -123.18], '12056500': [47.51, -123.33],
  '12115500': [47.35, -121.66], '12115000': [47.37, -121.62], '12141300': [47.49, -121.65],
  '12143400': [47.42, -121.59], '12209000': [48.68, -122.17], '12134500': [47.84, -121.67],
  '12054000': [47.68, -123.01], '12082500': [46.75, -122.08], '12097500': [47.15, -121.66],
  '12093500': [46.9, -122.03], '12186000': [48.25, -121.57], '12189500': [48.27, -121.6],
  '12048000': [48.01, -123.13], '12205000': [48.91, -121.84], '12175500': [48.65, -121.07],
};

/** Route of the embedded map page (the mock ArcGIS web app). */
export const LOW_FLOW_MAP_EMBED = '/prototypes/salmon-habitat-indicators/embeds/summer-low-flow-map';

export const LOW_FLOW_GAUGES: ShiGauge[] = GAUGE_LIST.map((g, i) => ({
  ...g,
  pctBelowNormal: lowFlowSeries(i, g.source),
}));

/** Points for the embedded SHI Map. */
export const LOW_FLOW_MAP_POINTS: ShiMapPoint[] = LOW_FLOW_GAUGES.map((g) => ({
  name: g.name,
  lat: GAUGE_COORDS[g.station][0],
  lon: GAUGE_COORDS[g.station][1],
  set: g.inVsi ? 'shared' : 'added',
}));

const lastYearIndex = LAST_YEAR - FIRST_YEAR;
const belowNormalLastYear = LOW_FLOW_GAUGES.filter((g) => g.pctBelowNormal[lastYearIndex] >= 50).length;
const sharedGauges = LOW_FLOW_GAUGES.filter((g) => g.inVsi).length;
const addedGauges = LOW_FLOW_GAUGES.length - sharedGauges;
const addedRainGauges = LOW_FLOW_GAUGES.filter((g) => !g.inVsi && g.source === 'rain').length;

const SUMMER_LOW_FLOW_FIELD: SalmonHabitatIndicatorField = {
  enabled: switches(
    'importanceToSalmon', 'map', 'chart', 'description', 'keyResults', 'methods',
    'interpretation', 'additionalInformation', 'datasets', 'reportingGuidance',
  ),
  importanceToSalmon: [
    'Juvenile coho, steelhead, and stream-type Chinook spend one or more summers in freshwater, and adult Chinook and sockeye hold in rivers through late summer before spawning. When summer flows drop, riffles go shallow, side channels disconnect from the main stem, and the area of usable rearing habitat shrinks.',
    'Low flows also warm faster and hold less dissolved oxygen. Crowding into the pools that remain raises competition and predation, and shallow riffles can block adult migration to upstream spawning grounds.',
  ],
  map: {
    mode: 'embeddedUrl',
    // Stands in for the ArcGIS web app PSP would paste here.
    url: LOW_FLOW_MAP_EMBED,
    title: 'Summer low flow salmon analysis streamgages',
    caption: `Unregulated streamgages in the salmon analysis: ${sharedGauges} shared with the Vital Sign Indicator and ${addedGauges} added on lowland streams with mapped coho and steelhead rearing reaches.`,
  },
  chart: {
    mode: 'image',
    src: '/photos/shi/summer-low-flow-salmon-chart.svg',
    alt: `Stacked column chart, ${FIRST_YEAR} to ${LAST_YEAR}: the number of the ${LOW_FLOW_GAUGES.length} salmon analysis gauges with a below-normal summer rises from 0 in ${FIRST_YEAR} to ${belowNormalLastYear} in ${LAST_YEAR}, split between Vital Sign Indicator gauges and gauges added for salmon.`,
    width: 960,
    height: 480,
    caption:
      'Gauges with a below-normal summer: 50 percent or more of days from July 15 to October 31 with a 7-day mean daily flow below the 1948 to 1998 baseline 25th percentile.',
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
      standalone: { progress: 'Limited Data' },
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
      standalone: { progress: 'Getting Better', targetStatus: 'Below Target' },
      field: {
        enabled: switches('importanceToSalmon', 'description', 'keyResults', 'datasets'),
        importanceToSalmon: [
          'Culverts that are too steep, too small, or perched above the stream keep adults from spawning grounds and juveniles from upstream rearing habitat.',
        ],
        description:
          'Miles of potential salmon habitat upstream of corrected barriers, compared with the miles still blocked.',
        keyResults: [
          'Corrections since 2013 have reopened about 1,140 miles of potential salmon habitat, more than half of it on state highway crossings.',
          'Roughly 6,800 known barriers remain on salmon-bearing streams in Puget Sound, most on county and private roads.',
        ],
        datasets: [
          { name: 'Fish Passage and Diversion Screening Inventory', steward: 'Washington Department of Fish and Wildlife' },
          { name: 'Fish passage correction projects, state highways', steward: 'Washington State Department of Transportation' },
        ],
      },
    },
  },
];

export const SHI_BY_SLUG = Object.fromEntries(
  SALMON_HABITAT_INDICATORS.map((i) => [i.slug, i]),
) as Record<string, SalmonHabitatIndicator>;

// ── Link targets (DELTA-1347: VSI and VSI+ open their VSI page, SHI
//    its standalone page) ──────────────────────────────────────────────────
/** Indicators with an in-prototype Vital Sign Indicator page. */
export const VSI_DETAIL_SLUGS = ['eelgrass-area', 'floodplain-function', 'summer-low-flow'] as const;
/** SHI indicators with an in-prototype standalone page (all of them). */
export const STANDALONE_SLUGS = ['large-wood', 'fish-passage'] as const;
/** Indicators with an in-prototype Complete Indicator Report. */
export const REPORT_SLUGS = [...VSI_DETAIL_SLUGS, ...STANDALONE_SLUGS] as const;

const builtHere = (list: readonly string[], slug: string) => list.includes(slug);

export const vsiHref = (i: PugetSoundIndicator): string | undefined => {
  if (!i.vitalSignIndicator) return undefined;
  return builtHere(VSI_DETAIL_SLUGS, i.slug)
    ? shiRoutes.vsi(i.slug)
    : `${VS_SITE}/VitalSignIndicator/Detail/${i.vitalSignIndicator.id}`;
};

export const isStandalone = (i: SalmonHabitatIndicator): boolean =>
  i.salmonHabitatIndicator.relationship === 'independent';

/** Where an SHI's name links: its VSI page (VSI and VSI+) or its standalone page (SHI). */
export const shiHref = (i: SalmonHabitatIndicator): string =>
  isStandalone(i) ? shiRoutes.standalone(i.slug) : vsiHref(i)!;

/** The Complete Indicator Report: in-prototype when built, else prod. */
export const completeReportHref = (i: PugetSoundIndicator): string =>
  builtHere(REPORT_SLUGS, i.slug) || !i.vitalSignIndicator
    ? shiRoutes.report(i.slug)
    : `${PSINFO_SITE}/Indicator/Detail/${i.vitalSignIndicator.id}`;

/** Status and trend: the VSI's for VSI and VSI+, the SHI's own for SHI. */
export const shiStatus = (i: SalmonHabitatIndicator): { progress: ProgressLabel; targetStatus?: TargetStatusLabel } =>
  i.salmonHabitatIndicator.standalone ?? { progress: i.vitalSignIndicator!.progress };

export const vitalSignHref = (v: VitalSignRef) => `${VS_SITE}/VitalSign/Detail/${v.id}`;
export const goalHref = (v: VitalSignRef) => `${VS_SITE}/VitalSignGoal/Detail/${v.goalId}`;

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
  /** Indicator trend (prod's progress label) and its icon file. */
  progress: ProgressLabel;
  progressIcon: string;
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
  progress: shiStatus(i).progress,
  progressIcon: PROGRESS_ICON[shiStatus(i).progress],
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
    measurementUnit: 'Acre (acres)',
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
    measurementUnit: 'Percent (%)',
    importance: [
      'When flows in streams and rivers diminish, it places pressure on municipal, residential, industrial, and agricultural water supplies. Keeping track of flows in the summer, the driest and warmest time of year, helps resource managers and communities create strategies that help to minimize or mitigate declining flows where possible and respond to climate change.',
      'Below normal summer flows also adversely affect fish and wildlife habitats. During the period of summer low flows, there are several salmon and other species at various life stages in Puget Sound streams and rivers. Low flows have the potential to impact habitat capacity for rearing juvenile salmon and can prevent access to, and reduce the availability of, adult spawning areas.',
    ],
    monitoringProgram: 'Streamflow Monitoring Program, Washington Department of Ecology',
    methods: [
      'Summer flows in streams and rivers occur at the time of year characterized by warm temperatures, little rainfall, and depleted snowpacks. This coincides with the time when water demands are greatest, despite that supply is lowest. The USGS Groundwater and Streamflow Information Program collects streamflow data through a network of streamgages that continuously monitor streams, which report mean daily flows year-round and are available online. From these streamflow records, 7-day mean daily streamflows were computed and serves as the basis for this analysis.',
      'This indicator reports on the number of days during the summer period (July 15 through October 31) that a stream’s 7-day mean daily flow falls below “normal” relative to the baseline data for that river. Normal flows are defined by conditions observed over a 50-year baseline, from 1948 to 1998.',
    ],
  },
  {
    indicatorSlug: 'floodplain-function',
    description:
      'This indicator measures the amount (acres and percent) of floodplain area in functional condition in Puget Sound’s 17 major rivers. Floodplain function is assessed at a regional scale using river connectivity and land use and cover. Areas that have natural land cover and unrestricted river flow are expected to be the most functional and provide the most ecosystem services. Floodplain function is impaired in areas with non-natural land cover or restricted river flow due to constraints or barriers (for example, roads, railroads, and levees).',
    chart: {
      src: '/photos/shi/floodplain-function-chart.svg',
      alt: 'Bar chart of floodplain area in acres by condition category, 2011 baseline beside the circa 2021 update. Connected natural land cover rises from 158,160 to 166,294 acres; connected not natural falls from 60,852 to 56,285; disconnected natural rises from 55,122 to 57,052; disconnected not natural falls from 168,300 to 163,374.',
      width: 960,
      height: 480,
      caption:
        'Floodplain condition assessment across Puget Sound’s 17 major rivers. Total area in acres for the four categories of floodplain condition at two time periods: 2011 baseline and circa 2021 update.',
    },
    keyResults: [
      'Puget Sound’s 17 major rivers include more than 440,000 acres of floodplain. Over half (55 percent) of the region’s floodplain area is found in three of the 17 major rivers: Skagit, Snohomish, and Nooksack Rivers.',
      'Across the region, 38 percent (166,294 acres) of the total floodplain area is highly functional (Category A - Connected Natural Land Cover). The remaining 62 percent has reduced floodplain function. This includes 163,374 acres (37 percent of the total floodplain area) where the floodplain is disconnected and classified as developed, cultivated, or other non-natural land cover (Category D - Disconnected Not Natural Land Cover).',
      'A comparison of floodplain conditions between 2011 and circa 2021, showed the greatest change occurred in Category A (connected natural land cover), with an increase of 8,134 acres. This includes changes in connectivity, land cover, or both. The total area of Category D (disconnected non-natural land cover) declined by 4,925 acres.',
      'Connected floodplain area [including natural (Category A) and non-natural land cover (Category B)] increased by 3,567 acres since the 2011 assessment. While this points to improving progress in floodplain function, the change in connectivity affects less than 1 percent of the total floodplain area and extensive portions of historical habitat remain lost or degraded across Puget Sound.',
      'Changes in connectivity between the two time periods largely reflect reconnection projects, including areas associated with the Nisqually Delta Restoration, Dungeness River Reconnection, and Smith Island Estuarine Restoration in the Snohomish River.',
    ],
    target: 'No targets are currently set for this indicator.',
    dataSource: 'Floodplains Conditions Assessment (Environmental Science Associates and Puget Sound Partnership 2023)',
    reporter: {
      name: 'Kenna Kuhn',
      email: 'kenna.kuhn@psp.wa.gov',
      organization: 'Puget Sound Partnership',
      organizationHref: `${PSINFO_SITE}/Organization/Detail/2`,
    },
    lastUpdated: '09/11/2023',
    partners: [
      { name: 'Environmental Science Associates', href: `${PSINFO_SITE}/Organization/Detail/1` },
      { name: 'Puget Sound Partnership', href: `${PSINFO_SITE}/Organization/Detail/2` },
    ],
    measurementUnit: 'Acre (acres)',
    importance: [
      'Floodplains are an important part of the Puget Sound landscape, particularly in the lowlands along large rivers. They are used by people for cities, farms, and transportation. Floodplains provide critical habitat for fish and wildlife, which in turn play a role in human wellbeing, meeting economic, cultural, and recreational needs.',
      'During floods, a wide, connected floodplain allows the river to move and reduces damage to nearby areas by absorbing stormwater and routing water through river corridors while also holding some water to recharge groundwater reserves.',
    ],
    monitoringProgram:
      'The Puget Sound Partnership and its partners are responsible for developing, maintaining, and updating these data in coordination with Lead Entities.',
    methods: [
      'This indicator describes floodplain function in Puget Sound’s 17 major river watersheds based on river connectivity and categories of land use and land cover. We assessed floodplain conditions at two time periods: a 2011 baseline and a circa 2021 update. The update allows for a more recent assessment of floodplain status and supports the analysis of trends in Puget Sound floodplain function.',
    ],
  },
];

export const VSI_DETAIL_BY_SLUG = Object.fromEntries(
  VSI_DETAILS.map((d) => [d.indicatorSlug, d]),
) as Record<string, VsiDetail>;

// ── SHI standalone pages (everything below is invented) ────────────────
// The panel set for a standalone page is still open with PSP (asked
// 2026-10-16). These records fill the Vital Sign Indicator page's panels so
// the layout can be judged; none of it is a decided panel list.
const PARTNER_WDFW: VsiPartner = { name: 'Washington Department of Fish and Wildlife', href: `${PSINFO_SITE}/Organization/Detail/14` };
const PARTNER_WSDOT: VsiPartner = { name: 'Washington State Department of Transportation', href: `${PSINFO_SITE}/Organization/Detail/21` };
const PARTNER_NWIFC: VsiPartner = { name: 'Northwest Indian Fisheries Commission', href: `${PSINFO_SITE}/Organization/Detail/33` };

export const STANDALONE_DETAILS: VsiDetail[] = [
  {
    indicatorSlug: 'fish-passage',
    description:
      'This indicator tracks how many miles of potential salmon habitat have been reopened by correcting fish passage barriers at road crossings, and how many miles remain blocked. A barrier is any culvert, dam, or other structure that keeps adult or juvenile salmon from moving up or down a stream.',
    chart: {
      src: '/photos/shi/fish-passage-chart.svg',
      alt: 'Bar chart of cumulative miles of potential salmon habitat reopened by barrier corrections, 2013 to 2024, rising from 60 miles in 2013 to about 1,140 miles in 2024, with the steepest gains after 2019.',
      width: 960,
      height: 480,
      caption:
        'Cumulative miles of potential salmon habitat upstream of corrected fish passage barriers in Puget Sound watersheds, 2013 to 2024, all road owners combined.',
    },
    keyResults: [
      'Barrier corrections since 2013 have reopened about 1,140 miles of potential salmon habitat. Gains accelerated after 2019, when correction work on state highway crossings expanded.',
      'Roughly 6,800 known barriers remain on salmon-bearing streams in Puget Sound. Most sit on county roads, city streets, and private roads, where corrections have moved more slowly.',
      'Corrections are uneven across watersheds. The Snohomish, Stillaguamish, and Skagit account for nearly half of the miles reopened.',
    ],
    target: 'By 2030, reopen 2,000 miles of potential salmon habitat blocked by road crossings.',
    dataSource: 'Fish Passage and Diversion Screening Inventory, Washington Department of Fish and Wildlife',
    reporter: {
      name: 'Dana Whitcomb',
      email: 'dana.whitcomb@example.org',
      organization: 'Washington Department of Fish and Wildlife',
      organizationHref: PARTNER_WDFW.href,
    },
    lastUpdated: '06/30/2026',
    partners: [PARTNER_WDFW, PARTNER_WSDOT],
    measurementUnit: 'Mile (miles)',
    monitoringProgram: 'Fish Passage Program, Washington Department of Fish and Wildlife',
    methods: [
      'Barriers are inventoried and assessed in the field against state passability criteria. When a barrier is corrected, the miles of potential habitat upstream, up to the next barrier or natural limit, are credited in the year the project is completed.',
    ],
  },
  {
    indicatorSlug: 'large-wood',
    description:
      'This indicator counts pieces of large wood and log jams per 100 meters of channel in salmon-bearing reaches, summarized by watershed. Large wood is a log at least 10 centimeters across and 2 meters long lying in or over the active channel.',
    chart: {
      src: '/photos/shi/large-wood-chart.svg',
      alt: 'Bar chart of large wood pieces per 100 meters of channel in eight watersheds surveyed in 2024, ranging from 6 in the Lake Washington basin to 31 in the Dungeness, against a reference condition of about 40 pieces.',
      width: 960,
      height: 480,
      caption:
        'Pieces of large wood per 100 meters of channel in salmon-bearing reaches of eight watersheds surveyed in 2024. The dashed line marks the reference condition for unmanaged forested streams of similar size.',
    },
    keyResults: [
      'All eight surveyed watersheds hold less large wood than the reference condition for unmanaged forested streams.',
      'Watersheds with large areas of protected forest in their headwaters, such as the Dungeness and Elwha, hold the most wood per 100 meters.',
      'Results are limited to the reaches surveyed in 2024 and cannot yet be compared over time.',
    ],
    target: 'No targets are currently set for this indicator.',
    dataSource: 'Stream habitat surveys compiled by the Northwest Indian Fisheries Commission',
    reporter: {
      name: 'Marisol Ortega',
      email: 'mortega@example.org',
      organization: 'Northwest Indian Fisheries Commission',
      organizationHref: PARTNER_NWIFC.href,
    },
    lastUpdated: '03/12/2026',
    partners: [PARTNER_NWIFC, PARTNER_WDFW],
    measurementUnit: 'Count (pieces per 100 meters)',
  },
];

/** Every detail record by indicator slug (VSI pages, reports, standalone pages). */
export const DETAIL_BY_SLUG = Object.fromEntries(
  [...VSI_DETAILS, ...STANDALONE_DETAILS].map((d) => [d.indicatorSlug, d]),
) as Record<string, VsiDetail>;

// ── Indicator tables (DELTA-1346): the prod goal tree with SHIs marked ────
/** The prod goal data, with SHI rows pointing at their prototype pages and
 *  each SHI SHI added under its Vital Sign (SHIs appear on All Vital Sign
 *  Indicators, 2026-10-16). */
export const SHI_GOALS: GoalDetail[] = GOALS.map((goal) => ({
  ...goal,
  vitalSigns: goal.vitalSigns.map((vsign) => {
    const indicators = vsign.indicators.map((ind) => {
      const id = Number(ind.href.match(/VitalSignIndicator\/Detail\/(\d+)/)?.[1]);
      const shi = SHI_BY_VSI_ID[id];
      return shi ? { ...ind, href: vsiHref(shi)! } : ind;
    });
    const standalones = SALMON_HABITAT_INDICATORS.filter(
      (i) => isStandalone(i) && vitalSignHref(i.vitalSign) === vsign.href,
    ).map((i) => ({ name: i.name, href: shiRoutes.standalone(i.slug), ...shiStatus(i) }));
    return { ...vsign, indicators: [...indicators, ...standalones].sort((a, b) => a.name.localeCompare(b.name)) };
  }),
}));

/** Indicator hrefs (as SHI_GOALS carries them) that get the SHI mark. */
export const SHI_MARKED_HREFS: string[] = SALMON_HABITAT_INDICATORS.map(shiHref);

// ── List view (DELTA-1347): the grid rows grouped by habitat, in the
//    graphic's order from headwaters to the open Sound ───────────────────────
const LIST_ORDER: HabitatCategorySlug[] = [
  'stream-structure', 'freshwater', 'streams-floodplains', 'estuaries', 'beaches-marine-vegetation', 'marine-water',
];
export const SHI_LIST_GROUPS = LIST_ORDER.map((slug) => ({
  slug,
  label: CATEGORY_BY_SLUG[slug].label,
  rows: SHI_GRID_ROWS.filter((r) => r.category === slug),
}));
