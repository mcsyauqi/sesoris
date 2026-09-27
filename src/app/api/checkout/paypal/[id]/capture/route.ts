import { NextRequest, NextResponse } from 'next/server';
import { quote, type Quote } from '@/lib/checkout';
import { capturePaypalOrder, getPaypalOrder, isPaypalSandbox, type PaypalOrder } from '@/lib/paypal';
import { createCjOrders } from '@/lib/cj';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]!);

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const sender = process.env.BREVO_SENDER_EMAIL?.trim();
  if (!apiKey || !sender) throw new Error('Brevo is not configured');
  const res = await fetch(`${process.env.BREVO_API_BASE_URL?.trim() || 'https://api.brevo.com/v3'}/smtp/email`, {
    method: 'POST',
    headers: { accept: 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
    body: JSON.stringify({ sender: { name: 'Sesoris', email: sender }, to: [{ email: to }], subject, htmlContent: html }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

function summaryHtml(q: Quote, orderId: string): string {
  const rows = q.lines
    .map((l) => `<tr><td>${esc(l.product.name)} x ${l.quantity}</td><td style="text-align:right">$${l.lineTotal.toFixed(2)}</td></tr>`)
    .join('');
  return `<p>Order <strong>${esc(orderId)}</strong></p><table cellpadding="6">${rows}
${q.discount > 0 ? `<tr><td>Discount (${esc(q.coupon ?? '')})</td><td style="text-align:right">-$${q.discount.toFixed(2)}</td></tr>` : ''}
<tr><td>Shipping</td><td style="text-align:right">${q.shipping === 0 ? 'Free' : `$${q.shipping.toFixed(2)}`}</td></tr>
<tr><td><strong>Total</strong></td><td style="text-align:right"><strong>$${q.total.toFixed(2)}</strong></td></tr></table>`;
}

function quoteFromOrder(order: PaypalOrder): Quote {
  const unit = order.purchase_units[0];
  const items = (unit?.items ?? []).map((i) => ({ slug: i.sku ?? '', quantity: Number(i.quantity) }));
  const coupon = unit?.custom_id?.startsWith('coupon:') ? unit.custom_id.slice(7) : undefined;
  const q = quote(items, coupon);
  // The amount PayPal will charge must match our own price for these items.
  if (Math.abs(Number(unit?.amount.value) - q.total) > 0.001) throw new Error(`Amount mismatch: ${unit?.amount.value} vs ${q.total}`);
  return q;
}

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[A-Z0-9]{10,30}$/.test(id)) return NextResponse.json({ error: 'Invalid order.' }, { status: 400 });

  let order: PaypalOrder;
  let q: Quote;
  try {
    order = await getPaypalOrder(id);
    q = quoteFromOrder(order);
  } catch (error) {
    console.error('[Checkout] load order failed:', error);
    return NextResponse.json({ error: 'Order could not be loaded.' }, { status: 400 });
  }

  // Refuse before any money moves: we only ship from US warehouses to US addresses.
  const address = order.purchase_units[0]?.shipping?.address;
  if (address?.country_code !== 'US') {
    return NextResponse.json({ error: 'We currently ship to US addresses only.' }, { status: 400 });
  }

  // Replayed request: already captured and processed, so skip the supplier order and emails.
  if (order.status === 'COMPLETED') return NextResponse.json({ orderId: id, status: 'COMPLETED', total: q.total });

  let captured: PaypalOrder;
  try {
    captured = await capturePaypalOrder(id);
  } catch (error) {
    console.error('[Checkout] capture failed:', error);
    return NextResponse.json({ error: 'Payment was not completed. You have not been charged.' }, { status: 402 });
  }
  const capture = captured.purchase_units[0]?.payments?.captures?.[0];
  if (!capture || !['COMPLETED', 'PENDING'].includes(capture.status)) {
    return NextResponse.json({ error: 'Payment was not completed. You have not been charged.' }, { status: 402 });
  }

  const buyerEmail = captured.payer?.email_address ?? order.payer?.email_address;
  const shipName = order.purchase_units[0]?.shipping?.name?.full_name ?? [order.payer?.name?.given_name, order.payer?.name?.surname].filter(Boolean).join(' ');
  const adminEmail = process.env.CONTACT_RECIPIENT_EMAIL?.trim() || 'admin@sesoris.com';
  const tag = isPaypalSandbox ? '[SANDBOX] ' : '';

  // Supplier order and emails must never turn a successful payment into an error for the buyer.
  let cjResult = 'skipped: payment pending review';
  if (capture.status === 'COMPLETED') {
    try {
      const cj = await createCjOrders({
        orderNumber: id,
        sandbox: isPaypalSandbox,
        total: q.total,
        shipTo: {
          name: shipName || 'Customer',
          address1: address.address_line_1 ?? '',
          address2: address.address_line_2,
          city: address.admin_area_2 ?? '',
          state: address.admin_area_1 ?? '',
          zip: address.postal_code ?? '',
          phone: order.payer?.phone?.phone_number?.national_number,
          email: buyerEmail,
        },
        products: q.lines.map((l, i) => ({ vid: l.product.cj!.vid, quantity: l.quantity, lineId: `${id}-${i + 1}` })),
      });
      cjResult = cj.map((o) => `CJ order ${o.orderId} (${o.orderNumber}, postage ${o.postageAmount ?? '?'}, CJ total ${o.actualPayment ?? '?'})`).join('; ') + '. Unpaid: pay in the CJ dashboard.';
    } catch (error) {
      cjResult = `FAILED: ${(error as Error).message}. Place this order in CJ by hand.`;
      console.error('[Checkout] CJ order failed:', error);
    }
  }

  const addr = [address.address_line_1, address.address_line_2, address.admin_area_2, address.admin_area_1, address.postal_code].filter(Boolean).map((s) => esc(s!)).join(', ');
  const jobs: Promise<void>[] = [
    sendEmail(adminEmail, `${tag}New Sesoris order ${id} ($${q.total.toFixed(2)})`,
      `${summaryHtml(q, id)}<p>Payment: ${esc(capture.status)} (capture ${esc(capture.id)})</p><p>Ship to: ${esc(shipName)}, ${addr}</p><p>Buyer: ${esc(buyerEmail ?? '-')}</p><p>CJ: ${esc(cjResult)}</p>`),
  ];
  if (buyerEmail) {
    jobs.push(sendEmail(buyerEmail, `${tag}Your Sesoris order ${id}`,
      `<p>Hi ${esc(shipName || 'there')}, thank you for your order. We will email you the tracking number as soon as it ships from our US warehouse.</p>${summaryHtml(q, id)}<p>Ship to: ${addr}</p>`));
  }
  for (const r of await Promise.allSettled(jobs)) if (r.status === 'rejected') console.error('[Checkout] email failed:', r.reason);

  return NextResponse.json({ orderId: id, status: capture.status, total: q.total });
}
