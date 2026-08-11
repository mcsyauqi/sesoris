import type { Metadata } from 'next';
import ShopPageClient from './ShopPageClient';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

const baseMetadata: Metadata = {
  title: 'Sesoris Shop | Home Organizers, Kitchen & Lifestyle',
  description: 'Shop a curated catalog of 23 home organizers, kitchen essentials, handy tools, gift sets, and lifestyle picks at Sesoris. Free shipping over $50.',
  alternates: selfReferencingAlternates('/shop'),
  openGraph: {
    title: 'Sesoris Shop | Home Organizers, Kitchen & Lifestyle',
    description: 'Shop home organizers, kitchen essentials, handy tools, gift sets, and lifestyle picks at Sesoris.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
    type: 'website',
  },
};

type ShopPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: ShopPageProps): Promise<Metadata> {
  const params = searchParams ? await searchParams : {};
  const hasQuery = Object.keys(params).length > 0;

  return {
    ...baseMetadata,
    ...(hasQuery ? { robots: { index: false, follow: true } } : {}),
  };
}

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
