import type { Metadata } from 'next';
import TrackOrderPageClient from './TrackOrderPageClient';

export const metadata: Metadata = {
  title: 'Lacak Pesanan Sesoris | Cek Status Order',
  description: 'Lacak status pesanan Sesoris dengan mudah dan cek perkembangan pengiriman organizer rumah yang sudah dibeli.',
  alternates: { canonical: '/track-order' },
  openGraph: {
    title: 'Lacak Pesanan Sesoris | Cek Status Order | Sesoris',
    description: 'Lacak status pesanan Sesoris dengan mudah dan cek perkembangan pengiriman organizer rumah yang sudah dibeli.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function TrackOrderPage() {
  return <TrackOrderPageClient />;
}
