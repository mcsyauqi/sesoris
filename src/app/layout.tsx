import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header, Footer, AnnouncementBar, NewsletterPopup } from '@/components/layout';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-heading',
});

const GA_MEASUREMENT_ID = 'G-V2Y9KVBKFP';

export const metadata: Metadata = {
  title: {
    default: 'Sesoris - Home Organizers & Storage Solutions',
    template: '%s | Sesoris',
  },
  description: 'Shop home organizers, kitchen racks, storage boxes, and tidy-living essentials for modern households.',
  keywords: ['organizer', 'home organization', 'kitchen storage', 'containers', 'storage solutions', 'home accessories'],
  authors: [{ name: 'Sesoris' }],
  creator: 'Sesoris',
  publisher: 'Sesoris',
  metadataBase: new URL('https://www.sesoris.com'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  icons: {
    icon: [
      { url: '/icon.webp', type: 'image/png' },
    ],
    apple: '/icon.webp',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.sesoris.com',
    siteName: 'Sesoris',
    title: 'Sesoris - Home Organizers & Storage Solutions',
    description: 'Shop home organizers, kitchen racks, storage boxes, and tidy-living essentials for modern households.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630, alt: 'Sesoris - Home Organizers & Storage Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sesoris - Home Organizers & Storage Solutions',
    description: 'Shop home organizers, kitchen racks, storage boxes, and tidy-living essentials for modern households.',
    images: ['/og-default.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    other: {
      'msvalidate.01': ['996F171B0B725BB7D72F1A8C5E9D83A0'],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <head>
        {/* Preconnect to external image hosts for faster LCP */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['Organization', 'LocalBusiness', 'Store'],
              name: 'Sesoris',
              url: 'https://www.sesoris.com',
              logo: 'https://www.sesoris.com/logo.webp',
              description: 'Yogyakarta-based online store for quality home organizers, kitchen storage, desk accessories, and storage solutions with nationwide shipping across Indonesia.',
              priceRange: '$5 - $50',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Yogyakarta',
                addressRegion: 'Daerah Istimewa Yogyakarta',
                addressCountry: 'ID',
              },
              foundingLocation: {
                '@type': 'Place',
                name: 'Yogyakarta, Indonesia',
              },
              areaServed: ['Yogyakarta', 'Daerah Istimewa Yogyakarta', 'Indonesia'],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+62-813-2610-2061',
                contactType: 'customer service',
                areaServed: ['ID', 'Worldwide'],
                availableLanguage: ['English', 'Indonesian'],
              },
              sameAs: [
                'https://www.instagram.com/sesoris_com',
                'https://www.facebook.com/sesoris',
                'https://www.tiktok.com/@sesoris',
                'https://x.com/sesoris_com',
              ],
            }),
          }}
        />
        {/* JSON-LD WebSite Schema for Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Sesoris',
              url: 'https://www.sesoris.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.sesoris.com/shop?search={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={dmSans.className}>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AnnouncementBar />
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
          <NewsletterPopup />
        </div>
      </body>
    </html>
  );
}
