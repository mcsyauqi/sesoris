import type { Metadata } from 'next';
import {
  HeroSlider,
  TrustBadges,
  CategorySection,
  FeaturedProducts,
  MeasureSection,
  JournalSection,
  AboutSection,
  HomeFAQSection,
} from '@/components/home';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

// Picks up newly scheduled blog posts for the journal section without waiting for a deploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Sesoris | Home Organizers for a More Organized Home',
  description: 'Discover home organizers, storage shelves, and curated home living essentials from Sesoris to make your home tidier and more comfortable.',
  alternates: selfReferencingAlternates('https://www.sesoris.com/'),
  openGraph: {
    title: 'Sesoris | Home Organizers for a More Organized Home',
    description: 'Discover home organizers, storage shelves, and curated home living essentials from Sesoris to make your home tidier and more comfortable.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <TrustBadges />
      <CategorySection />
      <FeaturedProducts />
      <MeasureSection />
      <JournalSection />
      <AboutSection />
      <HomeFAQSection />
    </>
  );
}
