import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, AnnouncementBar } from '@/components/layout';

export const metadata: Metadata = {
  title: {
    default: 'Sesoris - Hidup Lebih Teratur',
    template: '%s | Sesoris',
  },
  description: 'Temukan produk-produk berkualitas untuk rumah, dapur, dan gaya hidup Anda. Belanja mudah dengan Sesoris.',
  keywords: ['organizer', 'home organization', 'kitchen storage', 'kontainer', 'penyimpanan', 'rumah tangga', 'Yogyakarta'],
  authors: [{ name: 'Sesoris' }],
  creator: 'Sesoris',
  publisher: 'Sesoris',
  metadataBase: new URL('https://www.sesoris.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.sesoris.com',
    siteName: 'Sesoris',
    title: 'Sesoris - Hidup Lebih Teratur',
    description: 'Temukan produk-produk berkualitas untuk rumah, dapur, dan gaya hidup Anda.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sesoris - Hidup Lebih Teratur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sesoris - Hidup Lebih Teratur',
    description: 'Temukan produk-produk berkualitas untuk rumah, dapur, dan gaya hidup Anda.',
    images: ['/og-image.jpg'],
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
    <html lang="id">
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
              logo: 'https://www.sesoris.com/logo.svg',
              description: 'Toko online produk organizer dan penyimpanan berkualitas di Indonesia',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Jl. Malioboro No. 123',
                addressLocality: 'Yogyakarta',
                addressRegion: 'DIY',
                postalCode: '55271',
                addressCountry: 'ID',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+62-274-123-4567',
                contactType: 'customer service',
                availableLanguage: ['Indonesian', 'English'],
              },
              sameAs: [
                'https://www.instagram.com/sesoris',
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
      <body>
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
