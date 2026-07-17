// src/data/pages/goals.ts — content for the Goals unit (five recovery-goal
// pages, one dynamic template). Scraped verbatim 2026-07-17 from:
//   - https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/1  (Healthy Human Population)
//   - https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/2  (Vibrant Human Quality of Life)
//   - https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/3  (Thriving Species and Food Web)
//   - https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/7  (Functioning Habitat)
//   - https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/6  (Healthy Water Quality)
//
// Each Detail/N page is server-rendered ASP.NET with two content sources:
//   1. The visible page body — goal name, theme color, the bold "Our goal is…"
//      statement, one narrative paragraph, and one inline photograph.
//   2. An embedded `treeSources` JS array (feeds the page's Fancytree grid) —
//      the goal's full Vital Sign → Indicator hierarchy, each indicator's
//      "Indicator Progress" trend label and (where the source shows one) its
//      "Target Status" label. This is the authoritative, structured source
//      for every Vital Sign/indicator name and status on the page — the tree
//      itself is never rendered as a visible table on Detail/N, only used to
//      seed the grid, but its data IS the page's content.
//
// Every string is verbatim from those two sources except: (a) incidental
// trailing/leading whitespace inside source `<a>` text is trimmed (e.g. the
// source literally ships "Abundance of terrestrial bird populations " with a
// trailing space — trimmed, wording otherwise untouched), and (b) each
// `imageAlt` is AUTHORED here for accessibility — the source ships every
// inline photo with `alt=""`, so there is no source alt text to preserve.
//
// NOT extracted (gap): no goal on Detail/N states a numeric target — "any
// targets" on this page surfaces only as the per-indicator Target Status tag
// (Near Or At Target / Below Target), captured on `GoalIndicator.targetStatus`.
// No Vital Sign carries its own description/blurb on this page (that content,
// if it exists, lives one level down on /VitalSign/Detail/{id}, out of scope
// for this unit).

// ── Progress / target-status vocabulary (verbatim source labels) ──────────
// "Indicator Progress" — the trend since the last reporting cycle.
export type ProgressLabel =
  | 'Getting Better'
  | 'Mixed Results'
  | 'No Trend'
  | 'Getting Worse'
  | 'Limited Data'
  | 'Indicator To Be Developed';

// "Target Status" — shown only for indicators the source ties to a numeric
// target; most indicators carry no target and so have none.
export type TargetStatusLabel = 'Near Or At Target' | 'Below Target';

/** Presentational tone for each progress label (authored here for badge
 *  rendering — not part of the source vocabulary, which has no color/tone
 *  concept beyond its own status-icon PNGs). */
export const PROGRESS_TONE: Record<ProgressLabel, 'success' | 'info' | 'neutral' | 'warning' | 'danger'> = {
  'Getting Better': 'success',
  'Mixed Results': 'info',
  'No Trend': 'neutral',
  'Getting Worse': 'danger',
  'Limited Data': 'neutral',
  'Indicator To Be Developed': 'neutral',
};

/** Presentational tone for each target-status label. */
export const TARGET_STATUS_TONE: Record<TargetStatusLabel, 'success' | 'info' | 'neutral' | 'warning' | 'danger'> = {
  'Near Or At Target': 'success',
  'Below Target': 'warning',
};

// ── Shared source links (identical across all five Detail/N pages) ────────
export const VITAL_SIGNS_SITE = 'https://vitalsigns.pugetsoundinfo.wa.gov';
export const ABOUT_VITAL_SIGNS_URL = `${VITAL_SIGNS_SITE}/About`;
export const ALL_INDICATORS_URL = `${VITAL_SIGNS_SITE}/VitalSignIndicator/ViewAll`;

// ── Types ───────────────────────────────────────────────────────────────
export interface GoalIndicator {
  name: string;
  /** Absolute URL — VitalSignIndicator/Detail/{id} lives outside this prototype. */
  href: string;
  progress: ProgressLabel;
  targetStatus?: TargetStatusLabel;
}

export interface GoalVitalSign {
  name: string;
  /** Absolute URL — VitalSign/Detail/{id} lives outside this prototype. */
  href: string;
  indicators: GoalIndicator[];
}

export type GoalSlug =
  | 'healthy-human-population'
  | 'vibrant-human-quality-of-life'
  | 'thriving-species-and-food-web'
  | 'functioning-habitat'
  | 'healthy-water-quality';

export interface GoalDetail {
  slug: GoalSlug;
  /** Source VitalSignGoal/Detail/{id} — kept for provenance, not routed to. */
  sourceGoalId: number;
  /** psinfo-nav.ts leaf id for the "Goals" module (marks the rail active item). */
  navLeafId: string;
  /** --ps-info-goal-* token name (matches the source's own ThemeColor, confirmed
   *  byte-for-byte against src/styles/theme-ps-info.css). */
  hueVar: string;
  /** Source ThemeColor hex, kept for provenance/sanity-check against hueVar. */
  themeColor: string;
  name: string;
  /** The bold "Our goal is…" statement — the page's mission-line lede. */
  statement: string;
  /** The narrative paragraph beneath the statement. */
  narrative: string;
  /** public/ path of the goal's inline photograph. */
  image: string;
  /** Authored alt text (source ships alt=""); see file header. */
  imageAlt: string;
  vitalSigns: GoalVitalSign[];
}

// ── Data ────────────────────────────────────────────────────────────────
export const GOALS: GoalDetail[] = [
  {
    slug: 'healthy-human-population',
    sourceGoalId: 1,
    navLeafId: 'goal-population',
    hueVar: '--ps-info-goal-population',
    themeColor: '#498230',
    name: 'Healthy Human Population',
    statement: 'Our goal is a healthy population supported by a healthy Puget Sound that is not threatened by changes in the ecosystem.',
    narrative: 'Spending time in nature and harvesting local foods provide valuable health and cultural benefits. Ensuring water quality affects safe swimming beaches, and maintenance of healthy and harvestable shellfish, which is essential to Tribal cultural practices, local recreation activities, and economic and ecosystem services.',
    image: '/photos/goals/healthy-human-population.jpg',
    imageAlt: 'People fishing side by side off a pier over Puget Sound.',
    vitalSigns: [
      { name: 'Air Quality', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/2', indicators: [
        { name: 'Exposure to impaired air quality', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/1', progress: 'Mixed Results' },
      ] },
      { name: 'Drinking Water', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/3', indicators: [
        { name: 'Index of Vulnerability for Elevated Nitrates in Groundwater', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/53', progress: 'Mixed Results' },
        { name: 'Nitrate concentration in source water', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/6', progress: 'No Trend' },
      ] },
      { name: 'Local Foods', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/4', indicators: [
        { name: 'Bivalve harvest for personal use', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/24', progress: 'No Trend' },
        { name: 'Dungeness crab catch for personal use', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/52', progress: 'Getting Worse' },
        { name: 'Locally harvestable foods', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/23', progress: 'No Trend' },
      ] },
      { name: 'Outdoor Activity', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/6', indicators: [
        { name: 'Condition of swimming beaches', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/35', progress: 'Mixed Results', targetStatus: 'Near Or At Target' },
        { name: 'Nature-based recreation', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/33', progress: 'No Trend' },
        { name: 'Nature-based work', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/34', progress: 'No Trend' },
      ] },
      { name: 'Shellfish Beds', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/7', indicators: [
        { name: 'Area of harvestable shellfish beds', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/40', progress: 'Getting Worse', targetStatus: 'Below Target' },
      ] },
    ],
  },
  {
    slug: 'vibrant-human-quality-of-life',
    sourceGoalId: 2,
    navLeafId: 'goal-quality',
    hueVar: '--ps-info-goal-quality',
    themeColor: '#C55016',
    name: 'Vibrant Human Quality of Life',
    statement: 'Our goal is a quality of human life that is sustained by a functioning Puget Sound ecosystem.',
    narrative: 'A healthy Puget Sound ecosystem contributes to human wellbeing by providing access to nature and green space, opportunities for recreation, and economic prosperity. Tribal cultures depend on the ability to exercise treaty rights to fish, gather plants, and hunt for subsistence, cultural, spiritual, ceremonial, and medicinal needs.',
    image: '/photos/goals/vibrant-human-quality-of-life.jpg',
    imageAlt: 'Children running along a Puget Sound tideflat with the Olympic Mountains in the distance.',
    vitalSigns: [
      { name: 'Cultural Wellbeing', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/21', indicators: [
        { name: 'Participation in cultural practices', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/5', progress: 'No Trend' },
      ] },
      { name: 'Economic Vitality', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/22', indicators: [
        { name: 'Employment in natural resource industries', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/8', progress: 'Mixed Results' },
        { name: 'Natural resource industry output', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/9', progress: 'Mixed Results' },
        { name: 'Percent of employment in natural resource industries', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/7', progress: 'No Trend' },
      ] },
      { name: 'Good Governance', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/23', indicators: [
        { name: 'Good Governance Index', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/18', progress: 'No Trend' },
      ] },
      { name: 'Sense of Place', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/24', indicators: [
        { name: 'Overall life satisfaction', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/37', progress: 'No Trend' },
        { name: 'Psychological Wellbeing Index', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/38', progress: 'No Trend' },
        { name: 'Sense of Place Index', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/39', progress: 'No Trend' },
      ] },
      { name: 'Sound Stewardship', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/25', indicators: [
        { name: 'Engagement in stewardship activities', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/44', progress: 'No Trend' },
        { name: 'Sound Behavior Index', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/45', progress: 'Getting Better' },
      ] },
    ],
  },
  {
    slug: 'thriving-species-and-food-web',
    sourceGoalId: 3,
    navLeafId: 'goal-species',
    hueVar: '--ps-info-goal-species',
    themeColor: '#db2365',
    name: 'Thriving Species and Food Web',
    statement: 'Our goal is healthy and sustaining populations of native species in Puget Sound, including a robust food web.',
    narrative: 'A diverse and resilient food web allows for healthy and sustaining populations of native species in Puget Sound. Iconic and economically important species, like orcas and salmon, are still far from recovery goals. Healthy habitats, water quality, and the dynamic relationships between species must be restored and preserved to ensure a thriving food web.',
    image: '/photos/goals/thriving-species-and-food-web.jpg',
    imageAlt: 'An orca breaching Puget Sound waters with the San Juan Islands in the background.',
    vitalSigns: [
      { name: 'Birds', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/17', indicators: [
        { name: 'Abundance of marine bird populations', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/3', progress: 'Mixed Results' },
        { name: 'Abundance of terrestrial bird populations', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/2', progress: 'Getting Worse' },
        { name: 'Estuarine birds', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/86', progress: 'Indicator To Be Developed' },
      ] },
      { name: 'Forage Fish', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/33', indicators: [
        { name: 'Biomass of spawning Pacific Herring', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/36', progress: 'Mixed Results' },
        { name: 'Regional index of the stock presence and health of forage fish species', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/87', progress: 'Indicator To Be Developed' },
      ] },
      { name: 'Groundfish and Benthic Invertebrates', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/34', indicators: [
        { name: 'Abundance and biomass of benthic marine invertebrates', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/68', progress: 'Mixed Results' },
        { name: 'Abundance and biomass of groundfish', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/67', progress: 'Mixed Results' },
      ] },
      { name: 'Orcas', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/19', indicators: [
        { name: 'Number of Southern Resident killer whales', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/32', progress: 'Getting Worse', targetStatus: 'Below Target' },
        { name: 'Occupancy/residency of orcas in Puget Sound', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/69', progress: 'Indicator To Be Developed' },
      ] },
      { name: 'Salmon', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/32', indicators: [
        { name: 'Number of natural-origin Chinook salmon on spawning grounds', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/4', progress: 'Mixed Results', targetStatus: 'Below Target' },
        { name: 'Number of natural-origin coho salmon on spawning grounds', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/72', progress: 'No Trend' },
        { name: 'Number of natural-origin Puget Sound steelhead on spawning grounds', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/71', progress: 'No Trend' },
        { name: 'Number of natural-origin summer chum salmon on spawning grounds', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/70', progress: 'Getting Better' },
      ] },
      { name: 'Zooplankton', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/35', indicators: [
        { name: 'Annual average zooplankton biomass', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/90', progress: 'No Trend' },
        { name: 'Seasonal average zooplankton biomass', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/73', progress: 'No Trend' },
        { name: 'Zooplankton Index', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/79', progress: 'No Trend' },
      ] },
    ],
  },
  {
    slug: 'functioning-habitat',
    sourceGoalId: 7,
    navLeafId: 'goal-habitat',
    hueVar: '--ps-info-goal-habitat',
    themeColor: '#8228bf',
    name: 'Functioning Habitat',
    statement: 'Our goal is a healthy Puget Sound where marine, nearshore, estuary, freshwater, and upland habitats are protected, restored, and sustained.',
    narrative: 'Habitats are our shared natural heritage and create the quality of life that makes Puget Sound an attractive place to live, work, and play. Human activity and development have deeply changed the Puget Sound region, and climate change is more than ever impacting habitat critical for species and human wellbeing.',
    image: '/photos/goals/functioning-habitat.jpg',
    imageAlt: 'A forest stream running over rocks through old-growth trees.',
    vitalSigns: [
      { name: 'Beaches and Marine Vegetation', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/31', indicators: [
        { name: 'Drift cells in functional condition', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/81', progress: 'Indicator To Be Developed' },
        { name: 'Eelgrass Area', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/10', progress: 'Mixed Results' },
        { name: 'Extent of forest cover in nearshore marine riparian areas', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/64', progress: 'Indicator To Be Developed' },
        { name: 'Feeder bluffs in functional condition', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/63', progress: 'No Trend' },
        { name: 'Floating kelp bed area', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/62', progress: 'Getting Worse' },
        { name: 'Miles of intertidal beach in functional condition', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/88', progress: 'Indicator To Be Developed' },
        { name: 'Short and long-term change at eelgrass sites', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/61', progress: 'Mixed Results', targetStatus: 'Below Target' },
        { name: 'Understory kelp abundance and condition', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/82', progress: 'Indicator To Be Developed' },
      ] },
      { name: 'Estuaries', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/13', indicators: [
        { name: 'Estuary area in functional condition', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/65', progress: 'Getting Better' },
        { name: 'Number of accessible pocket estuaries and embayments', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/77', progress: 'Indicator To Be Developed' },
      ] },
      { name: 'Forests and Wetlands', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/30', indicators: [
        { name: 'Extent of forest cover in the upper, middle, and lower areas of watersheds', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/66', progress: 'Indicator To Be Developed' },
        { name: 'Forest condition', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/83', progress: 'Indicator To Be Developed' },
        { name: 'Wetlands extent and condition', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/84', progress: 'Indicator To Be Developed' },
      ] },
      { name: 'Streams and Floodplains', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/29', indicators: [
        { name: 'Changes in hydrologic regime in streams and rivers', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/89', progress: 'Indicator To Be Developed' },
        { name: 'Extent of forest cover in freshwater riparian zones', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/78', progress: 'Indicator To Be Developed' },
        { name: 'Floodplain function in large and small river systems', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/14', progress: 'Getting Better' },
        { name: 'Frequency of flood events', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/85', progress: 'Indicator To Be Developed' },
        { name: 'Summer low flow in streams and rivers', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/46', progress: 'Getting Worse' },
      ] },
    ],
  },
  {
    slug: 'healthy-water-quality',
    sourceGoalId: 6,
    navLeafId: 'goal-water',
    hueVar: '--ps-info-goal-water',
    themeColor: '#018470',
    name: 'Healthy Water Quality',
    statement: 'Our goal is waters and sediments of a sufficient quality to support human uses and enjoyment, and that are not harmful to native species.',
    narrative: 'From mountain peaks to the mouth of Puget Sound rivers to the Pacific Ocean, water connects different parts of the ecosystem. However, the condition of this key resource is at risk for all who depend on it.',
    image: '/photos/goals/healthy-water-quality.jpg',
    imageAlt: 'A wetland at golden hour, water threading through grasses and reflecting the trees around it.',
    vitalSigns: [
      { name: 'Freshwater', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/26', indicators: [
        { name: 'Freshwater Benthic Index of Biotic Integrity', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/16', progress: 'Getting Better' },
        { name: 'Nutrient concentration in streams and rivers', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/56', progress: 'Indicator To Be Developed' },
        { name: 'Water temperature in streams and rivers', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/55', progress: 'Indicator To Be Developed' },
      ] },
      { name: 'Marine Water', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/27', indicators: [
        { name: 'Dissolved oxygen in marine water', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/29', progress: 'Indicator To Be Developed' },
        { name: 'Marine Benthic Index', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/60', progress: 'Getting Worse' },
        { name: 'Marine water temperature', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/59', progress: 'Indicator To Be Developed' },
        { name: 'Noise in marine water', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/74', progress: 'Indicator To Be Developed' },
        { name: 'Nutrient balance in marine water', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/58', progress: 'Indicator To Be Developed' },
        { name: 'Ocean acidification', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/57', progress: 'Indicator To Be Developed' },
        { name: 'Primary production in marine water', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/75', progress: 'Indicator To Be Developed' },
        { name: 'Sediment Chemistry Index', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/27', progress: 'No Trend' },
      ] },
      { name: 'Toxics in Aquatic Life', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/28', indicators: [
        { name: 'Contaminants in adult salmon', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/47', progress: 'Limited Data', targetStatus: 'Below Target' },
        { name: 'Contaminants in caged mussels', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/76', progress: 'Indicator To Be Developed' },
        { name: 'Contaminants in English sole', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/48', progress: 'Mixed Results', targetStatus: 'Below Target' },
        { name: 'Contaminants in juvenile salmon', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/49', progress: 'Limited Data', targetStatus: 'Below Target' },
        { name: 'Contaminants in Pacific herring', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/50', progress: 'Getting Better', targetStatus: 'Below Target' },
      ] },
    ],
  },
];

export const GOALS_BY_SLUG: Record<GoalSlug, GoalDetail> = Object.fromEntries(
  GOALS.map((g) => [g.slug, g]),
) as Record<GoalSlug, GoalDetail>;

// ── Derived rollups (computed from the data above — nothing invented) ─────
export function vitalSignCount(goal: GoalDetail): number {
  return goal.vitalSigns.length;
}

export function indicatorCount(goal: GoalDetail): number {
  return goal.vitalSigns.reduce((n, vs) => n + vs.indicators.length, 0);
}

export function indicatorsByProgress(goal: GoalDetail): Partial<Record<ProgressLabel, number>> {
  const tally: Partial<Record<ProgressLabel, number>> = {};
  for (const vs of goal.vitalSigns) {
    for (const ind of vs.indicators) {
      tally[ind.progress] = (tally[ind.progress] ?? 0) + 1;
    }
  }
  return tally;
}
