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
  title: 'Sesoris - Organizer Rumah & Storage Indonesia',
  description: 'Belanja 500+ organizer rumah, storage dapur, dan aksesori meja kerja. Gratis ongkir di atas Rp 800.000. Rating 4.8 dari 50.000+ pelanggan.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sesoris - Organizer Rumah & Storage Indonesia',
    description: 'Belanja 500+ organizer rumah, storage dapur, dan aksesori meja kerja. Gratis ongkir di atas Rp 800.000. Rating 4.8 dari 50.000+ pelanggan.',
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
