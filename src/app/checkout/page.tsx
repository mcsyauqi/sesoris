import type { Metadata } from 'next';
import CheckoutPageClient from './CheckoutPageClient';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order securely at Sesoris with PayPal or a credit or debit card.',
  alternates: { canonical: '/checkout' },
  openGraph: {
    title: 'Checkout | Sesoris',
    description: 'Complete your order securely at Sesoris.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
  robots: { index: false, follow: false },
};

// Read PayPal config per request so switching sandbox/live only needs an env change + restart.
export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  return <CheckoutPageClient clientId={process.env.PAYPAL_CLIENT_ID} sandbox={process.env.PAYPAL_ENV !== 'live'} />;
}
