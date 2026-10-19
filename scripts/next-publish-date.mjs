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
// quota, continue to the first later date with room: PER_DAY is a hard cap (max 3).
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
// Hard cap (Syauqi 2026-10-19): never more than 3 articles on one publish date.
const DAILY_CAP = 3;
const PER_DAY = Math.min(flag('--per-day', Number(process.env.POSTS_PER_DAY || 3)), DAILY_CAP);
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

// Every day in the window is at quota. PER_DAY is now a HARD cap (max 3/day, Syauqi
// 2026-10-19), so the old "one extra on the edge day" fallback is gone: continue past
// the horizon to the first date that still has room.
for (let i = HORIZON + 1; i <= HORIZON + 3650; i++) {
  const key = dayAt(i);
  if ((counts.get(key) || 0) < PER_DAY) {
    process.stdout.write(key);
    process.exit(0);
  }
}
console.error('no date with room in the next 10 years');
process.exit(1);
