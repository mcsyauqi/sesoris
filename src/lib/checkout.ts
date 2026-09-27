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

// Supplier warehouses are in the US and ship to US addresses only, so the address is collected
// here (country fixed to US) and handed to PayPal as SET_PROVIDED_ADDRESS: buyers cannot change it.
export const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'] as const;

export interface ShipTo {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
}

/** Returns an error message for the first invalid field, or null when the address can be shipped to. */
export function shipToError(a: Partial<ShipTo>): string | null {
  if (!a.name || a.name.trim().length < 2 || a.name.length > 50) return 'Please enter the full name for delivery.';
  if (!a.address1 || a.address1.trim().length < 3 || a.address1.length > 100) return 'Please enter the street address.';
  if ((a.address2 ?? '').length > 100) return 'Address line 2 is too long.';
  if (!a.city || a.city.trim().length < 2 || a.city.length > 50) return 'Please enter the city.';
  if (!a.state || !(US_STATES as readonly string[]).includes(a.state)) return 'Please choose a US state.';
  if (!a.zip || !/^\d{5}(-\d{4})?$/.test(a.zip.trim())) return 'Please enter a 5-digit US ZIP code.';
  if (a.phone && !/^[\d\s()+.-]{7,20}$/.test(a.phone)) return 'Please enter a valid phone number.';
  return null;
}
