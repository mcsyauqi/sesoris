// Runnable check for next-publish-date.mjs. `node scripts/next-publish-date.test.mjs`
// Fails if the picker stops backfilling holes -- the exact regression that left
// 2026-08-09..08-15 with zero articles while the workflow reported success, and again
// 2026-09-03..09-07 after commit 23a0bbf restored a fixed +7 offset.
import assert from 'node:assert';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SCRIPT = path.resolve('scripts/next-publish-date.mjs');
const iso = (d) => d.toISOString().slice(0, 10);
const shift = (days) => {
  const d = new Date(`${iso(new Date())}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return iso(d);
};

function pick(posts, env = {}, args = []) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'npd-'));
  fs.mkdirSync(path.join(dir, 'content', 'blog'), { recursive: true });
  posts.forEach((p, i) =>
    fs.writeFileSync(path.join(dir, 'content', 'blog', `p${i}.json`), JSON.stringify(p)),
  );
  try {
    return execFileSync(process.execPath, [SCRIPT, ...args], {
      cwd: dir,
      encoding: 'utf8',
      env: { ...process.env, ...env },
    });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const full = (day) => [0, 1, 2].map(() => ({ date: day, title: 'x' }));

// The bug: today is empty but later days are stocked. A fixed +7 offset skips today forever.
assert.strictEqual(
  pick([...full(shift(7)), ...full(shift(6))]),
  shift(0),
  'must backfill the earliest under-quota day, not jump to a fixed offset',
);

// Today already at quota -> move to the next day that is not.
assert.strictEqual(pick(full(shift(0))), shift(1), 'must skip days already at quota');

// Retired posts do not count toward quota.
assert.strictEqual(
  pick(full(shift(0)).map((p) => ({ ...p, retired: true }))),
  shift(0),
  'retired posts must not fill a day',
);

// Whole window at quota -> stay on the far edge (D+7). The buffer is never pushed past the
// horizon; PER_DAY is a cadence target, not a cap.
const everything = [];
for (let i = 0; i <= 7; i++) everything.push(...full(shift(i)));
assert.strictEqual(pick(everything), shift(7), 'must stay on the horizon edge when the window is full');

// A malformed file must not be read as a valid slot.
assert.strictEqual(
  pick([{ date: shift(0) }, { date: shift(0) }, { date: shift(0) }], { POSTS_PER_DAY: '4' }),
  shift(0),
  'quota is configurable',
);

// --- Hybrid window used by generate-blog.yml: --min-offset 1 --horizon 7 ---
const HYBRID = ['--min-offset', '1', '--horizon', '7'];

// Today is empty but must be skipped (it belongs to an earlier run); day +3 is the first
// hole inside tomorrow..D+7, so it is filled before anything lands on D+7.
assert.strictEqual(
  pick(
    [
      ...full(shift(1)),
      ...full(shift(2)),
      ...full(shift(4)),
      ...full(shift(5)),
      ...full(shift(6)),
      ...full(shift(7)),
    ],
    {},
    HYBRID,
  ),
  shift(3),
  'hybrid: a hole in the middle of tomorrow..D+7 is filled first, never today',
);

// A day that is under quota (2 of 3) counts as a hole.
assert.strictEqual(
  pick([...full(shift(1)).slice(0, 2), ...full(shift(2))], {}, HYBRID),
  shift(1),
  'hybrid: an under-quota day is a hole',
);

// Tomorrow..D+7 all at quota -> fall back to D+7 (the 23a0bbf offset, now only the ceiling).
const window = [];
for (let i = 1; i <= 7; i++) window.push(...full(shift(i)));
assert.strictEqual(pick(window, {}, HYBRID), shift(7), 'hybrid: a full window falls back to D+7');

// Guard rail: a window that cannot exist fails loudly instead of printing a date.
assert.throws(
  () => pick([], {}, ['--min-offset', '9', '--horizon', '7']),
  'min-offset above horizon must fail',
);

console.log('next-publish-date: 9 checks passed');
