'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Heart,
  Share2,
  Truck,
  RefreshCw,
  Shield,
  Check,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { ProductGrid } from '@/components/product/product-grid';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { toast } from '@/components/ui/toast';
import { getProductBySlug, products } from '@/data/products';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product?.variants?.[0]?.id || null
  );
  const [activeTab, setActiveTab] = useState('description');

  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) {
    notFound();
  }

  const isWishlisted = isInWishlist(product.id);
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = isOnSale
    ? calculateDiscount(product.compareAtPrice!, product.price)
    : 0;

  const currentVariant = product.variants?.find((v) => v.id === selectedVariant);
  const displayPrice = currentVariant?.price || product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, currentVariant || undefined);
    toast.success('Added to cart!', {
      label: 'View Cart',
      onClick: openCart,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentVariant || undefined);
    window.location.href = '/checkout';
  };

  const relatedProducts = products
    .filter((p) => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Shop', href: '/shop' },
              { label: product.category.name, href: `/category/${product.category.slug}` },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImage]?.url || '/placeholder.jpg'}
                alt={product.images[selectedImage]?.alt || product.name}
                fill
                className="object-cover"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {isOnSale && <Badge variant="sale">-{discount}%</Badge>}
                {product.isNew && <Badge variant="new">New</Badge>}
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        (selectedImage - 1 + product.images.length) %
                          product.images.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((selectedImage + 1) % product.images.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all',
                      selectedImage === index
                        ? 'border-[#1B5E3B]'
                        : 'border-transparent hover:border-gray-300'
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#212529] mb-2">
                {product.name}
              </h1>
              <Rating
                value={product.rating}
                reviewCount={product.reviewCount}
                size="md"
              />
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#1B5E3B]">
                {formatPrice(displayPrice)}
              </span>
              {isOnSale && (
                <>
                  <span className="text-xl text-[#6C757D] line-through">
                    {formatPrice(product.compareAtPrice!)}
                  </span>
                  <Badge variant="sale">Save {discount}%</Badge>
                </>
              )}
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-[#6C757D]">{product.shortDescription}</p>
            )}

            <hr />

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="font-medium text-[#212529] mb-3">
                  {Object.keys(product.variants[0].options)[0]}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={cn(
                        'px-4 py-2 rounded-lg border-2 transition-all',
                        selectedVariant === variant.id
                          ? 'border-[#1B5E3B] bg-[#E8F5E9] text-[#1B5E3B]'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      {Object.values(variant.options)[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-[#212529] mb-3">Quantity:</h3>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={product.quantity}
              />
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <Button onClick={handleAddToCart} size="lg" className="flex-grow">
                Add to Cart
              </Button>
              <Button onClick={handleBuyNow} variant="secondary" size="lg" className="flex-grow">
                Buy Now
              </Button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  toggleItem(product);
                  toast.success(
                    isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!'
                  );
                }}
                className={cn(
                  'flex items-center gap-2 text-sm transition-colors',
                  isWishlisted
                    ? 'text-red-500'
                    : 'text-[#6C757D] hover:text-[#1B5E3B]'
                )}
              >
                <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
                {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              <button
                onClick={() => {
                  navigator.share?.({
                    title: product.name,
                    url: window.location.href,
                  });
                }}
                className="flex items-center gap-2 text-sm text-[#6C757D] hover:text-[#1B5E3B] transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            <hr />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-6 h-6 text-[#1B5E3B]" />
                <span className="text-xs text-[#6C757D]">Free shipping $50+</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-6 h-6 text-[#1B5E3B]" />
                <span className="text-xs text-[#6C757D]">30-day returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-6 h-6 text-[#1B5E3B]" />
                <span className="text-xs text-[#6C757D]">Secure payment</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              {product.quantity > 0 ? (
                <>
                  <Check className="w-4 h-4 text-[#28A745]" />
                  <span className="text-[#28A745]">In stock, ships today</span>
                </>
              ) : (
                <span className="text-[#DC3545]">Out of stock</span>
              )}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b">
            <div className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'pb-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                    activeTab === tab.id
                      ? 'border-[#1B5E3B] text-[#1B5E3B]'
                      : 'border-transparent text-[#6C757D] hover:text-[#212529]'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-[#343A40] leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div className="max-w-md">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b">
                        <td className="py-3 font-medium text-[#212529]">{key}</td>
                        <td className="py-3 text-[#6C757D]">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-[#343A40]">
                <h3 className="font-semibold">Shipping Information</h3>
                <ul className="space-y-2">
                  <li>Standard Shipping (5-7 business days): Free on orders over $50</li>
                  <li>Express Shipping (2-3 business days): $9.99</li>
                  <li>Next Day Delivery: $19.99</li>
                </ul>
                <h3 className="font-semibold pt-4">Return Policy</h3>
                <p>
                  We offer a 30-day return policy on all unused items in their original
                  packaging. Contact our customer service team to initiate a return.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#212529]">
                      {product.rating.toFixed(1)}
                    </div>
                    <Rating value={product.rating} className="justify-center mt-2" />
                    <p className="text-sm text-[#6C757D] mt-1">
                      {product.reviewCount} reviews
                    </p>
                  </div>
                  <div className="flex-grow max-w-xs">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2 mb-1">
                        <span className="text-sm w-3">{stars}</span>
                        <Star className="w-3 h-3 text-[#FFD93D] fill-[#FFD93D]" />
                        <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FFD93D]"
                            style={{
                              width: `${stars === 5 ? 65 : stars === 4 ? 20 : stars === 3 ? 10 : 5}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="outline">Write a Review</Button>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#212529] mb-8">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
