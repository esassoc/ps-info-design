// shiCategoryColor — the habitat color group → its theme-shi.css tokens,
// spelled out in full so every token name is greppable.
import type { HabitatColorGroup } from '../data/shi-domain';

export const SHI_CATEGORY_FILL: Record<HabitatColorGroup, string> = {
  purple: 'var(--shi-category-purple)',
  green: 'var(--shi-category-green)',
  blue: 'var(--shi-category-blue)',
};

export const SHI_CATEGORY_ON_FILL: Record<HabitatColorGroup, string> = {
  purple: 'var(--shi-category-purple-on)',
  green: 'var(--shi-category-green-on)',
  blue: 'var(--shi-category-blue-on)',
};
