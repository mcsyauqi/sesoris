import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, Newspaper, Download, Mail } from 'lucide-react';
import { selfReferencingAlternates } from '@/lib/seo-alternates';
import { products, categories } from '@/data/products';
import { DOMAIN_REGISTERED, SUPPORT_EMAIL, BRAND_FACTS_CHECKED } from '@/data/brand-facts';

export const metadata: Metadata = {
  title: 'Sesoris Press | Home Organization Brand Profile',
  description: 'Press information for Sesoris: verifiable brand facts, logo download, and media contact for the Yogyakarta-founded home organizer store.',
  alternates: selfReferencingAlternates('/press'),
  openGraph: {
    title: 'Sesoris Press | Home Organization Brand Profile',
    description: 'Press information for Sesoris: verifiable brand facts, logo download, and media contact for the Yogyakarta-founded home organizer store.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

// Only facts that a journalist can check. Earlier versions of this page listed press
// releases, an award, store openings, and "Featured In" media logos that had no source;
// they were removed on 2026-10-09. Add coverage here only with a link to the original article.
const brandFacts = [
  { label: 'Name', value: 'Sesoris' },
  { label: 'Website', value: 'www.sesoris.com' },
  { label: 'What it is', value: 'Independent online store for home organizers and storage products' },
  { label: 'Founded in', value: 'Yogyakarta, Indonesia' },
  { label: 'Domain registered', value: DOMAIN_REGISTERED.label },
  { label: 'Catalog', value: `${products.length} products in ${categories.length} categories` },
  { label: 'Ships to', value: 'US addresses, from a US warehouse' },
  { label: 'Tagline', value: 'Live More Organized' },
];

export default function PressPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--surface-2)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: 'var(--ink-muted)' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>Press</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px', maxWidth: '880px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--brand-tint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <Newspaper style={{ width: '32px', height: '32px', color: 'var(--brand)' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
            Sesoris Press &amp; Media
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Brand facts, logo, and media contact for writing about Sesoris.
          </p>
        </div>

        {/* Coverage */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginBottom: '12px' }}>
            Media coverage
          </h2>
          <p style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}>
            Sesoris has not been covered by news media yet. When that changes, this page will link to the original
            articles rather than show logos. For a plain summary of who we are, see{' '}
            <Link href="/what-is-sesoris" className="text-link">What Is Sesoris?</Link>
          </p>
        </section>

        {/* Brand facts */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginBottom: '12px' }}>
            Brand facts
          </h2>
          <dl style={{ borderTop: '1px solid var(--line)', margin: 0 }}>
            {brandFacts.map((f) => (
              <div key={f.label} style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                <dt style={{ flex: '0 0 180px', maxWidth: '100%', color: 'var(--ink-muted)', fontSize: '15px' }}>{f.label}</dt>
                <dd style={{ flex: '1 1 260px', margin: 0, color: 'var(--ink)', fontWeight: 600, fontSize: '15.5px' }}>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p style={{ color: 'var(--ink-muted)', fontSize: '14px', marginTop: '12px' }}>
            Checked on {BRAND_FACTS_CHECKED}. Sources for each fact are on the <Link href="/about" className="text-link">About page</Link>.
          </p>
        </section>

        {/* Press Kit */}
        <section style={{
          background: 'var(--brand-deep)',
          borderRadius: '16px',
          padding: 'clamp(24px, 4vw, 48px)',
          color: 'white',
          marginBottom: '48px',
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
            Logo and assets
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '24px', lineHeight: 1.6 }}>
            Download the Sesoris logo below. For product photos or other assets, email us and tell us where they will appear.
          </p>
          <a href="/logo.webp" download="sesoris-logo.webp" className="btn btn-light">
            <Download aria-hidden />
            Download logo (WebP)
          </a>
        </section>

        {/* Media Contact */}
        <section style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginBottom: '16px' }}>
            Media Contact
          </h2>
          <p style={{ color: 'var(--ink-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
            For interviews, collaborations, or fact checks, email us directly.
          </p>
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--surface-2)',
            padding: '16px 24px',
            borderRadius: '10px',
            color: 'var(--ink)',
            fontWeight: 500,
          }}>
            <Mail style={{ width: '18px', height: '18px', color: 'var(--brand)' }} />
            {SUPPORT_EMAIL}
          </a>
        </section>
      </div>
    </>
  );
}
