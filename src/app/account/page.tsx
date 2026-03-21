import type { Metadata } from 'next';
import AccountPageClient from './AccountPageClient';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your Sesoris account. View orders, update profile, and manage addresses.',
  alternates: { canonical: '/account' },
  openGraph: {
    title: 'My Account | Sesoris',
    description: 'Manage your Sesoris account.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <AccountPageClient />;
}
