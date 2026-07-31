import type { Metadata } from 'next';
import TrackOrderPageClient from './TrackOrderPageClient';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

export const metadata: Metadata = {
  title: 'Track Your Sesoris Order | Check Order Status',
  description: 'Track your Sesoris order status easily and check the delivery progress of the home organizers you purchased.',
  alternates: selfReferencingAlternates('/track-order'),
  openGraph: {
    title: 'Track Your Sesoris Order | Check Order Status | Sesoris',
    description: 'Track your Sesoris order status easily and check the delivery progress of the home organizers you purchased.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function TrackOrderPage() {
  return <TrackOrderPageClient />;
}
