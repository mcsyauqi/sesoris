import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY?.trim();
    const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);

    if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
      // Misconfiguration must be loud: a silent success here means every
      // subscriber is discarded without anyone noticing. Never return 200.
      console.error(
        '[Newsletter] BREVO_API_KEY or BREVO_NEWSLETTER_LIST_ID is not configured. ' +
        'Set both values in the Vercel project environment and redeploy.'
      );
      return NextResponse.json(
        { success: false, error: 'Newsletter service is not configured. Please try again later.' },
        { status: 503 }
      );
    }

    // Add contact to Brevo
    const apiBaseUrl = process.env.BREVO_API_BASE_URL?.trim() || 'https://api.brevo.com/v3';
    const response = await fetch(`${apiBaseUrl}/contacts`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
        attributes: {
          SOURCE: source || 'website',
          SIGNUP_DATE: new Date().toISOString().split('T')[0],
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      // Duplicate contact is OK (code 1)
      if (error.code === 'duplicate_parameter') {
        return NextResponse.json({ success: true, message: "You're already subscribed!" });
      }
      throw new Error(error.message || 'Brevo API error');
    }

    console.log(`[Newsletter] Subscriber accepted via ${source || 'unknown'}`);
    return NextResponse.json({ success: true, message: 'Subscribed successfully! Check your email for a welcome message.' });

  } catch (err) {
    console.error('[Newsletter] Error:', err);
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
