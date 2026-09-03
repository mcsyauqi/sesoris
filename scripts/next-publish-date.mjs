// Prints the date the next generated article should carry.
//
// Why this exists: generate-blog.yml used a fixed `date -u -d "+7 days"`. That is correct
// only if the 7-day buffer was already full when the offset was introduced. It was not, so
// switching to it left a permanent hole: the last article landed 2026-08-08 and the next
// ones landed 2026-08-16, leaving 08-09..08-15 with zero articles. The workflow stayed green
// the whole time because generation itself succeeded. The same regression came back on
// 2026-09-01 (commit 23a0bbf restored the fixed +7) and left 2026-09-03..09-07 empty.
//
// Instead of trusting a fixed offset, pick the earliest day inside the window
// [today + MIN_OFFSET, today + HORIZON] that is still under quota. That backfills an
// existing hole and cannot open a new one. If every day in the window is already at
// quota, fall back to the far edge (today + HORIZON): an article never lands later than
// D+HORIZON, and PER_DAY is a cadence target rather than a cap, so one extra article on
// the edge day is harmless.
//
// Hybrid schedule used by generate-blog.yml (`--min-offset 1 --horizon 7`):
//   - never write into today: today's slot was filled by an earlier run, so a missed run
//     does not empty the live day (the intent behind the D+7 offset in 23a0bbf);
//   - fill the earliest hole between tomorrow and D+7, so the seven-day buffer builds up
//     without ever leaving a gap in front of it.
//
// Usage: node scripts/next-publish-date.mjs [--min-offset N] [--horizon N] [--per-day N]
// Env fallbacks: MIN_OFFSET_DAYS, BUFFER_DAYS, POSTS_PER_DAY.
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
function flag(name, fallback) {
  const i = argv.indexOf(name);
  if (i === -1) return fallback;
  const v = Number(argv[i + 1]);
  if (!Number.isInteger(v) || v < 0) {
    console.error(`${name} expects a non-negative integer, received: ${argv[i + 1]}`);
    process.exit(2);
  }
  return v;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const PER_DAY = flag('--per-day', Number(process.env.POSTS_PER_DAY || 3));
const HORIZON = flag('--horizon', Number(process.env.BUFFER_DAYS || 7));
const MIN_OFFSET = flag('--min-offset', Number(process.env.MIN_OFFSET_DAYS || 0));
if (MIN_OFFSET > HORIZON) {
  console.error(`--min-offset (${MIN_OFFSET}) cannot exceed --horizon (${HORIZON})`);
  process.exit(2);
}

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
const dayAt = (offset) => {
  const d = new Date(today);
  d.setUTCDate(d.getUTCDate() + offset);
  return iso(d);
};

for (let i = MIN_OFFSET; i <= HORIZON; i++) {
  const key = dayAt(i);
  if ((counts.get(key) || 0) < PER_DAY) {
    process.stdout.write(key);
    process.exit(0);
  }
}

// Every day in the window is at quota: stay on the far edge rather than pushing the buffer out.
process.stdout.write(dayAt(HORIZON));
