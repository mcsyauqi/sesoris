import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Sesoris Yogyakarta | Home Organizer Store',
  description: 'Hubungi Sesoris Yogyakarta untuk pertanyaan produk organizer rumah, dapur, travel, pesanan, grosir, dan bantuan pelanggan.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Sesoris Yogyakarta | Home Organizer Store',
    description: 'Hubungi Sesoris Yogyakarta untuk pertanyaan produk organizer rumah, dapur, travel, pesanan, grosir, dan bantuan pelanggan.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  '@id': 'https://www.sesoris.com/contact#localbusiness',
  name: 'Sesoris',
  url: 'https://www.sesoris.com',
  image: 'https://www.sesoris.com/og-default.webp',
  description: 'Sesoris is a Yogyakarta-based online store for home organizers, kitchen storage, office desk products, and travel storage accessories.',
  email: 'sesoris.store@gmail.com',
  telephone: '+62-274-123-4567',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Malioboro No. 123',
    addressLocality: 'Yogyakarta',
    addressRegion: 'Daerah Istimewa Yogyakarta',
    postalCode: '55271',
    addressCountry: 'ID',
  },
  areaServed: [
    { '@type': 'City', name: 'Yogyakarta' },
    { '@type': 'Country', name: 'Indonesia' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'sesoris.store@gmail.com',
    telephone: '+62-274-123-4567',
    areaServed: 'ID',
    availableLanguage: ['id', 'en'],
  },
  sameAs: [
    'https://facebook.com/sesoris',
    'https://instagram.com/sesoris_com',
    'https://twitter.com/sesoris_com',
    'https://youtube.com/@sesoris',
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ContactPageClient />
    </>
  );
}
