# DOAA-RR · Development system and workflow evaluation

Status: **fourth independent workstream, evaluation contract; not yet an approved implementation workflow**. Recorded 2026-10-12.

## Why this exists

DOAA development has repeatedly rediscovered environment setup, release and promotion methods; created overlapping tests and previews; lost continuity across sessions; and sometimes spent more effort on successive validation rounds than their additional confidence justified. The software-development environment (SDE), integrated development environment (IDE), toolchain, testing, deployment and promotion process are **part of the product's maintainable architecture**, not incidental chores.

The aim is a reproducible, economical, reliable, comprehensible system that Sage can operate without repeatedly transferring routine developer work to Brent.

## Four coequal DOAA-RR workstreams

1. **SKY audit:** actual canvas, functions, visual hierarchy, interactions and accumulated complexity.
2. **UX Design Lab:** interactive visual language, HMI and relational Inspector compositions.
3. **Epistemological evaluation:** sources, investigation, claims, provenance, derivation and inference.
4. **Development system and workflow:** toolchain, canonical environments, preview/release lifecycle, testing, CI, promotion and durable project truth.

The fourth workstream enables the others; it must not become an infrastructure project that delays product design. Evaluate actual practice before prescribing a new stack or elaborate process.

## Audit requirements

- Inventory current local/remote SDE and IDE, repository branches, tooling, available GitHub/Cloudflare/Render capabilities, automation, credentials boundaries, build scripts, migrations, deployments and preview URLs. Distinguish documented claims from verified runtime state.
- Trace the **actual path from idea → design experiment → accepted component → implementation → focused tests → preview → acceptance → production promotion → rollback**. Identify where steps are ambiguous, manual, duplicated, brittle or forgotten.
- Inventory existing test suites and fixtures, their overlap, ownership, execution time, cost, coverage and past failure-detection value. Reuse or consolidate rather than creating a fresh suite for every feature.
- Inventory existing previews, D1 bindings, Worker names, relay deployment triggers and branch protections. Identify lifecycle and cleanup rules before provisioning anything new; avoid accidental Render auto-deploy from `main`.
- Document how to promote an approved commit to production, including version/asset provenance, migration review, backups, secrets, smoke tests and rollback. **Do not perform production promotion during this audit.**
- Review CI minute usage and available free-tier quotas before selecting hosted automation. Prefer local deterministic tests and targeted/manual CI; no speculative matrices or unnecessary deploys.
- Identify how a new conversation or developer can resume from repository README, current state, decisions, verified checks, known issues and next actions without relying on chat history.

## Intended deliverables (after evidence gathering)

- **Canonical developer runbook:** one short entry point for routine build, test, preview, deploy, promote and recover workflows.
- **Environment matrix:** development, Design Lab, isolated preview and production, with clear data boundaries, URLs, ownership, cost exposure and deployment triggers.
- **Test strategy:** existing authoritative suites mapped to risks, fast change-scoped checks, integration/visual checks at appropriate gates, and explicit stop criteria against diminishing-return validation.
- **Release and rollback protocol:** a repeatable, verifiable promotion path with smoke checks and data-protection rules.
- **Durable project state:** README, decision log, architecture, environment requirements (no secrets), tested capabilities, known issues and next actions maintained alongside code.
- **Reusable automation:** scripts/configuration only where they eliminate recurring friction and can be tested safely; no elaborate framework for its own sake.

## Acceptance criteria

A fresh thread can identify the canonical state and next step quickly. A small change can be built and checked without unnecessary hosted CI. A Design Lab component has a defined path into the app. A preview is isolated and has an owner and retirement rule. Production promotion and rollback are documented and exercised safely in a non-production context before real use. Tests are risk-proportionate and do not silently multiply. No new paid infrastructure or production mutation occurs without approval.

## Immediate next action

Inspect existing repository scripts, GitHub workflows, documentation, Cloudflare/Render configuration and available deployment history **read-only**; publish a findings-based workflow map and specific consolidation recommendations. Then choose the smallest useful improvements. This contract records the intent, not a claim that the workflow has been audited or fixed.
