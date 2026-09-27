// CJ Dropshipping API v2. Docs: https://developers.cjdropshipping.com/en/api/api2/api/shopping.html
const BASE = 'https://developers.cjdropshipping.com/api2.0/v1';

let cached: { token: string; expiresAt: number } | null = null;

interface CjResponse<T> {
  code: number;
  result: boolean;
  message: string;
  data: T;
}

async function accessToken(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 3_600_000) return cached.token;
  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) throw new Error('CJ_API_KEY is not configured');
  await throttle();
  const res = await fetch(`${BASE}/authentication/getAccessToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
    signal: AbortSignal.timeout(15_000),
  });
  const json = (await res.json()) as CjResponse<{ accessToken: string; accessTokenExpiryDate: string }>;
  if (!json.result) throw new Error(`CJ auth failed: ${json.message}`);
  cached = { token: json.data.accessToken, expiresAt: Date.parse(json.data.accessTokenExpiryDate) };
  return cached.token;
}

// CJ allows 1 request per second per account. ponytail: per-process throttle, fine for one app instance.
let nextSlot = 0;
async function throttle(): Promise<void> {
  const wait = nextSlot - Date.now();
  nextSlot = Math.max(nextSlot, Date.now()) + 1100;
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
}

async function post<T>(path: string, body: unknown): Promise<CjResponse<T>> {
  const token = await accessToken();
  await throttle();
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'CJ-Access-Token': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  });
  return (await res.json()) as CjResponse<T>;
}

export interface CjShipTo {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  email?: string;
}

/** Cheapest US-to-US logistics option, or null when the items share no carrier (different suppliers). */
async function cheapestLogistic(zip: string, products: { vid: string; quantity: number }[]): Promise<string | null> {
  const r = await post<{ logisticName: string; logisticPrice: number }[]>('/logistic/freightCalculate', {
    startCountryCode: 'US',
    endCountryCode: 'US',
    zip,
    products,
  });
  if (!r.result) throw new Error(`CJ freight quote failed: ${r.message}`);
  if (!r.data?.length) return null;
  return [...r.data].sort((a, b) => a.logisticPrice - b.logisticPrice)[0].logisticName;
}

type CjOrderArgs = Parameters<typeof createCjOrder>[0];

/**
 * One CJ order when every item ships together; otherwise one per line (items from different
 * US suppliers have no common carrier), numbered `<orderNumber>-1`, `-2`, ...
 */
export async function createCjOrders(args: CjOrderArgs): Promise<{ orderNumber: string; orderId: string; postageAmount?: string; actualPayment?: string }[]> {
  const all = args.products.map((p) => ({ vid: p.vid, quantity: p.quantity }));
  if (args.products.length === 1 || (await cheapestLogistic(args.shipTo.zip, all))) {
    return [{ orderNumber: args.orderNumber, ...(await createCjOrder(args)) }];
  }
  const out = [];
  for (const [i, p] of args.products.entries()) {
    const orderNumber = `${args.orderNumber}-${i + 1}`;
    out.push({ orderNumber, ...(await createCjOrder({ ...args, orderNumber, products: [p] })) });
  }
  return out;
}

/**
 * Creates the supplier order without paying it (payType 3), so every order gets a human look
 * in the CJ dashboard before money moves. ponytail: switch to payType 2 (CJ balance) once trusted.
 */
async function createCjOrder(args: {
  orderNumber: string;
  shipTo: CjShipTo;
  products: { vid: string; quantity: number; lineId: string }[];
  total: number;
  sandbox: boolean;
}): Promise<{ orderId: string; postageAmount?: string; actualPayment?: string }> {
  const items = args.products.map((p) => ({ vid: p.vid, quantity: p.quantity }));
  const logisticName = await cheapestLogistic(args.shipTo.zip, items);
  if (!logisticName) throw new Error('CJ has no US carrier for these items');
  const r = await post<{ orderId: string; postageAmount?: string; actualPayment?: string }>('/shopping/order/createOrderV2', {
    orderNumber: args.orderNumber,
    shippingCountryCode: 'US',
    shippingCountry: 'United States',
    shippingProvince: args.shipTo.state,
    shippingCity: args.shipTo.city,
    shippingZip: args.shipTo.zip,
    shippingAddress: args.shipTo.address1,
    shippingAddress2: args.shipTo.address2 ?? '',
    shippingCustomerName: args.shipTo.name.slice(0, 50),
    shippingPhone: args.shipTo.phone ?? '',
    email: args.shipTo.email ?? '',
    logisticName,
    fromCountryCode: 'US',
    payType: 3,
    isSandbox: args.sandbox ? 1 : 0,
    shopAmount: args.total,
    remark: 'sesoris.com',
    products: args.products.map((p) => ({ vid: p.vid, quantity: p.quantity, storeLineItemId: p.lineId })),
  });
  if (!r.result) throw new Error(`CJ create order failed: ${r.message}`);
  return r.data;
}
