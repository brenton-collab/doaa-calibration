# CONTACT telemetry coverage and presentation contract

Status: design/evidence mapping, not proof of field availability on a typical live aircraft. 2026-10-13.
Branch: rebuild/experience-v2. No provider calls, hosted builds, or production changes made for this record.

## Existing acquisition path
`relay.js` obtains `ac` or `aircraft` arrays from ADSB.FI v3, ADSB.ONE v2 and ADSB.LOL v2 in fallback order; `sourceFetch` filters on `seen_pos`/`seen` freshness and forwards **the original aircraft objects** in `aircraft`. `sky-observations.js` spreads the raw record into the accepted observation. Therefore rich source fields can survive the current path; actual provider-by-provider coverage, persistence, and frontend use still require verification. The standalone SKY design harness is not a live feed.

## Candidate field map for dump1090/readsb/tar1090-style aircraft records
These names are candidates from the common decoder family, not a guarantee that every source returns each property. Test against sanitized captured provider responses before locking the mapper.

| Cluster | Candidate raw fields | Display / interpretation |
| --- | --- | --- |
| Identification | `hex`, `flight`, `squawk`, `category`, `type` | ICAO24, transmitted callsign, Mode A squawk, aircraft category, position/source class |
| Position | `lat`, `lon`, `seen_pos`, `nic`, `rc` | Coordinates, position age, navigation integrity category, containment radius when supported |
| Altitude | `alt_baro`, `alt_geom`, `baro_rate`, `geom_rate` | Pressure altitude, GNSS altitude, barometric/geometric vertical rate; `alt_baro: "ground"` is not zero |
| Velocity | `gs`, `track`, `track_rate`, `tas`, `ias`, `mach`, `mag_heading`, `true_heading`, `roll` | Groundspeed, ground track, turn rate, true/indicated airspeed, Mach, headings, bank |
| Targets / status | `nav_altitude_mcp`, `nav_altitude_fms`, `nav_heading`, `nav_qnh`, `nav_modes`, `emergency` | Selected targets and modes when decoded; NOT ATC clearance or proof of autopilot engagement |
| Surveillance quality | `version`, `nac_p`, `nac_v`, `sil`, `sil_type`, `sda`, `gva`, `nic_baro` | ADS-B protocol and integrity/accuracy indicators; only when supplied |
| Reception | `seen`, `messages`, `rssi`, `mlat`, `tisb` | Message age, count, signal metric, source/MLAT/TIS-B indications; source may suppress these |
| Observation geometry | local observation reference, position and track | Calculated distance, bearing, and history with explicit reference and timestamps; not aircraft transmissions |

## Inspector rendering rules
1. CONTACT is the wide-aperture observation focus: photo-led hero, identity and state, one integrated route/times OVERVIEW only when association and times are supported, followed by dense **Telemetry**.
2. Render high-yield fields by default when present: position, both altitudes, groundspeed, track, vertical rate, squawk, ICAO24, callsign, source, freshness, category and quality. Add richer values (IAS/TAS/Mach, headings, selected targets, modes, integrity, reception) inline or in compact expandable technical groups **only if observed**.
3. No permanently empty placeholders, invented values, speculative ATC assignments or meaningless badges. A data-dense record should look data-dense; a sparse record should not be padded.
4. Every displayed value must retain source, observed time, unit, and raw-field identity in its view model. Field-level inspection should reveal concise definitions and evidence; content links may lead to related Flight/Airframe/Airport focus.
5. Distinguish reported, derived, and enriched data. Never conflate track with heading, geometric with pressure altitude, selected altitude with clearance, or `seen` with `seen_pos`.
6. Do not label any fixture as live. Validate realistic average and high-information records separately using representative sanitized payloads. Accessibility, keyboard, responsive density, and missing-field reflow are acceptance gates.

## Next engineering increment
Inspect actual provider samples or preserved raw observations without incurring billable requests; record field presence across a representative mix of contacts. Implement a pure normalized telemetry view-model adapter with unit and timestamp tests; wire the interactive CONTACT Design Lab to that adapter. Test mixed sparse/rich records, source changes, and stale data. Do not promote until visual/browser verification and evidence provenance are complete.
