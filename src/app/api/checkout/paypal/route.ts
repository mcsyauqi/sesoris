import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { quote } from '@/lib/checkout';
import { createPaypalOrder } from '@/lib/paypal';

const Body = z.object({
  items: z.array(z.object({ slug: z.string().min(1).max(120), quantity: z.number().int() })).min(1).max(30),
});

export async function POST(request: NextRequest) {
  let items: z.infer<typeof Body>['items'];
  try {
    items = Body.parse(await request.json()).items;
  } catch {
    return NextResponse.json({ error: 'Invalid cart.' }, { status: 400 });
  }
  let q;
  try {
    q = quote(items);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
  try {
    const id = await createPaypalOrder(q);
    return NextResponse.json({ id, total: q.total });
  } catch (error) {
    console.error('[Checkout] create order failed:', error);
    return NextResponse.json({ error: 'Payment could not be started. Please try again.' }, { status: 502 });
  }
}
