# BOARD schedule-source investigation — 2026-10-10

## Findings

Official YOW pages: https://www.yow.ca/flights/departures and https://www.yow.ca/flights/arrivals .
The public HTML exposed to a text crawler shows a **Loading...** placeholder, filter, auto-refresh toggle and pagination. The visible page alone does **not** expose a machine-readable flight payload. This supports the hypothesis of browser-side data loading, but neither an endpoint nor reuse permission has been verified.

A separate public Airportia YOW page exposes actual flight-number/schedule/status rows in its HTML, confirming the *data shape* and a possible comparison reference, **not** authorization to republish its data. Third-party listings may contain codeshares, and are not a substitute for official gate/carousel information.

Verified commercial alternative: Cirium/FlightStats explicitly documents a JSON/XML FIDS endpoint for arrivals and departures, but identifies it as a premium **Contract-plan-only** API: https://developer.cirium.com/apis/flightstats-apis/fids . FlightAware AeroAPI also lists per-result-set charges for scheduled arrivals and departures: https://www.flightaware.com/commercial/aeroapi/ . Neither satisfies DOAA's zero-incremental-cost default. No credentials or paid service should be provisioned.\n\nNetwork inspection of YOW's JavaScript/XHR requests is blocked in the current execution environment (outbound DNS unavailable). Do not guess an endpoint, claim a live integration, or deploy scraping without validating permissions and reliability.

## Completed spike

`src/board-schedule.mjs` defines a source-neutral flight contract; `src/board-schedule.test.mjs` covers identity, timezone, duplicate, malformed and status cases. No production routing, polling, or D1 writes were changed.

## Next gate

1. Inspect YOW's browser Network tab (Fetch/XHR) on arrivals/departures; record actual endpoint, request parameters, response schema, cache policy, and any access controls.
2. Check YOW's reuse terms or seek permission if necessary. If unsuitable, assess a legitimately licensed free alternative; do not scrape Airportia or another provider by default.
3. Build a Worker source adapter, cached snapshot and stale-state endpoint, using the contract here.
4. Implement accessible flight list and flight-first dossier. Never infer aircraft registration/hex from a schedule row.
5. Test real upstream, rate limits, codeshares, midnight, no-feed, and mobile UX before production.

**Decision:** SKY home aerodrome remains a personal view setting; BOARD is explicitly YOW and not tied to SKY catchment.


## Concrete source candidate: SkyLink API (2026-10-10)

- Official API documentation: https://skylinkapi.com/docs/v3/schedules/
- Departures: `GET https://data.skylinkapi.com/v3/schedules/departures?icao=CYOW`
- Arrivals: `GET https://data.skylinkapi.com/v3/schedules/arrivals?icao=CYOW`
- Uses an `x-api-key` header. Flight-row field names are title-cased (e.g. `Time`, `Flight`, `Status`). Pagination is documented; do not assume one request retrieves all flights.
- Trial: https://skylinkapi.com/apply — 1,000 requests/month, application-only, noncommercial, subject to approval. The trial is **not** a permanent free production tier. Paid Basic starts at $19/month; overages exist. Do not subscribe without authorization.
- Capacity: two directions polled every 45 minutes would use about 1,920 requests per 30-day month **before pagination**. A 2-hour refresh uses ~720, also before pagination, but is not truly live. Build hard quota/circuit protections.
- Terms: https://skylinkapi.com/terms/ — display and reasonable caching allowed under a subscription; raw resale restricted; aviation safety disclaimer.
- Status: **documented source found, not live-tested; no API key provisioned**. Requires user-owned account approval/key, with key stored only in Cloudflare secret, never GitHub or client code.

Alternative: aviationstack free tier is 100 requests/month, noncommercial, and free tier excludes future flight schedules (https://aviationstack.com/pricing), so is not suitable for a continuously refreshed full BOARD.

Next: request trial access if user agrees, then test CYOW coverage, response schema, pagination, correctness against YOW official page, and source quality before switching production.
