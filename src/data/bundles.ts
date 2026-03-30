import type { Bundle } from '@/types';

export const bundles: Bundle[] = [
  {
    id: 'b1',
    name: 'Kitchen Starter Kit',
    slug: 'kitchen-starter-kit',
    description: 'Everything you need to set up a well-organized kitchen. Includes a sturdy dish rack, a portable blender for healthy meals on the go, and a smart hydration tracker bottle.',
    productIds: ['13', '7', '2'],
    originalPrice: 887000,
    bundlePrice: 754000,
    discountPercent: 15,
    image: '/images/products/rak-piring-stainless-steel-2-tier-hero.webp',
    badge: 'Best Value',
    highlights: [
      'Complete kitchen organization solution',
      'Save Rp 133,000 vs buying separately',
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
    originalPrice: 1127000,
    bundlePrice: 935000,
    discountPercent: 17,
    image: '/images/products/bamboo-desk-organizer-hero.webp',
    badge: 'Popular',
    highlights: [
      'Complete work-from-home setup',
      'Save Rp 192,000 vs buying separately',
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
    originalPrice: 637000,
    bundlePrice: 522000,
    discountPercent: 18,
    image: '/images/products/foldable-storage-bins-hero.webp',
    badge: 'Most Saved',
    highlights: [
      'Maximize every inch of your space',
      'Save Rp 115,000 vs buying separately',
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
    originalPrice: 687000,
    bundlePrice: 570000,
    discountPercent: 17,
    image: '/images/products/foldable-storage-bins-hero.webp',
    badge: 'New Home',
    highlights: [
      'Everything for moving day',
      'Save Rp 117,000 vs buying separately',
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
