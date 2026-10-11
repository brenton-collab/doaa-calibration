# Production release checkpoint — 2026-10-11 19:18 UTC

Production URL: https://doaa-calibration.brenton-7e6.workers.dev

## Source and deployment
- Merged Work PR #48 (work/product-recovery-mobile-sky) into main as commit `98f05cd7b63ff7836903ec30b08b135d08f0d72b`.
- Manually invoked existing Cloudflare Workers Builds trigger `43f49d95-bd33-42ff-b0f8-33bd350d4ccc` for main.
- Build UUID `7228334b-6bb0-4d45-b15f-065d6e7800df` stopped with success.
- Production deployment `2e2d3a60-33f7-44ca-8086-dc279fed65f7`, version `49d9c1f4-b7aa-4a27-b437-194156fb8a7c`, 100% traffic.
- Build packaged 23 allowlisted frontend assets; Worker DB and ASSETS bindings, five-minute cron retained.
- Build metadata did not report a source SHA; merged main was the target and 23 assets confirm the newer package, but exact checkout SHA is not independently proven.

## Production D1 schema actions
Database `doaa-memory`, ID `434f90d3-397b-48d3-8249-4c48cf1e8936`.
- Read-only inspection found the `d1_migrations` ledger records only `0001`, although existing columns and indexes demonstrate portions of 0002–0008 had already been applied. Do **not** blindly rerun migrations from the ledger.
- Applied quota_admissions table from 0010, five additive observation columns from 0011, all account/personal tables and indexes from 0012, and airport-reference tables/index from 0013, through Cloudflare D1 SQL API. Every statement returned success.
- Did **not** execute destructive historical cleanup from 0002, 0005, or 0007. No historical observation or encounter rows were deliberately deleted or reassigned.
- Verified key new tables through read-only sqlite_master query. The migration ledger remains unreconciled; future migration tools must not treat it as an authoritative indication that 0002–0013 are absent.
- No airfield reference import was run. No paid providers activated.

## Acceptance and outstanding verification
- Work branch reports 152 passing Node tests and offline browser acceptance at four viewport sizes; see docs/RELEASE_RC_CHECKPOINT.md and docs/qa.
- Cloudflare confirms production build success and deployment. Live browser/API smoke test is **not verified**: external web fetch of Worker URL failed in the assistant environment.
- Account sign-in requires separate OAuth configuration/approved subjects; private authenticated Preview acceptance remains outstanding.
- Confirm real live frontend, API responses, quota behavior, and sign-in before claiming complete end-to-end acceptance.
- Rollback prior production version: `b85d5cf2-8824-47ef-ab25-d02137b16ad3`. Schema changes are additive and need not be rolled back to revert code.
