const fs = require('fs');
const path = require('path');

const SPREADSHEET_ID = '1MY7gCk8Yy3Ebxmqn8eQjTKlVvhhPJbJN1m7AnAkBBbg';
const ARTICLE_SHEET = 'Artikel & Keyword';
const KEYWORD_SHEET = 'Keyword Database';
const ARCHIVE_SHEET = 'Archive (ID)';

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

async function getAccessToken() {
  const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || process.env.GOOGLE_SHEETS_REFRESH_TOKEN || process.env.GOOGLE_GSC_REFRESH_TOKEN;
  if (!refreshToken) throw new Error('Missing Google refresh token for Sheets access');
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: requireEnv('GOOGLE_CLIENT_ID'),
      client_secret: requireEnv('GOOGLE_CLIENT_SECRET'),
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  const data = await resp.json();
  if (!data.access_token) throw new Error(`Could not get Google access token: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function sheetsFetch(token, endpoint, options = {}) {
  const resp = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await resp.text();
  const data = text ? JSON.parse(text) : {};
  if (!resp.ok) throw new Error(`Sheets API ${resp.status}: ${text}`);
  return data;
}

function readArticles() {
  const blogDir = path.join(__dirname, '..', 'content', 'blog');
  return fs.readdirSync(blogDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const article = JSON.parse(fs.readFileSync(path.join(blogDir, file), 'utf8'));
      return {
        slug: article.slug || file.replace(/\.json$/, ''),
        title: article.title || '',
        status: article.retired ? 'Retired' : 'Published',
        date: article.date || '',
        category: article.category || '',
        url: article.redirectTo ? `https://www.sesoris.com/blog/${article.redirectTo}` : `https://www.sesoris.com/blog/${article.slug || file.replace(/\.json$/, '')}`,
        excerpt: (article.excerpt || '').replace(/\s+/g, ' ').slice(0, 160),
        jadwal: article.date ? formatDate(article.date) : '',
      };
    })
    .sort((a, b) => (a.date || '').localeCompare(b.date || '') || a.slug.localeCompare(b.slug));
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  if (!y || !m || !d) return dateStr;
  return `${d}/${m}/${y} 08:00 WIB`;
}

async function ensureSheet(token, title) {
  const meta = await sheetsFetch(token, '?fields=sheets(properties(title,sheetId))');
  const found = meta.sheets?.find((s) => s.properties.title === title);
  if (found) return found.properties.sheetId;
  const res = await sheetsFetch(token, ':batchUpdate', {
    method: 'POST',
    body: JSON.stringify({ requests: [{ addSheet: { properties: { title } } }] }),
  });
  return res.replies[0].addSheet.properties.sheetId;
}

async function clearAndWrite(token, range, values) {
  await sheetsFetch(token, `/values/${encodeURIComponent(range)}:clear`, { method: 'POST', body: '{}' });
  await sheetsFetch(token, `/values/${encodeURIComponent(range)}?valueInputOption=RAW`, {
    method: 'PUT',
    body: JSON.stringify({ values }),
  });
}

async function main() {
  const token = await getAccessToken();
  const articles = readArticles();
  const liveSlugs = new Set(articles.filter((a) => a.status === 'Published').map((a) => a.slug));

  await ensureSheet(token, ARCHIVE_SHEET);
  const oldData = await sheetsFetch(token, `/values/${encodeURIComponent(`${ARTICLE_SHEET}!A1:I1000`)}`);
  const oldRows = oldData.values || [];
  const oldHeader = oldRows[0] || ['No', 'Keyword', 'Judul Artikel', 'Status', 'Tanggal', 'Kategori', 'Link Publish', 'Meta Description', 'Jadwal Tayang'];
  const archiveRows = oldRows.slice(1)
    .filter((row) => row[1] && !liveSlugs.has(row[1]))
    .map((row, idx) => [String(idx + 1), ...row.slice(1), 'Archived by update_sheet.js because slug is not a live content/blog JSON article']);

  const articleRows = [oldHeader].concat(articles.filter((a) => a.status === 'Published').map((a, idx) => [
    String(idx + 1), a.slug, a.title, 'Published', a.date, a.category, a.url, a.excerpt, a.jadwal,
  ]));
  await clearAndWrite(token, `${ARTICLE_SHEET}!A1:I${articleRows.length + 20}`, articleRows);
  await clearAndWrite(token, `${ARCHIVE_SHEET}!A1:J${archiveRows.length + 2}`, [[...oldHeader, 'Archive Note'], ...archiveRows]);

  const keywordData = await sheetsFetch(token, `/values/${encodeURIComponent(`${KEYWORD_SHEET}!A1:J2000`)}`);
  const keywordRows = keywordData.values || [];
  const keywordHeader = keywordRows[0] || ['No','Keyword','Volume/bln','KD (0-100)','Kategori','Intent','Prioritas','Status Artikel','Slug Target','URL Target'];
  const updatedKeywords = [keywordHeader].concat(keywordRows.slice(1).map((row) => {
    const out = [...row];
    while (out.length < 10) out.push('');
    const slug = out[8];
    if (slug && liveSlugs.has(slug)) {
      out[7] = 'Published';
      out[9] = `https://www.sesoris.com/blog/${slug}`;
    }
    return out;
  }));
  await clearAndWrite(token, `${KEYWORD_SHEET}!A1:J${updatedKeywords.length + 20}`, updatedKeywords);

  console.log(JSON.stringify({
    status: 'ok',
    liveArticlesWritten: articles.filter((a) => a.status === 'Published').length,
    archivedStaleRows: archiveRows.length,
    keywordRowsChecked: Math.max(0, keywordRows.length - 1),
  }, null, 2));
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
