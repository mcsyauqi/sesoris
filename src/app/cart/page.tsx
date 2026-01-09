'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { ProductGrid } from '@/components/product/product-grid';
import { useCartStore } from '@/stores/cart-store';
import { toast } from '@/components/ui/toast';
import { products } from '@/data/products';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
    applyCoupon,
    removeCoupon,
    couponCode,
    discount,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  const handleApplyCoupon = async () => {
    if (!promoCode.trim()) return;

    setIsApplyingCoupon(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple demo - accept any code and give 10% off
    if (promoCode.toUpperCase() === 'SAVE10') {
      applyCoupon(promoCode.toUpperCase(), 10);
      toast.success('Coupon applied! 10% discount added.');
    } else {
      toast.error('Invalid coupon code');
    }
    setIsApplyingCoupon(false);
  };

  const suggestedProducts = products.slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#F8F9FA] py-4">
          <div className="container">
            <Breadcrumb items={[{ label: 'Cart' }]} />
          </div>
        </div>

        <div className="container py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-[#E9ECEF] mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-[#212529] mb-3">
              Your cart is empty
            </h1>
            <p className="text-[#6C757D] mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>

          {/* Suggested Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#212529] mb-8 text-center">
              You Might Like
            </h2>
            <ProductGrid products={suggestedProducts} columns={4} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb items={[{ label: 'Cart' }]} />
        </div>
      </div>

      <div className="container py-8">
        <h1 className="text-3xl font-bold text-[#212529] mb-8">
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-[#6C757D]">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex gap-4 mb-4 md:mb-0">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                      >
                        <Image
                          src={item.product.images[0]?.url || '/placeholder.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex-grow min-w-0">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-medium text-[#212529] hover:text-[#1B5E3B] line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        {item.variant && (
                          <p className="text-sm text-[#6C757D] mt-0.5">
                            {Object.values(item.variant.options).join(' / ')}
                          </p>
                        )}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-[#DC3545] hover:underline mt-2 flex items-center gap-1 md:hidden"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center hidden md:block">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(qty) => updateQuantity(item.id, qty)}
                        size="sm"
                      />
                    </div>

                    {/* Total & Remove */}
                    <div className="col-span-2 flex items-center justify-between md:justify-end mt-4 md:mt-0">
                      <span className="md:hidden text-sm text-[#6C757D]">
                        {formatPrice(item.price)} each
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-[#212529]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="hidden md:block p-1.5 text-[#6C757D] hover:text-[#DC3545] hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-4">
              <Link
                href="/shop"
                className="text-[#1B5E3B] hover:underline text-sm font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F8F9FA] rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-[#212529] mb-4">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[#343A40] mb-2 block">
                  Promo Code
                </label>
                {couponCode ? (
                  <div className="flex items-center justify-between p-3 bg-[#E8F5E9] rounded-lg">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#1B5E3B]" />
                      <span className="font-medium text-[#1B5E3B]">
                        {couponCode} (-{discount}%)
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        removeCoupon();
                        toast.info('Coupon removed');
                      }}
                      className="text-sm text-[#DC3545] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-grow"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      isLoading={isApplyingCoupon}
                      variant="outline"
                    >
                      Apply
                    </Button>
                  </div>
                )}
                <p className="text-xs text-[#6C757D] mt-2">
                  Try: SAVE10 for 10% off
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6C757D]">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#1B5E3B]">
                    <span>Discount ({discount}%)</span>
                    <span>-{formatPrice((subtotal * discount) / 100)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#6C757D]">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-[#28A745]">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6C757D]">Estimated Tax</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-[#6C757D] pt-2">
                    Add {formatPrice(50 - subtotal)} more for free shipping
                  </p>
                )}

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-[#1B5E3B]">{formatPrice(total)}</span>
                </div>
              </div>

              <Button asChild size="lg" fullWidth className="mt-6">
                <Link href="/checkout" className="flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <div className="mt-4 text-center">
                <p className="text-xs text-[#6C757D]">
                  🔒 Secure checkout • 💳 Multiple payment options
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#212529] mb-8">
            You Might Also Like
          </h2>
          <ProductGrid products={suggestedProducts} columns={4} />
        </div>
      </div>
    </div>
  );
}
