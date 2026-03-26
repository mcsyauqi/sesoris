import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Sesoris. We\'re here to help with orders, product questions, and more. Email sesoris.store@gmail.com.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Sesoris',
    description: 'Get in touch with Sesoris. We\'re here to help with orders, product questions, and more. Email sesoris.store@gmail.com.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
