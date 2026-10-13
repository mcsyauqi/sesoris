#!/usr/bin/env node
// Image API preflight for the daily generator (cycle #78, 2026-10-14).
//
// Why: on 2026-10-13 the Google AI Studio project behind GEMINI_API_KEY hit its
// monthly spending cap. Every image call then returned
//   429 RESOURCE_EXHAUSTED "Your project has exceeded its monthly spending cap"
// but the workflow only found out AFTER each run had already paid for a full
// Claude article. Bootstrap mode ran 7 times: 7 paid Claude articles, 7 hero
// gate failures, 0 articles published, red workflow, every day.
//
// This script makes ONE tiny text request (a few tokens) against the same
// project. A spend cap is enforced per project, so a capped project rejects
// this call too, for free. Exit codes:
//   0  image API reachable, or the result is inconclusive (network error,
//      missing key, any other status): do NOT block generation on a guess
//   10 the project is over its monthly spending cap: skip generation today
//
// Usage: node scripts/image-api-preflight.mjs
const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.log('preflight: GEMINI_API_KEY not set, skipping check');
  process.exit(0);
}
const model = process.env.GEMINI_PREFLIGHT_MODEL || 'gemini-flash-lite-latest';
try {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Reply with OK.' }] }],
        generationConfig: { maxOutputTokens: 2 },
      }),
      signal: AbortSignal.timeout(30000),
    }
  );
  const body = await res.text();
  if (res.status === 429 && /spend(ing)? cap/i.test(body)) {
    console.log(`preflight: ${model} HTTP 429, project is over its monthly spending cap`);
    process.exitCode = 10;
  } else {
    console.log(`preflight: ${model} HTTP ${res.status}${res.ok ? '' : ` (${body.slice(0, 160).replace(/\s+/g, ' ')})`}`);
  }
} catch (err) {
  // exitCode stays 0: an inconclusive check must never block generation.
  console.log(`preflight: inconclusive (${err.message}), not blocking generation`);
}
