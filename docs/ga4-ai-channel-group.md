# GA4 channel group "AI Assistants" (Sesoris)

Canonical definition for monthly reporting of AI-assistant referral traffic. Documented 2026-10-03 (Trello card https://trello.com/c/Mo6daPBy).

## Where it lives

- GA4 property: `properties/463855828` ("Sesoris Web"), web stream `9840946860`, measurement ID `G-V2Y9KVBKFP`, default URI https://www.sesoris.com
- Channel group: `properties/463855828/channelGroups/15892768753`, display name **AI Assistants**
- Report dimension: `sessionCustomChannelGroup:15892768753`

Use this group for every monthly report. Do not use `15440644598` ("AI Search", older duplicate with the same AI regex plus a dead rule pointing at a default channel named "AI Assistants", which GA4 calls "AI Assistant"). Do not create another group.

## Rules (evaluated top to bottom, first match wins)

1. **AI Assistants**: `eachScopeSource` FULL_REGEXP
   `.*(chatgpt\.com|openai\.com|perplexity\.ai|perplexity|gemini\.google\.com|bard\.google\.com|copilot\.microsoft\.com|copilot\.com|claude\.ai|poe\.com|you\.com|chat\.deepseek\.com|meta\.ai).*`
2. Every other channel maps 1:1 to the GA4 default channel group (Direct, Cross-network, Paid Shopping, Paid Search, Paid Social, Paid Video, Paid Other, Display, Organic Shopping, Organic Social, Organic Video, Organic Search, Email, Affiliates, Referral, Audio, SMS, Mobile Push Notifications).

Because the AI rule sits first, AI referrers are counted here even when GA4's default grouping would have put them in Referral or AI Assistant.

## Standard queries (google-analytics-pp-cli)

Get a fresh access token first (`GOOGLE_GA4_ACCESS_TOKEN`, from the GA4 refresh token in the workspace `.env`), then pipe a request body into
`google-analytics-pp-cli properties run-report 463855828 --stdin --json --data-source live --no-cache`.

AI sessions by source:
```json
{"dateRanges":[{"startDate":"30daysAgo","endDate":"yesterday"}],
 "dimensions":[{"name":"sessionCustomChannelGroup:15892768753"},{"name":"sessionSource"}],
 "metrics":[{"name":"sessions"},{"name":"engagedSessions"}],
 "dimensionFilter":{"filter":{"fieldName":"sessionCustomChannelGroup:15892768753","stringFilter":{"matchType":"EXACT","value":"AI Assistants"}}}}
```

AI vs Direct per ISO week (replacement for the "AI sessions per week" exploration):
```json
{"dateRanges":[{"startDate":"90daysAgo","endDate":"yesterday"}],
 "dimensions":[{"name":"isoYearIsoWeek"},{"name":"sessionCustomChannelGroup:15892768753"}],
 "metrics":[{"name":"sessions"}],
 "dimensionFilter":{"filter":{"fieldName":"sessionCustomChannelGroup:15892768753","inListFilter":{"values":["AI Assistants","Direct"]}}},
 "orderBys":[{"dimension":{"dimensionName":"isoYearIsoWeek"}}]}
```

AI sessions per landing page:
```json
{"dateRanges":[{"startDate":"90daysAgo","endDate":"yesterday"}],
 "dimensions":[{"name":"landingPage"},{"name":"sessionSource"}],
 "metrics":[{"name":"sessions"},{"name":"engagedSessions"}],
 "dimensionFilter":{"filter":{"fieldName":"sessionCustomChannelGroup:15892768753","stringFilter":{"matchType":"EXACT","value":"AI Assistants"}}},
 "orderBys":[{"metric":{"metricName":"sessions"},"desc":true}]}
```

## Baseline (verified 2026-10-03)

Window 2026-04-26 to 2026-07-24 (the 90-day window the card was written from):
AI Assistants 36 sessions (chatgpt.com 31, copilot.com 5), engagement rate 52.8%, avg session 151 s. Direct 522 sessions, engagement rate 21.5%, avg session 41 s.

## Known gap: no GA4 data 2026-08-05 to 2026-10-03

Commit bb340d6 (2026-08-04, "defer analytics until interaction") built `gtag` as `(...args) => dataLayer.push(args)`. gtag.js ignores plain arrays in dataLayer (it only processes Arguments objects), so no hit reached GA4 from 2026-08-05. Fixed 2026-10-03 in `src/components/layout/AnalyticsScripts.tsx`. Any month-over-month comparison must exclude that window.
