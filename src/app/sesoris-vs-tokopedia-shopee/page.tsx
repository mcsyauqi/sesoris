import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sesoris vs Tokopedia vs Shopee: Where to Buy Home Organizers',
  description: 'Compare Sesoris, Tokopedia, and Shopee for home organization products, shopping intent, curation, product fit, and post-purchase clarity.',
  alternates: {
    canonical: '/sesoris-vs-tokopedia-shopee',
  },
  openGraph: {
    title: 'Sesoris vs Tokopedia vs Shopee',
    description: 'A practical comparison for buyers choosing home organizers and lifestyle accessories.',
    url: 'https://www.sesoris.com/sesoris-vs-tokopedia-shopee',
    siteName: 'Sesoris',
    type: 'article',
  },
};

const rows = [
  ['Main use case', 'Curated home organizer and lifestyle accessories', 'Broad marketplace search across many sellers', 'Broad marketplace search with heavy promo discovery'],
  ['Buyer experience', 'Focused catalog, easier category browsing, less decision fatigue', 'Very wide choice, but quality and listing clarity vary by seller', 'Very wide choice, strong deals, but buyer must compare many listings'],
  ['Best for', 'People who want a simpler shortlist for storage, kitchen, desk, and home organization needs', 'People who already know exact product names or seller preferences', 'People who want price comparison and promo hunting'],
  ['SEO and content support', 'Guides, product context, and home organization ideas on the same domain', 'Depends on individual seller pages and marketplace listing quality', 'Depends on seller pages, reviews, and campaign pages'],
];

export default function SesorisVsMarketplacePage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sesoris vs Tokopedia vs Shopee: Where to Buy Home Organizers',
    description: metadata.description,
    author: { '@type': 'Organization', name: 'Sesoris' },
    publisher: { '@type': 'Organization', name: 'Sesoris' },
    mainEntityOfPage: 'https://www.sesoris.com/sesoris-vs-tokopedia-shopee',
  };

  return (
    <main style={{ background: '#FAFAF7', color: '#1F2933' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <section style={{ maxWidth: '1040px', margin: '0 auto', padding: '72px 20px 40px' }}>
        <p style={{ color: '#1B5E3B', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Marketplace comparison
        </p>
        <h1 style={{ fontSize: 'clamp(34px, 6vw, 64px)', lineHeight: 1.05, margin: '0 0 20px', color: '#123524' }}>
          Sesoris vs Tokopedia vs Shopee: Which One Fits Your Home Organizer Purchase?
        </h1>
        <p style={{ fontSize: '18px', lineHeight: 1.8, maxWidth: '760px', color: '#4B5563' }}>
          Tokopedia and Shopee are powerful marketplaces for broad product discovery. Sesoris is different: it focuses the shopping journey around curated home organization, storage, kitchen, desk, and lifestyle products so buyers can choose faster with less noise.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
          <Link href="/shop" style={{ background: '#1B5E3B', color: 'white', padding: '12px 18px', borderRadius: '999px', textDecoration: 'none', fontWeight: 700 }}>
            Shop Sesoris Products
          </Link>
          <Link href="/blog" style={{ border: '1px solid #1B5E3B', color: '#1B5E3B', padding: '12px 18px', borderRadius: '999px', textDecoration: 'none', fontWeight: 700 }}>
            Read Organization Guides
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: '1040px', margin: '0 auto', padding: '24px 20px 64px' }}>
        <div style={{ overflowX: 'auto', background: 'white', border: '1px solid #E6E8DF', borderRadius: '24px', boxShadow: '0 24px 80px rgba(18,53,36,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '780px' }}>
            <thead>
              <tr style={{ background: '#EEF5EE' }}>
                {['Criteria', 'Sesoris', 'Tokopedia', 'Shopee'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '18px', color: '#123524', fontSize: '15px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} style={{ borderTop: '1px solid #EEF0EA' }}>
                  {row.map((cell, index) => (
                    <td key={cell} style={{ padding: '18px', verticalAlign: 'top', lineHeight: 1.65, color: index === 0 ? '#123524' : '#4B5563', fontWeight: index === 0 ? 700 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 20px 72px', display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {[
          ['Choose Sesoris when you want curation', 'Sesoris is useful when the buyer needs home organization ideas, product context, and a smaller shortlist instead of thousands of marketplace listings.'],
          ['Choose marketplaces when you need seller variety', 'Tokopedia and Shopee are still useful for broad price checks, seller comparison, and promo hunting across many categories.'],
          ['Use guides before buying', 'For storage and organizer products, measure the space first, define the category, and pick products based on function before style.'],
        ].map(([title, body]) => (
          <article key={title} style={{ background: 'white', border: '1px solid #E6E8DF', borderRadius: '22px', padding: '24px' }}>
            <h2 style={{ color: '#123524', fontSize: '22px', marginTop: 0 }}>{title}</h2>
            <p style={{ color: '#4B5563', lineHeight: 1.75 }}>{body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
