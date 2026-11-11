// shiCategoryColor — the habitat color group → its theme-shi.css tokens,
// spelled out in full so every token name is greppable.
import type { HabitatColorGroup } from '../data/shi-domain';

export const SHI_CATEGORY_FILL: Record<HabitatColorGroup, string> = {
  'functioning-habitat': 'var(--shi-category-habitat)',
  'healthy-water-quality': 'var(--shi-category-water)',
};

export const SHI_CATEGORY_ON_FILL: Record<HabitatColorGroup, string> = {
  'functioning-habitat': 'var(--shi-category-habitat-on)',
  'healthy-water-quality': 'var(--shi-category-water-on)',
};
