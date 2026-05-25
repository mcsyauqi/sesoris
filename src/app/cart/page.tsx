import type { Metadata } from 'next';
import CartPageClient from './CartPageClient';

export const metadata: Metadata = {
  title: 'Keranjang Belanja',
  description: 'Tinjau produk di keranjang Sesoris. Checkout aman dengan gratis ongkir untuk pesanan di atas Rp 800.000.',
  alternates: { canonical: '/cart' },
  openGraph: {
    title: 'Keranjang Belanja | Sesoris',
    description: 'Tinjau produk di keranjang Sesoris.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartPageClient />;
}
