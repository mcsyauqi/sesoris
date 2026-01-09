'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/ui/rating';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';
import { toast } from '@/components/ui/toast';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = (item: (typeof items)[0]) => {
    addToCart(item.product);
    toast.success('Added to cart!', {
      label: 'View Cart',
      onClick: openCart,
    });
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => addToCart(item.product));
    toast.success(`Added ${items.length} items to cart!`);
    clearWishlist();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#F8F9FA] py-4">
          <div className="container">
            <Breadcrumb items={[{ label: 'Wishlist' }]} />
          </div>
        </div>

        <div className="container py-16">
          <div className="max-w-md mx-auto text-center">
            <Heart className="w-24 h-24 text-[#E9ECEF] mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-[#212529] mb-3">
              Your wishlist is empty
            </h1>
            <p className="text-[#6C757D] mb-8">
              Save items you love to your wishlist and come back to them later.
            </p>
            <Button asChild size="lg">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb items={[{ label: 'Wishlist' }]} />
        </div>
      </div>

      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#212529]">
            My Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>
          <Button onClick={handleAddAllToCart}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add All to Cart
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative">
              <Link
                href={`/product/${item.product.slug}`}
                className="block relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3"
              >
                <Image
                  src={item.product.images[0]?.url || '/placeholder.jpg'}
                  alt={item.product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </Link>

              {/* Remove Button */}
              <button
                onClick={() => {
                  removeItem(item.productId);
                  toast.info('Removed from wishlist');
                }}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <Link href={`/product/${item.product.slug}`}>
                  <h3 className="font-medium text-[#212529] group-hover:text-[#1B5E3B] transition-colors line-clamp-2">
                    {item.product.name}
                  </h3>
                </Link>
                <Rating
                  value={item.product.rating}
                  reviewCount={item.product.reviewCount}
                  size="sm"
                />
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1B5E3B]">
                    {formatPrice(item.product.price)}
                  </span>
                  {item.product.compareAtPrice && (
                    <span className="text-sm text-[#6C757D] line-through">
                      {formatPrice(item.product.compareAtPrice)}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => handleAddToCart(item)}
                  size="sm"
                  fullWidth
                  className="mt-2"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
