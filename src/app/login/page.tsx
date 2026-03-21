import type { Metadata } from 'next';
import LoginPageClient from './LoginPageClient';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Sesoris account. Access your orders, wishlist, and personalized recommendations.',
  alternates: { canonical: '/login' },
  openGraph: {
    title: 'Sign In | Sesoris',
    description: 'Sign in to your Sesoris account.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
