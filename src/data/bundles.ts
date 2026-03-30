import type { Bundle } from '@/types';

export const bundles: Bundle[] = [
  {
    id: 'b1',
    name: 'Kitchen Starter Kit',
    slug: 'kitchen-starter-kit',
    description: 'Everything you need to set up a well-organized kitchen. Includes a sturdy dish rack, a portable blender for healthy meals on the go, and a smart hydration tracker bottle.',
    productIds: ['13', '7', '2'],
    // dish rack $18.99 + blender $15.99 + water bottle $21.99 = $56.97
    originalPrice: 56.97,
    bundlePrice: 47.99,
    discountPercent: 15,
    image: '/images/products/dish-rack-hero.webp',
    badge: 'Best Value',
    highlights: [
      'Complete kitchen organization solution',
      'Save $8.98 vs buying separately',
      'Perfect for new home setup',
      'All products come with 1-year warranty',
    ],
  },
  {
    id: 'b2',
    name: 'Home Office Bundle',
    slug: 'home-office-bundle',
    description: 'Transform your workspace into a productivity powerhouse. Includes a bamboo desk organizer, an LED lamp with wireless charger, and an aromatherapy diffuser for focus.',
    productIds: ['1', '3', '8'],
    // desk organizer $18.99 + LED lamp $31.99 + diffuser $20.99 = $71.97
    originalPrice: 71.97,
    bundlePrice: 59.99,
    discountPercent: 17,
    image: '/images/products/bamboo-desk-organizer-hero.webp',
    badge: 'Popular',
    highlights: [
      'Complete work-from-home setup',
      'Save $11.98 vs buying separately',
      'Eco-friendly bamboo + smart tech combo',
      'Boost focus and productivity',
    ],
  },
  {
    id: 'b3',
    name: 'Home Organizer Essential',
    slug: 'home-organizer-essential',
    description: 'The ultimate home decluttering kit. Foldable storage bins for flexible storage, floating wall shelves for vertical space, and a magnetic key holder so you never lose your keys.',
    productIds: ['11', '15', '16'],
    // storage bins $14.99 + floating shelf $15.99 + key holder $9.99 = $40.97
    originalPrice: 40.97,
    bundlePrice: 33.99,
    discountPercent: 17,
    image: '/images/products/storage-bins-hero.webp',
    badge: 'Most Saved',
    highlights: [
      'Maximize every inch of your space',
      'Save $6.98 vs buying separately',
      'Easy installation, no tools needed',
      'Clean minimalist aesthetic',
    ],
  },
  {
    id: 'b4',
    name: 'Moving Day Package',
    slug: 'moving-day-package',
    description: 'Settle into your new home faster with this practical moving kit. Foldable bins for packing, a multi-tool knife for assembly, and a shoe rack to get organized from day one.',
    productIds: ['11', '14', '10'],
    // storage bins $14.99 + shoe rack $10.99 + multi-tool $17.99 = $43.97
    originalPrice: 43.97,
    bundlePrice: 36.99,
    discountPercent: 16,
    image: '/images/products/storage-bins-hero.webp',
    badge: 'New Home',
    highlights: [
      'Everything for moving day',
      'Save $6.98 vs buying separately',
      'Compact and stackable products',
      'Start organized from day one',
    ],
  },
];

export function getBundleBySlug(slug: string): Bundle | null {
  return bundles.find((b) => b.slug === slug) ?? null;
}

export function getBundlesForProduct(productId: string): Bundle[] {
  return bundles.filter((b) => b.productIds.includes(productId));
}
