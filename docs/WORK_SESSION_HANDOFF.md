# DOAA Work session handoff and recovery ledger

## Immutable starting boundary
- Repository: brenton-collab/doaa-calibration (private)
- Baseline SHA: `7784868d5052318cba0dbfdc5501f0c60174f514`
- Recovery reference: `checkpoint/doaa-pre-work-2026-10-10`
- Work-only branch: `work/doaa-acceptance-2026-10-10`
- Existing integration branch (DO NOT WRITE): `work/immutable-frontend-release`
- Protected `main`: DO NOT WRITE
- The recovery reference must not be moved, rebased, reset or deleted.

## Mandatory Work operating protocol
1. Read this ledger, DOAA_SPEC.md, FIELD_NOTES_DECISIONS_2026-10-08.md, RELEASE_EXECUTION_SAFETY_PLAN.md, DEV_LOG.md, docs/AMBIENT_IMPLEMENTATION_STATE.md and relevant code before changes. Some older implementation documents describe an earlier state; prefer latest code and dated log entries for implemented status.
2. Confirm active branch and commit. Make edits ONLY on the Work-only branch. Do not merge, force-push, rebase, cherry-pick to other branches, delete refs, modify repository permissions, or edit unrelated infrastructure.
3. Record a baseline of executable tests, accessible runtime behavior, dependencies and deployment accessibility. Distinguish source-only checks, mocked browser checks, actual browser checks, and production checks.
4. Commit small, coherent increments. After each increment record SHA, scope, validation and unresolved issues here. If a check fails, do not misreport success. Never leave significant uncommitted work as the only copy.
5. Use local/offline tests and local isolated browser sessions. No paid APIs, no quota-consuming AirLabs calls, no production deployment, no production D1 writes, no secret changes, no provisioning, no billable CI, no unrelated service changes. If a local runtime requires a missing secret or external resource, record the blocker and continue with safe checks.
6. For significant regressions, revert the offending commit(s) on this branch or document a precise rollback. Never touch the recovery reference. Preserve and attribute third-party imagery correctly.
7. Stop before release, deployment, merging or paid operations and request authorization. Do not claim acceptance from a build, static check, mock or screenshot alone.
8. Before the session ends or if budget/time is short, commit this ledger and DEV_LOG.md with precise remaining steps.

## Baseline product and current focus
DOAA is an Ottawa aviation-awareness instrument, not a generic flight tracker. SKY, BOARD, LOOK, Inspectors, AMBIENT SKY and AMBIENT SLIDES must preserve evidence provenance, recency and unknown values. Current code has read-only exact-airframe verified photo metadata; no speculative substitutes. Slides must keep the current image and matching details visible while preloading the next, switch atomically on successful load, and retain the current slide on replacement failure. The 45-second hold begins on successful display. Verification is a small unobtrusive upper-left pill; no inter-slide loading text or redundant footer status. Stale observations cannot be presented as live.

## Initial state (before Work's edits)
- Baseline: `7784868d5052318cba0dbfdc5501f0c60174f514`.
- Latest preceding implementation: `f918ed9` quiet slideshow footer, `560bea7` revalidation of slow photo loads, `f99f109` uninterrupted preloading, `ad284cd` discreet verification pill.
- Previous mocked image lifecycle check passed first-load gating, 45-second hold, next-image preload, failed replacement retention, and empty footer. This was NOT a real browser check.
- Actual browser layout, image network behavior, long-session operation, and production deployment remain unverified.
- Note: initial ledger commit is expected on this branch; the recovery reference stays at the baseline.

## Work progress (append entries below)
Each entry: timestamp | commit SHA | feature/fix | tests (with environment) | remaining risk.

### Baseline execution (2026-10-11 UTC / October 10 Toronto evening)
- Starting Work head verified: `2e2c6e7201b28fba5e525ce5d9c880a1cab7df4f`; recovery and integration refs remain `7784868d5052318cba0dbfdc5501f0c60174f514`. Main was read-only observed at `7cd2ffc0a72be7e6457dd101ca198875ae1b5e97`.
- Complete isolated checkout; Node 24.19.0; Python 3.12.14. Native suite: 72 tests, 71 pass, 1 fail. The failed source assertion expects `GS UNKNOWN`, while current code uses `SPEED UNKNOWN`; preserve the unknown-value behavior and verify it in-browser before updating this obsolete string assertion.
- Curated seven-asset packaging passed; synthetic SQLite lead-index regression passed (1 test).
- Actual headless Chromium 153.0.8010.0 launched through Playwright. Standard browser download failed; an npm-packaged local Chromium succeeded after ownership-free extraction. No deployed runtime accessed.
- Added explicit `scripts/browser-acceptance.cjs` and synthetic fixtures. Real DOM/layout/input/image loading; all API responses, media evidence/images, and clock advances are simulated. External maps/logos blocked. No provider calls, D1 writes, CI or deployment.
- Browser baseline: 11 checks, 4 pass, 7 fail. Reproduced LOOK return-focus loss, unescaped provider HTML in BOARD, nested datum buttons losing values during HTML parsing, obsolete Inspector response overwriting selection, mobile Inspector/map-control overlap, missing preload during hold, and lost verification/focus on AMBIENT resume. No page runtime errors. Desktop/tablet/390x844 phone/844x390 landscape screenshots inspected.
- Priority: fix AMBIENT preload/hold/atomicity and cancellation; then Inspector request ownership, independent datum controls, return focus, provider-string safety, and responsive shell. Rerun affected browser journeys plus existing offline checks. Map-source rendering, live providers, production D1 and physical-device endurance remain unverified.
- Browser command: set `DOAA_PLAYWRIGHT_MODULE` to installed Playwright, `DOAA_CHROMIUM` to local Chromium (or omit both when normally installed), and optionally `DOAA_ACCEPTANCE_OUTPUT`; run `node scripts/browser-acceptance.cjs`. Default evidence output is ignored `tmp/acceptance/`.

## Release/rollback status
NOT ACCEPTED; NOT MERGED; NOT DEPLOYED.
If Work becomes unavailable, inspect commits on `work/doaa-acceptance-2026-10-10` against `7784868d5052318cba0dbfdc5501f0c60174f514`. Reuse passing commits selectively or discard this branch. The recovery reference and original integration branch remain the independent starting point.

### Increment 1 — uninterrupted AMBIENT lifecycle (2026-10-11 UTC)
- Baseline harness/ledger commit: `d1037ea519619970cc7b577140cb90a040fbb6ff`. Implementation SHA will be recorded by the following increment.
- Next exact-airframe image now loads and decodes during the current hold; successful display starts its own 45-second minimum. Image, registration and details switch together; telemetry updates from the current snapshot without changing the image. Invalid/stale identity clears the display honestly. Failed replacements retain the eligible current image and receive a bounded two-minute retry exclusion. Media/failure caches are capped at 128 entries.
- Async callbacks are owned by a lifecycle generation and pending image object. Switching mode/exiting cancels callbacks; resuming restores verification only for the already loaded, still-eligible image. AMBIENT has keyboard focus, background inertness, Tab containment and Escape return. Idle entry defers while Inspector/settings/usage is open.
- Added responsive image-to-information gradient, observed-time readout, and landscape layout. No per-slide provider requests.
- Native offline suite: **72/72 pass**. Updated two obsolete source-shape assertions only after actual browser evidence confirmed unknown speed and stale-observation rejection.
- Actual Chromium: **9/14 checks pass**; all five AMBIENT cases pass (preload during hold, 44-second retention, atomic swap, failed image retention, late identity rejection/stale clearing, cancellation, explicit SKY, keyboard and resume). Five previously reproduced Inspector/BOARD/mobile defects remain and are the next increment. External maps and real photographs remain unverified.

### Increment 2 — Inspector ownership, navigation and responsive shell (2026-10-11 UTC)
- Increment 1 published SHA: `5ebeb0d783abd969fad186d9310ea26e4fb576d2`. This increment's SHA will be recorded in the next ledger entry.
- Fixed all five remaining reproduced browser defects: provider HTML is escaped in BOARD/rack/airport surfaces; datum navigation and explanation are independent sibling controls; a central Inspector revision rejects obsolete enrichment/secondary-object responses; LOOK/BOARD return restores identity-based keyboard focus; the responsive Inspector reserves its header, close and horizontal navigation tray, with a compact phone sheet and explicit Expand control.
- Primary known observations render immediately while flight/dossier resolve concurrently with nine-second deadlines. Supplementary journey data no longer delays primary facts. Enrichment preserves the chosen Inspector surface, scroll and focused control. Refresh re-evaluates live/pinned identity and invalidates stale interpretation when callsign/registration/type changes. Missing vertical rate remains unknown. Model descriptions avoid repeated manufacturer names.
- Map controls and rails follow the actual wrapped top chrome; primary navigation, Inspector close/expand/explanation controls have at least 44px targets; document language and browser zoom are enabled. Historical/search records carry null telemetry and explicit non-live labels.
- Actual local Chromium browser: **14/14 checks pass**, no page errors or mutation requests. Desktop, 390×844 phone, 820×1180 tablet and 844×390 landscape screenshots inspected. Maps/logos were blocked and aviation responses/images were synthetic; this is real browser execution of simulated data, not production verification.
- Native offline contracts/syntax: **72/72 pass**. No provider, database, deployment or CI operations. Next: exercise outage/pinned freshness, asynchronous reading-state retention, search-history journeys and expanded mobile/AMBIENT layouts; address only defects evidenced by those checks; finish with an acceptance matrix and exact published implementation SHA.

### Increment 3 — individual freshness and asynchronous rack reliability (2026-10-11 UTC)
- Increment 2 published SHA: `e34b45ed4ae9e67024f47f403961be5531602990`. This increment's SHA will be recorded by the next checkpoint.
- Added six browser cases and expanded phone/landscape Inspector interaction. Reproduced delayed search resurrecting a cleared query, individual position age hidden by a fresh response/another aircraft, and rack redraw destroying restored focus. Outage recovery, BOARD empty/error/recovery and delayed-enrichment reading-state checks already passed.
- Normalization retains response time minus provider `seen_pos` (or `seen`) as the individual position timestamp; missing age remains unknown. Multi-cell merge rejects aging samples and chooses the newest duplicate independent of response order. SKY, the rack, Inspector, LOOK and AMBIENT's snapshot now share this per-contact freshness. A local ten-second presentation tick expires evidence without acquiring provider data. Pinned/historical records cannot become live from another contact's time.
- Search has revision ownership, cancellation, a nine-second deadline and durable loading/error/empty states. Hydration rejects obsolete contact identity and preserves focused rack identity across redraws. Cached, matching rack facts enrich AMBIENT details without any additional acquisition. Escaped SKY provider attribution as well as BOARD/rack/Inspector strings.
- Actual isolated Chromium: **20/20 browser checks pass**, no page errors or mutation requests. Clock-dependent checks reacquire fixtures after clock installation so all evidence uses the simulated browser time domain. This is simulated elapsed time, not a wall-clock endurance test.
- Offline contracts/syntax: **73/73 pass**, including a behavioral normalization/merge regression for per-position age, missing age and newest-duplicate order. The obsolete rack source-shape assertion was updated after actual browser expiry evidence passed.
- Next: check AMBIENT SKY resize/observation geometry, historical search Inspector identity, responsive slideshow pill/copy visibility, and idle suppression while reading. Then record final evidence/acceptance matrix, exact published SHAs and remaining release gaps. Real provider payload variations, maps/media, production D1 and physical-device checks remain unverified.
