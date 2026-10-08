// Server-only. The "10% off your first order" code from the newsletter popup.
//
// Each subscriber gets their own code, WELCOME10-<brevo contact id>-<signature>. The signature (HMAC) lets
// the checkout price a code without a database; Brevo is the ledger: the contact's WELCOME_CODE attribute
// holds the code it was sent, and WELCOME_USED holds the PayPal order id once it has been spent.
// ponytail: the HMAC key is COUPON_SECRET (falls back to BREVO_API_KEY). Changing it voids unused codes.

import { createHmac, timingSafeEqual } from 'node:crypto';
import type { CouponResolver } from '@/lib/checkout';
import { getContact, updateContact } from '@/lib/brevo';

export const WELCOME_PERCENT = 10;
const CODE_RE = /^WELCOME10-([0-9A-Z]{1,8})-([0-9A-F]{8})$/;

function signature(contactId: number): string {
  const key = process.env.COUPON_SECRET?.trim() || process.env.BREVO_API_KEY?.trim();
  if (!key) throw new Error('COUPON_SECRET is not configured');
  return createHmac('sha256', key).update(`sesoris-welcome:${contactId}`).digest('hex').slice(0, 8).toUpperCase();
}

export function welcomeCodeFor(contactId: number): string {
  return `WELCOME10-${contactId.toString(36).toUpperCase()}-${signature(contactId)}`;
}

/** Brevo contact id behind a genuine welcome code, or null for anything else. */
export function welcomeContactId(code: string | undefined): number | null {
  const m = code?.trim().toUpperCase().match(CODE_RE);
  if (!m) return null;
  const id = parseInt(m[1], 36);
  if (!Number.isSafeInteger(id) || id <= 0) return null;
  let expected: string;
  try {
    expected = signature(id);
  } catch {
    return null;
  }
  return timingSafeEqual(Buffer.from(expected), Buffer.from(m[2])) ? id : null;
}

/** Pass to quote(): prices genuine welcome codes at 10%, on sesoris.com orders only. */
export const welcomeCoupons: CouponResolver = (code, storeId) =>
  storeId === 'sesoris' && welcomeContactId(code) ? WELCOME_PERCENT : undefined;

/**
 * One use per subscriber. Returns a buyer-facing reason the code cannot be used, or null when it can
 * (or when the code is not a welcome code). `orderId` lets the order that already holds the code pass.
 */
export async function welcomeCodeProblem(code: string | undefined, orderId?: string): Promise<string | null> {
  const id = welcomeContactId(code);
  if (!id) return null;
  let contact;
  try {
    contact = await getContact(id);
  } catch (error) {
    console.error('[Coupon] welcome code check failed:', error);
    return 'We could not check this code right now. Please try again in a minute.';
  }
  if (!contact || String(contact.attributes.WELCOME_CODE ?? '').toUpperCase() !== code!.trim().toUpperCase()) {
    return 'This coupon code is not valid.';
  }
  const used = String(contact.attributes.WELCOME_USED ?? '');
  if (used && used !== orderId) return 'This welcome code has already been used.';
  return null;
}

export async function markWelcomeCodeUsed(code: string | undefined, orderId: string): Promise<void> {
  const id = welcomeContactId(code);
  if (id) await updateContact(id, { attributes: { WELCOME_USED: orderId } });
}
