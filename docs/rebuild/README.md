# DOAA — Field Notes rebuild foundation

Status: **canonical rebuild-branch contracts, not a completed implementation**.
Branch: `rebuild/field-notes-foundation`. Source: `main` at branch creation, 2026-10-11.
This branch intentionally begins with the inherited source to preserve evidence and enable comparisons. **The existing UI and architecture are not approved as the new implementation.** No production deployment, remote D1 write, provider provisioning, or cost commitment is authorized by these documents.

## Authority and navigation
1. `FIELD_NOTES_DECISIONS_2026-10-08.md` is the historical product-decision record (184 indexed decisions, amendments and supersessions). Keep it intact.
2. `docs/rebuild/PRODUCT_UX_CONTRACT.md` is the new implementation-facing UX and Field Notes visual contract.
3. `docs/rebuild/DATA_AND_SECURITY_CONTRACT.md` defines evidence, account, authentication and provider boundaries. **Its password-login direction supersedes historical Google-only Decisions 103–105 by explicit user instruction on 2026-10-11.** Approval-only access and private account separation remain.
4. `docs/rebuild/ENGINEERING_RELEASE_CONTRACT.md` defines module boundaries, acceptance and safe deployment.
5. `docs/rebuild/UNDERSTANDING_AND_REUSE_REGISTER.md` distinguishes verified source facts, design intent, historical test evidence and unresolved live checks.

When a new instruction conflicts with an old decision, document the supersession and reason; do not silently erase the old record. A historic Work handoff is evidence of work performed, not proof of current production readiness.

## Immediate execution gate
Before writing new product code: check out this branch, inspect current tree and exact source hashes, verify account-schema migration inventory and deployed static-asset behavior in an isolated environment, and create a small vertical slice demonstrating signed-in SKY → Contact Inspector → back with genuine loading/empty/error behavior. Keep source changes and tests on this branch. Do not reuse production D1 as a development database.

## Status
Contracts recorded; implementation, authenticated live verification, multi-user administration, security regression and deployable new application remain outstanding. Zero incremental cost by default.
