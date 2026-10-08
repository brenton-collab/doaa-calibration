# DOAA development log and restart handoff

Updated: 2026-10-08. Evidence-qualified checkpoint; not a live runtime acceptance test.

## Permanent rules
Free-only architecture and operation. The human partner owns product vision; the assistant owns execution, tooling, GitHub, testing, documentation and deliberate deployment wherever connected capabilities permit. Update this file at every meaningful checkpoint and before ending a work session; update DOAA_SPEC.md for design, architecture and invariant changes. External research must never create DOAA Encounters.

## Work capacity, execution and status
- ChatGPT Plus includes limited Work access. Conserve it; use direct connected tooling when suitable, with no paid upgrades.
- Execute large, coherent end-to-end tranches rather than asking for repeated 'continue' prompts. Do not imply background progress outside actual tool or scheduled runs.
- Report each state distinctly: implemented, committed, PR open, merged, Preview deployed, Production deployed, runtime/device verified. Record tests and unknowns explicitly.

## Verified repo state
- Canonical specification: DOAA_SPEC.md sections 24B and 24C; product decisions: FIELD_NOTES_DECISIONS_2026-10-08.md.
- Prior reconciliation: PR #11 squash-merged to main at d507d2224a2cad8f810951bca345f74e49a9ef84.
- This change is documentation-only. No application deploy or D1 migration was performed.
- Wrangler configuration specifies Cloudflare Worker entry src/worker.js, static assets, five-minute cron, and separate production/preview D1 bindings. Configuration does not establish deployed state.
- The precise assistant-led deployment route demonstrated in prior work is not yet reverified in this checkpoint. Recover it from GitHub history and connected deployment tools; do not claim deployment impossible.
- No package.json or .github/workflows/deploy.yml or .github/workflows/ci.yml was found at the specifically probed paths; other mechanisms may exist.

## 2026-10-08 engine tranche checkpoint
- Branch: board-classification-truth-20261008. BOARD UI correction in index.html: reuse existing yowLeg classifier and show UNK rather than falsely labelling an unrecognized route DEP. A missing/non-array `flights` response is now treated as feed failure, not a truthful zero-aircraft result.
- Evidence: direct source inspection and targeted code edit. Syntax/browser regression tests: not run. Live provider payload: not checked. Production/Preview: not deployed or verified. D1: unchanged/not checked.
- Remaining: verify whether relay /board returns complete airport-centric airborne movements; check provider coverage and both IATA/ICAO matching; test Journey and Encounter boundaries with real fixtures. Recover established deployment procedure before release.
## 2026-10-08 Journey evidence-boundary checkpoint
- Branch: journey-evidence-boundary-20261008. In src/worker.js, removed the unsupported assumption that the first record matching a callsign is the current flight and that all earlier/later records are immediately previous/next operations. Chronology remains sorted and sourced, but `position` stays null and `adjacency_established` / `current_assignment_established` are false until a real operation-identity and adjacency resolver exists.
- This is a conservative correctness guard, not a complete Journey implementation. Historical claims, observations and route lookup remain distinct; no Encounter creation path was added.
- Tests: source edit verified by GitHub commit; automated runtime/fixture tests not run. Production and Preview not deployed; D1 migration not checked. Next: introduce deterministic operation-identity/adjacency fixtures, verify live flight payload and UI rendering, then deploy only after release gate.

## Current frontier: T0 truth and deployment recovery
1. Recover the previously successful assistant-led deployment path, connected permissions, preview/production workflow, migration procedure and rollback. Verify without pushing a needless deploy.
2. Check live/preview D1 migration and scheduled collector status without unnecessary writes.
3. Reproduce BOARD ARR/DEP and Journey BEFORE/NOW/NEXT versus Flight from real provider payloads; add deterministic regression fixtures and no-data versus no-traffic tests.
4. Validate Inspector explainer, close, typography and touch behavior; enforce the genuine-observation-only Encounter invariant.
5. Implement bounded correctness repairs, test, update spec and log, then deploy only at an appropriate verified release gate.

## Required checkpoint format
Date; branch/commit/PR; changed files; tests and outcomes; preview/production deploy status and versions; D1 migration state; verified defects and risks; next executable step. Write 'not checked' instead of guessing.
