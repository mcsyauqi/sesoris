import type { Metadata } from 'next';
import ShopPageClient from './ShopPageClient';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

const baseMetadata: Metadata = {
  title: 'Sesoris Shop | Home Organizers, Kitchen & Lifestyle',
  description: 'Shop pull-out cabinet organizers, pantry storage, stackable bins, makeup cases, and packing cubes at Sesoris. Ships from a US warehouse. Free shipping over $50.',
  alternates: selfReferencingAlternates('/shop'),
  openGraph: {
    title: 'Sesoris Shop | Home Organizers, Kitchen & Lifestyle',
    description: 'Shop pull-out cabinet organizers, pantry storage, stackable bins, makeup cases, and packing cubes at Sesoris.',
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
  description: 'Browse Sesoris home organizers: pull-out cabinet organizers, pantry storage, stackable bins, makeup cases, and packing cubes.',
  url: 'https://www.sesoris.com/shop',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sesoris.com' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://www.sesoris.com/shop' },
    ],
  },
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = searchParams ? await searchParams : {};
  const search = typeof params.search === 'string' ? params.search.slice(0, 80) : '';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopSchema) }}
      />
      <ShopPageClient search={search} />
    </>
  );
}
