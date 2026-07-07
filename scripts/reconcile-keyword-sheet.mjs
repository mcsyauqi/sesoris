#!/usr/bin/env node
// Reconciles the "Keyword Database" tab of the Sesoris master sheet
// (1MY7gCk8Yy3Ebxmqn8eQjTKlVvhhPJbJN1m7AnAkBBbg) against the articles that
// actually exist in content/blog/, so the sheet ledger stops drifting from
// the site (see reports/keyword-sync-reconciliation-2026-07-02.json).
//
// Matching rule mirrors the generator (scripts/generate-blog-post.ts):
// slug = slugify(keyword). A row is marked Published only when a live file
// content/blog/<slug>.json exists for its Slug Target or slugify(keyword).
//
// Usage:
//   node scripts/reconcile-keyword-sheet.mjs           # dry-run (default)
//   node scripts/reconcile-keyword-sheet.mjs --apply   # write back to sheet
//
// Env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_DRIVE_REFRESH_TOKEN
import fs from 'fs';
import path from 'path';

const SPREADSHEET_ID = '1MY7gCk8Yy3Ebxmqn8eQjTKlVvhhPJbJN1m7AnAkBBbg';
const TAB = 'Keyword Database';
const APPLY = process.argv.includes('--apply');

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

async function getAccessToken() {
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const data = await resp.json();
  if (!data.access_token) throw new Error('OAuth token refresh failed: ' + JSON.stringify(data));
  return data.access_token;
}

async function main() {
  const liveSlugs = new Set(
    fs.readdirSync(path.join(process.cwd(), 'content', 'blog'))
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
  );

  const token = await getAccessToken();
  const headers = { authorization: `Bearer ${token}` };
  const read = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(TAB)}!A1:J2000`,
    { headers }
  ).then((r) => r.json());
  if (!read.values) throw new Error('Sheet read failed: ' + JSON.stringify(read).slice(0, 300));

  const rows = read.values;
  const updates = [];
  let published = 0;
  for (let i = 1; i < rows.length; i += 1) {
    const [, keyword, , , , , , status, slugTarget] = rows[i];
    if (!keyword) continue;
    const candidates = [slugTarget, slugify(keyword)].filter(Boolean);
    const liveSlug = candidates.find((s) => liveSlugs.has(s));
    if (!liveSlug) continue;
    published += 1;
    const wantStatus = 'Published';
    const wantUrl = `https://www.sesoris.com/blog/${liveSlug}`;
    if (status !== wantStatus || slugTarget !== liveSlug) {
      updates.push({
        range: `${TAB}!H${i + 1}:J${i + 1}`,
        values: [[wantStatus, liveSlug, wantUrl]],
      });
      console.log(`row ${i + 1}: "${keyword}" -> Published (${liveSlug})${APPLY ? '' : ' [dry-run]'}`);
    }
  }

  console.log(`\n${published} keyword rows have a live article; ${updates.length} rows need updating.`);

  if (!APPLY || updates.length === 0) {
    if (!APPLY) console.log('Dry-run only. Re-run with --apply to write to the sheet.');
    return;
  }

  // batchUpdate in chunks of 100 ranges
  for (let i = 0; i < updates.length; i += 100) {
    const chunk = updates.slice(i, i + 100);
    const resp = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`,
      {
        method: 'POST',
        headers: { ...headers, 'content-type': 'application/json' },
        body: JSON.stringify({ valueInputOption: 'RAW', data: chunk }),
      }
    ).then((r) => r.json());
    if (resp.error) throw new Error('batchUpdate failed: ' + JSON.stringify(resp.error).slice(0, 300));
    console.log(`Applied ${resp.totalUpdatedCells} cells (chunk ${i / 100 + 1}).`);
  }
  console.log('Sheet reconciliation applied.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
