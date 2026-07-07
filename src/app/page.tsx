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
  title: 'Sesoris | Home Organizer untuk Rumah Lebih Teratur',
  description: 'Temukan organizer rumah, rak penyimpanan, dan perlengkapan home living pilihan Sesoris untuk membuat rumah lebih rapi dan nyaman.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sesoris | Home Organizer untuk Rumah Lebih Teratur | Sesoris',
    description: 'Temukan organizer rumah, rak penyimpanan, dan perlengkapan home living pilihan Sesoris untuk membuat rumah lebih rapi dan nyaman.',
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
