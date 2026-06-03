'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Star, Heart, Minus, Plus, ShoppingCart, Truck, RefreshCw, Shield, Check, Package, ChevronDown, ChevronUp } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { ProductReviewSection } from '@/components/product/ProductReviewSection';
import { getReviewsByProductId, products as allProducts } from '@/data/products';
import { getBundlesForProduct } from '@/data/bundles';
import { getProductImageAlt } from '@/lib/product-image-alt';

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
  const addToCart = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const wishlisted = isInWishlist(product.id);
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = onSale ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) : 0;

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <Link href="/shop" style={{ color: '#6C757D' }}>Shop</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px' }}>
        <div className="product-detail-grid">
          {/* Image Gallery */}
          <div>
            <div style={{
              aspectRatio: '1',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              background: '#F8F9FA'
            }} className="img-hover-zoom">
              <Image
                src={product.images[selectedImage]?.url || product.images[0]?.url || ''}
                alt={getProductImageAlt(product, selectedImage)}
                fill
                priority={selectedImage === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              {onSale && (
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: '#DC3545',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}>
                  -{discount}%
                </span>
              )}
              {product.isNew && (
                <span style={{
                  position: 'absolute',
                  top: onSale ? '56px' : '16px',
                  left: '16px',
                  background: '#1B5E3B',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}>
                  New
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      border: selectedImage === idx ? '2px solid #1B5E3B' : '2px solid #E9ECEF',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={getProductImageAlt(product, idx)}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div style={{ marginBottom: '8px' }}>
              <Link href={`/category/${product.category.slug}`} style={{
                fontSize: '13px',
                color: '#1B5E3B',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {product.category.name}
              </Link>
            </div>

            <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              {product.name}
            </h1>

            {/* Rating - only show if there are ulasan */}
            {product.reviewCount > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      style={{
                        width: '18px',
                        height: '18px',
                        fill: i < Math.floor(product.rating) ? '#FFC107' : '#E9ECEF',
                        color: i < Math.floor(product.rating) ? '#FFC107' : '#E9ECEF'
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '14px', color: '#6C757D' }}>({product.reviewCount} ulasan)</span>
              </div>
            ) : (
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '13px', color: '#6C757D', fontStyle: 'italic' }}>
                  Jadilah yang pertama memberi ulasan produk ini!
                </span>
              </div>
            )}

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: '#1B5E3B' }}>
                {formatPrice(product.price)}
              </span>
              {onSale && (
                <span style={{ fontSize: '20px', color: '#6C757D', textDecoration: 'line-through' }}>
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>

            {/* Short Deskripsi */}
            <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '24px', fontSize: '15px' }}>
              {product.description}
            </p>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px'
                }}>
                  {product.features.slice(0, 6).map((feature, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check style={{ width: '16px', height: '16px', color: '#1B5E3B', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '13px', color: '#495057', lineHeight: 1.4 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jumlah */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#212529' }}>
                Jumlah
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #E9ECEF',
                  borderRadius: '8px'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
                <span style={{ fontSize: '13px', color: '#1B5E3B', fontWeight: 500 }}>
                  ✓ Stok tersedia
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button
                onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  padding: '16px 32px',
                  background: '#1B5E3B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <ShoppingCart style={{ width: '20px', height: '20px' }} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleItem(product)}
                style={{
                  width: '56px',
                  height: '56px',
                  border: '1px solid #E9ECEF',
                  borderRadius: '10px',
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
                  color: wishlisted ? '#DC3545' : '#6C757D',
                  fill: wishlisted ? '#DC3545' : 'none'
                }} />
              </button>
            </div>

            {/* Features Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              padding: '20px',
              background: '#F8F9FA',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck style={{ width: '20px', height: '20px', color: '#1B5E3B' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>Free Shipping</div>
                  <div style={{ fontSize: '11px', color: '#6C757D' }}>Min. $50</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RefreshCw style={{ width: '20px', height: '20px', color: '#1B5E3B' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>Easy Returns</div>
                  <div style={{ fontSize: '11px', color: '#6C757D' }}>30 Days</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield style={{ width: '20px', height: '20px', color: '#1B5E3B' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>Warranty</div>
                  <div style={{ fontSize: '11px', color: '#6C757D' }}>1 Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div style={{ marginTop: '64px' }}>
          <div style={{
            display: 'flex',
            gap: '0',
            borderBottom: '2px solid #E9ECEF',
            marginBottom: '32px'
          }}>
            <button
              onClick={() => setActiveTab('description')}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'description' ? '2px solid #1B5E3B' : '2px solid transparent',
                marginBottom: '-2px',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'description' ? '#1B5E3B' : '#6C757D',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Deskripsi
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'specs' ? '2px solid #1B5E3B' : '2px solid transparent',
                marginBottom: '-2px',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'specs' ? '#1B5E3B' : '#6C757D',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Spesifikasi
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'reviews' ? '2px solid #1B5E3B' : '2px solid transparent',
                marginBottom: '-2px',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'reviews' ? '#1B5E3B' : '#6C757D',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Ulasan
              {productReviews.length > 0 && (
                <span style={{
                  background: '#1B5E3B',
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
                    color: '#495057',
                    lineHeight: 1.8,
                    fontSize: '15px',
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
                        background: '#F8F9FA',
                        border: '1px solid #E9ECEF',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#1B5E3B',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {showFullDesc ? (
                        <>Tampilkan Lebih Sedikit <ChevronUp style={{ width: '16px', height: '16px' }} /></>
                      ) : (
                        <>Baca Selengkapnya <ChevronDown style={{ width: '16px', height: '16px' }} /></>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <p style={{ color: '#495057', lineHeight: 1.8 }}>{product.description}</p>
              )}

              {product.features && product.features.length > 0 && (
                <div style={{ marginTop: '32px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
                    Fitur Utama
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {product.features.map((feature, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#E8F5E9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Check style={{ width: '14px', height: '14px', color: '#1B5E3B' }} />
                        </div>
                        <span style={{ fontSize: '15px', color: '#495057', lineHeight: 1.5 }}>{feature}</span>
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
                background: '#F8F9FA',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #E9ECEF'
              }}>
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '180px 1fr',
                      borderBottom: index < product.specifications!.length - 1 ? '1px solid #E9ECEF' : 'none'
                    }}
                  >
                    <div style={{
                      padding: '14px 20px',
                      background: '#F8F9FA',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#495057'
                    }}>
                      {spec.label}
                    </div>
                    <div style={{
                      padding: '14px 20px',
                      background: 'white',
                      fontSize: '14px',
                      color: '#212529'
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
          background: '#F8F9FA',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <Package style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
          <div>
            <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>What&apos;s in the Box</div>
            <div style={{ fontSize: '14px', color: '#6C757D' }}>
              1x {product.name}, Warranty Card, User Guide
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
