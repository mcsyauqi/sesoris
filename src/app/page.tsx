import type { Metadata } from 'next';
import {
  HeroSlider,
  TrustBadges,
  CategorySection,
  FeaturedProducts,
  NewsletterSection,
  AboutSection,
  TestimonialsSection,
  HomeFAQSection,
} from '@/components/home';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

export const metadata: Metadata = {
  title: 'Sesoris | Home Organizers for a More Organized Home',
  description: 'Discover home organizers, storage shelves, and curated home living essentials from Sesoris to make your home tidier and more comfortable.',
  alternates: selfReferencingAlternates('https://www.sesoris.com/'),
  openGraph: {
    title: 'Sesoris | Home Organizers for a More Organized Home | Sesoris',
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
      <NewsletterSection />
      <AboutSection />
      <TestimonialsSection />
      <HomeFAQSection />
    </>
  );
}
