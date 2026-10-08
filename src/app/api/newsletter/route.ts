import { NextRequest, NextResponse } from 'next/server';
import { brevo, escapeHtml, getContact, sendEmail, updateContact, type BrevoContact } from '@/lib/brevo';
import { welcomeCodeFor } from '@/lib/welcome-coupon';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_AFTER_MS = 15 * 60_000; // repeat sign-ups inside this window show the code again but send no new email
const SITE = 'https://www.sesoris.com';

function welcomeEmail(code: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#16241c">
<div style="background:#1B5E3B;color:#ffffff;padding:28px 28px 22px;border-radius:12px 12px 0 0">
<p style="margin:0 0 6px;font-size:14px;opacity:.85">Sesoris</p>
<h1 style="margin:0;font-size:26px;line-height:1.2">Here is your 10% off code</h1></div>
<div style="border:1px solid #d9e2dc;border-top:0;padding:28px;border-radius:0 0 12px 12px">
<p style="margin:0 0 16px;font-size:16px;line-height:1.6">Thanks for joining the Sesoris newsletter. Use this code at checkout to take 10% off your first order:</p>
<p style="margin:0 0 18px;text-align:center"><span style="display:inline-block;padding:14px 22px;border:2px dashed #1B5E3B;border-radius:8px;font-size:22px;font-weight:bold;letter-spacing:1px;color:#1B5E3B">${escapeHtml(code)}</span></p>
<p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4a5a50">Enter it in the coupon box on the cart or checkout page. The code works once, on an order shipped to a US address.</p>
<p style="margin:0 0 24px;text-align:center"><a href="${SITE}/shop" style="display:inline-block;background:#1B5E3B;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 26px;border-radius:8px">Shop Sesoris</a></p>
<p style="margin:0;font-size:12px;line-height:1.6;color:#6b7a70">You received this email because this address was entered in the sign-up form at sesoris.com. Not you? Just ignore this email, or reply and we will remove you.</p>
</div></div>`;
}

export async function POST(request: NextRequest) {
  let email = '';
  let source = 'website';
  try {
    const body = await request.json();
    email = String(body.email ?? '').trim().toLowerCase();
    source = String(body.source ?? 'website').replace(/[^\w-]/g, '').slice(0, 40) || 'website';
  } catch {
    // fall through to the validation error below
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
  }

  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
  if (!process.env.BREVO_API_KEY?.trim() || !Number.isInteger(listId) || listId <= 0) {
    // Misconfiguration must be loud: a silent success here means every subscriber is discarded.
    console.error('[Newsletter] BREVO_API_KEY or BREVO_NEWSLETTER_LIST_ID is not configured.');
    return NextResponse.json(
      { success: false, error: 'Newsletter service is not configured. Please try again later.' },
      { status: 503 },
    );
  }

  // 1. Record the subscriber (one Brevo contact per email, so repeat sign-ups never duplicate).
  let contact: BrevoContact | null;
  let isNew = false;
  try {
    contact = await getContact(email);
    if (!contact) {
      const res = await brevo('/contacts', {
        method: 'POST',
        body: { email, listIds: [listId], attributes: { SOURCE: source, SIGNUP_DATE: new Date().toISOString().slice(0, 10) } },
      });
      if (!res.ok && res.status !== 400) throw new Error(`Brevo create ${res.status}: ${(await res.text()).slice(0, 200)}`);
      isNew = res.ok;
      contact = await getContact(email); // also covers a parallel sign-up that created it first (400 duplicate)
      if (!contact) throw new Error('Brevo did not return the new contact');
    }
  } catch (err) {
    console.error('[Newsletter] could not record subscriber:', err);
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  if (contact.attributes.WELCOME_USED) {
    return NextResponse.json({
      success: true,
      message: "You're subscribed. The welcome code for this email has already been used on an order.",
    });
  }

  // 2. Give this subscriber their own one-time 10% code and keep it on the contact.
  const code = welcomeCodeFor(contact.id);
  const recentlySent =
    !isNew &&
    contact.attributes.WELCOME_CODE === code &&
    Date.now() - new Date(contact.modifiedAt).getTime() < RESEND_AFTER_MS;
  try {
    await updateContact(contact.id, {
      emailBlacklisted: false,
      listIds: contact.listIds.includes(listId) ? undefined : [listId],
      attributes: { WELCOME_CODE: code },
    });
  } catch (err) {
    console.error('[Newsletter] could not store welcome code:', err);
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  // 3. Email the code (the popup shows it too, so a mail hiccup never leaves the visitor empty-handed).
  let emailed = recentlySent;
  if (!recentlySent) {
    try {
      const messageId = await sendEmail({
        to: email,
        subject: `Your 10% off code: ${code}`,
        html: welcomeEmail(code),
        replyTo: process.env.CONTACT_RECIPIENT_EMAIL?.trim() || undefined,
      });
      emailed = true;
      console.log(`[Newsletter] welcome code sent to contact ${contact.id} (${messageId})`);
    } catch (err) {
      console.error('[Newsletter] welcome email failed:', err);
    }
  }

  // 4. Light heads-up to the owner for each new subscriber.
  if (isNew) {
    const notify = process.env.SIGNUP_NOTIFY_EMAIL?.trim() || 'syauqi@creativism.id';
    await sendEmail({
      to: notify,
      subject: `[Sesoris] New subscriber via ${source}`,
      html: `<p>New newsletter subscriber on sesoris.com.</p><p>Email: ${escapeHtml(email)}<br>Source: ${escapeHtml(source)}<br>Welcome code: ${escapeHtml(code)}<br>Code email sent: ${emailed ? 'yes' : 'NO, check the server log'}</p>`,
    }).catch((err) => console.error('[Newsletter] owner notification failed:', err));
  }

  return NextResponse.json({
    success: true,
    code,
    emailed,
    message: emailed
      ? `Your 10% code is ${code}. We also emailed it to ${email}.`
      : `Your 10% code is ${code}. Save it now: we could not email it at the moment.`,
  });
}
