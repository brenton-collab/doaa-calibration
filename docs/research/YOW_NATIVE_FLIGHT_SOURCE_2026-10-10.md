# DOAA: native YOW flight-data investigation

**Finding: No source was verified to meet all of the mission's hard constraints.**  
**Technical result: Partial success.** An anonymous FlightStats response contained structured YOW arrival records. Its independent extraction/reuse restrictions and incomplete operational fields prevent recommending it as DOAA's live application feed; retention restrictions separately rule out durable history.

Research date: **2026-10-10 (UTC)**. Direct requests were made from the research container; ordinary browser inspection was used for YOW. No production endpoints, credentials, databases or service configurations were changed. No accounts, trials, billing, applications or provider correspondence were initiated.

## 0. Scope correction: live BOARD does not require historical schedule retention

**Product decision (10-Oct-2026):** The minimum acceptable native BOARD is a *current, transient* published-arrivals/departures display. Permanent retention of third-party schedule records, operational-status deltas, and historical schedule claims is **not** a prerequisite. DOAA's own independently observed ADS-B/aircraft history remains separate and retained under its own source permissions.

Reassess every candidate against two distinct gates:

1. **Live-display gate (required):** legitimate automated retrieval, transformation and native display; enough YOW ARR/DEP coverage, timestamps, status/freshness and sustainable no-cost request budget. Keep only ephemeral request processing and the shortest cache allowed by the source. No new schedule D1 writes, snapshots, history or inferred Encounters.
2. **Historical-claims gate (optional, deferred):** explicit permission to retain normalized schedule/status records, link them with other sources, and preserve changes. This may remain unavailable without blocking live BOARD.

**Revised assessment:** Removing the history requirement does *not* rescue FlightStats: the report documents independent restrictions on automated extraction, copying and combining provider data, and its tested arrival rows lacked status/estimated/actual fields. Official YOW remains an unresolved lead because the feed is unidentified, server retrieval returned 403/1010 and permitted reuse was not established. AirLabs schedules remain a **conditional existing-account investigation**, not a proven free operational board: validate the already configured account's entitlement, quota, source rights and actual YOW schedule payload without exposing secrets or adding spend. None of these sources is approved for polling or deployment by this scope change alone.

**Implementation adjustment:** A source-neutral BOARD schedule response should be renderable from transient in-memory records, with nullable fields, per-direction coverage, source timestamp and explicit stale/error states. Historical persistence must be opt-in per provider and disabled by default. The report's D1 collector/event-history design below is an **optional future architecture**, not the recommended minimum implementation.

## 1. Executive decision

DOAA should **not enable a new published-schedule collector from the sources investigated here**.

The official YOW board displays the right information and refreshes its UI every five minutes. However, an ordinary server-side request received Cloudflare error 1010, no current upstream API/provider was established, and YOW's published terms do not grant the reuse required by a native BOARD. An old FlightView association is not evidence of the current supplier.

FlightStats was the strongest **tested technical lead**: HTTP 200 without credentials, JSON inside its HTML, real YOW airport identity, scheduled flight rows and a codeshare relationship. The retrieved list did not contain operational status or estimated/actual time fields. Its terms restrict copying, combining data and storage beyond three days. The copying/extraction restrictions remain relevant even when no schedule history is retained.

AirLabs is the strongest **documented API-shaped alternative**, but not a newly verified solution. The free documented fields and request budget do not establish a complete, fresh operational board; the schedule horizon is short, credentials are required, and this investigation obtained no authenticated YOW schedule response. The existing AirLabs integration uses airborne flights, which is a different dataset.

This is an unsuccessful investigation under the full-success definition, with a reproducible technical finding and specific rejection reasons. It does **not** prove that no suitable source could ever exist. It does establish that none of these candidates should be presented as the requested solution.

## 2. What DOAA already does

Repository inspected: [brenton-collab/doaa-calibration](https://github.com/brenton-collab/doaa-calibration), main snapshot reported by the tree API as `fbea7783fa1358baffc9497a5d32ea2a4438829a`.

Read: `DOAA_SPEC.md`, `FIELD_NOTES_DECISIONS_2026-10-08.md`, `DEV_LOG.md`, `src/worker.js`, `relay.js`, `board-core.cjs`, `wrangler.jsonc`, and relevant GitHub workflow files. **`docs/DOAA_ACCEPTANCE_GATES.md` was absent** from the inspected main tree and returned 404. No acceptance criteria were invented from that missing file.

The current system has a Render relay, Cloudflare Worker, D1 memory and a five-minute scheduled collector. The relay's BOARD path requests AirLabs `flights` separately for departure and arrival airport, filters for airborne records, deduplicates, and classifies ARR/DEP. The Worker retains a quota circuit and falls back to observed/inferred airport movement evidence with `coverage: "observed"`, `movement_verified: false`, and a provider-error reason.

The spec's existing BOARD definition excludes merely scheduled, cancelled and completed flights. **This mission extends the desired scope to published airport schedules.** Engineering should add that explicit coverage mode and preserve the existing observed/airborne semantics while doing so.

The repository's governing principles fit this investigation:

- Flight identity is separate from physical Airframe identity.
- External resolution, remembered facts, inference and genuine observations retain distinct provenance.
- External schedules/history must never create or extend DOAA Encounters.
- Viewing-only sources are research leads, not automated application feeds.
- Provider failure, partial coverage and stale data must not appear as zero traffic.
- Existing provider and D1 quota pressure must be considered before adding work.

Repository file blob identifiers for reproducibility:

| File | Blob SHA |
| --- | --- |
| DOAA_SPEC.md | 9fae703fd965d86c64d9278ec9b309c3f065f945 |
| FIELD_NOTES_DECISIONS_2026-10-08.md | f0e2ef6207a87cf1c3cba1f08ae627ab6028ac11 |
| DEV_LOG.md | fe82e4ed020e792427859a72796800cc186101f3 |
| src/worker.js | 44638690827904c9c47be6a55e411c3b17844ede |
| relay.js | c8f89531ac15158256653d389a3c29c4c8db4790 |
| board-core.cjs | ff8dc56fd21c73136016ff903b24228661000506 |
| wrangler.jsonc | f93c302984cbb198ec5e1e9a940dbd0e5aa0d00e |

## 3. Official YOW: the first hypothesis

Pages inspected:

- [Official arrivals](https://www.yow.ca/flights/arrivals)
- [Official departures](https://www.yow.ca/flights/departures)

### Browser evidence

The ordinary arrivals browser page rendered flights. At approximately **16:15 UTC / 12:15 Ottawa time** it included a cancelled Air Canada arrival, early and delayed Porter arrivals, origin airports, original and updated clock times, and baggage-carousel information. The DOM offered yesterday, today and tomorrow dates. Tomorrow's actual records were not separately validated.

The arrivals component configuration was observed in the DOM:

```text
flights({
  view: 'arrivals',
  partial: false,
  refresh: true,
  interval: 300000,
  limit: 35,
  i18n: { flightsUpdated: 'Flight information updated' }
})
```

The page referenced this bundle:

```text
https://www.yow.ca/dist/scripts.min.js?ver=400e2ce6dacad5c5342d5ce6e12a470bd734667d
```

This proves a dynamic board and a five-minute **client refresh setting**. It does not establish five-minute upstream data freshness, a complete 35-row airport dataset, or the underlying request URL.

The browser interface exposed DOM inspection but no usable network-request inspection. Navigation to the bundle failed with `ERR_BLOCKED_BY_CLIENT`; other legitimate retrieval attempts did not yield its contents. That client error is a tooling limitation, not proof of YOW's bot policy.

### Direct HTTP evidence

An ordinary Python urllib GET to the arrivals page, without credentials, cookies or a disguised browser identity, was blocked:

```json
{
  "url": "https://www.yow.ca/flights/arrivals",
  "method": "GET",
  "tested_at_utc": "2026-10-10T16:16:11Z",
  "status": 403,
  "content_type": "text/plain; charset=UTF-8",
  "server": "cloudflare",
  "cf_ray": "a486ed9898e2f591-SJC",
  "response_bytes": 17,
  "body": "error code: 1010\n"
}
```

The response included no-store/no-cache directives. A bot-management cookie was excluded from retained evidence. No fingerprint changes, CAPTCHA solving, alternate proxy or authentication bypass was attempted.

**Worker-origin fetch remains untested.** A container 403 cannot establish that all Cloudflare Workers are blocked. Conversely, successful browser viewing cannot establish that a Worker can fetch an authorized API reliably.

### Permission decision

Although its URL is under parking, [YOW's Terms of Use](https://www.yow.ca/parking-transportation/parking/terms-of-use) expressly define their scope as yow.ca and redirecting domains. The Ownership section requires written permission for reuse and redistribution outside the agreement's permissions; the Software section restricts extraction/reverse engineering. No open flight-data licence or retention permission was found. The privacy policy supplies no substitute data licence.

**Result:** right visible information, but no verified reusable structured endpoint. **Current supplier and underlying API remain unknown.** It would be inaccurate to name FlightView/OAG as YOW's current provider from historical references.

## 4. Best tested technical candidate: FlightStats by Cirium

### Exact working request

The request actually executed was:

```http
GET /v2/flight-tracker/arrivals/YOW HTTP/1.1
Host: www.flightstats.com
```

Full URL: [https://www.flightstats.com/v2/flight-tracker/arrivals/YOW](https://www.flightstats.com/v2/flight-tracker/arrivals/YOW)

Client: Python standard-library urllib, default user-agent; no Authorization, API key, account, cookie or registration. Request start **2026-10-10T16:20:54.565748Z**; response Date header **16:20:58 GMT**.

```json
{
  "method": "GET",
  "status": 200,
  "content_type": "text/html; charset=utf-8",
  "response_bytes": 107356,
  "etag": "W/\"1a35c-7VyK6LtgAM0cps48NU4Om9zTPnk\"",
  "sha256": "c1cbe98f9fe50ac8c9573337c6909995623a572e1ef3b80f5ac61f194c50cfc6"
}
```

This is an **HTML page with embedded JSON**, not a discovered public JSON API.

### Observed response structure and coverage

The embedded assignment was `__NEXT_DATA__ = {...}`. Its relevant path was:

```text
__NEXT_DATA__.props.initialState.flightTracker.route
```

| Actual field/path | Observed meaning or limitation |
| --- | --- |
| route.header.date | Date of the airport search |
| route.header.arrivalAirport.iata / icao | YOW / CYOW in the retrieved response |
| route.header.arrivalAirport.timeZoneRegionName | America/Toronto |
| route.flights[] | 28 rows in the retrieved default window; includes marketing aliases |
| flights[].sortTime | ISO timestamp with Z; used for list sorting |
| flights[].departureTime.time24 / timeAMPM | Departure clock string; not a complete timezone-aware instant |
| flights[].arrivalTime.time24 / timeAMPM | Arrival clock string |
| flights[].carrier.fs / name / flightNumber | Carrier and marketed flight identity |
| flights[].airport.fs / city | Opposite airport |
| flights[].operatedBy | Operating-flight description, sometimes null |
| flights[].isCodeshare | Present and true on a codeshare row |
| flights[].url | Detail link with date parameters and provider flightId |

A limited factual observation from the retrieved records: **Porter PD296 from St. John's (YYT) appeared alongside Air Transat TS7116, marked as operated by Porter 296; both detail links carried the same provider flightId.** This establishes a real sourced codeshare relationship rather than a guessed flight-number match.

The response's date was 10-Oct-2026. Row sort timestamps spanned **11:35–15:35 UTC**, corresponding to **07:35–11:35 at YOW**. All were earlier than retrieval time. This does not demonstrate tomorrow coverage or a complete daily schedule. No field semantics were inferred from undocumented sorting behavior.

The list rows contained **no operational-status, estimated-time, actual-time, gate, aircraft-type or registration fields**. Those might exist on other products/pages, but were not verified here.

The departures page was also retrieved through the web-reading service: [YOW departures](https://www.flightstats.com/v2/flight-tracker/departures/YOW). That rendition showed a **09-Oct-2026** departure table and pagination. It is evidence of departure-page coverage, **not** a current raw departures feed test. No matched pair of live ARR/DEP JSON payloads or controlled second time window was completed after the restrictive terms were identified.

### Offline reproduction of the extraction

The following reproduces the parser used on the already-retrieved HTML. It makes **no network request** and prints structural evidence rather than a reusable schedule:

```python
import json
import re
from pathlib import Path

html = Path("flightstats-arrivals-test.html").read_text()
match = re.search(r"__NEXT_DATA__\s*=\s*", html)
if match is None:
    raise ValueError("Embedded state assignment absent")

state, _ = json.JSONDecoder().raw_decode(html[match.end():])
route = state["props"]["initialState"]["flightTracker"]["route"]
rows = route["flights"]
print({
    "airport": route["header"]["arrivalAirport"]["iata"],
    "date": route["header"]["date"],
    "row_count": len(rows),
    "fields": sorted({key for row in rows for key in row}),
})
```

The exact GET and response metadata above document the live test. **Do not turn that request into a polling scraper.** The temporary full HTML and extracted raw records were not included in the durable handoff; only limited factual findings, schema and test metadata are retained.

### Why this is rejected

[Current free-service terms](https://www.flightstats.com/company/legal/terms-of-use), Restrictions on Use 2.2–2.5 and 2.9, restrict copying/transferring data, caching beyond three days, combining real-time flight-provider data without written permission, and reverse engineering. FlightStats also publishes an [explicit scraping prohibition](https://static.flightstats.com/termsofuseviolation.html).

**Classification: technically working anonymous structured arrival source; unsuitable licence and retention rules; incomplete operational fields and live departure/future coverage verification.** A conditional GET or personal-use label does not remove these restrictions. No Worker-origin test or production adapter is recommended.

## 5. Alternatives ranked by usefulness

Rank reflects usefulness to this mission, not popularity. “Documented” is deliberately different from “live YOW payload verified.”

| Rank | Candidate | Actual test or evidence | Decision |
| --- | --- | --- | --- |
| 1 | Official YOW | Browser arrivals rendered; component configuration captured; server GET 403/1010 | Best potential authority, but endpoint/provider and permitted reuse unresolved |
| 2 | FlightStats | Anonymous live arrival HTML/JSON HTTP 200; real YOW identities and codeshare link | Reject: copying/history restrictions; list lacks operational fields |
| 3 | AirLabs schedules | Official API/field/pagination docs; unauthenticated ARR and DEP requests both 403/1010 | Limited potential supplement; no newly verified operational board on free plan |
| 4 | FlightAware / AeroAPI | Current primary website terms and API pricing | Website automation prohibited; metered API credit is not a no-billing plan |
| 5 | Airportia / Aviation Edge supply | Public YOW ARR/DEP tables; supplier named; current terms inspected | Explicit viewing-only/no-scraping terms; supplier relationship is not reuse permission |
| 6 | FlightView / OAG FVXML | Current OAG website terms and official FVXML FIDS documentation | Public pages prohibit automation without consent; customer feed is not an anonymous free licence |
| 7 | Flightradar24 airport data | Open-source SDK endpoint documentation; current primary terms | Public-site automation prohibited; SDK code licence does not license provider data |
| 8 | Canadian North timetable | Official current schedule page; direct HTTP attempt blocked | Single-carrier frequency layer only; no tested timetable payload, live updates or reuse licence |
| 9 | Porter / Air Canada flight-status and travel pages | Primary terms and service descriptions | Automated copying/extraction restricted; carrier-specific coverage cannot establish a complete airport board |
| 10 | SkyLinkAPI | Both documented YOW direction endpoints tested; 401 missing_api_key | Key required; free application/trial path conflicts with mission; no YOW flight payload |
| 11 | Non-official Ottawa-airport.com | Visible flight-status tables and windows | Unknown downstream rights/provider; page is not a tested reusable API |
| 12 | Statistics Canada airport movements | Official open-data catalog | Legitimately open aggregate statistics, not individual schedules/status |
| 13 | FlightNerve / Spoke / old scraper projects | Route catalog, announcement product and historical scraper code | Do not supply a verified reusable published YOW flight board |

### AirLabs: distinguish the API from current DOAA use

Documented GETs:

```text
https://airlabs.co/api/v9/schedules?arr_iata=YOW&api_key=YOUR_KEY
https://airlabs.co/api/v9/schedules?dep_iata=YOW&api_key=YOUR_KEY
```

[Schedules documentation](https://airlabs.co/docs/schedules) describes up to ten hours of future coverage, free-key limit 50 rows, and offset pagination through `request.has_more`. It explicitly marks `airline_iata`, `flight_iata`, `flight_number`, `dep_iata`, `dep_time`, `arr_iata` and `arr_time` as free-plan fields. The same page lists status, codeshare, estimated/actual and gate fields, but this investigation did not verify their free-plan entitlement or real YOW availability.

[Primary marketing material](https://airlabs.co/OAG-Airline-Schedules-Database-API) advertises 1,000 free monthly queries. Treat that as a documented allowance, not the verified remaining quota of DOAA's existing account. Airport pagination could require several queries per refresh; `_fields` reduces bytes rather than proving fewer quota units.

Both no-key test requests returned Cloudflare error 1010 before an API credential error could be observed. No existing secret was extracted, and no account was created. The API response envelope, live YOW rows, free status fields and historical-retention permission were therefore **not tested successfully**. [Published terms](https://airlabs.co/terms-of-service) contain broad website automation language while the API docs explicitly describe programmatic access; that tension is not proof of either an unrestricted API licence or a blanket API ban.

**Recommendation:** leave the existing integration's behaviour unchanged in this research task. Do not promote the documented schedule endpoint to full airport coverage without verified entitlement, pagination and permission.


### Existing integration audit (10-Oct-2026)

Read-only inspection confirms Render `doaa-adsb-relay` is on the free plan and auto-deploys `main`; no PR preview. The relay already has `AIRLABS_API_KEY` support for `flights`, `flight` and `fleets`, but not `schedules`. Existing BOARD makes up to two provider calls per uncached refresh and caches for two minutes. Flight/airframe requests share quota. D1 provider telemetry and a monthly-limit circuit breaker exist, but no schedule-specific budget is reserved. Service metadata does not establish the secret's value or the AirLabs account's entitlement.

At an illustrative 1,000 calls/month, a single two-direction schedule refresh every two hours costs roughly 720 calls/month before pagination or existing usage; a five-minute refresh would cost roughly 17,280. These are estimates, not measured usage. Next gate: read existing provider usage/entitlement without revealing secrets, then consider at most one budgeted arrivals and departures schedule test. No automatic polling, storage or production change until tested.

### Other decisive primary sources

- **FlightAware:** [website terms](https://www.flightaware.com/about/terms-of-use), Limited License item 7, restrict automated website access to its APIs/data feeds. [Current AeroAPI pricing](https://www.flightaware.com/commercial/aeroapi/) offers a metered Personal plan with up to $5 monthly credit, not an unlimited no-billing feed. Its published [Personal licence](https://www.flightaware.com/commercial/aeroapi/AeroAPI_Personal_License.pdf) also has storage/combination restrictions. No paid or credit-backed account was activated.
- **Airportia:** [About and Terms](https://www.airportia.com/about/), updated 18-Jun-2025, permit private viewing but prohibit scraping/automation/redistribution. Its [YOW arrivals](https://www.airportia.com/canada/ottawa-macdonald-cartier-international-airport/arrivals/) and [departures](https://www.airportia.com/canada/ottawa-macdonald-cartier-international-airport/departures/) identify Aviation Edge as a supplier. Search/web-reader flight tables had differing crawl dates, so they were not accepted as fresh operational samples.
- **FlightView/OAG:** [current terms](https://www.oag.com/terms-of-use-for-websites-and-services), sections 7.1 and 7.3, restrict automated access and reformatting. [FVXML query documentation](https://knowledge.oag.com/docs/4-query-format-1) and [sample responses](https://knowledge.oag.com/docs/appendix-a-sample-query-response) describe a FIDS product; they do not expose an authorized anonymous YOW feed.
- **Flightradar24:** [terms](https://www.flightradar24.com/terms-of-service), section 2.3, limit public-site use to human browser/app access except its official API. SDKs such as [pyflightdata](https://github.com/supercoderz/pyflightdata) document `https://api.flightradar24.com/common/v1/airport.json` with airport code parameters. This backend was **not queried** after the automation restriction was identified.
- **Canadian North:** [flight schedule page](https://canadiannorth.com/plan_your_trip/flight-schedule/) showed an effective period starting 04-Oct-2026 and warned that frequency guidance requires reconfirmation. A direct ordinary GET at 16:25:39 UTC returned 403/1010. No underlying timetable was recovered. Even a permissible weekly table would cover only that carrier and lack live operational updates.
- **Porter:** [terms](https://www.flyporter.com/en-ca/terms-of-use) prohibit automated agents copying/monitoring content. Its [flight status](https://www.flyporter.com/en/manage-flights/flight_status) is carrier-specific.
- **Air Canada:** [terms](https://www.aircanada.com/ca/en/aco/home/legal/terms-of-use.html) restrict automated extraction, aggregation and storage. [NDC access](https://www.aircanada.com/ca/en/aco/home/ndc.html) is an access/registration channel, not a public airport schedule.
- **SkyLinkAPI:** [v2 schedules docs](https://skylinkapi.com/docs/v2/schedules/) require an API key and describe a roughly 12-hour legacy window without date controls/pagination. The advertised free route is an application/trial. Documentation examples were not treated as retrieved flights.
- **Open government data:** [Statistics Canada monthly airport movements](https://open.canada.ca/data/en/dataset/681457aa-e0f0-4ca5-9cb4-554dab0f0786) are airport-level counts. Their open licence cannot turn aggregate counts into individual published flights.
- **Historical project lead:** [deoliang/YOWAirportScrape](https://github.com/deoliang/YOWAirportScrape) used Puppeteer on an old `/en/flights/departures` page to extract destination cities. It documents neither today's upstream provider nor a reusable operational feed.
- **Announcement/route leads:** [Spoke](https://www.thespokeapp.com/) advertises airport announcements, with [Metcove terms](https://metcove.com/terms.html); [FlightNerve YOW](https://flightnerve.com/airports/YOW) is a route catalog. Neither establishes the required day-specific schedules and permitted native reuse.

These candidates were stopped at their decisive access, permission or product mismatch. Testing a prohibited scraper more thoroughly would not improve its suitability.

## 6. Test ledger and actual response samples

Timestamps below are request-start times unless otherwise stated. They are observations of this environment, not guaranteed responses from every origin.

| Test | Timestamp UTC | Method / exact URL | Outcome |
| --- | --- | --- | --- |
| YOW browser arrivals | approximately 16:15, 10-Oct-2026 | ordinary browser, https://www.yow.ca/flights/arrivals | Rendered current board; DOM configuration observed |
| YOW direct arrivals | 2026-10-10T16:16:11Z | GET https://www.yow.ca/flights/arrivals | 403; 17-byte 1010 body |
| FlightStats direct arrivals | 2026-10-10T16:20:54.565748Z | GET https://www.flightstats.com/v2/flight-tracker/arrivals/YOW | 200; 107,356-byte HTML with embedded JSON |
| FlightStats departures | retrieved during 10-Oct investigation | web-reader GET https://www.flightstats.com/v2/flight-tracker/departures/YOW | Rendered 09-Oct table; not a current raw JSON test |
| Canadian North schedule | 2026-10-10T16:25:39Z | GET https://canadiannorth.com/plan_your_trip/flight-schedule/ | 403; 1010 body |
| AirLabs arrivals, no key | 2026-10-10T16:26:27.464126Z | GET https://airlabs.co/api/v9/schedules?arr_iata=YOW | 403; 1010 body |
| AirLabs departures, no key | 2026-10-10T16:26:27.465532Z | GET https://airlabs.co/api/v9/schedules?dep_iata=YOW | 403; 1010 body |
| SkyLink arrivals, no key | 2026-10-10T16:26:27.466105Z | GET https://data.skylinkapi.com/v2/schedules/arrivals?iata=YOW | 401; missing_api_key |
| SkyLink departures, no key | 2026-10-10T16:26:27.466811Z | GET https://data.skylinkapi.com/v2/schedules/departures?iata=YOW | 401; missing_api_key |

Actual SkyLink response, same body for both directions, **59 bytes**:

```json
{"code":"missing_api_key","message":"API key is required"}
```

Content-Type was `text/plain; charset=utf-8` despite the JSON-shaped body. A trailing newline was present. No request header `x-api-key` was supplied.

Actual AirLabs response, both directions, **17 bytes**:

```text
error code: 1010
```

Arrival CF-Ray: `a486fcb3eb42f591-SJC`; departure CF-Ray: `a486fcb3cb08f591-SJC`. Response Date headers were **Sat, 10 Oct 2026 16:26:30 GMT**.

A minimal reproducible **credential-negative API test**, matching the allowed test rather than impersonating a client, is:

```bash
curl --include --max-time 20 \
  'https://data.skylinkapi.com/v2/schedules/arrivals?iata=YOW'
curl --include --max-time 20 \
  'https://data.skylinkapi.com/v2/schedules/departures?iata=YOW'
```

The observed outcomes may change; these are not tests of authenticated coverage. No continued probing of blocked YOW/AirLabs requests is recommended.

**Evidence boundary:** no full copyrighted board/page, raw provider dataset, cookie, key, private observation-domain coordinates or claimed aircraft assignment is included. The live response's hash supports identifying the particular test artifact; it is not an independently downloadable data source. Restricted temporary FlightStats payloads were removed after analysis rather than committed as an indefinite historical dataset.

## 7. Integration design for a source that actually clears the gate

This is a ready engineering design, **not approval to wire any rejected source**. All newly investigated providers should remain disabled for collection. No new infrastructure is required for the first implementation step.

### Source contract before retrieval

Each adapter must declare:

```text
source_id
permission_state: allowed | restricted | unknown
terms_url, terms_checked_at
rights: automated_fetch, native_display, normalized_retention, raw_retention
capabilities: schedules, statuses, codeshares, gates, aircraft, registration
coverage: airport + carriers + directions + date/window + pagination rules
refresh limits and explicit quota units
```

Unknown rights must not be interpreted as permission. Separate rights for normalized event history from raw-response storage; changing format or storing only a delta does not automatically avoid source restrictions.

A snapshot should carry `collected_at`, source effective time if actually supplied, per-direction success/failure, queried window, pagination completion, source/permission state and a content hash. “Complete” must be supported by source coverage and completed pagination, not simply a non-empty response.

### Collection and cache

Use the existing scheduled Worker as the single collector. Collect a permitted bulk airport snapshot centrally, then serve user requests from an indexed D1 current-snapshot record and short-lived edge cache. Browser refreshes must not each trigger upstream ARR/DEP calls.

Use `If-None-Match` or `If-Modified-Since` only when validators are actually supplied and supported. A 304 confirms unchanged representation; it does not supply a missing flight, establish upstream freshness or necessarily save a provider quota unit.

The [Workers Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) is local to the originating data center. It cannot be the global quota lock or sole persistent snapshot. An isolate-local promise also cannot coordinate collectors globally. A scheduled owner plus a bounded indexed D1 lease/state row is sufficient to prevent retries or manual refresh paths from causing duplicate acquisition.

For a permitted source, begin with a measured five-minute current-day operational cadence. Use a slower schedule-only cadence for future days **only if the source exposes a suitable future horizon and separable schedule/status requests**. Repeatedly requesting a short rolling ten-hour window is not equivalent to acquiring tomorrow's published schedule.

### Identity and normalization

Assign a DOAA operation ID, retain the provider's opaque ID as a sourced identifier, and attach marketing aliases to the operation. Cross-provider matching must use operating carrier/number, origin, destination, operating/service date, scheduled local date and time, and known codeshare evidence. Preserve uncertainty if operating identity is absent.

Do not key an operation by flight number alone, registration, estimated time or current status. A changed estimate must append an event to the same operation. A schedule correction may require reconciliation against the previous snapshot; it must not silently create another flight.

Use UTC instants for comparisons and `America/Toronto` for the YOW service-date view. Origin departure times require the origin's timezone and date. Avoid reconstructing an international departure instant from a bare clock string and YOW's timezone. Treat off-block, takeoff, landing and on-block times separately when the provider distinguishes them; otherwise retain an unknown event meaning.

| Field or relationship | Authoritative layer |
| --- | --- |
| Published operating/marketing flight and scheduled times | Permitted schedule publisher |
| Estimate, cancellation, gate, operational status | Permitted operational source, with its raw status and timestamp |
| Type or planned tail assignment | Explicit sourced assignment only; null if absent |
| Actual aircraft hex/registration and position | DOAA's licensed observation/airframe evidence |
| Schedule-to-observed-aircraft link | Explicit provider identity or a qualified match with supporting evidence |
| Change history | Timestamped retained source claims, only where permitted |
| Encounter | Genuine DOAA observation in the configured observation domain |

Keep raw provider status alongside a normalized enum. Do not turn “active” into verified airborne unless the source's semantics justify it. ADS-B evidence can establish an observed aircraft state without rewriting a published schedule status.

### History and failure behavior

Persist only changed normalized claims and the current projection. Store `collected_at` separately from a provider update timestamp. An event proves “DOAA received this claim at this time,” not necessarily “the operational event happened at this time.”

A removed row is not evidence of cancellation. It can mean pagination, window expiry, transient omission or provider failure. Retain the last known record and mark the snapshot's coverage/freshness.

On timeout, 403, 401, schema drift or 429: record the provider outcome, respect Retry-After, back off, keep the last successful permitted snapshot within its retention allowance, and expose staleness/partial coverage. Do not return a fresh-looking empty board. Stop collection on an access-control block rather than cycling clients/proxies.

### Native response contract

Use a distinct versioned route or an explicit mode parameter when Sage implements published coverage. Return:

```text
airport, mode, collected_at, last_success_at
coverage: complete | partial | observed | unknown
coverage_window, pagination_complete, failed_directions
stale, source_error, source_ids
flights[] with operation ID, aliases, nullable sourced fields and provenance
```

Keep schedule records and observed movement enrichment visibly qualified. A partial airline timetable plus partial statuses does not establish complete YOW coverage. Retained changes belong to the claim/history graph; they must not write Encounter or observation rows.

## 8. Operational feasibility and zero-cost budget

### Upstream request math

Assumptions: two direction requests per refresh; one page per direction; 30-day month. Extra pages, retries, detail requests and existing provider use are additional.

| Current-board cadence | ARR + DEP calls/day | Calls/30 days |
| --- | ---: | ---: |
| Every 5 minutes, 24 hours | 576 | 17,280 |
| Every 15 minutes, 24 hours | 192 | 5,760 |
| Every hour, 24 hours | 48 | 1,440 |
| Every 2 hours, 24 hours | 24 | 720 |
| Every 6 hours, 24 hours | 8 | 240 |

A 1,000-query monthly allowance is too small for a continuous fresh two-direction board. An infrequent schedule supplement may fit, but a two-hour cadence loses operational freshness and cannot rescue missing free-plan fields. With any 50-row page cap, the calculations are lower bounds.

For illustration, a future full-day schedule fetched every six hours plus a separate status pair every 15 minutes during two hours of daily app use would use 240 + 480 = **720 monthly calls**, before pagination/retries/other uses. That architecture needs separable endpoints, adequate schedule horizon and licensed fields; **it was not established for AirLabs**. Server caching reduces duplicated user traffic, not the calls needed to observe changes.

### Cloudflare

[Current Workers limits](https://developers.cloudflare.com/workers/platform/limits/) list 100,000 daily requests, 10 ms CPU for Free, 50 subrequests per invocation and five cron triggers per account. A 288-invocation/day collector with two small requests is modest at the Worker level. Actual parsing CPU still needs measurement; a large HTML scraper is not assumed to fit.

[Current D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) lists 5 million rows read/day, 100,000 rows written/day and 5 GB aggregate storage on Free. Index maintenance adds writes. These are account budgets shared with existing DOAA work, not unused allowances.

An illustrative 200-row combined snapshot written every five minutes would create **57,600 base row writes/day** before indexes or history. Do not do that. Hash/diff first, persist changed claims only, use point/indexed reads and track D1 `rows_read`/`rows_written`. Existing observations, hydration and leads already compete for that budget.

Keep acquisition attempts, last-success metadata and source counters bounded. Do not log a full response on every unchanged poll. Apply a documented retention rule to licensed raw data and to normalized history separately. No new R2, KV, paid plan or service provisioning is part of this recommendation.

**Infrastructure is not the main blocker.** A small authorized JSON feed could fit the existing free architecture. None was verified here with the needed rights, coverage and cadence.

## 9. Smallest next engineering action for Sage

Create a **local, provider-independent BOARD snapshot contract and coverage presenter** in the existing `board-core.cjs` / Worker boundary. Do not add a network collector yet.

Implement the envelope from section 7 and map the current BOARD responses into their existing `airborne` or `observed` mode. Reserve `published` mode but keep it unavailable with a concrete source-gate reason. Carry collection time, coverage, failed direction and source error through to the UI.

Four deterministic tests can use empty structural fixtures, without inventing flights:

1. A successful, complete, fresh empty source window can say no flights in that window.
2. A failed/unconfigured published source returns unavailable/unknown coverage, not zero flights.
3. One failed direction produces partial coverage even if the successful direction is empty.
4. External board ingestion never invokes Encounter/observation creation.

Then add the source policy registry with all newly investigated candidates disabled. No credentials, outbound scraping, migrations or deployment are required for this step. It improves the current failure boundary and prepares the adapter seam without claiming that the data-source problem has been solved.

**Do not spend the next engineering tranche implementing a FlightStats/YOW/FR24 scraper or upgrading billing.** The remaining missing dependency is an independently verified permissioned published YOW feed. Under this mission's ban on provider correspondence, permission cannot be manufactured as an implementation task.

## 10. Investigation limits and stopping rule

The official YOW upstream endpoint/provider was not discovered. Browser network tooling and ordinary script retrieval did not expose it, and the site's reuse terms supplied an independent blocker.

Only FlightStats arrivals received a successful direct live structured-flight retrieval. Its live departures, future records, repeated freshness, operational detail pages and Worker-origin access were not verified. Tests of advertised API endpoints without keys establish access outcomes, not the quality of their authenticated data.

No controlled multi-date or multi-refresh dataset was built after a candidate's terms ruled out collection/history. Conditional-response behavior was not tested even where an ETag existed. No provider's update SLA was inferred from UI refresh intervals or webpage crawl dates.

Research stopped once the strongest official, aggregator, API, airline-timetable and open-data paths had decisive permission, budget or product-fit failures. Additional superficial provider searches would not justify relaxing the hard constraints.

The deliverable is a tested negative result, a precise technical partial success, and an implementation-ready contract. **No production data-source change is recommended.**
