import type { Metadata } from 'next';
import TrackOrderPageClient from './TrackOrderPageClient';

export const metadata: Metadata = {
  title: 'Track Your Order',
  description: 'Track your Sesoris order status. Enter your order number to check delivery progress.',
  alternates: { canonical: '/track-order' },
  openGraph: {
    title: 'Track Your Order | Sesoris',
    description: 'Track your Sesoris order status. Enter your order number to check delivery progress.',
  },
};

export default function TrackOrderPage() {
  return <TrackOrderPageClient />;
}
