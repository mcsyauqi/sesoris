import type { Metadata } from 'next';
import ShopPageClient from './ShopPageClient';

export const metadata: Metadata = {
  title: 'Sesoris Belanja | Organizer Rumah, Dapur & Lifestyle',
  description: 'Belanja 500+ organizer rumah, perlengkapan dapur, alat praktis, paket hadiah, dan produk lifestyle pilihan di Sesoris. Gratis ongkir di atas Rp 800.000.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Sesoris Belanja | Organizer Rumah, Dapur & Lifestyle',
    description: 'Belanja organizer rumah, perlengkapan dapur, alat praktis, paket hadiah, dan produk lifestyle pilihan di Sesoris.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
    type: 'website',
  },
};

const shopSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Sesoris Belanja - Semua Produk',
  description: 'Jelajahi 500+ organizer rumah, perlengkapan dapur, alat praktis, paket hadiah, dan produk lifestyle pilihan di Sesoris.',
  url: 'https://www.sesoris.com/shop',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://www.sesoris.com' },
      { '@type': 'ListItem', position: 2, name: 'Belanja', item: 'https://www.sesoris.com/shop' },
    ],
  },
};

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopSchema) }}
      />
      <ShopPageClient />
    </>
  );
}
