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

No Work implementation entries yet.

## Release/rollback status
NOT ACCEPTED; NOT MERGED; NOT DEPLOYED.
If Work becomes unavailable, inspect commits on `work/doaa-acceptance-2026-10-10` against `7784868d5052318cba0dbfdc5501f0c60174f514`. Reuse passing commits selectively or discard this branch. The recovery reference and original integration branch remain the independent starting point.
