import Link from 'next/link';
import type { Product } from '@/types';
import { getProductGuide } from '@/data/productGuides';

/**
 * Long-form product content, rendered on the server so it is present in the
 * static HTML rather than behind a client-side tab.
 *
 * Why this exists as a separate server component: the interactive product view
 * puts the description, specifications, and reviews behind tabs, and only the
 * active tab is emitted into the initial HTML. The description itself is also
 * truncated to 600 characters until a reader expands it. The result was a
 * product page that measured under 400 words with zero h2 headings, which is
 * thin for a commercial page and gives answer engines almost nothing to extract.
 *
 * Deliberately absent: any review content, aggregateRating, or Review
 * structured data. The catalog's review counts are seeded placeholders and most
 * products have no stored reviews at all, so depth here comes from
 * specification, use, care, and comparison instead.
 */
export function ProductGuideSection({ product }: { product: Product }) {
  const guide = getProductGuide(product.slug);
  if (!guide) return null;

  const headingStyle = {
    fontFamily: 'var(--font-heading), Georgia, serif',
    fontSize: 'clamp(19px, 2.4vw, 22px)',
    fontWeight: 400 as const,
    color: '#212529',
    marginBottom: '10px',
  };

  const bodyStyle = {
    fontSize: '15px',
    color: '#495057',
    lineHeight: 1.75,
    maxWidth: '760px',
  };

  const blockStyle = { marginBottom: '30px' };

  return (
    <section
      aria-labelledby="product-guide-heading"
      style={{ background: '#F8F9FA', padding: '48px 0', marginTop: '48px' }}
    >
      <div className="container">
        <h2 id="product-guide-heading" style={headingStyle}>
          What the {product.name} is
        </h2>
        <p style={{ ...bodyStyle, marginBottom: '30px' }}>{guide.overview}</p>

        <div style={blockStyle}>
          <h2 style={headingStyle}>Who the {product.name} is for</h2>
          <p style={bodyStyle}>{guide.bestFor}</p>
        </div>

        <div style={blockStyle}>
          <h2 style={headingStyle}>How to use the {product.name}</h2>
          <p style={bodyStyle}>{guide.howToUse}</p>
        </div>

        <div style={blockStyle}>
          <h2 style={headingStyle}>Care and maintenance</h2>
          <p style={bodyStyle}>{guide.care}</p>
        </div>

        <div style={blockStyle}>
          <h2 style={headingStyle}>{guide.compare.heading}</h2>
          <p style={bodyStyle}>{guide.compare.text}</p>
        </div>

        {guide.faqs.length > 0 && (
          <div style={{ marginTop: '36px', paddingTop: '26px', borderTop: '1px solid #E9ECEF' }}>
            <h2 style={headingStyle}>{product.name} questions, answered</h2>
            {guide.faqs.map((faq, i) => (
              <div key={i} style={{ marginBottom: '20px', maxWidth: '760px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#212529', marginBottom: '6px' }}>
                  {faq.question}
                </h3>
                <p style={{ fontSize: '15px', color: '#495057', lineHeight: 1.75 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '32px', paddingTop: '22px', borderTop: '1px solid #E9ECEF' }}>
          <p style={{ fontSize: '14px', color: '#5F6873', marginBottom: '12px' }}>Keep browsing:</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href={`/category/${product.category.slug}`}
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
              All {product.category.name}
            </Link>
            <Link
              href="/shop"
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
              Full catalog
            </Link>
            <Link
              href="/shipping"
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
              Shipping and delivery
            </Link>
            <Link
              href="/returns"
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
              30-day returns
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductGuideSection;
