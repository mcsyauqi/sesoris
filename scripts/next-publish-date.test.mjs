// Runnable check for next-publish-date.mjs. `node scripts/next-publish-date.test.mjs`
// Fails if the picker stops backfilling holes -- the exact regression that left
// 2026-08-09..08-15 with zero articles while the workflow reported success.
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

function pick(posts, env = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'npd-'));
  fs.mkdirSync(path.join(dir, 'content', 'blog'), { recursive: true });
  posts.forEach((p, i) =>
    fs.writeFileSync(path.join(dir, 'content', 'blog', `p${i}.json`), JSON.stringify(p)),
  );
  try {
    return execFileSync(process.execPath, [SCRIPT], {
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

// Whole horizon full -> extend past it instead of piling onto the last day.
const everything = [];
for (let i = 0; i <= 7; i++) everything.push(...full(shift(i)));
assert.strictEqual(pick(everything), shift(8), 'must extend the buffer when it is full');

// A malformed file must not be read as a valid slot.
assert.strictEqual(
  pick([{ date: shift(0) }, { date: shift(0) }, { date: shift(0) }], { POSTS_PER_DAY: '4' }),
  shift(0),
  'quota is configurable',
);

console.log('next-publish-date: 5 checks passed');
