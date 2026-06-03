import type { Product } from '@/types';

const categoryImageKeywords: Record<string, string> = {
  'home-living': 'home organizers and home decor',
  'kitchen-dining': 'kitchen essentials and kitchen storage',
  'tools-gadgets': 'multifunction tools and home gadgets',
  'gift-sets': 'premium gift sets',
  'personal-care': 'self-care and wellness organizers',
  'tech-accessories': 'tech accessories and cable organizers',
  'bags-pouches': 'organizer bags, storage pouches, and travel bags',
};

const imageAngles = [
  'Main product photo',
  'Product detail',
  'In-use view',
  'Front view',
  'Material detail',
];

export function getProductImageAlt(product: Pick<Product, 'name' | 'category'>, index = 0) {
  const categoryKeyword = categoryImageKeywords[product.category.slug] ?? 'curated organizer products';
  const angle = imageAngles[index] ?? 'Product photo';

  return `${angle}: ${product.name} for ${categoryKeyword} from Sesoris`;
}
