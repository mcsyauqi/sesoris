import type { Product } from '@/types';

const categoryImageKeywords: Record<string, string> = {
  'home-living': 'home organizer dan dekorasi rumah',
  'kitchen-dining': 'perlengkapan dapur dan kitchen storage',
  'tools-gadgets': 'tools multifungsi dan gadget rumah',
  'gift-sets': 'gift set premium',
  'personal-care': 'personal care dan wellness organizer',
  'tech-accessories': 'tech accessories dan cable organizer',
  'bags-pouches': 'tas organizer, pouch storage, dan travel bag',
};

const imageAngles = [
  'Foto produk utama',
  'Detail produk',
  'Tampilan penggunaan',
  'Foto tampak depan',
  'Detail material',
];

export function getProductImageAlt(product: Pick<Product, 'name' | 'category'>, index = 0) {
  const categoryKeyword = categoryImageKeywords[product.category.slug] ?? 'produk organizer pilihan';
  const angle = imageAngles[index] ?? 'Foto produk';

  return `${angle} ${product.name} untuk ${categoryKeyword} dari Sesoris`;
}
