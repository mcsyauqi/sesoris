import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBJECTS: Record<string, string> = {
  general: 'General Inquiry',
  order: 'Order Question',
  return: 'Return & Refund',
  feedback: 'Feedback',
  business: 'Partnership / Wholesale',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[char]!);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const subjectKey = String(body.subject || 'general');
    const message = String(body.message || '').trim();
    const website = String(body.website || '').trim();

    if (website) {
      return NextResponse.json({ success: true });
    }

    if (name.length < 2 || name.length > 100 || !EMAIL_RE.test(email) || message.length < 10 || message.length > 5000) {
      return NextResponse.json({ success: false, error: 'Please check your name, email, and message.' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY?.trim();
    const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim();
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL?.trim() || 'admin@sesoris.com';

    if (!apiKey || !senderEmail) {
      console.error('[Contact] BREVO_API_KEY or BREVO_SENDER_EMAIL is not configured.');
      return NextResponse.json(
        { success: false, error: 'Email service is temporarily unavailable. Please use WhatsApp.' },
        { status: 503 },
      );
    }

    const subject = SUBJECTS[subjectKey] || SUBJECTS.general;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const apiBaseUrl = process.env.BREVO_API_BASE_URL?.trim() || 'https://api.brevo.com/v3';
    const response = await fetch(`${apiBaseUrl}/smtp/email`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Sesoris Website', email: senderEmail },
        to: [{ email: recipientEmail, name: 'Sesoris Customer Service' }],
        replyTo: { email, name },
        subject: `[Sesoris Contact] ${subject} from ${name}`,
        htmlContent: `<h2>${escapeHtml(subject)}</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br>${safeMessage}</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(`[Contact] Brevo rejected the message (${response.status}): ${detail.slice(0, 300)}`);
      return NextResponse.json(
        { success: false, error: 'Email could not be sent. Please use WhatsApp.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('[Contact] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Email could not be sent. Please use WhatsApp.' },
      { status: 500 },
    );
  }
}
