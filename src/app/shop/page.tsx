import type { Metadata } from 'next';
import ShopPageClient from './ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse all Sesoris products. Quality home organizers, kitchen storage, desk accessories, and lifestyle items.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop All Products | Sesoris',
    description: 'Browse all Sesoris products. Quality home organizers, kitchen storage, desk accessories, and lifestyle items.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function ShopPage() {
  return <ShopPageClient />;
}
