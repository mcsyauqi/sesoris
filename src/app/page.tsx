import type { Metadata } from 'next';
import {
  HeroSlider,
  TrustBadges,
  CategorySection,
  FeaturedProducts,
  NewsletterSection,
  AboutSection,
  TestimonialsSection,
} from '@/components/home';

export const metadata: Metadata = {
  title: 'Sesoris - Home & Living Accessories | Quality Organizers & Storage',
  description: 'Shop quality home organizers, kitchen storage, desk accessories, and lifestyle products. Free shipping on orders over Rp 500K. Discover smart storage solutions at Sesoris.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sesoris - Home & Living Accessories | Quality Organizers & Storage',
    description: 'Shop quality home organizers, kitchen storage, desk accessories, and lifestyle products. Free shipping on orders over Rp 500K. Discover smart storage solutions at Sesoris.',
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
    </>
  );
}
