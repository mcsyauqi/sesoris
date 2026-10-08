import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, ExternalLink } from 'lucide-react';
import { selfReferencingAlternates } from '@/lib/seo-alternates';
import { products, categories } from '@/data/products';
import { FREE_SHIPPING_MIN, SHIPPING_FEE } from '@/lib/shipping';
import {
  ORGANIZATION_ID,
  BRAND_FACTS_CHECKED,
  DOMAIN_REGISTERED,
  FIRST_ARCHIVED,
  OFFICIAL_PROFILES,
  SUPPORT_EMAIL,
  SUPPORT_WHATSAPP,
  SUPPORT_WHATSAPP_URL,
  SMARTCUSTOMER_PROFILE,
} from '@/data/brand-facts';

// Answers the branded questions people type into search ("what is sesoris",
// "what is the rating for sesoris"). Every statement must stay checkable:
// counts and prices come from the live catalog, dates and links from brand-facts.ts.

const PAGE_URL = 'https://www.sesoris.com/what-is-sesoris';
const TITLE = 'What Is Sesoris? Facts, Ratings, and Reputation';
const DESCRIPTION =
  'Sesoris is an independent home organizer store from Yogyakarta, Indonesia, shipping to US addresses. What it sells, how to verify it, and its rating status.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: selfReferencingAlternates('/what-is-sesoris'),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: 'article',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

const usd = (n: number) => `$${n.toFixed(2)}`;
const prices = products.map((p) => p.price);
const MIN_PRICE = usd(Math.min(...prices));
const MAX_PRICE = usd(Math.max(...prices));
const CATEGORY_NAMES = categories.map((c) => c.name);
const CATEGORY_LIST = `${CATEGORY_NAMES.slice(0, -1).join(', ')}, and ${CATEGORY_NAMES[CATEGORY_NAMES.length - 1]}`;

const faqs = [
  {
    q: 'What is Sesoris?',
    a: `Sesoris is a small, independent online store for home organizers and storage products at www.sesoris.com. It was founded in Yogyakarta, Indonesia, and sells ${products.length} products across ${categories.length} categories: ${CATEGORY_LIST}. Orders ship to addresses in the United States from a US warehouse.`,
  },
  {
    q: 'What is the rating for Sesoris?',
    a: `Sesoris does not have a star rating yet. No customer reviews are published on sesoris.com, so product pages show no star scores, and Sesoris does not write its own reviews or ratings. On SmartCustomer (formerly Sitejabber), the sesoris.com listing had 0 reviews when we checked on ${BRAND_FACTS_CHECKED}. If you see a Sesoris rating somewhere else, check that it refers to sesoris.com.`,
  },
  {
    q: 'Is Sesoris legit?',
    a: `Sesoris is a real, small store, and you can check the basics yourself. The sesoris.com domain has been registered since ${DOMAIN_REGISTERED.label}, the Internet Archive holds a Sesoris page at sesoris.com from ${FIRST_ARCHIVED.label}, checkout runs through PayPal, and the shipping, returns, privacy, and terms policies are published on the site. What Sesoris does not have yet is a public record of customer reviews, so judge it on the details you can verify.`,
  },
  {
    q: 'Where is Sesoris based, and where does it ship?',
    a: `Sesoris is run from Yogyakarta, Indonesia. It currently ships only to US addresses, from a US warehouse. Shipping is free on orders over $${FREE_SHIPPING_MIN}; below that it is a flat ${usd(SHIPPING_FEE)}. Unused products in their original condition can be returned within 30 days.`,
  },
  {
    q: 'Is Sesoris related to Sessori or to accessories websites?',
    a: 'No. Sesoris at sesoris.com is not affiliated with Sessori or with similarly named fashion, jewelry, or accessories websites. Sesoris sells home organization and storage products, not fashion accessories. The only official website is www.sesoris.com.',
  },
  {
    q: 'How do I contact Sesoris?',
    a: `Email ${SUPPORT_EMAIL} or message ${SUPPORT_WHATSAPP} on WhatsApp. The contact page lists support hours and a contact form.`,
  },
];

const facts: { label: string; value: string; href?: string; source?: string }[] = [
  { label: 'Official website', value: 'www.sesoris.com', href: '/' },
  { label: 'Founded in', value: 'Yogyakarta, Indonesia' },
  { label: 'Domain registered', value: DOMAIN_REGISTERED.label, source: DOMAIN_REGISTERED.source },
  { label: 'Earliest archived page', value: FIRST_ARCHIVED.label, source: FIRST_ARCHIVED.source },
  { label: 'Catalog', value: `${products.length} products in ${categories.length} categories`, href: '/shop' },
  { label: 'Price range', value: `${MIN_PRICE} to ${MAX_PRICE}` },
  { label: 'Ships to', value: 'US addresses only', href: '/shipping' },
  { label: 'Returns', value: '30 days, unused and in original condition', href: '/returns' },
  { label: 'Payment', value: 'PayPal checkout' },
  { label: 'Customer reviews on sesoris.com', value: 'None published yet' },
];

export default function WhatIsSesorisPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${PAGE_URL}#faq`,
    url: PAGE_URL,
    name: TITLE,
    about: { '@id': ORGANIZATION_ID },
    dateModified: '2026-10-09',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sesoris.com/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.sesoris.com/about' },
      { '@type': 'ListItem', position: 3, name: 'What Is Sesoris?', item: PAGE_URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <div style={{ background: 'var(--surface-2)', padding: '12px 0' }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', flexWrap: 'wrap' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: 'var(--ink-muted)' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <Link href="/about" style={{ color: 'var(--ink-muted)' }}>About</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>What Is Sesoris?</span>
          </nav>
        </div>
      </div>

      <article className="section-padding">
        <div className="container" style={{ maxWidth: '820px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 3rem)', fontWeight: 700, color: 'var(--ink)', marginBottom: '20px', lineHeight: 1.1 }}>
            What Is Sesoris?
          </h1>
          <p style={{ fontSize: '19px', lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: '12px' }}>
            {faqs[0].a}
          </p>
          <p style={{ fontSize: '14px', color: 'var(--ink-muted)', marginBottom: '40px' }}>
            Facts checked on {BRAND_FACTS_CHECKED}. Product counts and prices update from the live catalog.
          </p>

          <section aria-labelledby="glance" style={{ marginBottom: '48px' }}>
            <h2 id="glance" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px' }}>
              Sesoris at a glance
            </h2>
            <dl style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', borderTop: '1px solid var(--line)', margin: 0 }}>
              {facts.map((f) => (
                <div key={f.label} style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
                  <dt style={{ flex: '0 0 220px', maxWidth: '100%', color: 'var(--ink-muted)', fontSize: '15px' }}>{f.label}</dt>
                  <dd style={{ flex: '1 1 260px', margin: 0, color: 'var(--ink)', fontWeight: 600, fontSize: '15.5px' }}>
                    {f.href ? (
                      <Link href={f.href} className="text-link">{f.value}</Link>
                    ) : (
                      f.value
                    )}
                    {f.source && (
                      <>
                        {' '}
                        <a href={f.source} target="_blank" rel="noopener" className="text-link" style={{ fontWeight: 500, fontSize: '14px', color: 'var(--ink-muted)' }}>
                          (source)
                        </a>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {faqs.slice(1).map((f) => (
            <section key={f.q} style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>{f.q}</h2>
              <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--ink-2)' }}>{f.a}</p>
              {f.q === 'What is the rating for Sesoris?' && (
                <p style={{ fontSize: '15px', marginTop: '8px' }}>
                  <a href={SMARTCUSTOMER_PROFILE} target="_blank" rel="noopener" className="text-link">
                    sesoris.com on SmartCustomer <ExternalLink aria-hidden style={{ width: '14px', height: '14px' }} />
                  </a>
                </p>
              )}
              {f.q === 'Is Sesoris legit?' && (
                <ul style={{ marginTop: '12px', paddingLeft: '20px', lineHeight: 1.9, color: 'var(--ink-2)', fontSize: '16px', listStyle: 'disc' }}>
                  <li>
                    <a href={DOMAIN_REGISTERED.source} target="_blank" rel="noopener" className="text-link">Domain registry record for sesoris.com</a>
                  </li>
                  <li>
                    <a href={FIRST_ARCHIVED.source} target="_blank" rel="noopener" className="text-link">Sesoris page archived by the Internet Archive in 2020</a>
                  </li>
                  <li><Link href="/shipping" className="text-link">Shipping policy</Link> and <Link href="/returns" className="text-link">returns policy</Link></li>
                  <li><Link href="/privacy" className="text-link">Privacy policy</Link> and <Link href="/terms" className="text-link">terms of service</Link></li>
                </ul>
              )}
              {f.q === 'How do I contact Sesoris?' && (
                <p style={{ fontSize: '16px', marginTop: '8px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="text-link">{SUPPORT_EMAIL}</a>
                  <a href={SUPPORT_WHATSAPP_URL} className="text-link">WhatsApp {SUPPORT_WHATSAPP}</a>
                  <Link href="/contact" className="text-link">Contact page</Link>
                </p>
              )}
            </section>
          ))}

          <section aria-labelledby="profiles" style={{ marginBottom: '40px' }}>
            <h2 id="profiles" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
              Official Sesoris profiles
            </h2>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: '12px' }}>
              These are the social accounts Sesoris runs.
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.9, fontSize: '16px', listStyle: 'disc', color: 'var(--ink-2)' }}>
              {OFFICIAL_PROFILES.map((p) => (
                <li key={p.url}>
                  {p.network}:{' '}
                  <a href={p.url} target="_blank" rel="noopener me" className="text-link">{p.handle}</a>
                </li>
              ))}
            </ul>
          </section>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/about" className="btn btn-outline">About Sesoris</Link>
            <Link href="/shop" className="btn btn-primary">Shop all {products.length} products</Link>
          </div>
        </div>
      </article>
    </>
  );
}
