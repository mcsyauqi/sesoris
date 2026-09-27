import type { Quote } from '@/lib/checkout';

const BASE = process.env.PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
export const isPaypalSandbox = process.env.PAYPAL_ENV !== 'live';

let cached: { token: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new Error('PayPal is not configured');
  const res = await fetch(`${BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`PayPal auth failed (${res.status})`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cached = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return cached.token;
}

async function call<T>(path: string, init: { method: 'GET' | 'POST'; body?: unknown; requestId?: string }): Promise<{ status: number; data: T }> {
  const res = await fetch(`${BASE}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      'Content-Type': 'application/json',
      ...(init.requestId ? { 'PayPal-Request-Id': init.requestId } : {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    signal: AbortSignal.timeout(20_000),
  });
  return { status: res.status, data: (await res.json()) as T };
}

const usd = (n: number) => ({ currency_code: 'USD', value: n.toFixed(2) });

export async function createPaypalOrder(q: Quote): Promise<string> {
  const { status, data } = await call<{ id?: string; message?: string }>('/v2/checkout/orders', {
    method: 'POST',
    body: {
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: 'Sesoris order',
          custom_id: q.coupon ? `coupon:${q.coupon}`.slice(0, 127) : undefined,
          amount: {
            ...usd(q.total),
            breakdown: { item_total: usd(q.subtotal), shipping: usd(q.shipping), ...(q.discount > 0 ? { discount: usd(q.discount) } : {}) },
          },
          items: q.lines.map((l) => ({
            name: l.product.name.slice(0, 127),
            sku: l.product.slug,
            quantity: String(l.quantity),
            unit_amount: usd(l.product.price),
            category: 'PHYSICAL_GOODS',
          })),
        },
      ],
      application_context: { brand_name: 'Sesoris', shipping_preference: 'GET_FROM_FILE', user_action: 'PAY_NOW' },
    },
  });
  if (status >= 300 || !data.id) throw new Error(`PayPal create order failed (${status}): ${data.message ?? ''}`);
  return data.id;
}

export interface PaypalAddress {
  address_line_1?: string;
  address_line_2?: string;
  admin_area_2?: string;
  admin_area_1?: string;
  postal_code?: string;
  country_code?: string;
}

export interface PaypalOrder {
  id: string;
  status: string;
  payer?: { email_address?: string; name?: { given_name?: string; surname?: string }; phone?: { phone_number?: { national_number?: string } } };
  purchase_units: {
    amount: { value: string };
    custom_id?: string;
    items?: { sku?: string; quantity: string }[];
    shipping?: { name?: { full_name?: string }; address?: PaypalAddress };
    payments?: { captures?: { id: string; status: string; amount: { value: string } }[] };
  }[];
}

export async function getPaypalOrder(id: string): Promise<PaypalOrder> {
  const { status, data } = await call<PaypalOrder>(`/v2/checkout/orders/${encodeURIComponent(id)}`, { method: 'GET' });
  if (status >= 300) throw new Error(`PayPal get order failed (${status})`);
  return data;
}

export async function capturePaypalOrder(id: string): Promise<PaypalOrder> {
  const { status, data } = await call<PaypalOrder & { name?: string; details?: { issue?: string }[] }>(
    `/v2/checkout/orders/${encodeURIComponent(id)}/capture`,
    { method: 'POST', body: {}, requestId: `capture-${id}` },
  );
  if (status >= 300) throw new Error(`PayPal capture failed (${status}): ${data.details?.[0]?.issue ?? data.name ?? ''}`);
  return data;
}
