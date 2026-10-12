# DOAA-RR workflow audit · Initial read-only findings

Date 2026-10-12. Status: **partial audit, not a validated workflow or live infrastructure inventory**. Evidence: repository `wrangler.jsonc`, `docs/RELEASE_RC_CHECKPOINT.md`, `DEV_LOG.md`, `RELEASE_EXECUTION_SAFETY_PLAN.md`, inherited `docs/rebuild/ENGINEERING_RELEASE_CONTRACT.md` and `UNDERSTANDING_AND_REUSE_REGISTER.md` as read on `rebuild/experience-v2`.

## Confirmed in source

- `wrangler.jsonc`: Worker `doaa-calibration`, `src/worker.js`, assets from `./dist`, `run_worker_first=true`, five-minute cron; production D1 `434f90d3-397b-48d3-8249-4c48cf1e8936`; preview D1 `939eda3b-4894-497b-9f67-209771761b3f`. **This is configuration, not confirmation of currently deployed bindings or quotas.**
- Historical release checkpoint describes **152 Node tests** and multiple four-viewport Chromium fixture suites, plus per-feature acceptance JSON and screenshot sets. They are reported historical results, **not tests rerun in this audit**. Existing suites and fixtures should be mapped and reused before any new test framework is created.
- Historical logs repeatedly emphasize local-only fixture acceptance and absence of authenticated deployed Preview acceptance. A green fixture suite must not be treated as live release verification.
- The historical safety plan defines G0–G5 gates, change-control and logging. Useful principles survive, but its insistence on all 184 decisions and older interface navigation **does not govern DOAA-RR**.
- Existing rebuild engineering contract records a suspected asset-delivery problem with `run_worker_first` and omitted explicit asset routes; live 404 is not proven. It also documents preview/production separation, Render auto-deploy-from-main risk and unresolved schema/auth checks.
- Repository paths `.github/workflows` and `scripts` exist as directories, but directory fetch cannot enumerate their children via the available GitHub fetch-file action. Their actual contents have **not** yet been audited. `package.json` at repository root was not found; do not assume npm scripts or a standard Node build.

## Early diagnosis (hypotheses, not verified failures)

1. **Release-state ambiguity:** historical records describe code and fixtures as checked, but cannot establish which exact code/assets/configuration were deployed and authenticated.
2. **Test-suite proliferation:** repeated feature-specific four-viewport suites suggest duplication and potential diminishing returns; actual test inventory and runtime/cost still need measurement.
3. **Preview-path ambiguity:** inherited branch/preview history and Cloudflare preview D1 bindings need a single environment/promotion map; do not invent or provision a new preview yet.
4. **Continuity debt:** multiple logs, checkpoints, handoffs and contracts compete for “current state.” DOAA-RR needs one short authoritative status/runbook index with links to detailed evidence.
5. **Deployment safety:** production promotion must be specified against actual GitHub/Cloudflare/Render triggers, quota and rollback capabilities, not copied from earlier assumptions.

## Next read-only checks

- Enumerate repository tree and locate actual build/test scripts and CI workflows (use repository checkout or suitable tree API; do not guess filenames).
- Inspect connected GitHub workflow run/usage history, branch policies, Cloudflare deployments/quotas and Render service auto-deploy settings, if accessible without mutation.
- Reconstruct one real historical change from source commit to deployed Worker version and smoke-test evidence; locate precise gaps.
- Produce environment matrix and a risk-based test taxonomy (fast local, component browser, integration, isolated preview, promotion smoke) with explicit stop conditions.
- Draft one canonical runbook only after this evidence. Do not run paid CI or deploy during audit.

No application code, infrastructure, migration or production data changed in this audit.

## Second pass: actual toolchain and release path (read-only)

GitHub Contents enumeration on this branch confirmed:
- **3 workflows:** `.github/workflows/deploy-production.yml`, `preview.yml`, `syntax-check.yml`.
- **12 scripts:** `acceptance-server.cjs`, `airport-preview-acceptance.cjs`, `browser-acceptance.cjs`, `build-airport-reference.cjs`, `build-assets.cjs`, `build-decision-matrix.py`, `build-preview-package.cjs`, `movement-browser-acceptance.cjs`, `prepare-airfield-import.mjs`, `preview-empty-schema.sql`, `sky-browser-acceptance.cjs`, `verify-preview-isolation.cjs`.
- **44 files** in `tests/` (including fixtures and Python smoke script); separate root `airlabs-budget.test.cjs`.
- GitHub Actions history endpoint reported **619 workflow runs** (repository total at read time), with five latest manual Preview attempts on `rebuild/field-notes-foundation`: three success, two failure. This is not evidence of current billing or DOAA-RR acceptance.

**Production workflow:** `workflow_dispatch` only, `doaa-production` concurrency with no cancellation, Node 22, credential gate, curated asset packaging, JS syntax and Node tests, then `cloudflare/wrangler-action@v3` running `deploy --config wrangler.jsonc` pinned Wrangler 4.149.0. Production deploy is **not automatically triggered by a push**, per workflow YAML. Deployment confirmation, version provenance, authenticated smoke tests, and rollback are **not implemented in this workflow**.

**Preview workflow:** `workflow_dispatch` only, `doaa-preview` concurrency with cancellation, Node 22, syntax checks, isolation verification, asset packaging, then Wrangler deploy with `wrangler.preview.jsonc`. Preview config has no cron, separate D1 and `run_worker_first: ["/*"]`; production has five-minute cron and `run_worker_first: true`. No authenticated post-deploy smoke gate is in workflow.

**Syntax-check workflow:** PRs into `main` for JS/HTML/workflow changes plus manual dispatch; **eight independent two-minute jobs** (memory, enrichment, relay, helpers, worker, contracts, migration-contracts, inline-html). This is a concrete candidate for consolidation into one job, subject to verifying branch protection requirements and actual execution/cost. Its long literal-string semantic assertions encode historic Inspector DOM and could actively obstruct DOAA-RR redesign; migrate important invariants to behaviour-oriented tests rather than silently deleting safety protections.

**Packaging:** `build-assets.cjs` publishes a curated allowlist, generates authenticated `src/sky-document.generated.mjs` from `index.html`, validates referenced assets. `verify-preview-isolation.cjs` asserts preview D1 separation, authenticated SKY, no service forwarding, no preview cron. `build-preview-package.cjs` offers a separate connector/API transport from a clean git tree and generates a self-contained package; this is an alternative to normal Wrangler preview deployment, not evidence both should remain permanently.

**Critical distinction:** existing scripts and workflows are real and useful; none of these inspections executed them. The release path is now reconstructable **from source**, but has not been proven end-to-end. The initial concern about whether workflows existed is resolved; live provider settings, quotas, protections, Render triggers and exact deployed versions remain unknown.

## Immediate consolidation recommendations (provisional)

1. Keep production manual-only and Preview isolated. Add a **verified source SHA → deployed Worker version → authenticated smoke** record before declaring release acceptance; do not deploy now.
2. Review and consolidate the eight syntax-check jobs to one targeted job where branch policy allows; preserve substantive migration/security assertions, replace brittle historic UI literal matching.
3. Design one authoritative test entry point selecting existing fast Node tests and only the relevant browser journeys. Avoid automatic all-viewports/all-suites for every minor change; define release-level broader checks.
4. Define explicit Preview lifecycle, ownership and expiry; reconcile the Wrangler and connector package paths rather than growing a third path.
5. Put portable lifecycle and stop rules in the cross-project workbench; keep Cloudflare/D1/aviation-specific checks in the DOAA adapter.

No hosted workflows were triggered, and no preview, production or database changes were made.

