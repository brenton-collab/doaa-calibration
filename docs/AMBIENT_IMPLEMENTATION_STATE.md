# DOAA AMBIENT implementation checkpoint
2026-10-10. Branch: work/immutable-frontend-release. Not merged, deployed or runtime-accepted.

## Implemented on branch
- Ambient SKY: separate full-screen quiet dark display with a radar-like 80-NM observation reference, current observed aircraft positions, heading markers, freshness and counts. Reads the existing frontend observation snapshot; no extra API calls.
- Manual AMBIENT SKY / AMBIENT SLIDES choice, persisted locally; no automatic mode switching.
- Optional five-minute idle entry, persistent preference, touch/keyboard return to interactive SKY, reduced-motion stylesheet and mobile layout.
- AMBIENT SLIDES: layout, exact-registration/licensing/attribution media guard, and an honest no-verified-photo state. No per-slide provider calls. The current snapshot does not yet carry licensed photo metadata, so real-photo rotation is not yet implemented or accepted.
- Bundled frontend release-boundary fix and automated static contract test files; deployment syntax gate references both.
- Source/configuration checks verified by reading the branch through GitHub; no Node execution or browser validation performed.

## Known gaps
- The AMBIENT SKY display is an independent minimal cartographic projection, not yet the same map geometry and layer styling as interactive SKY. It uses aircraft coordinates from the shared snapshot.
- Stale/fresh observation age depends on the existing SKY 'now' timestamp; validate semantics under failed refresh and cached data.
- AMBIENT SLIDES needs a properly licensed, cached, exact-airframe photo adapter and event-driven selection across current and recently observed flights.
- Old tablet idle, touch return, focus management and burn-in tests remain.
- LOOK implementation is not included in this tranche. An attempted LOOK edit was blocked by a safety check; no claim of completion.
- Full repository test suite and local preview have not been run; do not merge or deploy on the basis of source checks alone.

## Next integrated work
Validate runtime syntax and UI flows; add reusable media evidence contract and event-driven slides; integrate LOOK and Inspector navigation; ensure BOARD coverage and freshness labels. Preserve production isolation and avoid metered provider requests.

## 2026-10-10 evening — product-direction correction and LOOK
User art direction: AMBIENT SKY must be almost textless. DOAA identity badging top right, small explicit composition toggle, very faint map detail, and a feeling of aviation traces emerging as art rather than a softer SKY interface.

Implemented in branch:
- Replaced radar rings, compass, labels and counters with faint field lines, small aircraft glyphs and accumulated tracks from real successive observations. No synthetic movement, no additional acquisition.
- Minimal upper-right DOAA identity and SKY/SLIDES switch, quiet bottom-right return affordance, staleness indication only when needed. Mode selection persists; there is no automatic SKY/SLIDES switch.
- Added LOOK as an observation-first view with explicit explanations and tap-through to SKY Inspector, using only existing aircraft snapshot.
- Extended ambient integration contract tests to cover text restraint, trace rendering, LOOK navigation and no additional network requests.
- Verified via GitHub source inspection that new assets are loaded, LOOK is wired, and neither new module calls fetch. These are source checks, not executed runtime tests.

Important remaining issues: track drawing is observation-history only while the ambient view is active; it does not yet draw older D1 historical tracks. SLIDES still has no real cached licensed-photo bridge or event-driven rotation. Browser/Node execution remains unverified; production unchanged.

## 2026-10-10 — SLIDES evidence handoff
- Existing flight-enrichment Inspector reconciliation emits a local doaa:airframe-media event only for exact-airframe media with matching observed registration, image, license and attribution. No new external request is introduced by the event.
- ambient.js maintains a session-only cache of these verified media records, keyed by aircraft ID. Slides selects eligible media only for an aircraft in the current SKY snapshot with the same registration. It changes composition for newly eligible aircraft, with a 45-second minimum hold; quiet periods hold the existing composition.
- No speculative model photos, no on-slide provider fetch, no timed random rotation. An honest waiting state is displayed if no exact media has been encountered.
- The source checks passed for HTML/style balance, loaded modules, Inspector-to-AMBIENT media event, matching registration, LOOK Inspector navigation, and no independent fetch in AMBIENT or LOOK.
- **Limitations:** the user must first open an Inspector that reconciles exact media; the existing app does not yet proactively populate media from a bounded D1 cache. Browser acceptance, test execution and production deployment remain undone. A source check does not establish runtime correctness.

## 2026-10-10 — bounded D1 photo cache integration
- New GET /api/ambient-media?hex=... endpoint reads existing D1 identifiers and supported photo claims for at most 12 ICAO hex identifiers; no D1 writes, provider calls, premium enrichment or new photo searches. Conflicting claims and anything without exact-airframe specificity, registration, license, credit and HTTPS image are rejected.
- ambient-media.js polls only while AMBIENT SLIDES is open, for at most 12 currently observed registered aircraft, throttled to two minutes for the same set. Results pass through the same registration-matching local media event as Inspector reconciliation. No background network activity in AMBIENT SKY.
- Added cache-contract test and included it in the deployment gate. Refreshed older assertions to match the verified-media adapter.
- Connector-side source checks passed eight invariants. Runtime tests and browser validation remain outstanding.
- Known trade-off: this is a read-only reuse of existing media, not a media ingestion pipeline. It will only show images that were previously verified and saved by existing D1 workflows. No production merge/deployment.

## 2026-10-10 — integration execution tranche
- Executed 17 existing/new test callbacks in an isolated JavaScript compatibility harness against GitHub branch source: all passed. This is **not** a native Node test run and does not replace browser acceptance.
- Parsed both inline HTML scripts, ambient.js, ambient-media.js, look.js and flight-enrichment.js as JavaScript functions; parsed Worker after removing its ESM import/export wrapper.
- Executed the ambient-media.js event handler with controlled simulated observations, network response and clock: matching licensed media was emitted exactly once; repeated identical lookup was throttled.
- Executed Worker ambientMediaApi with simulated read-only D1 responses: returned an exact-airframe photo with canonical registration, rejected invalid ICAO IDs and issued only SELECT statements.
- Fixed registration-aware media cache signature so changes in observed registration invalidate the throttle.
- Fixed LOOK refreshing as shared SKY observations change, rather than only on initial navigation.
- Added executable LOOK user-journey test and included it in the production release test gate.
- Production remains unchanged. Browser layout, Cloudflare static asset packaging, native Node suite and production release verification remain open.
