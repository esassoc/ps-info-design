// shi-domain.ts — the Salmon Habitat Indicator (SHI) domain model.
//
// One shared base entity, the Puget Sound Indicator. An indicator carries a
// Vital Sign Indicator facet, a Salmon Habitat Indicator facet, or both — the
// same shape as prod's PugetSoundIndicator with its 1:1 VitalSignIndicator /
// ProgressIndicator wrappers. Every SHI nests under an existing Vital Sign.
//
// Three relationship types (PSP's own vocabulary):
//   VSI   same analysis; the VSI gains an "Importance to Salmon" subfield
//   VSI+  extra salmon analysis; the SHI gets its own report page
//   SHI   no VSI analog yet; still sits under a Vital Sign
//
// The Salmon Habitat Indicator field is ONE new section on the indicator
// report (PSP's preferred option), made of subfields that are switched on or
// off per indicator.

import type { ProgressLabel } from './pages/goals';

// ── Relationship to the Vital Sign Indicator ───────────────────────────────
export type ShiRelationship = 'same' | 'extended' | 'independent';

export const SHI_RELATIONSHIP_LABEL: Record<ShiRelationship, string> = {
  same: 'VSI',
  extended: 'VSI+',
  independent: 'SHI',
};

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
  { key: 'chart', label: 'SHI Chart' },
  { key: 'description', label: 'SHI Description' },
  { key: 'keyResults', label: 'Key SHI Results' },
  { key: 'methods', label: 'SHI Methods' },
  { key: 'interpretation', label: 'Interpretation of Results' },
  { key: 'additionalInformation', label: 'Additional Information' },
  { key: 'datasets', label: 'Datasets' },
  { key: 'reportingGuidance', label: 'Reporting Guidance' },
];

export interface ShiChart {
  kind: 'gauge-grid';
  /** Streamgages in the salmon analysis (the VSI analysis uses a subset). */
  gauges: ShiGauge[];
  firstYear: number;
  lastYear: number;
  caption: string;
}

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

export interface ShiDataset {
  name: string;
  steward: string;
}

/** Content of the Salmon Habitat Indicator field. A subfield renders only when
 *  it is switched on in `enabled` AND carries content. */
export interface SalmonHabitatIndicatorField {
  enabled: Record<ShiSubfield, boolean>;
  importanceToSalmon?: string[];
  chart?: ShiChart;
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
  logo: string;
  href: string;
}

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
}
