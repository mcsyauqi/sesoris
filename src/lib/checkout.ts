import { getProductBySlug } from '@/data/products';
import type { Product } from '@/types';

// ponytail: flat rule shared by the checkout page and the server quote. Change it here only.
export const FREE_SHIPPING_MIN = 50;
export const SHIPPING_FEE = 5.99;
export const MAX_QTY_PER_ITEM = 20;

export interface QuoteLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface Quote {
  lines: QuoteLine[];
  subtotal: number;
  discount: number;
  coupon?: string;
  shipping: number;
  total: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function shippingFor(subtotal: number): number {
  return subtotal > FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
}

/**
 * Coupons live in the CHECKOUT_COUPONS env (server only): "CODE:PERCENT:YYYY-MM-DD,CODE2:...".
 * ponytail: no usage counter without a database; keep codes long, short-lived, and remove them after use.
 */
function couponPercent(code: string): number {
  const now = new Date().toISOString().slice(0, 10);
  for (const entry of (process.env.CHECKOUT_COUPONS ?? '').split(',')) {
    const [c, pct, until] = entry.trim().split(':');
    if (c && c.toUpperCase() === code.trim().toUpperCase() && until && now <= until) {
      const n = Number(pct);
      if (n > 0 && n < 100) return n;
    }
  }
  throw new Error('This coupon code is not valid.');
}

/** Prices always come from products.ts, never from the client. Throws on unknown slugs, bad quantities or coupons. */
export function quote(items: { slug: string; quantity: number }[], coupon?: string): Quote {
  if (items.length === 0) throw new Error('Cart is empty');
  const lines = items.map(({ slug, quantity }) => {
    const product = getProductBySlug(slug);
    if (!product || !product.inStock || !product.cj) throw new Error(`Product not available: ${slug}`);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY_PER_ITEM) throw new Error(`Invalid quantity for ${slug}`);
    return { product, quantity, lineTotal: round2(product.price * quantity) };
  });
  const subtotal = round2(lines.reduce((sum, l) => sum + l.lineTotal, 0));
  const code = coupon?.trim().toUpperCase() || undefined;
  const discount = code ? round2((subtotal * couponPercent(code)) / 100) : 0;
  const shipping = shippingFor(subtotal);
  return { lines, subtotal, discount, coupon: code, shipping, total: round2(subtotal - discount + shipping) };
}
