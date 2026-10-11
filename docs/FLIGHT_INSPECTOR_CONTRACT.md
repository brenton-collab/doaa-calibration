# Flight and Airframe Inspector evidence contract

`flight-core.js` is the shared pure model; `inspector-flight.js` renders it; `flight-enrichment.js` connects objects, cache ownership and navigation. `src/worker.js` normalizes free provider facts and performs the bounded read-only dossier path.

Timing requires a full date and explicit time zone. Missing, invalid, time-only and unzoned values remain unresolved. Departure and arrival punctuality use compatible event bases; actual wins over estimated. Generic departure time is not takeoff. Scheduled arrival is not an estimated remaining duration. Future actual events are unverified.

Current telemetry requires a recent timestamp, not merely membership in a live array. Ground status is explicit; vertical trend is a reported trend rather than an invented flight phase. Heading and ground track, barometric and geometric altitude, unknown and zero remain independent. Historical Contact carries only recorded encounter facts, and live updates cannot replace it.

Airport mini-map coordinates come from the provider's origin/destination coordinates. The connector is schematic route geography, not a flight plan or observed track. A route fraction additionally requires an explicitly established current assignment, fresh position and reasonable along/cross-track geometry. Airport association alone establishes none of those facts.

Airframe fields preserve active conflicting claims and their provenance. Undated identity facts are not dated BIO milestones; retrieval time is not an event date. Last DOAA sighting is not latest operated flight. Recorded reception windows do not establish completed flights or adjacency.

Dossier reads are account-scoped, bounded, coalesced and reused for five minutes. Rack summaries do not acquire dossiers. The Worker dossier path reads memory/history once and performs at most one free combined lookup, with a four-second timeout and 256 KiB response bound. It does not ingest claims, research media, queue history leads or write the database. Existing deliberate research endpoints require separate review; this is not a global GET purity claim.

Provider schema reference: https://github.com/mrjackwills/adsbdb . Operational assignment and schedules are not supplied by inference from its route association.

Tests: `tests/flight-core.test.cjs`, `tests/inspector-read-budget.test.mjs`, Inspector context tests and the four-viewport browser fixture harness. Real provider, signed-in Preview and physical phone acceptance remain distinct release gates.
