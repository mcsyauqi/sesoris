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
  title: 'Sesoris - Home Organizers & Storage Solutions Indonesia',
  description: 'Shop 500+ home organizers, kitchen storage & desk accessories. Free shipping over $50. Rated 4.8★ by 50,000+ customers. Order now at Sesoris.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sesoris - Home Organizers & Storage Solutions Indonesia',
    description: 'Shop 500+ home organizers, kitchen storage & desk accessories. Free shipping over $50. Rated 4.8★ by 50,000+ customers. Order now at Sesoris.',
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
