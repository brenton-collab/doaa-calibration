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
- Full migration-directory listing verified migrations 0001–0008, 0010–0015. In particular, 0014 defines `password_login_limits` and 0015 defines `password_accounts`; earlier statement that password migration was missing was **incorrect** and corrected in rebuild contracts. The generated empty-preview schema is stale at 0013.
- Commit `82aca0a`: added explicit authenticated Worker-first routes for `/flight-core.js` and `/inspector-flight.js` in `src/worker.js`. Source re-fetched and byte-for-byte verified; **not deployed or live browser-tested**.
- Commit `cece67b`: added `tests/rebuild-asset-contract.test.cjs` to check bundled assets versus Worker routes and HTML references, and both password migrations. A separate connector-based static scan found all 23 bundled assets accounted for (21 allowlisted, index and enrichment special-cased) and no unbundled HTML refs. **Node test has not been executed** because local container network cannot resolve GitHub to obtain repository files; do not report test passing.
- Existing production, preview, Render and D1 unchanged. No Actions run or cost incurred.
- **Next executable step:** obtain repo execution through available connected tooling or an accessible local checkout; run Node static test and existing tests, then refresh preview schema from migrations and implement safe persistent sessions/admin user management behind isolated DB. Follow with real signed-in SKY → Inspector visual slice. Avoid production changes.

## Thread handoff checklist
Before ending any substantive work session, record: exact branch and commit; files changed; tested flows and commands/results; deployment/DB status; unresolved bugs and risks; the single next executable step; any user action genuinely required. If an action fails, record what was tried and the smallest next investigation. Do not imply asynchronous background work.
