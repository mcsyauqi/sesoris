# Sesoris Monthly SEO Report

**Reporting window:** 25 June 2026 to 24 July 2026  
**Generated:** 2026-10-02T10:27:15.463579+00:00  
**Requested by:** Syauqi (via MinTiv)  
**Status:** BLOCKED, source-baseline mismatch requiring reconciliation

## Executive summary

The window is the card's 30-day historical reporting window. The fresh API read-back does **not** reproduce the card's stated baseline: GA4 channel rows sum to **448 sessions** rather than 438, while Search Console returns **1,111 impressions and 1 click** rather than 998 impressions and 0 clicks for the exact property `sc-domain:sesoris.com`. The report preserves the live results and does not overwrite them with stale card claims.

## KPI separation

| Source | Metric | Verified result |
|---|---|---:|
| Google Search Console | Impressions | 1,111 |
| Google Search Console | Clicks | 1 |
| Google Search Console | Weighted average position | 29.46 |
| GA4 property 463855828 | Sessions from channel rows | 448 |
| GA4 property 463855828 | Direct sessions | 366 (81.70%) |
| GA4 property 463855828 | Direct engaged sessions | 73 (19.95% Direct engagement rate) |
| GA4 property 463855828 | AI Assistant sessions | 14 |
| Bing Webmaster | Impressions | 3,187 |
| Bing Webmaster | Clicks | 13 |
| Bing Webmaster | Crawl issue URLs / issue flags | 8 / 11 |

## Impressions versus clicks

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 190" style="width:100%;height:auto;background:#f7fbfd;border:1px solid #d8eaf0"><line x1="34" y1="156" x2="686" y2="156" stroke="#9bb8c4"/><polyline points="34.0,151.2 56.5,139.5 79.0,145.3 101.4,141.5 123.9,149.2 146.4,130.8 168.9,147.3 191.4,147.3 213.9,147.3 236.3,148.3 258.8,146.3 281.3,152.1 303.8,145.3 326.3,148.3 348.8,146.3 371.2,114.4 393.7,46.6 416.2,49.5 438.7,34.0 461.2,41.7 483.7,93.1 506.1,94.0 528.6,88.2 551.1,112.4 573.6,141.5 596.1,139.5 618.6,134.7 641.0,126.0 663.5,124.0 686.0,78.5" fill="none" stroke="#1688B8" stroke-width="3"/><polyline points="34.0,156.0 56.5,156.0 79.0,156.0 101.4,156.0 123.9,156.0 146.4,156.0 168.9,156.0 191.4,156.0 213.9,156.0 236.3,156.0 258.8,156.0 281.3,156.0 303.8,156.0 326.3,156.0 348.8,156.0 371.2,156.0 393.7,156.0 416.2,156.0 438.7,156.0 461.2,156.0 483.7,156.0 506.1,156.0 528.6,156.0 551.1,156.0 573.6,156.0 596.1,156.0 618.6,156.0 641.0,156.0 663.5,156.0 686.0,34.0" fill="none" stroke="#F4B942" stroke-width="3"/><text x="40" y="22" fill="#0D4F63" font-size="12">GSC daily trend, actual scale per series</text><text x="560" y="22" fill="#1688B8" font-size="11">Impressions</text><text x="560" y="38" fill="#9a6a00" font-size="11">Clicks</text></svg>

The two series are intentionally shown separately. Clicks are not substituted for impressions, and the non-zero click read-back is retained as returned by GSC.

## Source and method

- GSC Search Analytics HTTP 200, exact property `sc-domain:sesoris.com`, dimensions `date`, window 2026-06-25 through 2026-07-24, 30 returned daily rows.
- GA4 Data API HTTP 200, property `463855828`, dimension `sessionDefaultChannelGroup`, metrics `sessions`, `engagedSessions`, and `engagementRate`.
- Bing Webmaster API HTTP 200. The endpoint returned a larger historical set, so rows were filtered by each row's `Date` field to the requested 30-day window before summing. Crawl issues were read live through the Bing Webmaster CLI.
- Raw sanitized daily GSC evidence is retained internally at `/opt/data/work/trello-sesoris-20261002-card607/gsc-daily.json` and is not published.

## Blocker and next action

The Definition of Done requires a report whose GSC figures match 998 impressions and 0 clicks. The current exact-window export is 1,111 impressions and 1 click, and GA4 channel rows sum to 448 sessions rather than the card's 438. Keep the card in **To Do** with `dueComplete=false` until the owner confirms the intended historical export window/property or reconciles the baseline source. No completion claim is made.
