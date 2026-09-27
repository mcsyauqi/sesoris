'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types';
import { trackAddToCart } from '@/lib/analytics';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  /** Coupon priced for the current cart by the server; any cart change clears it. */
  coupon: { code: string; discount: number } | null;
  setCoupon: (coupon: { code: string; discount: number } | null) => void;
  /**
   * Adds `quantity` units of a product to the cart and emits the GA4
   * `add_to_cart` event. Instrumenting here means every entry point
   * (ProductCard, product detail page, bundle page, FrequentlyBoughtTogether,
   * CartUpsell) is tracked exactly once without per-call-site wiring.
   */
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,
      setCoupon: (coupon) => set({ coupon }),
      addItem: (product, quantity = 1) => {
        const qty = Math.max(1, Math.floor(quantity));
        const items = get().items;
        const existing = items.find((item) => item.product.id === product.id);
        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + qty }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: qty }] });
        }
        set({ coupon: null });
        trackAddToCart(product, qty);
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId), coupon: null });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
        } else {
          set({
            items: get().items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
            coupon: null,
          });
        }
      },
      clearCart: () => set({ items: [], coupon: null }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getItemCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      getSubtotal: () =>
        get().items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    }),
    {
      // v2: 2026-09-27 catalog change reused product ids, so carts saved before it are dropped.
      name: 'sesoris-cart-v2',
      // Defer localStorage reads until after the first client render so SSR and
      // hydration produce the same markup on cart-dependent pages.
      skipHydration: true,
    }
  )
);
