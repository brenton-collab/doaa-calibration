# DOAA · Rebuild Rebuild documentation index

**Current branch:** `rebuild/experience-v2` (“Rebuild Rebuild”), based on `rebuild/field-notes-foundation`.
**Status:** product direction and contract reconciliation recorded; design lab, V2 implementation and live verification pending. No production deployment or new spending authorized.


## Governing reuse and focus rule (2026-10-12)

DOAA-RR reconstructs the **experience**, not every DOAA component. Inspect inherited implementation and evidence before designing replacements; judge each capability **retain / refine / relocate / replace / retire** according to how it serves DOAA-RR. Retention is a positive engineering outcome, not a compromise. Preserve legitimate data, security and safety obligations. A new observation or attractive technical tangent does **not** automatically redirect the critical path: capture it, assess whether it is blocking or materially changes the next increment, and otherwise return to the current experience-validation objective. The assistant owns this prioritization discipline rather than requiring the creative director to police drift. In particular, the map inheritance and MET/NAV provisions inform the next interactive SKY Lab but do not authorize an unbounded cartographic redevelopment phase.

**Cold-start UX handoff (2026-10-12):** The approved UX sandbox is a sequence of **standalone, interactive HTML/CSS/JS toys**, not a permanent Lab application or an immediate product implementation. Sage creates/tests/delivers each artifact and records cumulative primitive decisions. Start with a cross-surface **relational Inspector toy** (CONTACT → Flight / Airframe / Airport, entered from representative SKY and BOARD), testing working links, Close/recovery and mobile layout. Read [Experience V2: UX sandbox delivery decision and cold-start execution contract](EXPERIENCE_V2.md) for exact tools, fidelity boundaries and current unverified status. Prior static SKY studies cannot validate pan/zoom; map-specific experiments must use genuine geometry. No production/billing changes.

## Read these first

1. [Experience V2 and HMI](EXPERIENCE_V2.md): current open-world, single relational Inspector; CONTACT wide aperture; visual/UX acceptance and Design Lab sequencing.
2. [Relational epistemology](RELATIONAL_EPISTEMOLOGY_CONTRACT.md): sources, retrieval, derivation, inference, calibrated assertion, BOARD timing and geographic progress requirements.
3. [Development system and workflow](DEVELOPMENT_SYSTEM_WORKFLOW.md): fourth coequal pillar; audit SDE/IDE, test duplication, previews, release promotion, rollback and canonical runbooks.
4. [Inherited-contract reconciliation](REBUILD_REBUILD_RECONCILIATION.md): explicit preservation/supersession register, including removal of required tabs, Back stack and generic Explore navigation.

## Inherited foundation: still applicable unless expressly superseded

- [Product and Field Notes UX](PRODUCT_UX_CONTRACT.md): SKY, BOARD, LOOK, AMBIENT, history, accessibility and visual history. **Legacy tab/Back/link-arrow prescriptions are superseded for V2.**
- [Evidence and security](DATA_AND_SECURITY_CONTRACT.md): D1 preservation, provenance, authentication, private accounts, sessions, migration protections.
- [Engineering and release](ENGINEERING_RELEASE_CONTRACT.md): module separation, infrastructure safety, quotas, tests, real deployment verification. **Legacy first-implementation and Back navigation gates are superseded.**
- [Understanding and reuse register](UNDERSTANDING_AND_REUSE_REGISTER.md): source/test/runtime classifications and unresolved checks.
- Historical `FIELD_NOTES_DECISIONS_2026-10-08.md`, `DOAA_SPEC.md`, `DEV_LOG.md` and related docs remain in the repository. Do not erase their historical decisions; record newer supersession explicitly.

## Immediate next gates

**Design:** co-design one visually polished, responsive Contact composition and relational Flight/Airframe/Airport transitions in a separate reusable-component Design Lab; test no-Back exploration, Close, subtle depth cues, accessibility, real interaction and calibrated presentation. Visual/HMI is not deferred behind data engineering.

**Evidence:** independently audit actual BOARD timing lookup and route+position progress, provider capabilities, data loss and missing derivation; document findings and tests before changing core services.

**Workflow:** audit the actual SDE/IDE, test suites, CI costs, preview lifecycle and production promotion path; consolidate into a tested runbook and reusable scripts rather than repeatedly rediscovering procedures.

**Delivery:** reuse approved lab components, integrate real normalized data, test actual authenticated flows and outages, deploy isolated preview only after safety/quota review. Do not treat a screenshot or build as completion.

---

## Inherited rebuild-branch index (historical)

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
