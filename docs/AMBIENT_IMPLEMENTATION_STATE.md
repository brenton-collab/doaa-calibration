# DOAA AMBIENT implementation checkpoint
2026-10-10. Branch: work/immutable-frontend-release. Not merged, deployed or runtime-accepted.

## Implemented on branch
- Ambient SKY: separate full-screen quiet dark display with a radar-like 80-NM observation reference, current observed aircraft positions, heading markers, freshness and counts. Reads the existing frontend observation snapshot; no extra API calls.
- Manual AMBIENT SKY / AMBIENT SLIDES choice, persisted locally; no automatic mode switching.
- Optional five-minute idle entry, persistent preference, touch/keyboard return to interactive SKY, reduced-motion stylesheet and mobile layout.
- AMBIENT SLIDES: layout, exact-registration/licensing/attribution media guard, and an honest no-verified-photo state. No per-slide provider calls. The current snapshot does not yet carry licensed photo metadata, so real-photo rotation is not yet implemented or accepted.
- Bundled frontend release-boundary fix and automated static contract test files; deployment syntax gate references both.
- Source/configuration checks verified by reading the branch through GitHub; no Node execution or browser validation performed.

## Known gaps
- The AMBIENT SKY display is an independent minimal cartographic projection, not yet the same map geometry and layer styling as interactive SKY. It uses aircraft coordinates from the shared snapshot.
- Stale/fresh observation age depends on the existing SKY 'now' timestamp; validate semantics under failed refresh and cached data.
- AMBIENT SLIDES needs a properly licensed, cached, exact-airframe photo adapter and event-driven selection across current and recently observed flights.
- Old tablet idle, touch return, focus management and burn-in tests remain.
- LOOK implementation is not included in this tranche. An attempted LOOK edit was blocked by a safety check; no claim of completion.
- Full repository test suite and local preview have not been run; do not merge or deploy on the basis of source checks alone.

## Next integrated work
Validate runtime syntax and UI flows; add reusable media evidence contract and event-driven slides; integrate LOOK and Inspector navigation; ensure BOARD coverage and freshness labels. Preserve production isolation and avoid metered provider requests.
