# Scheduled Publishing & Timezone Safety

How blog posts appear over time, and the date convention that keeps scheduling
predictable. Validated 2026-07-02 (Trello card 3c0m47rS).

## TL;DR

- A post's `date` field is a **UTC calendar date** (`YYYY-MM-DD`).
- It becomes visible in listings at **00:00 UTC = 07:00 WIB** on that date.
- The gate and the generator both compute "today" in **UTC**, so they never
  disagree. No post is ever hidden by a timezone mismatch.

## How the gate works

`getAllPosts()` in `src/lib/blog.ts` is the single source of truth for what is
published:

```ts
const today = new Date().toISOString().split('T')[0]; // UTC date, e.g. 2026-07-02
const published = posts.filter((p) => p.date <= today);
```

`date <= today` is a **string** comparison. It is correct *only* because every
post date is strict `YYYY-MM-DD` (no time component). ISO dates sort
lexicographically, so string `<=` equals chronological `<=`. All 348 posts
conform; a check script enforces this (see below).

## Why it's timezone-safe

The daily generator (`scripts/generate-blog-post.ts`) stamps the date with the
same UTC expression the gate uses:

```ts
function toISODate(date: Date) { return date.toISOString().split('T')[0]; } // UTC
// ...
date: toISODate(today),
```

Gate = UTC date. Generator = UTC date. GitHub Actions runners are UTC. So a post
generated at 01:00 UTC (08:00 WIB) is stamped with today's UTC date and passes
`date <= today` **immediately**. There is no window where a just-published post
is hidden.

The boundary is fixed: a post dated `D` goes live at **07:00 WIB on day D**.
That is the intended behaviour (articles surface in the morning), not a bug.

## Every surface is gated consistently

| Surface | Function | Scheduled posts |
| --- | --- | --- |
| `/blog` listing | `getAllPosts()` | hidden until date |
| `/blog/category/[slug]` | `getAllPosts()` | hidden until date |
| `/sitemap.xml` | `getAllPosts()` | excluded until date |
| `/blog/sitemap.xml` | `getAllPosts()` | excluded until date |
| `/feed.xml` | `getAllPosts()` | excluded until date |
| `/blog/[slug]` page | `getPostBySlug()` | **NOT gated** — see note |

All blog surfaces set `export const revalidate = 3600` (ISR), so a scheduled
post appears within **1 hour** of its date opening, with no deploy required.

## The one caveat: `[slug]` is not date-gated

`src/app/blog/[slug]/page.tsx` renders any existing slug (`getPostBySlug` has no
date check) and `generateStaticParams()` uses `getAllSlugs()` (every file). A
future-dated post is therefore **reachable by direct URL** even while hidden
from listings, sitemap, and feed.

This is harmless today because the generator only ever writes same-day posts
(zero future-dated files exist). It only matters if someone starts pre-writing
future-dated posts and expects them to be fully private until their date. To
close that gap, gate the page:

```ts
// generateStaticParams: build only published slugs
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// in the page, after loading the post:
const today = new Date().toISOString().split('T')[0];
if (post.date > today) notFound();
```

Tracked as a follow-up; not applied here because scheduling is not in use yet
and a wrong-way date edge could 404 a legitimately published post.

## Convention (do this)

1. **Always** write `date` as `YYYY-MM-DD`, no time component.
2. Treat `date` as a **UTC** calendar date. "Publish on July 3" means the post
   surfaces at 07:00 WIB on July 3.
3. To pre-schedule, set `date` to a future `YYYY-MM-DD`. It stays out of all
   listings/sitemap/feed until that UTC date, and appears within an hour after.
4. Do not hand-edit a post to a date earlier than "today WIB" expecting it live
   *before* 07:00 WIB — the UTC gate opens at 07:00 WIB, not WIB midnight.
5. Run `node scripts/check-scheduled-publishing.mjs` after bulk date edits.
