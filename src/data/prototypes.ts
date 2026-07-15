// The spoke's prototype registry — the single source of truth that drives the
// home page index table. Add a row here when you ship a new prototype.
//
// The template ships with an EMPTY registry: the home page renders the layers
// (Design System / Pattern Library) immediately, and the prototypes list stays
// empty until this spoke builds its first working screen. Add entries here as
// prototypes land (each route lives under src/pages/prototypes/<slug>.astro).

export type PrototypeStatus = 'live' | 'in-progress' | 'planned' | 'archived';

export interface Prototype {
  /** URL-safe id. */
  slug: string;
  title: string;
  description: string;
  /** Internal route, root-relative and base-less — wrap with withBase() at render. */
  route: string;
  /** ISO date (YYYY-MM-DD) the prototype was first built. */
  createdAt: string;
  /** Tracking ticket id, e.g. a Jira key. Optional. */
  ticket?: string;
  status: PrototypeStatus;
}

export const prototypes: Prototype[] = [
  {
    slug: 'home',
    title: 'Unified home — the five programs, one front door',
    description:
      'The logged-in landing: all five programs as peer entry cards and the recovery goals rolled up, inside the persistent shell.',
    route: '/prototypes/home',
    createdAt: '2026-07-15',
    status: 'in-progress',
  },
  {
    slug: 'vital-signs',
    title: 'Vital Signs — ecosystem health by goal',
    description:
      'The 22 Vital Signs grouped by recovery goal with status, plus a cross-module band linking to the plans and investments that connect.',
    route: '/prototypes/vital-signs',
    createdAt: '2026-07-15',
    status: 'in-progress',
  },
  {
    slug: 'action-agenda',
    title: 'Action Agenda — the regional recovery plan',
    description:
      'The 2026–2030 Topic → Strategy → Commitment hierarchy, in the same shell, with wayfinding into the other modules.',
    route: '/prototypes/action-agenda',
    createdAt: '2026-07-15',
    status: 'in-progress',
  },
];

/** Newest first — the order the index table renders. */
export const prototypesByNewest = (): Prototype[] =>
  [...prototypes].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
