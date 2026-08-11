// Prints the date the next generated article should carry.
//
// Why this exists: generate-blog.yml used a fixed `date -u -d "+7 days"`. That is correct
// only if the 7-day buffer was already full when the offset was introduced. It was not, so
// switching to it left a permanent hole: the last article landed 2026-08-08 and the next
// ones landed 2026-08-16, leaving 08-09..08-15 with zero articles. The workflow stayed green
// the whole time because generation itself succeeded.
//
// Instead of trusting a fixed offset, pick the earliest day from today forward that is still
// under quota. That backfills an existing hole and cannot open a new one.
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const PER_DAY = Number(process.env.POSTS_PER_DAY || 3);
const HORIZON = Number(process.env.BUFFER_DAYS || 7);

const iso = (d) => d.toISOString().slice(0, 10);
const counts = new Map();

for (const f of fs.readdirSync(BLOG_DIR)) {
  if (!f.endsWith('.json')) continue;
  let post;
  try {
    post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8'));
  } catch {
    continue; // a malformed file must not silently shift the schedule
  }
  if (post.retired) continue;
  const d = String(post.date || '').slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) counts.set(d, (counts.get(d) || 0) + 1);
}

// Today in UTC, matching the generator's toISODate() which is also UTC.
const today = new Date(`${iso(new Date())}T12:00:00Z`);
for (let i = 0; i <= HORIZON; i++) {
  const day = new Date(today);
  day.setUTCDate(day.getUTCDate() + i);
  const key = iso(day);
  if ((counts.get(key) || 0) < PER_DAY) {
    process.stdout.write(key);
    process.exit(0);
  }
}

// Buffer is full all the way out: extend it by one day rather than piling onto the edge.
const beyond = new Date(today);
beyond.setUTCDate(beyond.getUTCDate() + HORIZON + 1);
process.stdout.write(iso(beyond));
