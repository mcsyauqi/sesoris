import type { Metadata } from 'next';
import CheckoutPageClient from './CheckoutPageClient';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order securely at Sesoris. Multiple payment options available.',
  alternates: { canonical: '/checkout' },
  openGraph: {
    title: 'Checkout | Sesoris',
    description: 'Complete your order securely at Sesoris.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
