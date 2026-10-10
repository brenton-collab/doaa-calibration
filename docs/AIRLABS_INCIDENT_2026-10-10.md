# AirLabs incident and recovery gate — 2026-10-10

## Verified production state

Read-only Cloudflare D1 query of `doaa-memory` (`provider_state` and `provider_requests`) at 2026-10-10 showed `provider_remaining=0`, `reset_at=2026-11-01T00:00:00Z`, and `authority=provider`. The provider circuit must remain closed to new requests until reset; no test requests were issued.

Recorded events: `fleets` 574, `flight` 559, `flights` 19; 1,152 event rows, of which 1,147 were dated October 9. `provider_state.local_calls` showed 1,151. This one-call discrepancy requires reconciliation; these are local records, **not independently confirmed provider billing**. Enrichment caused 1,133 of 1,152 recorded calls (~98.4%). Most fleet lookups occurred in the first 23 minutes of October 9.

## Root cause: established vs unresolved

**Established in source:** `flight-enrichment.js` invokes `reconciled(a)`, which calls `resolve(a)` and `resolveAirframe(a,f)`; those call the Render relay `/flight` and `/airframe`. The relay calls AirLabs `flight`/`flights` and `fleets`. A 20-minute flight cache and an airframe cache exist, but there was **no hard per-day enrichment budget** or BOARD reservation. Calls from multiple clients and relay restarts are not coordinated. The `summary(a)` path also invokes reconciliation. Therefore large-scale enrichment is mechanically possible. The exact user event(s) or clients responsible for the October 9 burst are **not verified**; avoid attributing them without request logs.

**Existing protection:** Worker checks D1 `provider_remaining=0` and blocks its AirLabs-dependent BOARD/flight paths; relay separately trips on AirLabs `month_limit_exceeded`. A browser can directly call the relay for enrichment, so Worker-only protection is insufficient.

## Containment patch on this branch

`airlabs-budget.cjs` adds a conservative process-local throttle at the relay's **single AirLabs request function**, covering all current `flights`, `flight`, and `fleets` calls. Enrichment is **disabled by default** pending verified quota; opt-in requires `AIRLABS_ENRICHMENT_DAILY_CAP` to be set explicitly. The local monthly cap defaults to 900 and reserves 200 for BOARD; limits are defensive, not a representation of actual remaining provider quota. The provider's own month-limit circuit remains in place.

**Important limitation:** the budget is process-local and resets on restart; it does not prevent exceeding a provider monthly allowance across many restarts or instances. It is an immediate guard, not a production-grade distributed budget. The Render service currently reports one free-plan instance, but restart-safe shared metering and an independently verified provider quota are required before re-enabling enrichment. With zero-default enrichment, the most costly path is contained after deployment, but the existing published BOARD is still not restored by this change.

`airlabs-budget.test.cjs` supplies Node built-in test-runner cases for default-deny, reserve, daily and monthly UTC rollover. The four budget unit tests were subsequently executed against a byte-for-byte reconstruction of the committed module and test file in a local Node 22 environment: **4 passed, 0 failed**. The full relay, Worker and browser were not executed. No production deployment or end-to-end verification occurred.

## Release gate

1. Re-run `node --test airlabs-budget.test.cjs` and `node --check relay.js` against the checked-out GitHub branch (the isolated budget tests passed locally); inspect live service logs for unexpected call patterns. Do not run GitHub Actions just to execute these tiny tests.
2. Confirm no other AirLabs API path bypasses `airlabs()`; review frontend behavior when enrichment is unavailable.
3. Merge and deploy containment only after testing, then verify `/health` budget telemetry and zero AirLabs enrichment requests in provider logs. Existing quota remains exhausted until the provider's reset.
4. Replace process-local counting with durable, shared quota accounting (including BOARD reservations) before allowing enrichment again. Design published BOARD against a lawful, sustainable source; ADS-B observed movements are not a published timetable.
5. Validate SKY, Inspector, Journey, and BOARD user flows under provider-unavailable conditions. Do not call the product fully operational before these pass.

No credentials, subscriptions, quota resets, production data or service settings were changed in this patch.

## In-app usage and warning patch

The existing Usage panel previously displayed only the aggregate request count, provider balance (often null) and reset timestamp, with no per-endpoint breakdown or prominent failure warning. The Worker now exposes grouped request counts and the D1 circuit state through the existing `/api/ops` route; the UI shows the flight/fleet/BOARD counts, a quota-exhausted warning inside Usage, and a clickable global banner when the circuit is open. A `visibilitychange` check refreshes the banner when the app returns to foreground. The endpoint returns `no-store`; it reads D1 and makes **zero** AirLabs calls. A local accounting mismatch is displayed rather than silently concealed.

These changes have not been browser-tested or deployed. The banner is specifically tied to the D1 circuit; an unrecorded upstream failure can still occur without triggering it. No claim is made that all other DOAA functions have been end-to-end verified.

## Critical underlying dependency correction

The Inspector's browser-side `flight-enrichment.js` previously called the Render relay `/flight` and `/airframe` **directly**, bypassing the Worker's D1 quota circuit. That is a confirmed structural defect. The branch now routes flight identity through `/api/flight` (Worker circuit + free route fallback) and uses the existing D1 dossier for airframe details, rather than calling the relay's AirLabs fleets endpoint. This intentionally sacrifices uncached AirLabs-only aircraft facts during outage, but preserves the observed aircraft and known D1 facts and eliminates the bypass. The direct relay remains available to other clients; server-side budget containment is therefore still necessary. No live browser regression tests have been run.

## Additional recovery correction

When the Worker relay `/flight` request fails, it now attempts the same free route resolver used when the D1 quota circuit is open, returning a provider-unavailable indication rather than a hard HTTP 502. This preserves partial route information through a relay outage and does not consume AirLabs quota. Browser-side Inspector flight calls now use that Worker endpoint, not Render directly.
