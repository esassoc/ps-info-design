// shi-lifecycle.ts — the salmon life cycle loop drawn above the habitat diorama
// (psinfo-shi-habitat-explorer). Authored: each stage sits over the habitat
// where it happens; the explorer places it over that habitat's region in
// whichever scene it shows. The return lane's label sits mid-scene.
import type { HabitatCategorySlug } from './shi-domain';

export interface LifecycleStage {
  label: string;
  /** Habitat the stage happens in. */
  habitat: HabitatCategorySlug;
  /** 'out': juveniles heading downstream (lower lane); 'return': adults heading home (upper lane). */
  lane: 'out' | 'return';
}

export const SHI_LIFECYCLE_STAGES: LifecycleStage[] = [
  { label: 'Eggs and alevins', habitat: 'stream-structure', lane: 'out' },
  { label: 'Fry and parr', habitat: 'freshwater', lane: 'out' },
  { label: 'Smolts', habitat: 'estuaries', lane: 'out' },
  { label: 'Ocean adults', habitat: 'marine-water', lane: 'out' },
  { label: 'Adults return to spawn', habitat: 'stream-structure', lane: 'return' },
];

export const SHI_LIFECYCLE_SUMMARY =
  'Salmon life cycle: eggs and alevins in headwater gravel, fry and parr in streams, smolts in the estuary, ' +
  'adults growing in the Sound and ocean, then adults returning upstream to spawn.';
