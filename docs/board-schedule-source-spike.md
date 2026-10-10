# BOARD schedule-source investigation — 2026-10-10

## Findings

Official YOW pages: https://www.yow.ca/flights/departures and https://www.yow.ca/flights/arrivals .
The public HTML exposed to a text crawler shows a **Loading...** placeholder, filter, auto-refresh toggle and pagination. The visible page alone does **not** expose a machine-readable flight payload. This supports the hypothesis of browser-side data loading, but neither an endpoint nor reuse permission has been verified.

A separate public Airportia YOW page exposes actual flight-number/schedule/status rows in its HTML, confirming the *data shape* and a possible comparison reference, **not** authorization to republish its data. Third-party listings may contain codeshares, and are not a substitute for official gate/carousel information.

Network inspection of YOW's JavaScript/XHR requests is blocked in the current execution environment (outbound DNS unavailable). Do not guess an endpoint, claim a live integration, or deploy scraping without validating permissions and reliability.

## Completed spike

`src/board-schedule.mjs` defines a source-neutral flight contract; `src/board-schedule.test.mjs` covers identity, timezone, duplicate, malformed and status cases. No production routing, polling, or D1 writes were changed.

## Next gate

1. Inspect YOW's browser Network tab (Fetch/XHR) on arrivals/departures; record actual endpoint, request parameters, response schema, cache policy, and any access controls.
2. Check YOW's reuse terms or seek permission if necessary. If unsuitable, assess a legitimately licensed free alternative; do not scrape Airportia or another provider by default.
3. Build a Worker source adapter, cached snapshot and stale-state endpoint, using the contract here.
4. Implement accessible flight list and flight-first dossier. Never infer aircraft registration/hex from a schedule row.
5. Test real upstream, rate limits, codeshares, midnight, no-feed, and mobile UX before production.

**Decision:** SKY home aerodrome remains a personal view setting; BOARD is explicitly YOW and not tied to SKY catchment.
