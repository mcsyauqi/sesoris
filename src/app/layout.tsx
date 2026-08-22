import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, AnnouncementBar, NewsletterPopup } from '@/components/layout';
import { AnalyticsScripts } from '@/components/layout/AnalyticsScripts';
import { CartHydration } from '@/components/layout/CartHydration';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

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
    ...selfReferencingAlternates('https://www.sesoris.com/'),
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
        <meta name="sesoris-deploy-marker" content="2026-08-04-release-procedure-verified" />
        <meta property="og:url" content="https://www.sesoris.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sesoris" />
        {/* Preconnect to external image hosts for faster LCP */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['Organization', 'OnlineStore'],
              name: 'Sesoris',
              alternateName: ['Sesoris Home Organization', 'Sesoris Home Organizers'],
              url: 'https://www.sesoris.com',
              logo: 'https://www.sesoris.com/logo.webp',
              description: 'Sesoris is an independent Yogyakarta-founded online home organization store for storage, kitchen, desk, and tidy-living products. It is not affiliated with similarly named fashion or jewelry websites.',
              priceRange: '$5 - $50',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Yogyakarta',
                addressRegion: 'Special Region of Yogyakarta',
                addressCountry: 'ID',
              },
              foundingLocation: {
                '@type': 'Place',
                name: 'Yogyakarta, Indonesia',
              },
              areaServed: ['United States', 'Worldwide'],
              knowsAbout: ['Home organization', 'Storage solutions', 'Kitchen organization', 'Desk organization'],
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 30,
                returnMethod: 'https://schema.org/ReturnByMail',
              },
              hasShippingService: {
                '@type': 'ShippingService',
                name: 'Sesoris Shipping',
                serviceType: ['Standard', 'Express', 'Same Day'],
                areaServed: 'Worldwide',
              },
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
        <AnalyticsScripts />
        <CartHydration />
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
