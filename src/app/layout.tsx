import type { Metadata } from 'next';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ToastContainer } from '@/components/ui/toast';

export const metadata: Metadata = {
  title: {
    default: 'Sesoris - Do It With Ease | Gift Shop & Home Essentials',
    template: '%s | Sesoris',
  },
  description:
    'Discover unique gifts, home essentials, and lifestyle products at Sesoris. Quality products, free shipping on orders over $50, and easy returns.',
  keywords: [
    'gift shop',
    'home essentials',
    'lifestyle products',
    'unique gifts',
    'home decor',
    'kitchen gadgets',
  ],
  authors: [{ name: 'Sesoris' }],
  creator: 'Sesoris',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sesoris.com',
    siteName: 'Sesoris',
    title: 'Sesoris - Do It With Ease',
    description:
      'Discover unique gifts, home essentials, and lifestyle products at Sesoris.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sesoris - Gift Shop & Home Essentials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sesoris - Do It With Ease',
    description:
      'Discover unique gifts, home essentials, and lifestyle products at Sesoris.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <AnnouncementBar />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
