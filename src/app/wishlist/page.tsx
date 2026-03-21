import type { Metadata } from 'next';
import WishlistPageClient from './WishlistPageClient';

export const metadata: Metadata = {
  title: 'My Wishlist',
  description: 'View and manage your saved items at Sesoris. Add products to cart or share your wishlist.',
  alternates: { canonical: '/wishlist' },
  openGraph: {
    title: 'My Wishlist | Sesoris',
    description: 'View and manage your saved items at Sesoris.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}
