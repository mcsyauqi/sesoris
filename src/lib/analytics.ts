import type { CartItem, Product } from '@/types';
import { toUsdPrice } from './utils';

/**
 * GA4 e-commerce event helpers.
 *
 * Storefront currency is USD. This is verified in three independent places:
 *  - `formatPrice()` in src/lib/utils.ts renders `Intl.NumberFormat('en-US', { currency: 'USD' })`
 *  - the Product JSON-LD in src/app/product/[slug]/page.tsx emits `priceCurrency: 'USD'`
 *  - checkout math in src/app/checkout/CheckoutPageClient.tsx uses USD amounts ($5.99 shipping)
 *
 * Product prices are stored as USD numbers, except for a few legacy rows kept in
 * IDR. `toUsdPrice()` normalises both cases, so every value reported to GA4 is USD.
 */
export const GA_CURRENCY = 'USD';

type GtagFn = (...args: unknown[]) => void;

interface WindowWithGtag extends Window {
  gtag?: GtagFn;
  dataLayer?: unknown[][];
}

export interface GaItem {
  item_id: string;
  item_name: string;
  item_category: string;
  price: number;
  quantity: number;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

type PendingEvent = [string, Record<string, unknown>];

const pending: PendingEvent[] = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;
let waitedMs = 0;

const FLUSH_INTERVAL_MS = 250;
const FLUSH_GIVE_UP_MS = 30_000;

/**
 * The GA4 bootstrap in src/app/layout.tsx runs with `strategy="lazyOnload"`.
 * That single inline block defines `window.gtag` and immediately queues
 * `gtag('js', ...)` plus `gtag('config', GA_MEASUREMENT_ID)`. So the moment
 * `window.gtag` exists, the config command is already ahead of us in the
 * dataLayer queue.
 *
 * Pushing an event onto `dataLayer` before that point would place it ahead of
 * the config command, and GA4 discards events it receives before a measurement
 * ID is configured. Events are therefore buffered until `window.gtag` appears.
 */
function gtagReady(): boolean {
  return typeof window !== 'undefined' && typeof (window as WindowWithGtag).gtag === 'function';
}

function flushPending(): void {
  const w = window as WindowWithGtag;
  while (pending.length > 0) {
    const next = pending.shift();
    if (!next) break;
    w.gtag?.('event', next[0], next[1]);
  }
  if (flushTimer !== null) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
}

function startFlushTimer(): void {
  if (flushTimer !== null) return;
  flushTimer = setInterval(() => {
    waitedMs += FLUSH_INTERVAL_MS;
    if (gtagReady()) {
      flushPending();
      return;
    }
    if (waitedMs >= FLUSH_GIVE_UP_MS) {
      // GA4 blocked or never loaded. Drop the buffer instead of leaking it.
      pending.length = 0;
      if (flushTimer !== null) {
        clearInterval(flushTimer);
        flushTimer = null;
      }
    }
  }, FLUSH_INTERVAL_MS);
}

/** Send a GA4 event, buffering it until the lazily loaded gtag bootstrap is ready. */
function gaEvent(eventName: string, params: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  if (gtagReady()) {
    (window as WindowWithGtag).gtag?.('event', eventName, params);
    return;
  }

  pending.push([eventName, params]);
  startFlushTimer();
}

/** Map a catalog product to a GA4 `items[]` entry. `item_id` matches the SKU used in Product JSON-LD. */
export function toGaItem(product: Product, quantity = 1): GaItem {
  return {
    item_id: `SES-${product.id.toString().padStart(4, '0')}`,
    item_name: product.name,
    item_category: product.category.name,
    price: toUsdPrice(product.price),
    quantity,
  };
}

export function toGaItems(cartItems: CartItem[]): GaItem[] {
  return cartItems.map((line) => toGaItem(line.product, line.quantity));
}

function itemsValue(items: GaItem[]): number {
  return round2(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
}

/** GA4 `view_item`, fired once per product detail page view. */
export function trackViewItem(product: Product): void {
  const items = [toGaItem(product)];
  gaEvent('view_item', {
    currency: GA_CURRENCY,
    value: itemsValue(items),
    items,
  });
}

/** GA4 `add_to_cart`, fired from the cart store so every add-to-cart entry point is covered. */
export function trackAddToCart(product: Product, quantity = 1): void {
  const items = [toGaItem(product, quantity)];
  gaEvent('add_to_cart', {
    currency: GA_CURRENCY,
    value: itemsValue(items),
    items,
  });
}

/** GA4 `begin_checkout`, fired once when the checkout page mounts with a non-empty cart. */
export function trackBeginCheckout(cartItems: CartItem[]): void {
  const items = toGaItems(cartItems);
  if (items.length === 0) return;
  gaEvent('begin_checkout', {
    currency: GA_CURRENCY,
    value: itemsValue(items),
    items,
  });
}

/**
 * GA4 `purchase`.
 *
 * NOTE: checkout on sesoris.com is currently a mock flow with no payment
 * processor and no order backend, so this fires at the mock order-confirmation
 * step with a client-generated transaction id. It must be re-pointed at the
 * real order confirmation once a payment backend exists.
 */
export function trackPurchase(args: {
  transactionId: string;
  cartItems: CartItem[];
  shipping: number;
  tax: number;
}): void {
  const items = toGaItems(args.cartItems);
  if (items.length === 0) return;
  const subtotal = itemsValue(items);
  gaEvent('purchase', {
    transaction_id: args.transactionId,
    currency: GA_CURRENCY,
    value: round2(subtotal + args.shipping + args.tax),
    shipping: round2(args.shipping),
    tax: round2(args.tax),
    items,
  });
}

/** Client-side mock order id. Replace when a real order backend issues ids. */
export function createMockTransactionId(): string {
  return `SES-MOCK-${Date.now().toString(36).toUpperCase()}`;
}
