import type { Metadata } from 'next';
import ShopPageClient from './ShopPageClient';

export const metadata: Metadata = {
  title: 'Sesoris Shop | Home Organizers, Kitchen & Lifestyle',
  description: 'Shop a curated catalog of 23 home organizers, kitchen essentials, handy tools, gift sets, and lifestyle picks at Sesoris. Free shipping over $50.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Sesoris Shop | Home Organizers, Kitchen & Lifestyle',
    description: 'Shop home organizers, kitchen essentials, handy tools, gift sets, and lifestyle picks at Sesoris.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
    type: 'website',
  },
};

const shopSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Sesoris Shop - All Products',
  description: 'Browse 23 curated home organizers, kitchen essentials, handy tools, gift sets, and lifestyle picks at Sesoris.',
  url: 'https://www.sesoris.com/shop',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sesoris.com' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://www.sesoris.com/shop' },
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
