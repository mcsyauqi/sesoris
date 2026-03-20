import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header, Footer, AnnouncementBar } from '@/components/layout';
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
    default: 'Sesoris - Home & Living Accessories',
    template: '%s | Sesoris',
  },
  description: 'Discover quality products for your home, kitchen, and lifestyle. Shop smart with Sesoris.',
  keywords: ['organizer', 'home organization', 'kitchen storage', 'containers', 'storage solutions', 'home accessories', 'Yogyakarta'],
  authors: [{ name: 'Sesoris' }],
  creator: 'Sesoris',
  publisher: 'Sesoris',
  metadataBase: new URL('https://www.sesoris.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.webp', type: 'image/png' },
    ],
    apple: '/icon.webp',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.sesoris.com',
    siteName: 'Sesoris',
    title: 'Sesoris - Home & Living Accessories',
    description: 'Discover quality products for your home, kitchen, and lifestyle.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sesoris - Home & Living Accessories',
    description: 'Discover quality products for your home, kitchen, and lifestyle.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <head>
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Sesoris',
              url: 'https://www.sesoris.com',
              logo: 'https://www.sesoris.com/logo.webp',
              description: 'Online store for quality home organizers and storage solutions in Indonesia',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Yogyakarta',
                addressRegion: 'DIY',
                addressCountry: 'ID',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+62-813-2610-2061',
                contactType: 'customer service',
                availableLanguage: ['Indonesian', 'English'],
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
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
        </div>
      </body>
    </html>
  );
}
