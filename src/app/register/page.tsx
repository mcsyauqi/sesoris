import type { Metadata } from 'next';
import RegisterPageClient from './RegisterPageClient';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your Sesoris account. Get exclusive deals, track orders, and save your favorites.',
  alternates: { canonical: '/register' },
  openGraph: {
    title: 'Create Account | Sesoris',
    description: 'Create your Sesoris account.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}
