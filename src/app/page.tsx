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

export const metadata: Metadata = {
  title: 'Sesoris - Home Organizers & Storage Solutions',
  description: 'Shop a curated catalog of 23 home organizers across 9 categories. Free shipping over $50. Built for tidier kitchens, desks, closets, and everyday living.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sesoris - Home Organizers & Storage Solutions',
    description: 'Shop a curated catalog of 23 home organizers across 9 categories. Free shipping over $50. Built for tidier kitchens, desks, closets, and everyday living.',
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
