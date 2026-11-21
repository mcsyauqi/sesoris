// CJ API keepalive + catalog availability check. Run by .github/workflows/cj-keepalive.yml.
//
// 1. CJ freezes API access after 30 days without an API order (freeze hit 2026-10-28). If no order
//    was created in the last 14 days, create ONE sandbox, unpaid (payType 3) order: no money moves,
//    sandbox orders never ship, and it resets CJ's inactivity counter (proven by the 2026-09-27 tests).
// 2. Ask CJ for a US freight quote on every in-stock catalog product. Products CJ has delisted would
//    take a customer's PayPal payment that can never be fulfilled, so the job fails and lists them.
//
// usage: CJ_API_KEY=... node scripts/cj-keepalive.mjs [--dry-run]
import fs from 'fs';

const BASE = 'https://developers.cjdropshipping.com/api2.0/v1';
const DRY = process.argv.includes('--dry-run');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const key = process.env.CJ_API_KEY;
if (!key) throw new Error('CJ_API_KEY missing');

const auth = await (await fetch(`${BASE}/authentication/getAccessToken`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ apiKey: key }),
})).json();
if (!auth.result) throw new Error(`CJ auth failed: ${auth.message}`);
const H = { 'CJ-Access-Token': auth.data.accessToken, 'Content-Type': 'application/json' };
// CJ allows 1 request per second.
const call = async (path, body) => {
  await sleep(1200);
  const r = await fetch(BASE + path, body ? { method: 'POST', headers: H, body: JSON.stringify(body) } : { headers: H });
  return r.json();
};

const quote = (vid) => call('/logistic/freightCalculate', {
  startCountryCode: 'US', endCountryCode: 'US', zip: '90001', products: [{ vid, quantity: 1 }],
});

// Catalog: slug, price, stock flag and CJ variant id straight from the source of truth.
const src = fs.readFileSync(new URL('../src/data/products.ts', import.meta.url), 'utf8');
const re = /slug:\s*"([^"]+)"[\s\S]*?price:\s*([\d.]+)[\s\S]*?inStock:\s*(true|false)[\s\S]*?cj:\s*\{\s*pid:\s*"(\d+)",\s*vid:\s*"(\d+)"/g;
const catalog = [];
for (let m; (m = re.exec(src));) catalog.push({ slug: m[1], price: +m[2], inStock: m[3] === 'true', vid: m[5] });
if (catalog.length < 10) throw new Error(`catalog parse looks wrong: ${catalog.length} products`);

// --- 1. availability
const live = catalog.filter((p) => p.inStock);
const delisted = [];
let cheapestOk = null;
for (const p of live) {
  const q = await quote(p.vid);
  if (!q.result || !q.data?.length) delisted.push(`${p.slug}: ${q.message}`);
  else if (!cheapestOk || p.price < cheapestOk.price) cheapestOk = { ...p, logisticName: [...q.data].sort((a, b) => a.logisticPrice - b.logisticPrice)[0].logisticName };
}
console.log(`availability: ${live.length - delisted.length}/${live.length} in-stock products orderable at CJ`);

// --- 2. keepalive
const orders = await call('/shopping/order/list?pageNum=1&pageSize=20');
if (!orders.result) throw new Error(`CJ order list failed (API frozen?): ${orders.message}`);
const newest = Math.max(0, ...(orders.data?.list ?? []).map((o) => Date.parse(o.createDate.replace(' ', 'T') + '+08:00')));
const ageDays = (Date.now() - newest) / 864e5;
console.log(`newest CJ order: ${newest ? new Date(newest).toISOString() : 'none'} (${ageDays.toFixed(1)} days ago)`);

if (ageDays < 14) {
  console.log('keepalive: not needed');
} else if (!cheapestOk) {
  throw new Error('keepalive: no orderable product to use');
} else {
  const orderNumber = `SESORIS-KEEPALIVE-${new Date().toISOString().slice(0, 10)}`;
  const body = {
    orderNumber, shippingCountryCode: 'US', shippingCountry: 'United States', shippingProvince: 'CA', shippingCity: 'Los Angeles',
    shippingZip: '90001', shippingAddress: 'Test order - do not ship', shippingAddress2: '', shippingCustomerName: 'Sesoris Keepalive Test',
    shippingPhone: '', email: '', logisticName: cheapestOk.logisticName, fromCountryCode: 'US', payType: 3, isSandbox: 1,
    shopAmount: cheapestOk.price, remark: 'API keepalive test, sandbox, unpaid, do not fulfil',
    products: [{ vid: cheapestOk.vid, quantity: 1, storeLineItemId: `${orderNumber}-1` }],
  };
  if (DRY) console.log('keepalive (dry run):', orderNumber, cheapestOk.slug);
  else {
    const r = await call('/shopping/order/createOrderV2', body);
    if (!r.result) throw new Error(`keepalive order failed: ${r.message}`);
    console.log(`keepalive: created ${orderNumber} (${r.data.orderId}) for ${cheapestOk.slug}, unpaid sandbox`);
  }
}

if (delisted.length) {
  console.error(`\nCJ no longer sells ${delisted.length} product(s) still marked inStock on sesoris.com. Set inStock: false in src/data/products.ts:\n- ${delisted.join('\n- ')}`);
  process.exit(1);
}
