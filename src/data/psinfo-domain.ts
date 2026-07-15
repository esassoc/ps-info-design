// psinfo-domain.ts — the domain content behind the prototype pages.
//
// Vocabulary is REAL Puget Sound recovery terminology (six statutory goals, the
// 22 Vital Signs by goal, the Action Agenda topic→strategy→commitment hierarchy).
// Quantities and statuses are INVENTED but domain-credible and deterministic —
// these repos and their sites are public, so nothing is lifted from client data.

export type IndicatorStatus =
  | 'on-track'
  | 'progress'
  | 'no-trend'
  | 'not-improving'
  | 'declining';

export const STATUS_META: Record<IndicatorStatus, { label: string; tone: 'success' | 'info' | 'neutral' | 'warning' | 'danger' }> = {
  'on-track': { label: 'On track', tone: 'success' },
  progress: { label: 'Making progress', tone: 'info' },
  'no-trend': { label: 'No clear trend', tone: 'neutral' },
  'not-improving': { label: 'Not improving', tone: 'warning' },
  declining: { label: 'Declining', tone: 'danger' },
};

export interface VitalSign {
  name: string;
  status: IndicatorStatus;
  indicators: number;
}

export interface RecoveryGoal {
  id: string;
  name: string;
  /** CSS var name for the goal hue (data-encoding accent only). */
  hueVar: string;
  summary: string;
  vitalSigns: VitalSign[];
}

export const GOALS: RecoveryGoal[] = [
  {
    id: 'population',
    name: 'Healthy Human Population',
    hueVar: '--ps-info-goal-population',
    summary: 'People thrive when the Sound is clean and productive.',
    vitalSigns: [
      { name: 'Air Quality', status: 'on-track', indicators: 3 },
      { name: 'Drinking Water', status: 'progress', indicators: 2 },
      { name: 'Local Foods', status: 'no-trend', indicators: 2 },
      { name: 'Outdoor Activity', status: 'progress', indicators: 3 },
      { name: 'Shellfish Beds', status: 'on-track', indicators: 4 },
    ],
  },
  {
    id: 'quality',
    name: 'Vibrant Quality of Life',
    hueVar: '--ps-info-goal-quality',
    summary: 'A resilient economy and a strong sense of place.',
    vitalSigns: [
      { name: 'Cultural Wellbeing', status: 'no-trend', indicators: 2 },
      { name: 'Economic Vitality', status: 'progress', indicators: 3 },
      { name: 'Good Governance', status: 'progress', indicators: 2 },
      { name: 'Sense of Place', status: 'no-trend', indicators: 2 },
      { name: 'Sound Stewardship', status: 'on-track', indicators: 3 },
    ],
  },
  {
    id: 'species',
    name: 'Thriving Species & Food Web',
    hueVar: '--ps-info-goal-species',
    summary: 'Native species abundant enough to sustain the food web.',
    vitalSigns: [
      { name: 'Birds', status: 'not-improving', indicators: 3 },
      { name: 'Forage Fish', status: 'no-trend', indicators: 2 },
      { name: 'Marine Fish', status: 'not-improving', indicators: 3 },
      { name: 'Orcas', status: 'declining', indicators: 2 },
      { name: 'Salmon', status: 'not-improving', indicators: 5 },
    ],
  },
  {
    id: 'habitat',
    name: 'Functioning Habitat',
    hueVar: '--ps-info-goal-habitat',
    summary: 'The places species need — protected and restored.',
    vitalSigns: [
      { name: 'Beaches & Marine Vegetation', status: 'progress', indicators: 3 },
      { name: 'Estuaries', status: 'progress', indicators: 2 },
      { name: 'Floodplains', status: 'not-improving', indicators: 2 },
      { name: 'Forests & Wetlands', status: 'declining', indicators: 3 },
    ],
  },
  {
    id: 'water',
    name: 'Healthy Water Quality',
    hueVar: '--ps-info-goal-water',
    summary: 'Fresh and marine waters clean enough to support life.',
    vitalSigns: [
      { name: 'Freshwater Quality', status: 'progress', indicators: 3 },
      { name: 'Marine Water Quality', status: 'no-trend', indicators: 4 },
      { name: 'Toxics in Aquatic Life', status: 'not-improving', indicators: 3 },
    ],
  },
];

export const TOTAL_VITAL_SIGNS = GOALS.reduce((n, g) => n + g.vitalSigns.length, 0);
export const TOTAL_INDICATORS = GOALS.reduce(
  (n, g) => n + g.vitalSigns.reduce((m, v) => m + v.indicators, 0),
  0,
);

// ── Action Agenda 2026–2030 ────────────────────────────────────────────────
export interface Strategy {
  code: string;
  name: string;
  topic: string;
  lead: string;
  commitments: number;
  status: IndicatorStatus;
}

export const AA_TOPICS = [
  'Foundations of Recovery',
  'Habitat',
  'Water Quality',
  'Species & Food Web',
];

export const STRATEGIES: Strategy[] = [
  { code: 'HAB-1', name: 'Protect intact habitat', topic: 'Habitat', lead: 'WA Dept. of Fish & Wildlife', commitments: 8, status: 'progress' },
  { code: 'HAB-2', name: 'Restore estuaries & floodplains', topic: 'Habitat', lead: 'Estuary & Salmon Restoration Program', commitments: 12, status: 'progress' },
  { code: 'HAB-3', name: 'Advance nearshore recovery', topic: 'Habitat', lead: 'WA Dept. of Natural Resources', commitments: 6, status: 'not-improving' },
  { code: 'WQ-1', name: 'Reduce stormwater pollution', topic: 'Water Quality', lead: 'WA Dept. of Ecology', commitments: 15, status: 'progress' },
  { code: 'WQ-2', name: 'Fix failing on-site sewage', topic: 'Water Quality', lead: 'WA Dept. of Health', commitments: 9, status: 'on-track' },
  { code: 'SPF-1', name: 'Recover Chinook salmon', topic: 'Species & Food Web', lead: 'Salmon Recovery Council', commitments: 11, status: 'not-improving' },
  { code: 'SPF-2', name: 'Support Southern Resident orcas', topic: 'Species & Food Web', lead: 'Governor’s Orca Task Force', commitments: 7, status: 'declining' },
  { code: 'FND-1', name: 'Fund recovery equitably', topic: 'Foundations of Recovery', lead: 'Puget Sound Partnership', commitments: 5, status: 'progress' },
];
