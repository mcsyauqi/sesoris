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

> **Update 2026-10-14:** the caveat above is closed. `BlogPostPage` now calls
> `isPostPublished(post.date)` and returns 404 for future-dated posts, so
> pre-written articles stay private until their UTC date. Verified live in
> cycle #77/#78: a future slug returns 404 and is absent from `/blog`,
> `sitemap.xml` and `feed.xml`.

## When the image API is capped (subscription fallback)

`generate-blog.yml` runs `scripts/image-api-preflight.mjs` first. If the Google
AI Studio project behind `GEMINI_API_KEY` is over its monthly spending cap
(HTTP 429 "exceeded its monthly spending cap"), the workflow skips generation
with a warning instead of paying for Claude articles that then fail the hero
gate. Until the cap is raised at https://ai.studio/spend or resets, the buffer
is filled by hand from a local machine:

1. Pick keywords from the Keyword Data sheet (tab `Keyword Database` of
   `1MY7gCk8Yy3Ebxmqn8eQjTKlVvhhPJbJN1m7AnAkBBbg`) that have no live article,
   checking near-duplicates with the same `coreKeyword()` rule as the generator.
2. Write the article JSON in `content/blog/<slug>.json` with `date` set to the
   target day. Standard: 2000+ words, 4+ body images, 7+ `**Q:**` FAQ, 1+ table,
   10+ internal links that are already live (not future-dated).
3. Images, no paid API:
   - Hero and lifestyle shots: render through the Gemini web subscription
     (`gemini-web-pp-cli image generate`, via the shared lock helper
     `temp/cycle70/gemini-render.mjs` in the Creativism workspace) or the ChatGPT
     web subscription (`chatgpt-web-pp-cli image generate --aspect widescreen`).
     Photorealistic interior style, no text, logos or watermark. Look at every
     result before using it, then convert to WebP 1200x675 under 100 KB with
     sharp, named `public/images/blog/<slug>-hero.webp`.
   - Body images: Sesoris catalog photos from `public/images/products/`
     (copied under a per-article name, caption ends with
     "Photo: Sesoris product catalog") and hand-made SVG diagrams for anything
     with text. Never reuse one file across articles.
4. Append a `published` entry to `data/keyword-consumed.json`.
5. Run `node scripts/article-quality.mjs content/blog/<slug>.json` and
   `node scripts/check-scheduled-publishing.mjs`, then commit and push.

To let the generator itself use pre-rendered subscription images later, the
hook point is `generateArticleImages()` in `scripts/generate-image.ts`: it could
read from a local folder of pre-rendered WebP files before calling the API.
That is not implemented yet.

## Convention (do this)

1. **Always** write `date` as `YYYY-MM-DD`, no time component.
2. Treat `date` as a **UTC** calendar date. "Publish on July 3" means the post
   surfaces at 07:00 WIB on July 3.
3. To pre-schedule, set `date` to a future `YYYY-MM-DD`. It stays out of all
   listings/sitemap/feed until that UTC date, and appears within an hour after.
4. Do not hand-edit a post to a date earlier than "today WIB" expecting it live
   *before* 07:00 WIB — the UTC gate opens at 07:00 WIB, not WIB midnight.
5. Run `node scripts/check-scheduled-publishing.mjs` after bulk date edits.

## Daily cap (hard rule, Syauqi 2026-10-19)

- Maximum 3 articles per publish date (`date` field, non-retired). Normal day = 1-3 from the cron; never stack hand-written or Trello articles on a date that already has 3.
- Before adding an article by hand: `node scripts/next-publish-date.mjs --min-offset 1 --horizon 7` gives the first date with room.
- Guards: `next-publish-date.mjs` (hard cap, searches past the horizon instead of overfilling the edge day), `generate-blog-post.ts` (`capPublishDate`), `check-scheduled-publishing.mjs` (fails on any date from today with > 3; dry-run `CAP_DRY_RUN_ADD=YYYY-MM-DD`), `.github/workflows/schedule-cap.yml` (push to content/blog).
- Never change the date of a live article.
