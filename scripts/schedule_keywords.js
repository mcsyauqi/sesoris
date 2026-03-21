const fs = require('fs');
const path = require('path');

async function getAccessToken() {
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  });
  const data = await resp.json();
  return data.access_token;
}

function formatDateDMY(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function formatDateISO(date) {
  return date.toISOString().split('T')[0];
}

async function main() {
  const token = await getAccessToken();
  const SPREADSHEET_ID = '1MY7gCk8Yy3Ebxmqn8eQjTKlVvhhPJbJN1m7AnAkBBbg';

  // Read keyword queue
  const queue = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'keyword-queue.json'), 'utf8'));
  console.log(`Keywords to schedule: ${queue.length}`);

  // Read current "Artikel & Keyword" sheet to find next row
  const sheetResp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A1:I500`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const sheetData = await sheetResp.json();
  const currentRows = sheetData.values.length;
  console.log(`Current rows in sheet: ${currentRows}`);

  // Schedule starting from tomorrow, 1 per day
  const startDate = new Date('2026-03-22'); // Tomorrow
  const newRows = queue.map((k, i) => {
    const pubDate = new Date(startDate);
    pubDate.setDate(pubDate.getDate() + i);
    const slug = k.keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return [
      String(currentRows + i), // No
      slug, // Keyword (as slug)
      '', // Judul Artikel (TBD - will be generated)
      'Scheduled', // Status
      formatDateISO(pubDate), // Tanggal
      k.category || '', // Kategori
      '', // Link Publish (TBD)
      '', // Meta Description (TBD)
      `${formatDateDMY(pubDate)} 08:00 WIB`, // Jadwal Tayang
    ];
  });

  // Append to sheet
  console.log(`Appending ${newRows.length} scheduled articles...`);
  console.log(`Date range: ${newRows[0][4]} to ${newRows[newRows.length - 1][4]}`);

  const appendResp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A${currentRows + 1}:I${currentRows + newRows.length}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: newRows })
    }
  );
  const appendResult = await appendResp.json();
  console.log(`Appended: ${appendResult.updatedCells} cells`);

  // Also update Keyword Database - change status from Planned/Belum Ada to Scheduled
  const kwResp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Keyword%20Database!A1:H500`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const kwData = await kwResp.json();
  const kwRows = kwData.values;

  const queueKeywords = new Set(queue.map(k => k.keyword));
  const updates = [];
  for (let i = 1; i < kwRows.length; i++) {
    const keyword = kwRows[i][1];
    if (queueKeywords.has(keyword)) {
      updates.push({
        range: `Keyword Database!H${i + 1}`,
        values: [['Scheduled']]
      });
    }
  }

  if (updates.length > 0) {
    console.log(`Updating ${updates.length} keyword statuses in Keyword Database...`);
    const updateResp = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ valueInputOption: 'RAW', data: updates })
      }
    );
    const updateResult = await updateResp.json();
    console.log(`Updated: ${updateResult.totalUpdatedCells} cells in Keyword Database`);
  }

  console.log('\nDONE!');
  console.log(`Total articles in sheet: ${currentRows - 1 + newRows.length}`);
  console.log(`Published: 146 | Scheduled: ${newRows.length}`);
  console.log(`GitHub Action will generate 1 article/day starting ${newRows[0][4]}`);
  console.log(`Last article scheduled: ${newRows[newRows.length - 1][4]}`);
}

main().catch(console.error);
