# DOAA source acquisition and quota policy
Updated 2026-10-10. This is the governing data-source decision record; it does not authorize polling or a new subscription.

## Product data lanes
| Lane | Truth represented | Current candidates | Decision |
| --- | --- | --- | --- |
| SKY | Observed airborne position, altitude, track and freshness | ADSB.FI, ADSB.ONE, ADSB.LOL via relay | Continue free-source failover; do not claim complete traffic |
| BOARD published | Airport-published ARR/DEP schedule and status | Official YOW dynamic board; licensed schedules APIs | **Unresolved.** No candidate has demonstrated permitted automated reuse, both directions, freshness and zero incremental cost |
| BOARD observed | Aircraft detected near YOW and inferred airport association | ADS-B + bounded free callsign route lookup | Keep explicitly labelled observed/inferred; never present as published timetable |
| Inspector | Aircraft identity and route claims | Existing observations, remembered sourced claims, free route lookup, AirLabs | Memory-first; AirLabs enrichment default **off** |
| Weather | Current airport METAR | AviationWeather.gov | Cache independently; do not spend schedule quota |

## Verified source research
PR #42 contains a source-neutral, no-network schedule normalizer and tests, now merged. PR #45 contains deeper source research but remains a **draft**, not a production source approval. Official YOW renders a dynamic board but its underlying endpoint and reuse rights are unverified. FlightStats' anonymous HTML embeds partial YOW records but restrictions on extraction/reuse make it unsuitable. SkyLink trial is application-only and insufficient for a permanent free production feed. AirLabs has documented schedule endpoints, but the existing account's schedule entitlement, returned YOW coverage, reuse permission and marginal quota cost have not been verified. No schedule collector should be enabled on that basis.

## Quota architecture (mandatory before re-enabling metered acquisition)
**One shared budget authority.** Route every metered provider request through a single Worker-side admission mechanism backed by D1. Browser and Render relay must not be independent spend authorities. The current relay process-local budget is only an emergency stopgap and resets on restart.

**Atomic reservation before network I/O.** Reserve one request unit in a D1 transaction/conditional update, keyed by provider, account, UTC billing period and operation class. Deny on unknown entitlement, exhausted balance, open provider circuit, or missing configured class allocation. Count attempted units even if the upstream times out; reconcile only with reliable provider accounting. Prevent concurrent callers from overspending.

**Hard monthly ceiling and protected pools.** Let Q be a *verified* monthly allowance. Allocate at most 0.8Q to planned requests, reserve at least 0.2Q for variance/retries/essential operations. Divide the planned pool into BOARD published (priority), interactive Inspector (secondary), and diagnostic probes (small fixed cap); no automatic fleet sweeps. These are policy targets, not claims about AirLabs' actual allowance. Set Q=0 until verified. Provider-reported remaining=0 overrides any local counter until its verified reset.

**Forecast before cadence.** For two-direction polling with p pages per direction and interval h hours, estimate 30-day cost as 1440p/h requests; add retries, source lookups, existing calls and safety reserve. At p=1: every 5 minutes 17,280/month, hourly 1,440, every 2 hours 720, every 6 hours 240. A nominal 1,000/month allowance cannot fund a five-minute full BOARD. Reduce source demand structurally, not by concealing staleness.

**Demand shaping.** Coalesce concurrent requests across users; cache provider snapshots centrally with explicit observed_at, expires_at and last_success_at. Negative-cache missing identities. Use memory/observed evidence first. Only enrich a selected aircraft when a concrete unanswered question exists, and require a class-specific token. Never prefetch every visible aircraft. Schedule refresh should be decoupled from page views; polling must halt on 401/403/429/quota-exhausted and honour Retry-After. No automatic retries for hard quota failures.

**Evidence discipline.** Keep published schedule rows separate from observed ADS-B events. A provider failure is *unavailable*, not an empty flight list. Mark partial directions, pagination incompleteness, last success, staleness and provenance. No schedule-derived Encounters. Live display requires only short provider-permitted caching; schedule history is not a prerequisite and is disabled by default.

## Current incident
On 2026-10-10, production D1 showed AirLabs remaining=0, reset=2026-11-01T00:00:00Z. 1,133 of 1,152 recorded provider events were enrichment, exposing the absence of a shared admission budget. Keep all AirLabs enrichment disabled while the provider circuit is closed. Do not use a new API key, rotate identities or circumvent the quota.

## Next executable gates
1. Inspect existing account entitlement and per-operation charging **read-only**; do not expose the key or spend calls merely to discover allowance.
2. Establish a lawful, zero-cost published ARR/DEP feed with verified representative rows, timezone, codeshares, status, pagination, permissions and freshness; otherwise leave BOARD published unavailable and show observed movements separately.
3. Implement and test D1-backed atomic metered-request admission, class allocations, reset boundaries, concurrent callers and provider 429/quota responses before any new polling.
4. Perform one explicitly budgeted provider test only after source rights and entitlement are confirmed; then implement transient cache and a published BOARD adapter.
