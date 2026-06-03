import type { Metadata } from 'next';
import CartPageClient from './CartPageClient';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review items in your Sesoris cart. Secure checkout with free shipping on orders over $50.',
  alternates: { canonical: '/cart' },
  openGraph: {
    title: 'Shopping Cart | Sesoris',
    description: 'Review items in your Sesoris cart.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartPageClient />;
}
