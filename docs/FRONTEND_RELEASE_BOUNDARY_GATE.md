# Frontend release boundary — verification and rollback gate
Status: implementation on isolated branch; **not production verified**.

## Threat model
The original Worker fetched index.html and flight-enrichment.js from mutable GitHub main at request time. A documentation-only or UI commit could therefore alter production-facing content without a Worker deployment. Cloudflare Worker version and GitHub SHA could diverge; rollback of Worker alone would not reliably restore frontend bytes.

## Candidate change
src/worker.js uses env.ASSETS.fetch for fallback HTML and JS, removing the mutable GitHub RAW origin. wrangler.jsonc already binds ASSETS and routes /api/* to Worker; the static asset router serves / and /flight-enrichment.js from the deployment bundle. No configuration change was made. The existing frontend HTML already references the flight-enrichment.js script. A new test file asserts these invariants and deploy-production.yml now executes it in the syntax gate.

## Safety checks before merge
1. On a local checkout of this branch, run `node --test tests/frontend-release-boundary.test.cjs`, syntax checks for Worker and all existing tests. Capture pass/fail, not just exit code.
2. Confirm with Wrangler dry-run/build tooling that the bundle contains index.html, vector-base.js and flight-enrichment.js, and that env.ASSETS is bound. Check static /, /index.html and /flight-enrichment.js as well as Worker fallback /unknown, and verify cache headers and error paths.
3. Validate a **preview** deployment with isolated D1 preview binding and no metered provider calls; do not deploy preview if it would accidentally run production cron or consume shared provider budgets. If safe isolation cannot be demonstrated, use local Miniflare/Wrangler simulation instead.
4. Confirm production GitHub/Worker mismatch and capture current live asset fingerprint without mutating anything. Do not claim parity solely from /api/health BUILD.
5. Before production deployment, record current deployment ID/version and asset bundle/commit, confirm rollback procedure and quotas. Merge only when tests and rollout plan are recorded.
6. After deployment, compare served asset fingerprints to the expected release and verify SKY/BOARD/Inspector navigation and flight-enrichment script loading. If broken, restore previous Worker **and its asset bundle**, not just code.

## Known limitations
No Node test execution, local checkout, browser test, preview deployment or production rollout has yet occurred. Connector-side string inspection and Cloudflare read-only binding inventory are the current evidence. Cloudflare confirmed production has ASSETS and DB bindings. No GitHub Actions run has been initiated. The branch is not accepted for merge until the above gates pass.
