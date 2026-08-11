import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product';
import { getCategoryBySlug, getProductsByCategory, categories } from '@/data/products';
import { categoryContent } from '@/data/categoryContent';
import { notFound } from 'next/navigation';
import { selfReferencingAlternates } from '@/lib/seo-alternates';
import type { Metadata } from 'next';

const stripSesorisBrandSuffix = (title: string) =>
  title.replace(/\s*(?:-|–|, |â€“)\s*Sesoris$/u, '');

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
  }
): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  const query = searchParams ? await searchParams : {};
  const hasQuery = Object.keys(query).length > 0;

  const seo = categoryContent[slug];
  const title = seo?.seoTitle ? stripSesorisBrandSuffix(seo.seoTitle) : `${category.name} Products | Shop`;
  const description = seo?.seoDescription ?? category.description;

  return {
    title,
    description,
    alternates: selfReferencingAlternates(`/category/${slug}`),
    ...(hasQuery ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: '/og-default.webp', width: 1200, height: 630, alt: category.name }],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);
  const seo = categoryContent[slug];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sesoris.com' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://www.sesoris.com/shop' },
      { '@type': 'ListItem', position: 3, name: category.name, item: `https://www.sesoris.com/category/${slug}` },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: seo?.seoTitle ?? category.name,
    description: seo?.seoDescription ?? category.description,
    url: `https://www.sesoris.com/category/${slug}`,
    isPartOf: { '@type': 'WebSite', name: 'Sesoris', url: 'https://www.sesoris.com' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: '#5F6873' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
            <Link href="/shop" style={{ color: '#5F6873' }}>Shop</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>{category.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{
        position: 'relative',
        height: '280px',
        background: '#343A40',
        overflow: 'hidden'
      }}>
        <Image
          src={category.image}
          alt={`${category.name} products at Sesoris`}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.4 }}
          priority
        />
        <div className="container" style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h1 style={{ fontSize: '40px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
            {category.name}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', maxWidth: '560px' }}>
            {seo?.intro?.substring(0, 120) ?? category.description}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '8px' }}>
            {products.length} products
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="container" style={{ padding: '48px 16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ color: '#5F6873' }}>No products found in this category.</p>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      {seo && (
        <div style={{ background: '#F8F9FA', padding: '48px 0', marginTop: '8px' }}>
          <div className="container">
            <h2 style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: 'clamp(20px, 3vw, 24px)',
              fontWeight: 400,
              color: '#212529',
              marginBottom: '12px',
            }}>
              About {category.name}
            </h2>
            <p style={{ color: '#495057', fontSize: '15px', lineHeight: '1.7', marginBottom: '32px', maxWidth: '720px' }}>
              {seo.intro}
            </p>

            {/* Section headings are h2, not h3. Answer engines and search
                crawlers use heading level to decide what a passage is about,
                and these sections are top-level topics on the page rather than
                sub-points of the intro. */}
            {seo.sections.map((section, i) => (
              <div key={i} style={{ marginBottom: '28px' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading), Georgia, serif',
                  fontSize: '19px',
                  fontWeight: 400,
                  color: '#1B5E3B',
                  marginBottom: '8px',
                }}>
                  {section.heading}
                </h2>
                <p style={{ fontSize: '15px', color: '#495057', lineHeight: '1.75', maxWidth: '720px' }}>
                  {section.text}
                </p>
              </div>
            ))}

            {/* FAQ: visible content only. No FAQPage structured data is
                emitted here on purpose, matching the deliberate decision on
                product pages to keep unverifiable markup off this site. */}
            {seo.faqs.length > 0 && (
              <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid #E9ECEF' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading), Georgia, serif',
                  fontSize: 'clamp(19px, 3vw, 22px)',
                  fontWeight: 400,
                  color: '#212529',
                  marginBottom: '20px',
                }}>
                  {category.name} questions, answered
                </h2>
                {seo.faqs.map((faq, i) => (
                  <div key={i} style={{ marginBottom: '22px', maxWidth: '720px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#212529', marginBottom: '6px' }}>
                      {faq.question}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#495057', lineHeight: '1.75' }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Related Categories */}
            {seo.relatedCategories.length > 0 && (
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #E9ECEF' }}>
                <p style={{ fontSize: '14px', color: '#5F6873', marginBottom: '12px' }}>
                  Also explore:
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {seo.relatedCategories.map((relSlug) => {
                    const relCat = categories.find((c) => c.slug === relSlug);
                    if (!relCat) return null;
                    return (
                      <Link
                        key={relSlug}
                        href={`/category/${relSlug}`}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          border: '1px solid #1B5E3B',
                          color: '#1B5E3B',
                          fontSize: '13px',
                          fontWeight: 500,
                          textDecoration: 'none',
                        }}
                      >
                        {relCat.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
