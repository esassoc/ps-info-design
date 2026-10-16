// shi-lifecycle.ts — the salmon life cycle loop drawn above the habitat diorama
// (psinfo-shi-habitat-explorer). Authored: each stage sits over the habitat
// where it happens, in the diorama's scene units (SHI_DIORAMA_WIDTH wide,
// headwaters on the left, the open Sound on the right).
import type { HabitatCategorySlug } from './shi-domain';

export interface LifecycleStage {
  label: string;
  /** Habitat the stage happens in. */
  habitat: HabitatCategorySlug;
  /** Position along the loop, in scene units. */
  x: number;
  /** 'out': juveniles heading downstream (lower lane); 'return': adults heading home (upper lane). */
  lane: 'out' | 'return';
}

export const SHI_LIFECYCLE_STAGES: LifecycleStage[] = [
  { label: 'Eggs and alevins', habitat: 'stream-structure', x: 96, lane: 'out' },
  { label: 'Fry and parr', habitat: 'freshwater', x: 364, lane: 'out' },
  { label: 'Smolts', habitat: 'estuaries', x: 652, lane: 'out' },
  { label: 'Ocean adults', habitat: 'marine-water', x: 1012, lane: 'out' },
  { label: 'Adults return to spawn', habitat: 'stream-structure', x: 555, lane: 'return' },
];

export const SHI_LIFECYCLE_SUMMARY =
  'Salmon life cycle: eggs and alevins in headwater gravel, fry and parr in streams, smolts in the estuary, ' +
  'adults growing in the Sound and ocean, then adults returning upstream to spawn.';
