# Shoe-storage cluster overlap table

**Project:** Sesoris
**Captured:** 2026-10-02 UTC
**GSC property:** `sc-domain:sesoris.com`
**Current complete window:** `2026-09-04` to `2026-10-01`

## URL-level comparison

| URL role | URL | Card baseline | Current GSC rows | Current query set | Redirect gate |
|---|---|---:|---:|---|---|
| shoe_pillar | `https://www.sesoris.com/blog/ideas-for-shoe-storage-in-small-closet` | 111 imp, pos 32.7 | 2 imp, pos 19 | shoe organization ideas for small closets | 200 -> `self-canonical pillar` |
| shoe_entrance | `https://www.sesoris.com/blog/entrance-shoe-storage-ideas-transform-home-first-impression-2026` | 1 imp, pos 2 | 0 rows | empty | 301 -> `/blog/small-entryway-shoe-storage-ideas-smart-solutions-tiny-spaces-2026` |
| shoe_entryway | `https://www.sesoris.com/blog/ideas-for-shoe-storage-in-entryway` | 1 imp, pos 9 | 0 rows | empty | 301 -> `/blog/small-entryway-shoe-storage-ideas-smart-solutions-tiny-spaces-2026` |
| shoe_garage | `https://www.sesoris.com/blog/ideas-for-shoe-storage-in-garage` | 1 imp, pos 22 | 0 rows | empty | 301 -> `/blog/shoe-storage-ideas-garage` |

## Overlap result

- The current complete 28-day export returned one query row for the pillar and zero rows for each of the three retired source URLs.
- Therefore no query-set overlap percentage is fabricated: the three source query sets are empty in this window, so the >60% merge threshold is not computable from current data.
- The repository already marks the three source posts as retired and gives each a single live destination. The implementation changes the response from Next permanent redirect (308) to explicit HTTP 301 and keeps the destination chain-free.
- Internal-link direction is reciprocal: the pillar links to the live entryway and garage descendants, and those descendants link back to the pillar with descriptive anchors.

## Verification commands

- GSC query: `/opt/data/work/trello-sesoris-20261002_gsc_cluster.py`
- Exact redirect probe: `/opt/data/work/trello-sesoris-20261002_live_redirects.py`
- Evidence must be attached privately to Trello only; no internal PDF, screenshot, or log is published to a public host.
