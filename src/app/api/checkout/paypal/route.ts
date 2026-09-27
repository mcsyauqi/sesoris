import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { quote } from '@/lib/checkout';
import { createPaypalOrder } from '@/lib/paypal';

const Body = z.object({
  items: z.array(z.object({ slug: z.string().min(1).max(120), quantity: z.number().int() })).min(1).max(30),
  coupon: z.string().max(40).optional(),
});

export async function POST(request: NextRequest) {
  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid cart.' }, { status: 400 });
  }
  let q;
  try {
    q = quote(body.items, body.coupon);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
  try {
    // preview=1 only prices the cart (coupon check) without opening a PayPal order.
    if (request.nextUrl.searchParams.get('preview')) return NextResponse.json({ subtotal: q.subtotal, discount: q.discount, shipping: q.shipping, total: q.total });
    const id = await createPaypalOrder(q);
    return NextResponse.json({ id, total: q.total });
  } catch (error) {
    console.error('[Checkout] create order failed:', error);
    return NextResponse.json({ error: 'Payment could not be started. Please try again.' }, { status: 502 });
  }
}
