import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, AnnouncementBar } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Sesoris - Do It With Ease',
  description: 'Discover amazing products for your home, lifestyle, and gifting needs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
