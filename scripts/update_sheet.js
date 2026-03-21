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

async function main() {
  const token = await getAccessToken();
  const SPREADSHEET_ID = '1MY7gCk8Yy3Ebxmqn8eQjTKlVvhhPJbJN1m7AnAkBBbg';

  // Read current sheet
  const sheetResp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A1:I200`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const sheetData = await sheetResp.json();
  const rows = sheetData.values;
  console.log(`Sheet has ${rows.length - 1} articles`);

  // Read all blog articles
  const blogDir = path.join(__dirname, '..', 'content', 'blog');
  const allArticles = {};
  fs.readdirSync(blogDir).forEach(f => {
    const data = JSON.parse(fs.readFileSync(path.join(blogDir, f), 'utf8'));
    allArticles[data.slug] = data;
  });
  console.log(`Website has ${Object.keys(allArticles).length} articles`);

  // Prepare batch update for existing rows
  const batchData = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const slug = row[1];
    const article = allArticles[slug];
    if (!article) {
      console.log(`SKIP: ${slug} not found on website`);
      continue;
    }

    const date = article.date || row[4] || '';
    const category = article.category || row[5] || '';
    const link = `https://www.sesoris.com/blog/${slug}`;
    const metaDesc = (article.excerpt || row[7] || '').substring(0, 160);
    const jadwal = date ? formatDate(date) : (row[8] || '');

    batchData.push({
      range: `D${i + 1}:I${i + 1}`,
      values: [['Published', date, category, link, metaDesc, jadwal]]
    });
  }

  // Find missing articles
  const existingSlugs = rows.slice(1).map(r => r[1]);
  const missing = Object.keys(allArticles).filter(s => !existingSlugs.includes(s)).sort();
  console.log(`Missing from sheet: ${missing.length}`);

  // Prepare append rows for missing
  const appendRows = missing.map((slug, i) => {
    const a = allArticles[slug];
    const date = a.date || '';
    return [
      String(rows.length + i),
      slug,
      a.title,
      'Published',
      date,
      a.category || '',
      `https://www.sesoris.com/blog/${slug}`,
      (a.excerpt || '').substring(0, 160),
      date ? formatDate(date) : ''
    ];
  });

  // Execute batch update
  console.log(`Updating ${batchData.length} existing rows...`);
  const updateResp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ valueInputOption: 'RAW', data: batchData })
    }
  );
  const updateResult = await updateResp.json();
  console.log(`Updated: ${updateResult.totalUpdatedCells} cells`);

  // Append missing rows
  if (appendRows.length > 0) {
    console.log(`Appending ${appendRows.length} new articles...`);
    const appendResp = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A${rows.length + 1}:I${rows.length + appendRows.length}?valueInputOption=RAW`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: appendRows })
      }
    );
    const appendResult = await appendResp.json();
    console.log(`Appended: ${appendResult.updatedCells} cells`);
  }

  console.log('\nDONE! Sheet now has', rows.length - 1 + missing.length, 'articles, all Published.');
}

function formatDate(dateStr) {
  // Convert 2026-03-20 to 20/03/2026 08:00 WIB
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y} 08:00 WIB`;
}

main().catch(console.error);
