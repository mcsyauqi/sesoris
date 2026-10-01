'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Star, Heart, Minus, Plus, ShoppingBag, Truck, RotateCcw, Warehouse, Check, Package, ChevronDown, ChevronUp, Ruler } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { ProductReviewSection } from '@/components/product/ProductReviewSection';
import { getReviewsByProductId, products as allProducts } from '@/data/products';
import { getBundlesForProduct } from '@/data/bundles';
import { getProductImageAlt } from '@/lib/product-image-alt';
import { trackViewItem } from '@/lib/analytics';
import { FREE_SHIPPING_MIN } from '@/lib/shipping';

// Specs that answer "will it fit / will it hold", surfaced next to the price.
const FIT_SPECS = [/^Dimensions\b/, /^Minimum (cabinet )?opening/i, /^Weight capacity/i, /^Full-extension depth/i, /^Maximum pull-out/i];

const FrequentlyBoughtTogether = dynamic(
  () => import('@/components/product/FrequentlyBoughtTogether').then((mod) => mod.FrequentlyBoughtTogether),
  { ssr: false }
);

export default function ProductPageClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const productReviews = getReviewsByProductId(product.id);
  const productBundles = getBundlesForProduct(product.id);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const fitSpecs = FIT_SPECS.map((re) => product.specifications?.find((sp) => re.test(sp.label))).filter((sp) => sp !== undefined);
  const reviewCount = productReviews.length;
  const reviewRating =
    reviewCount > 0
      ? Number((productReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1))
      : 0;
  const addToCart = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  // GA4 view_item: one event per product detail page view.
  useEffect(() => {
    trackViewItem(product);
  }, [product]);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  const wishlisted = isInWishlist(product.id);
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = onSale ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) : 0;

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
            <Link href="/shop" style={{ color: 'var(--ink-muted)' }}>Shop</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBlock: '40px 72px' }}>
        <div className="product-detail-grid">
          {/* Image Gallery */}
          <div>
            <div className="pdp-main-img">
              <Image
                src={product.images[selectedImage]?.url || product.images[0]?.url || ''}
                alt={getProductImageAlt(product, selectedImage)}
                fill
                priority={selectedImage === 0}
                sizes="(max-width: 768px) 100vw, 55vw"
              />
              {onSale && (
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'var(--danger)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}>
                  -{discount}%
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="pdp-thumbs">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className="pdp-thumb"
                    aria-label={`Show image ${idx + 1} of ${product.images.length}`}
                    aria-pressed={selectedImage === idx}
                  >
                    <Image
                      src={img.url}
                      alt=""
                      fill
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div style={{ marginBottom: '8px' }}>
              <Link href={`/category/${product.category.slug}`} className="text-link" style={{ fontSize: '14px', fontWeight: 500 }}>
                {product.category.name}
              </Link>
            </div>

            <h1 style={{ fontSize: 'clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
              {product.name}
            </h1>

            {/* Rating - only show if there are reviews */}
            {reviewCount > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      style={{
                        width: '18px',
                        height: '18px',
                        fill: i < Math.floor(reviewRating) ? '#FFC107' : 'var(--line)',
                        color: i < Math.floor(reviewRating) ? '#FFC107' : 'var(--line)'
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>({reviewCount} reviews)</span>
              </div>
            ) : null}

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', margin: '8px 0 20px', fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ fontSize: '30px', fontWeight: 700, color: 'var(--ink)' }}>
                {formatPrice(product.price)}
              </span>
              {onSale && (
                <span style={{ fontSize: '20px', color: 'var(--ink-muted)', textDecoration: 'line-through' }}>
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>

            {/* Short description */}
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: '24px', fontSize: '16px' }}>
              {product.description}
            </p>

            {fitSpecs.length > 0 && (
              <div className="pdp-fit">
                <div className="pdp-fit-title"><Ruler aria-hidden /> Size and fit</div>
                <dl>
                  {fitSpecs.map((sp) => (
                    <div key={sp.label}>
                      <dt>{sp.label}</dt>
                      <dd>{sp.value.split(' (')[0]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '10px 20px'
                }}>
                  {product.features.slice(0, 6).map((feature, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check style={{ width: '16px', height: '16px', color: 'var(--brand)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '14.5px', color: 'var(--ink-2)', lineHeight: 1.45 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: '24px' }}>
              <div id="qty-label" style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--ink)', fontSize: '15px' }}>
                Quantity
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div role="group" aria-labelledby="qty-label" style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1.5px solid var(--line-strong)',
                  borderRadius: 'var(--radius)'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    style={{
                      width: '44px',
                      height: '44px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Minus style={{ width: '16px', height: '16px' }} />
                  </button>
                  <span style={{ width: '48px', textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    style={{
                      width: '44px',
                      height: '44px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Plus style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: product.inStock ? 'var(--brand)' : 'var(--danger)', fontWeight: 500 }}>
                  {product.inStock ? <><Check aria-hidden style={{ width: '16px', height: '16px' }} /> In stock</> : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div aria-live="polite" style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
              <button
                onClick={() => { addToCart(product, quantity); setAdded(true); }}
                disabled={!product.inStock}
                className="btn btn-primary"
                style={{ flex: 1, minHeight: '54px', fontSize: '16px' }}
              >
                {added ? <Check aria-hidden /> : <ShoppingBag aria-hidden />}
                {added ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                onClick={() => toggleItem(product)}
                aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                aria-pressed={wishlisted}
                style={{
                  width: '54px',
                  height: '54px',
                  border: '1.5px solid var(--line-strong)',
                  borderRadius: 'var(--radius)',
                  background: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <Heart style={{
                  width: '22px',
                  height: '22px',
                  color: wishlisted ? 'var(--danger)' : 'var(--ink-muted)',
                  fill: wishlisted ? 'var(--danger)' : 'none'
                }} />
              </button>
            </div>

            {/* Features Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
              padding: '18px 20px',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck aria-hidden style={{ width: '20px', height: '20px', color: 'var(--brand)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>Free shipping</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>On orders over ${FREE_SHIPPING_MIN}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw aria-hidden style={{ width: '20px', height: '20px', color: 'var(--brand)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>30-day returns</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>Original condition</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Warehouse aria-hidden style={{ width: '20px', height: '20px', color: 'var(--brand)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>Ships from the US</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>{product.shipDays ? `Est. ${product.shipDays} days` : 'US warehouse'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div style={{ marginTop: '64px' }}>
          <div role="tablist" aria-label="Product details" style={{
            display: 'flex',
            gap: '28px',
            borderBottom: '2px solid var(--line)',
            marginBottom: '32px',
            overflowX: 'auto'
          }}>
            <button
              role="tab"
              aria-selected={activeTab === 'description'}
              onClick={() => setActiveTab('description')}
              style={{
                padding: '14px 2px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'description' ? '2px solid var(--brand)' : '2px solid transparent',
                marginBottom: '-2px',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'description' ? 'var(--ink)' : 'var(--ink-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Description
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'specs'}
              onClick={() => setActiveTab('specs')}
              style={{
                padding: '14px 2px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'specs' ? '2px solid var(--brand)' : '2px solid transparent',
                marginBottom: '-2px',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'specs' ? 'var(--ink)' : 'var(--ink-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Specifications
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'reviews'}
              onClick={() => setActiveTab('reviews')}
              style={{
                padding: '14px 2px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'reviews' ? '2px solid var(--brand)' : '2px solid transparent',
                marginBottom: '-2px',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'reviews' ? 'var(--ink)' : 'var(--ink-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Reviews
              {productReviews.length > 0 && (
                <span style={{
                  background: 'var(--brand)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '10px',
                }}>
                  {productReviews.length}
                </span>
              )}
            </button>
          </div>

          {activeTab === 'description' && (
            <div style={{ maxWidth: '800px' }}>
              {product.fullDescription ? (
                <>
                  <div style={{
                    color: 'var(--ink-2)',
                    lineHeight: 1.75,
                    fontSize: '16px',
                    whiteSpace: 'pre-line'
                  }}>
                    {showFullDesc ? product.fullDescription : product.fullDescription.slice(0, 600) + '...'}
                  </div>
                  {product.fullDescription.length > 600 && (
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      style={{
                        marginTop: '16px',
                        padding: '10px 20px',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--line)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--brand)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {showFullDesc ? (
                        <>Show Less <ChevronUp style={{ width: '16px', height: '16px' }} /></>
                      ) : (
                        <>Read More <ChevronDown style={{ width: '16px', height: '16px' }} /></>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.8 }}>{product.description}</p>
              )}

              {product.features && product.features.length > 0 && (
                <div style={{ marginTop: '32px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)', marginBottom: '16px' }}>
                    Key Features
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {product.features.map((feature, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'var(--brand-tint)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Check style={{ width: '14px', height: '14px', color: 'var(--brand)' }} />
                        </div>
                        <span style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.5 }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && product.specifications && (
            <div style={{ maxWidth: '600px' }}>
              <div style={{
                background: 'var(--surface-2)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--line)'
              }}>
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(120px, 38%) 1fr',
                      borderBottom: index < product.specifications!.length - 1 ? '1px solid var(--line)' : 'none'
                    }}
                  >
                    <div style={{
                      padding: '14px 16px',
                      background: 'var(--surface-2)',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: 'var(--ink-2)'
                    }}>
                      {spec.label}
                    </div>
                    <div style={{
                      padding: '14px 16px',
                      background: 'white',
                      fontSize: '14px',
                      color: 'var(--ink)'
                    }}>
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{ maxWidth: '800px' }}>
              <ProductReviewSection
                productId={product.id}
                productName={product.name}
                reviews={productReviews}
              />
            </div>
          )}
        </div>

        {/* Frequently Bought Together */}
        <FrequentlyBoughtTogether
          currentProductId={product.id}
          allProducts={allProducts}
          bundles={productBundles}
        />

        {/* Package Info */}
        <div style={{
          marginTop: '48px',
          padding: '24px',
          background: 'var(--surface-2)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <Package style={{ width: '24px', height: '24px', color: 'var(--brand)' }} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>What&apos;s in the Box</div>
            <div style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>
              {product.specifications?.find((s) => s.label === 'Package contents')?.value ?? `1x ${product.name}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
