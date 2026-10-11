# Airport weather presentation contract

Primary source reviewed 2026-10-11: [NOAA Aviation Weather Center API](https://aviationweather.gov/data/api/) and its [OpenAPI schema](https://aviationweather.gov/data/schema/openapi.yaml).

`/api/airport` retrieves METAR only. It handles HTTP 204 as a successful absence of observations, selects the latest matching `icaoId`, and adds retrieval time and source attribution. Upstream failure remains an error, distinct from successful no-data. It does not make paid provider calls. Weather does not establish airport operational status, ground-surface condition or active runway.

| Source field | Canonical interpretation | Display treatment |
|---|---|---|
| `obsTime` | Unix seconds, observation time | UTC; unavailable or invalid time stays unknown |
| `wdir` | True degrees, or `VRB` | Explicit true/variable/unknown direction; 0 degrees remains valid |
| `wspd`, `wgst` | Knots | Shared speed preference; reported zero speed displays calm |
| `visib` | Statute miles, with `10+` meaning greater than 10 SM | Convert the numeric lower bound, preserve `>` |
| `clouds[].base` | Feet above the station | Lowest BKN/OVC/obscured ceiling; incomplete data stays unknown |
| `temp`, `dewp` | Celsius | Independent temperature preference; zero is a real measurement |
| `altim` | Altimeter setting in hPa | Independent pressure preference; never relabel as sea-level pressure |
| `fltCat` | Source flight category | Display source VFR/MVFR/IFR/LIFR; absent category stays unknown |
| `rawOb` | Original METAR | Escaped, unchanged report in an accessible disclosure |

DOAA's **display freshness rule**, rather than an issuing-authority validity statement: reports older than 90 minutes are labelled stale; reports over one minute ahead of the current clock receive a future-time warning. No stale value is silently relabelled current. Acquisition/retry failures are visible. No TAF forecast is mixed into observed weather.

The map and relationship paths use the same Airport Inspector. Movements consumes the same `/api/board` evidence as BOARD, including its reported-route and track-inference qualifications. Links do not manufacture confirmed landings, runway assignments, encounters or positions. Missing runway geometry, authority notices, condition reports, published schedules and movement chronology remain explicit implementation gaps in the decision matrix.

Verification: executed endpoint tests exercise 204, station matching/latest report, bad identifier and upstream failure; decoder tests exercise missing values, zero, variable wind, cloud layers, lower-bound visibility and time states. Responsive browser acceptance is recorded separately with exact frontend hashes. Fixtures are local-only and are not evidence of current provider availability or actual signed-in Preview acceptance.
