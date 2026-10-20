// shi-domain.ts — the Salmon Habitat Indicator (SHI) domain model.
//
// One shared base entity, the Puget Sound Indicator. An indicator carries a
// Vital Sign Indicator facet, a Salmon Habitat Indicator facet, or both — the
// same shape as prod's PugetSoundIndicator with its 1:1 VitalSignIndicator /
// ProgressIndicator wrappers. Every SHI nests under an existing Vital Sign.
//
// Three types (kickoff 2026-10-13):
//   VSI  same as the VSI; the VSI page gains "Importance to Salmon" and
//           shares the VSI's status and trend
//   VSI+  VSI Plus: the VSI plus a salmon metric, reported in the Salmon
//           Habitat Indicator field of the Complete Indicator Report; shares
//           the VSI's status and trend
//   SHI  standalone: its own page with its own status and trend; still
//           sits under a Vital Sign
//
// The Salmon Habitat Indicator field is ONE new section on the indicator
// report (PSP's preferred option), made of subfields that are switched on or
// off per indicator.

import type { ProgressLabel, TargetStatusLabel } from './pages/goals';

// ── Relationship to the Vital Sign Indicator ───────────────────────────────
/** Internal only (VSI / VSI+ / SHI): never shown to public users, kickoff
 *  2026-10-13 ("I don't think they need to know type"). */
export type ShiRelationship = 'same' | 'extended' | 'independent';

/** The label the SHI mark carries everywhere it appears (never the icon alone). */
export const SHI_MARK_LABEL = 'Salmon Habitat Indicator';

// ── Habitat categories (the six landing-page buttons) ──────────────────────
export type HabitatCategorySlug =
  | 'beaches-marine-vegetation'
  | 'estuaries'
  | 'marine-water'
  | 'freshwater'
  | 'streams-floodplains'
  | 'stream-structure';

/** The deck groups the six buttons into three colors whose meaning PSP has not
 *  defined yet. The group is stored as its color name only; the fill comes
 *  from a --shi-category-* token so a decision is a one-line theme change. */
export type HabitatColorGroup = 'purple' | 'green' | 'blue';

export interface HabitatCategory {
  slug: HabitatCategorySlug;
  label: string;
  colorGroup: HabitatColorGroup;
}

// ── Vital Sign (parent of every SHI) ───────────────────────────────────────
export interface VitalSignRef {
  /** Prod VitalSign/Detail/{id}. */
  id: number;
  name: string;
  /** --ps-info-goal-* token of the goal the Vital Sign rolls up to. */
  goalHueVar: string;
  goalName: string;
  /** Prod VitalSignGoal/Detail/{id}. */
  goalId: number;
}

// ── The Salmon Habitat Indicator field and its subfields ───────────────────
export type ShiSubfield =
  | 'importanceToSalmon'
  | 'map'
  | 'chart'
  | 'description'
  | 'keyResults'
  | 'methods'
  | 'interpretation'
  | 'additionalInformation'
  | 'datasets'
  | 'reportingGuidance';

/** Subfield order and labels, as listed in the deck. */
export const SHI_SUBFIELDS: { key: ShiSubfield; label: string }[] = [
  { key: 'importanceToSalmon', label: 'Importance to Salmon' },
  { key: 'map', label: 'SHI Map' },
  { key: 'chart', label: 'SHI Chart' },
  { key: 'description', label: 'SHI Description' },
  { key: 'keyResults', label: 'Key SHI Results' },
  { key: 'methods', label: 'SHI Methods' },
  { key: 'interpretation', label: 'Interpretation of Results' },
  { key: 'additionalInformation', label: 'Additional Information' },
  { key: 'datasets', label: 'Datasets' },
  { key: 'reportingGuidance', label: 'Reporting Guidance' },
];

/** A streamgage in the Summer low flow salmon analysis (mock source data
 *  behind the SHI Chart image and the embedded SHI Map). */
export interface ShiGauge {
  name: string;
  /** USGS station number. */
  station: string;
  source: 'rain' | 'transitional' | 'snow';
  /** True when the gauge is also one of the Vital Sign Indicator's gauges. */
  inVsi: boolean;
  /** Percent of summer days below normal, one value per year. */
  pctBelowNormal: number[];
}

/** A point on the embedded map (a monitoring site). */
export interface ShiMapPoint {
  name: string;
  lat: number;
  lon: number;
  /** Shared with the Vital Sign Indicator, or added for the salmon metric. */
  set: 'shared' | 'added';
}

/** prod Indicator/Detail Map box (EditPugetSoundIndicatorMapViewModel): an
 *  uploaded Image or an Embedded Url (an ArcGIS web app in an iframe), each
 *  with a caption and an optional external map link. */
export type IndicatorMap = (
  | { mode: 'embeddedUrl'; url: string; /** iframe title */ title: string; height?: number }
  | { mode: 'image'; src: string; alt: string; width: number; height: number }
) & {
  caption?: string;
  externalLink?: { name: string; url: string };
};

/** prod Indicator/Detail Chart box (PugetSoundIndicatorChartType): Chart
 *  Image, Chart URL, Embedded HTML File or No Data, each with a caption.
 *  Data (the live Google Chart from reported values) is not mocked. */
export type IndicatorChart = (
  | { mode: 'image'; src: string; alt: string; width: number; height: number }
  | { mode: 'embedUrl' | 'htmlFile'; src: string; /** iframe title */ title: string; height?: number }
  | { mode: 'noData' }
) & { caption?: string };

export interface ShiDataset {
  name: string;
  steward: string;
}

/** Content of the Salmon Habitat Indicator field. A subfield renders only when
 *  it is switched on in `enabled` AND carries content. */
export interface SalmonHabitatIndicatorField {
  enabled: Record<ShiSubfield, boolean>;
  importanceToSalmon?: string[];
  map?: IndicatorMap;
  chart?: IndicatorChart;
  description?: string;
  keyResults?: string[];
  methods?: string[];
  interpretation?: string[];
  additionalInformation?: string[];
  datasets?: ShiDataset[];
  reportingGuidance?: string[];
}

// ── The two facets ─────────────────────────────────────────────────────────
export interface VitalSignIndicatorFacet {
  /** Prod VitalSignIndicator/Detail/{id}. */
  id: number;
  progress: ProgressLabel;
}

export interface SalmonHabitatIndicatorFacet {
  relationship: ShiRelationship;
  category: HabitatCategorySlug;
  field: SalmonHabitatIndicatorField;
  /** SHI only: its own status and trend, set by an admin. VSI and VSI+
   *  read the Vital Sign Indicator's. */
  standalone?: { progress: ProgressLabel; targetStatus?: TargetStatusLabel };
}

// ── The shared base entity ─────────────────────────────────────────────────
export interface PugetSoundIndicator {
  slug: string;
  name: string;
  /** One-sentence description shown in the indicator table. */
  summary: string;
  vitalSign: VitalSignRef;
  vitalSignIndicator?: VitalSignIndicatorFacet;
  salmonHabitatIndicator?: SalmonHabitatIndicatorFacet;
}

/** A Puget Sound Indicator that is a Salmon Habitat Indicator. */
export type SalmonHabitatIndicator = PugetSoundIndicator & {
  salmonHabitatIndicator: SalmonHabitatIndicatorFacet;
};

export const isShi = (i: PugetSoundIndicator): i is SalmonHabitatIndicator =>
  i.salmonHabitatIndicator !== undefined;

// ── Vital Sign Indicator detail page (prod VitalSignIndicator/Detail) ──────
export interface VsiChartImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export interface VsiReporter {
  name: string;
  email: string;
  organization: string;
  organizationHref: string;
}

export interface VsiPartner {
  name: string;
  /** public/ path; partners without a logo on file render as a text link. */
  logo?: string;
  href: string;
}

/** One indicator's detail record: the VitalSignIndicator/Detail page and the
 *  Complete Indicator Report (Indicator/Detail) read the same fields. A SHI
 *  SHI's standalone page uses the same record. */
export interface VsiDetail {
  /** Slug of the PugetSoundIndicator this page renders. */
  indicatorSlug: string;
  description: string;
  chart: VsiChartImage;
  keyResults: string[];
  target: string;
  dataSource: string;
  reporter: VsiReporter;
  lastUpdated: string;
  partners: VsiPartner[];
  /** Complete Indicator Report fields. */
  measurementUnit: string;
  importance?: string[];
  monitoringProgram?: string;
  methods?: string[];
  /** The rest of prod's report boxes, used by standalone SHI pages (PSP
   *  mock-up slides 8 to 10: same panels and subfields as a VSI's report). */
  criticalDefinitions?: string[];
  interpretation?: string[];
  causesForChange?: string[];
  references?: string[];
  externalLinks?: { label: string; href: string }[];
  datasets?: ShiDataset[];
  reportingGuidance?: string[];
  subcategories?: { name: string; options: string[] }[];
}
