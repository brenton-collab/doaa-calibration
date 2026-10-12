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
