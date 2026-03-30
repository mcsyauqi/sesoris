import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Tag, ArrowRight } from 'lucide-react';
import { bundles } from '@/data/bundles';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Bundle Deals — Save Up to 18% | Sesoris',
  description: 'Shop curated product bundles at Sesoris and save up to 18%. Kitchen Starter Kit, Home Office Bundle, Organizer Essential, and more.',
  alternates: { canonical: '/bundles' },
  openGraph: {
    title: 'Bundle Deals — Save Up to 18% | Sesoris',
    description: 'Shop curated product bundles and save up to 18% vs buying separately.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function BundlesPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E3B 0%, #2D8659 100%)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '6px 16px',
            marginBottom: '16px',
          }}>
            <Tag style={{ width: '14px', height: '14px', color: 'white' }} />
            <span style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Bundle Deals</span>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>
            Save More, Buy Together
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', maxWidth: '500px', margin: '0 auto' }}>
            Curated product sets designed to work perfectly together — at up to 18% off.
          </p>
        </div>
      </div>

      {/* Bundles grid */}
      <div className="container" style={{ padding: '64px 16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '28px',
        }}>
          {bundles.map((bundle) => {
            const bundleProducts = bundle.productIds
              .map((id) => products.find((p) => p.id === id))
              .filter(Boolean);

            return (
              <Link
                key={bundle.id}
                href={`/bundles/${bundle.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  border: '1px solid #E9ECEF',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'white',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  cursor: 'pointer',
                }}>
                  {/* Bundle image */}
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                    <Image
                      src={bundle.image}
                      alt={bundle.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      gap: '6px',
                    }}>
                      {bundle.badge && (
                        <span style={{
                          background: '#1B5E3B',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '20px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}>
                          {bundle.badge}
                        </span>
                      )}
                      <span style={{
                        background: '#FF6B35',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '20px',
                      }}>
                        -{bundle.discountPercent}%
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', marginBottom: '8px' }}>
                      {bundle.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6C757D', marginBottom: '16px', lineHeight: '1.5' }}>
                      {bundle.description}
                    </p>

                    {/* Product thumbnails */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                      {bundleProducts.map((product) => product && (
                        <div
                          key={product.id}
                          style={{ width: '48px', height: '48px', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E9ECEF' }}
                        >
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        background: '#F8F9FA',
                        border: '1px dashed #DEE2E6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        color: '#6C757D',
                        fontWeight: 600,
                      }}>
                        {bundle.productIds.length} items
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                          <span style={{ fontSize: '20px', fontWeight: 800, color: '#212529' }}>
                            {formatPrice(bundle.bundlePrice)}
                          </span>
                          <span style={{ fontSize: '13px', color: '#ADB5BD', textDecoration: 'line-through' }}>
                            {formatPrice(bundle.originalPrice)}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#28A745', fontWeight: 600 }}>
                          Save {formatPrice(bundle.originalPrice - bundle.bundlePrice)}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#1B5E3B',
                        fontWeight: 600,
                        fontSize: '14px',
                      }}>
                        View Bundle
                        <ArrowRight style={{ width: '14px', height: '14px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
