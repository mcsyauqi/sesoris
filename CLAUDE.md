# Sesoris Repository Guide

## Production

- Canonical website: `https://www.sesoris.com`
- Secondary observer: `https://sesoris.vercel.app`
- Production branch: `claude/sesoris-ecommerce-build-yZdJu`
- Daily content workflow: `.github/workflows/generate-blog.yml`
- Daily generator cron: `0 1 * * *` (01:00 UTC, 08:00 WIB nominal)

## Safe release procedure

1. Fetch `origin` and fast-forward the production branch. Do not force-push.
2. Keep the commit scoped. Preserve unrelated untracked files.
3. For scheduled content, run `node scripts/check-scheduled-publishing.mjs` before pushing.
4. Do not run a full local Next.js build in constrained MinTiv cron sessions. Use JSON parsing, static checks, `git diff --check`, and the publishing guard.
5. Push the production branch normally. The canonical domain may update later than the Vercel observer.
6. Verify the canonical domain with a cache-busting query. Require HTTP 200, the expected revision marker or content, the correct final URL, and valid rendered output before reporting completion.
7. Treat `https://www.sesoris.com` as production truth. A successful GitHub push or a ready Vercel observer alone is not completion proof.

## Daily cap (hard rule, Syauqi 2026-10-19)

- Maximum 3 articles per publish date (`date` field, non-retired). Normal day = 1-3 from the cron; never stack hand-written or Trello articles on a date that already has 3.
- Before adding an article by hand: `node scripts/next-publish-date.mjs --min-offset 1 --horizon 7` gives the first date with room.
- Guards: `next-publish-date.mjs` (hard cap, searches past the horizon instead of overfilling the edge day), `generate-blog-post.ts` (`capPublishDate`), `check-scheduled-publishing.mjs` (fails on any date from today with > 3; dry-run `CAP_DRY_RUN_ADD=YYYY-MM-DD`), `.github/workflows/schedule-cap.yml` (push to content/blog).
- Never change the date of a live article.

## Daily article verification

For articles dated today and yesterday, check the rendered article body for at least 1,500 words, contextual images with non-empty alt text, BlogPosting or Article schema, FAQPage schema, valid links, and no editorial placeholders.

Diminta oleh Syauqi (via MinTiv).
