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
  shipping: number;
  total: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function shippingFor(subtotal: number): number {
  return subtotal > FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
}

/** Prices always come from products.ts, never from the client. Throws on unknown slugs or bad quantities. */
export function quote(items: { slug: string; quantity: number }[]): Quote {
  if (items.length === 0) throw new Error('Cart is empty');
  const lines = items.map(({ slug, quantity }) => {
    const product = getProductBySlug(slug);
    if (!product || !product.inStock || !product.cj) throw new Error(`Product not available: ${slug}`);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY_PER_ITEM) throw new Error(`Invalid quantity for ${slug}`);
    return { product, quantity, lineTotal: round2(product.price * quantity) };
  });
  const subtotal = round2(lines.reduce((sum, l) => sum + l.lineTotal, 0));
  const shipping = shippingFor(subtotal);
  return { lines, subtotal, shipping, total: round2(subtotal + shipping) };
}
