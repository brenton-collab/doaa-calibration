# DOAA working protocol and thread-resumption handoff

Updated 2026-10-11. This document is **binding project operating guidance** for this rebuild and must be read at the start of every new thread before making changes.

## Standing constraints
- **Zero incremental cost** unless the user explicitly approves a specific expense. Prefer existing free tiers, local validation and free infrastructure. Inspect quotas before provisioning or deployment. GitHub Actions minutes are scarce; avoid automatic, redundant or unnecessary CI runs. Do not activate metered providers.
- **Assistant executes technical work** wherever connected tools permit: architecture, code, tests, debugging, documentation, integration and deployment. The user is product visionary and creative director, **not** an operator. Never hand off routine commands, configuration, troubleshooting, GitHub tasks or deployment chores. Ask the user only for consequential creative decisions, explicit authorization, secrets/permissions that only they can provide, or truly unavailable actions.
- **Documentation is part of each increment**, not an end-of-project summary. A new conversation must resume from repository state without needing chat history. Keep this file and the documents below updated with verified facts, decisions, code changes, test outcomes, deployment state, blockers and precise next actions. Never leave a significant source change without a matching state/handoff update.
- Preserve production data and unrelated infrastructure. Do not deploy, migrate production D1, provision billable services or incur costs without appropriate checks and authorization.
- Distinguish designed / coded / unit-tested / fixture-tested / preview-deployed / live-verified. A screenshot or successful build alone does not establish release quality.
- Scope for an excellent, usable experience; no fake buttons, invented data or thin MVP used to excuse broken product quality. Keep working through clear next steps within tool and turn limits.

## Canonical reading order
1. `docs/rebuild/README.md`
2. `docs/rebuild/PRODUCT_UX_CONTRACT.md`
3. `docs/rebuild/DATA_AND_SECURITY_CONTRACT.md`
4. `docs/rebuild/ENGINEERING_RELEASE_CONTRACT.md`
5. `docs/rebuild/UNDERSTANDING_AND_REUSE_REGISTER.md`
6. `FIELD_NOTES_DECISIONS_2026-10-08.md`, `DOAA_SPEC.md`, and existing QA/history docs as needed.

## Current verified state
Branch `rebuild/field-notes-foundation` was created from `main` on 2026-10-11. Five initial rebuild contracts were committed and verified by refetching them from the branch. This working protocol is the next addition. **No rebuilt application has yet been implemented.** No remote D1 migration, production deployment, provider change or paid action has been performed as part of the rebuild.

The inherited source contains a Worker-first static-asset routing discrepancy affecting `flight-core.js` and `inspector-flight.js` (source-level, live response not verified), password auth whose table exists in migration 0015 but is absent from the outdated generated preview schema, seven-day session expiry contrary to the new stay-signed-in requirement, and tightly coupled UI/navigation. These are investigation and engineering targets, not confirmed live incident diagnoses.

## Next action (unblocked)
Verify migrations 0014–0015 and password account bootstrap code; establish a clean, isolated reproducible authentication/schema test without production writes. Validate all bundled asset paths against Worker-first routing. Then implement a polished signed-in SKY → Contact Inspector → Back vertical slice on this branch with realistic error/loading states and browser verification. Update this handoff and test evidence **in the same increment**.

## Engineering increment — 2026-10-11
- Full migration-directory listing verified migrations 0001–0008, 0010–0015. In particular, 0014 defines `password_login_limits` and 0015 defines `password_accounts`; earlier statement that password migration was missing was **incorrect** and corrected in rebuild contracts. The generated empty-preview schema was stale at 0013; it has now been updated to include migrations 0014–0015 on this branch.
- Commit `82aca0a`: added explicit authenticated Worker-first routes for `/flight-core.js` and `/inspector-flight.js` in `src/worker.js`. Source re-fetched and byte-for-byte verified; **not deployed or live browser-tested**.
- Commit `cece67b`: added `tests/rebuild-asset-contract.test.cjs` to check bundled assets versus Worker routes and HTML references, and both password migrations. A separate connector-based static scan found all 23 bundled assets accounted for (21 allowlisted, index and enrichment special-cased) and no unbundled HTML refs. **Node test has not been executed** because local container network cannot resolve GitHub to obtain repository files; do not report test passing.
- Existing production, preview, Render and D1 unchanged. No Actions run or cost incurred.
- **Next executable step:** obtain repo execution through available connected tooling or an accessible local checkout; run Node static test and existing tests, validate updated preview schema, then implement safe persistent sessions/admin user management behind isolated DB. Follow with real signed-in SKY → Inspector visual slice. Avoid production changes.

## Engineering increment — continuation, 2026-10-11
- Commit `866faf8`: updated `scripts/preview-empty-schema.sql` with migrations 0014 and 0015; this is a source-file correction only, **no D1 execution**.
- Commit `305a360`: removed obsolete Google sign-in copy from the password login page.
- Commit `ac30b45`: extended static regression to require password tables in both migrations and generated preview schema. **Not yet executed in Node.**
- GitHub branch remains isolated. Production, preview and relay unchanged. Next focus: executable tests, then durable revocable login and protected administrator account management.

## Engineering increment — account foundation, 2026-10-11
- Commit `49d9a35`: additive `migrations/0016_account_administration.sql` adds `role`, `disabled_at`, and `must_change_password` to existing `password_accounts`. Does not alter existing subjects or personal records.
- Commit `ae836ee`: `src/account-admin.mjs` administrator-only API module with list/create/disable/enable/reset-password routes; temporary credential returned once on successful create/reset. Uses the configured bootstrap username as initial admin. **Not integrated with Worker yet; not live-functional.**
- Commits `407987a`, `0f29931`: password login rejects disabled accounts and redirects first-use users to password change; auth gate enforces disabled status and required password change. **These source changes require migration 0016; do not deploy in isolation.**
- Commit `df04af0`: isolated preview schema now includes migration 0016.
- Attempted `src/worker.js` integration by inserting `accountAdminApi` import and dispatcher call, but repository tool blocked the large-file write. **Worker remains unmodified for admin dispatch.** Do not describe admin API as reachable. Investigate a safe smaller-patch mechanism or modular Worker extraction without triggering costly CI.
- **No Node execution, isolated DB migration, live login, or adversarial two-user tests yet.** No production/preview/relay changes. Existing seven-day session still violates persistent-session contract; UI for admin not built.
- **Next action:** resolve safe Worker integration; run tests on local/isolated executable repository; validate 0016 schema, authorization, account isolation and forced-change flow; then add a Field Notes Account interface and secure renewable sessions. Do not deploy incomplete account changes.

## Engineering increment — Worker integration and account tests, 2026-10-11
- Commit `d21e4b4`: resolved large Worker-file write obstacle using GitHub blob → tree → commit → leased branch-ref update. `src/worker.js` now imports `accountAdminApi` and dispatches it **after gate authentication, before personal API**. Re-fetched source and verified both integration points.
- Commit `1e1099a`: added `tests/rebuild-account-admin.test.mjs` with mocked-D1 coverage for admin-only list/create, bootstrap protection, disabled admin, one-time temporary credential, forced-change flag and session revocation on reset. **Tests written but not executed**.
- The connected local container cannot resolve `github.com` (verified with `git ls-remote`); no CI minutes spent. Static source checks verified all expected integration anchors, not behavior.
- **Known limitations:** no account administration UI; session lifetime still seven days; migrations 0014–0016 not applied to any database in this rebuild; test mocks do not substitute for isolated D1 integration or browser tests. Existing password verifier migration/bootstrapping must be verified before any deployment. New admin module relies on the existing same-origin gate; standalone unit tests bypass gate by design.
- **Next executable step:** obtain testable repository checkout through a connected read path without paid CI; run Node tests and apply clean migrations in isolated SQLite/D1. Implement Field Notes Account interface and persistent revocable sessions, then validate real cross-user authorization. Do not deploy until tests pass.

## Engineering increment — Field Notes account UI, 2026-10-11
- Commit `19830ad`: account administration module now serves `/account/users` only after authenticated administrator role check, fetching the bundled `admin-users.html`. Non-admins receive 403. The module is already integrated after the auth gate.
- Commits `715a41c`, `b5c1014`: new `admin-users.html`, `admin-users.css`, `admin-users.js` provide a responsive Field Notes Light account list, account creation, disable/enable, password reset, and one-time temporary password display/copy. JS uses textContent for account names; no innerHTML interpolation.
- Commits `bb7e12d`, `72948f1`: updated explicit asset build allowlist and Worker-first route for account CSS/JS. The HTML file itself is deliberately **not** publicly routed; only authenticated admin `/account/users` serves it.
- Commit `955cec4`: updated static asset contract test for protected account HTML.
- **Verification:** GitHub commits completed, source routes inspected, but Node/browser tests and isolated D1 migration **not run**. UI has no navigation entry from the existing main application yet; administrator may reach `/account/users` directly after successful migration and login. Do not deploy.
- **Security TODO before release:** change seven-day session to safely revocable persistent/renewing sign-in, verify CSRF and account reset/disable on real D1, implement rate limits on admin endpoints, test two-account isolation, ensure bootstrap admin has migrated account row, add explicit Account link to app. Browser accessibility, focus and error handling must be tested.
- **Next action:** execute tests using a real isolated checkout and D1/SQLite, repair discovered failures, then finish secure persistent sessions and application Account entry before the SKY/Inspector slice.

## Thread handoff checklist
Before ending any substantive work session, record: exact branch and commit; files changed; tested flows and commands/results; deployment/DB status; unresolved bugs and risks; the single next executable step; any user action genuinely required. If an action fails, record what was tried and the smallest next investigation. Do not imply asynchronous background work.

## Latest verification (2026-10-11)
Re-fetched account page, stylesheet, script, asset builder, Worker and admin module. Static inspection confirms all three account assets are bundled, CSS and JS are explicitly routed, and the HTML page is served by the authenticated administrator route. No browser or database tests have been run. Seven-day password session remains unchanged. The local Node runtime is available, but the container cannot resolve github.com to obtain a checkout. Do not deploy these changes until the schema and account flows have been tested.

## Account navigation increment (2026-10-11)
- `ef79c64`: `/api/account` now returns `can_manage_users` computed server-side from the signed-in password account role or configured bootstrap administrator. It never returns password verifiers.
- `b50969b`: the existing Account dialog conditionally adds a **Manage people** link to `/account/users` for authorized administrators. Standard users do not see this link, and the server still independently enforces authorization.
- Source changes re-read via GitHub; no Node/browser or D1 tests executed. The seven-day password session remains an open blocker, and admin creation remains unreleased.

- `8ef1dc5`: added mocked account-page access tests for member denial and administrator-only asset delivery. Tests remain unexecuted pending an isolated checkout.

## Security continuation (2026-10-11)
- `8cc83db`: changed password session cookie and database expiry from 7 days to 180 days in `src/password-auth.mjs`. This is **not** a fully renewable persistent-session design. Expired sessions will still require login; implement safe sliding renewal and rotation before claiming the no-routine-logout contract met.
- `cae0ce0`: protected `/account/users` HTML now sends `Cache-Control: private, no-store`, `X-Content-Type-Options: nosniff`, and restrictive CSP. This prevents browser/shared cache retention of the administration shell and limits script/style origins. CSS and JS remain static bundled resources.
- `f109a1b`: extended admin-page unit test to assert private no-store response and frame-ancestor denial. Tests remain **unexecuted**.
- Changes confined to rebuild branch; no production or preview database migration, deployment, or paid CI. Next gate: isolated execution of migrations 0014–0016, account tests, browser checks, and session renewal with revocation.

## Session renewal increment (2026-10-11)
- `564db65`, `bbcd077`: `/auth/renew` accepts only same-origin POST, validates the session and active password account, and renews D1 expiry plus HttpOnly Secure SameSite cookie only when fewer than 90 days remain. Uses the existing 180-day password session lifetime. A regex escape defect in the initial commit was corrected immediately in `bbcd077`.
- `0c43e68`: account client requests renewal on successful initialization and when the page becomes visible again. Renewal is intentionally silent and does not block ordinary account loading.
- `7c6789f`: new mocked-D1 session renewal tests cover no-op when fresh, renewal near expiry, expired and disabled sessions, and cross-origin/wrong-method denial. **Not executed**; isolated runtime tests are mandatory.
- Design limitation: same bearer token is retained on renewal rather than rotated. Session revocation and bounded inactivity remain, but token rotation, concurrent-session races, browser behavior and actual D1 execution are not yet validated. No production/preview deployment, DB migration or paid CI.
- **Next:** obtain executable repository checkout and run `node --test` for account, renewal and asset contracts; apply migrations 0014–0016 in isolated SQLite/D1 and test login/create/reset/disable across two accounts. Fix failures before releasing.

## Executable migration validation (2026-10-11)
- `cd19879`: committed `tests/rebuild-account-migration.test.mjs` using Node 22 built-in `node:sqlite`. It applies migration 0015, inserts an existing account, applies 0016, and asserts the original identity/verifier survive and invalid role is rejected.
- **Executed locally:** `node --test` against a manually reconstructed isolated copy of migrations 0015 and 0016 and the same test code: **1 passed, 0 failed**. The local copy was transcribed from the GitHub connector content because GitHub DNS remains unavailable in the container. This is a narrow executable validation, **not** proof that the full repo tests or Cloudflare D1 migration succeed. The Node SQLite API reports an experimental warning.
- Still required: execute all Node tests from actual checkout, verify full preview schema against isolated D1, test auth and admin end-to-end with two users, validate session renewal in real browser, and fix failures. No production or preview deployment and no paid CI.

## Renewal race regression follow-up (2026-10-11)
- `f839cad`: renewal checks D1 update metadata (`meta.changes===1`) before issuing a refreshed cookie. This is intended to reject a revoked session that disappears between the read and update.
- `009f741`: repaired mocked D1 `run()` result to include `{meta:{changes:1}}`.
- `2485f9e`: added regression test where update reports zero changed rows, asserting 401 and no `Set-Cookie`.
- These are committed but **not executed**. Verify real D1 `meta.changes` semantics and run tests before deploying. No preview or production changes.

## Field Notes workspace styling (2026-10-11)
- `7761878` adds a scoped warm-light design layer (`field-notes.css`) for SKY, Rack, Inspector, BOARD, and responsive surfaces; `6ea232c` loads it after existing styles; `da1e357` includes it in the explicit build allowlist; `f9308a7` serves it through Worker-first routing.
- This is an initial cohesive CSS integration, **not** a browser-reviewed or complete redesign. Existing map canvas draw colors, legacy Inspector internal styles, and dense viewports still require visual verification and refinement. Source-level asset test should now see the new stylesheet in both allowlists.
- `312b1ba` preserves surrounding aircraft on selection; `86e2c4c`/`166a097` distinguish recent vs last-known Inspector fallback; `1ee60fe` adds static checks. Tests not executed. No deployment or infrastructure changes.

## SKY visual refinement (2026-10-11)
- `a1ead18`: selected contact gets a restrained high-contrast circular halo, while unselected contacts retain full visibility; search de-emphasis is softened.
- `94f758c`: updated source regression expectations for halo and context.
- `e3d340a`: light map tiles no longer receive the legacy dark-map color filter.
- Browser and automated tests still not executed. Next verification gate is actual viewport rendering, map attribution and Inspector interactions. No deployment.

## Inspector integration and source checks (2026-10-11)
- `04606fa`: Field Notes Light styling extended to Inspector evidence rows, labels, values, timing, route map, biography, fallback telemetry and reduced-motion loading. No fabricated content or new data acquisition.
- `08c3db9`: removed dead SKY selection dimming state; selection still has a halo and other contacts remain visible.
- Performed **10 direct source-level integration checks** through the GitHub connector: stylesheet linked, included in asset and Worker allowlists, SKY halo, undimmed context, Inspector freshness labels, renewal changed-row guard and mock, renewal race test, and evidence styling. All 10 checks passed. These are not Node tests or visual browser tests.
- Full Node suite, browser viewport review, live auth and Cloudflare D1 validation remain outstanding. No production or preview deployment, database writes or paid CI.

## Rack keyboard interaction completed (2026-10-11)
- `803921e` made Rack rows focusable; follow-up GitHub updates were transiently blocked, leaving an incomplete interaction briefly.
- Retry succeeded: `d8a726d` activates existing row click path on Enter/Space; `cb679d0` captures focused row identity before rerender; `af298af` restores focus to the matching row; `9723fc7` adds regression assertions; `d781d88` adds visible focus styling.
- Seven direct source integration checks passed, including focusability, activation, focus restoration, CSS and test coverage. Node tests and browser interaction tests still not executed. If the focused row disappears from refreshed data, focus restoration is not possible; investigate keyboard fallback in viewport QA.
- No deployment, database changes or CI expenditure.

## Inspector navigation follow-up (2026-10-11)
- `660a046`: Inspector tab/close focus styling and mobile sheet spacing.
- `cea2bf0`: source regression checks for Inspector close control and focus styling.
- Attempted to add Rack focus fallback when a selected aircraft leaves the refreshed list. GitHub connector repeatedly blocked updates to the large `index.html`; **this fix is not committed**. Current code restores focus only when the contact remains in the Rack. Do not represent the missing-contact case as handled.
- Browser/Node tests still unexecuted; production untouched. Next: retry small `index.html` patch and verify interaction in browser.

## Rack disappearing-contact focus fix (2026-10-11)
- `138632f`: after Rack rerender, keyboard focus returns to the matching contact if still present, otherwise to the existing Rack search button. This closes the previously documented disappearing-contact focus gap.
- `672634e`: updated source regression expectation for this fallback. Verified `racksearch` is bound to the actual `#racksearch` button in `index.html` by direct source inspection.
- Actual browser interaction and Node test execution remain outstanding; no deployment or infrastructure changes.

## SKY → Inspector keyboard continuity (2026-10-11)
- `5b0c874`, `67d87ef`, `92eb44a`: record the originating Rack contact by ID and restore focus to its current row when Inspector closes, falling back to Rack search when the contact disappears. ID-based restoration survives Rack DOM replacement.
- `46c0a0e`: when opened from a keyboard-focused Rack row, Inspector focuses its close control. `7172178`: Escape from within Inspector dismisses it through the existing cleanup path.
- `96b9ee0`, `65aac70`: regression assertions for return focus, keyboard entry, and Escape dismissal. Source checks confirmed the return-focus capture/lookup/fallback code; full Node and real browser checks still outstanding.
- No deployment, infrastructure or paid CI changes.

## Rack evidence and search-state implementation (2026-10-11)
- User explicitly deferred live/browser testing and requested next implementation instead. This is a **deferred verification gate**, not a passed test.
- `fd72d0e`/`ff23841`: Rack empty state now distinguishes acquisition, unavailable source, and genuinely empty observed view. A usable scout-only response is recognized via `now`, not cell count. `ec049aa` adds static regression assertions.
- `3697b86`/`8944bcb`: asynchronous Rack searches use request sequence tokens, ignore superseded responses, and reject non-2xx HTTP. `2932f94`: failed search shows an explicit alert and clears stale search highlighting. `472b772`: closing search cancels the debounce and invalidates in-flight requests. `66843a8` adds source checks.
- No browser/live test or full Node suite executed. No deployment or infrastructure changes. Next implementation should focus on source-aware position freshness and Inspector/BOARD coherence, preserving evidence semantics.

## SKY / Inspector freshness and fallback implementation (2026-10-11)
- `d569ecf`: Inspector fallback now calls telemetry last reported, never categorically live.
- `cde69c7`: async dossier rejection no longer replaces a different aircraft's selected Inspector. `380b2ad`: synchronous renderer failures preserve available observed telemetry instead of replacing it with an error-only view.
- `44a2379`: pinned historical Rack contact explicitly reads `LAST KNOWN POSITION · NOT LIVE` rather than implying current telemetry.
- `f402fd4`: static regression assertions for stale data and selection safety.
- Discovered `import.meta.url` in a `.cjs` regression test (invalid CommonJS syntax). Corrected both HTML and CSS fixture paths using `__dirname` in `e165b34` and `d41e681`. Tests have **not** been executed; syntax inspection only.
- User explicitly deferred live testing; no production deployment, infrastructure modification or paid CI runs.

## Shared freshness wired across SKY, Rack and Inspector (2026-10-11)
- `9a4bfd4`: Rack now uses `DOAASkyMapCore.fresh`/`observation` for nonrecent aircraft; `adf04eb` updates source assertions. `f5f6f69` adds direct `sky-map-core` observation tests for recent, pinned, expired, missing and future timestamps.
- `93978ab`: initial Inspector selection uses the per-aircraft observation evidence, not the newest global feed timestamp. `7746ae3` adds a source regression check.
- `4a02df1`/`7df0896`: enriched Inspector refresh no longer hardcodes `live:true, ago:0`; it uses canonical observation freshness and aircraft observation age in state and rendered surfaces. This prevents an older aircraft from being declared live simply because another aircraft updated the feed.
- These are source commits, not executed tests. User deferred live testing. No deployment, production D1 or infrastructure changes.

## Per-aircraft SKY marker and Rack filtering (2026-10-11)
- `27822ad`: current SKY aircraft markers now require `DOAASkyMapCore.fresh(a,t)`; selected pinned last-known positions retain their existing visually subdued representation.
- `cd11bdb`: visible airborne count and the Rack's input list now use the same per-aircraft predicate. A fresh overall feed no longer makes a stale individual aircraft count as current.
- `f02f7b6`: source regression assertions for both filters.
- Progress estimate shared with product owner: approximately 20–25% of full rebuild by scope, explicitly provisional. UX contracts are established; this is still inherited-app hardening, not completion of the new architecture. Browser/live testing remains deferred by request; automated tests not executed. No deployment or production data writes.

## Contact Overview provenance hierarchy (2026-10-11)
- Previous Field Notes shell and section changes: `da28dad`, `571cf4e`, `24ebc6f`, `21e9a03`. Contact evidence presentation changes: `b059dbb`, `4f60946`, `9ab4813`, `a5efe60`.
- `6ef3cd9` separates broadcast Contact identity (ICAO24, callsign, position evidence) and observed telemetry from externally enriched airframe identity, with an explicit provenance note.
- `ef6930f` labels any route as a **possible flight association**, not proof of a dated operation. `8246cf5` adds source assertions for the hierarchy.
- The UI is not yet browser-verified and the Node test suite has not been executed. No production deployment or paid infrastructure changes.

## Contact telemetry presentation (2026-10-11)
- `74727ad` introduces a Contact-specific four-reading summary (altitude, groundspeed, ground track, position age) with expandable detailed observations; `3854487` wires it into Contact Overview and `7341e78` styles it responsively.
- `7642584` explicitly distinguishes recent, historical, unknown-time and future-time observation status above the readings; `40d3209` styles that status; `f382851` adds source-level regression coverage.
- These are implementation commits, not visual verification. Browser/live testing remains deferred and automated tests have not been executed. No deployment or paid infrastructure changes.
