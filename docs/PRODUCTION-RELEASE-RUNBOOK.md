# DOAA production release runbook

Last verified: 2026-10-11. Repository: `brenton-collab/doaa-calibration`.

## Canonical deployment mechanism

**Do not use GitHub Actions for production deployment and do not ask Brent to run Wrangler.** The production Worker has an existing **Cloudflare Workers Builds** GitHub-connected trigger, which can be invoked directly through the Cloudflare API. It checks out `main`, builds immutable frontend assets, and deploys the Worker via Wrangler inside Cloudflare.

- Worker: `doaa-calibration`
- Cloudflare trigger name: `DOAA production`
- Trigger UUID: `43f49d95-bd33-42ff-b0f8-33bd350d4ccc`
- GitHub repository: `brenton-collab/doaa-calibration`
- Branch: `main`
- Build command: `node scripts/build-assets.cjs`
- Deploy command: `npx wrangler@4.149.0 deploy --config wrangler.jsonc`
- Trigger path filter: `__manual_release_only__` (automatic builds intentionally disabled; explicit manual trigger still works)
- Production D1 binding `DB`: `doaa-memory`, ID `434f90d3-397b-48d3-8249-4c48cf1e8936`
- Preview Worker: `doaa-calibration-preview` with separate preview D1. Do not confuse it with production.

## How Sage triggers a release (connected Cloudflare tool)

1. Verify that the intended code and regression tests are committed on `main`. Check Cloudflare Worker configuration and existing bindings. Do not change D1 or secrets just to deploy.
2. Through the Cloudflare connector, use `mcp__Cloudflare__search` to confirm the API operation `POST /accounts/{account_id}/builds/triggers/{trigger_uuid}/builds`. Then invoke `mcp__Cloudflare__execute` with:
   ```js
   async () => cloudflare.request({
     method: 'POST',
     path: `/accounts/${accountId}/builds/triggers/43f49d95-bd33-42ff-b0f8-33bd350d4ccc/builds`,
     body: { branch: 'main' }
   })
   ```
   This is the production release trigger. It requires neither a local checkout nor a GitHub Actions workflow.
3. Record the returned `build_uuid`. Poll `GET /accounts/{account_id}/builds/builds/{build_uuid}` until stopped. Require `build_outcome: success`; if failed, inspect `GET .../logs`.
4. Verify the new production deployment via `GET /accounts/{account_id}/workers/scripts/doaa-calibration/deployments` and inspect live HTTP endpoints and frontend assets. Confirm production D1 and scheduled trigger remain bound. Report the actual commit/version if verifiable, otherwise say it is unknown.
5. If failure occurs, diagnose and repair before retrying. Do not mistake a queued build for a deployed release.

## October 11, 2026 execution

Sage invoked the existing trigger directly, and Cloudflare accepted build `e16d9b86-735d-49c5-bd1d-ed48a2a49e30` at 2026-10-11 19:04:40 UTC. Outcome must be verified separately. Previous successful production build `cb8b005f-fe28-4132-842a-67c23df5729c` deployed version `f123ecee-af43-473b-b0d1-59e2259a391e` at 2026-10-11 02:48 UTC.

**Important:** A Cloudflare Worker deployment version and a Cloudflare Workers Build are distinct. Re-deploying an existing version does not build the latest GitHub source. Use the trigger API above.
