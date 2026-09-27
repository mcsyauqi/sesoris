import type { CartItem } from '@/types';

/** Asks the server to price the cart with a coupon. Resolves to the discount, rejects with a buyer-facing message. */
export async function applyCoupon(items: CartItem[], code: string): Promise<{ code: string; discount: number }> {
  const res = await fetch('/api/checkout/paypal?preview=1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: items.map((i) => ({ slug: i.product.slug, quantity: i.quantity })), coupon: code }),
  });
  const json = (await res.json().catch(() => ({}))) as { discount?: number; error?: string };
  if (!res.ok || !json.discount) throw new Error(json.error || 'This coupon code is not valid.');
  return { code: code.trim().toUpperCase(), discount: json.discount };
}
