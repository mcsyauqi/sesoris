import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      // If no API key, just log and return success (graceful degradation)
      console.log(`[Newsletter] New subscriber (no API key): ${email} via ${source || 'unknown'}`);
      return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
    }

    // Add contact to Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [2], // Default list ID 2 (adjust after Brevo setup)
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

    console.log(`[Newsletter] New subscriber: ${email} via ${source || 'unknown'}`);
    return NextResponse.json({ success: true, message: 'Subscribed successfully! Check your email for a welcome message.' });

  } catch (err) {
    console.error('[Newsletter] Error:', err);
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
