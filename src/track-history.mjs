const response = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const integer = v => /^\d+$/.test(String(v || '')) && Number.isSafeInteger(Number(v)) ? Number(v) : null;
export async function trackHistory(request, env) {
  try { return await readTrackHistory(request, env); }
  catch { return response({ ok: false, error: 'Recorded observation service temporarily unavailable' }, 503); }
}
async function readTrackHistory(request, env) {
  if (!env.DB) return response({ ok: false, error: 'Observation database unavailable' }, 503);
  const u = new URL(request.url), hex = String(u.searchParams.get('hex') || '').toUpperCase();
  if (!/^[0-9A-F]{6}$/.test(hex)) return response({ ok: false, error: 'Valid ICAO24 required' }, 400);
  const requested = u.searchParams.get('encounter'), id = integer(requested);
  if (requested && !id) return response({ ok: false, error: 'Valid encounter required' }, 400);
  const encounter = await env.DB.prepare(`SELECT c.*,e.canonical_key FROM encounters c JOIN entities e ON e.id=c.entity_id WHERE e.kind='airframe' AND e.canonical_key=? ${id ? 'AND c.id=?' : ''} ORDER BY c.last_seen_at DESC,c.id DESC LIMIT 1`).bind(...(id ? [hex, id] : [hex])).first();
  if (!encounter) return response({ ok: true, found: false, observations: [], coverage: 'No DOAA encounter recorded for this identity' });
  if (u.searchParams.get('candidates') === '1') {
    const q = String(u.searchParams.get('q') || '').trim().toUpperCase().slice(0, 64), like = '%' + q.replace(/[\\%_]/g, '\\$&') + '%';
    const candidates = await env.DB.prepare(`SELECT c.id encounter_id,e.canonical_key hex,c.callsign,c.first_seen_at,c.last_seen_at,c.observation_count,
      (SELECT registration FROM observations o WHERE o.encounter_id=c.id AND registration IS NOT NULL ORDER BY observed_at DESC LIMIT 1) registration,
      (SELECT latitude FROM observations o WHERE o.encounter_id=c.id ORDER BY observed_at LIMIT 1) latitude,
      (SELECT longitude FROM observations o WHERE o.encounter_id=c.id ORDER BY observed_at LIMIT 1) longitude
      FROM encounters c JOIN entities e ON e.id=c.entity_id WHERE e.kind='airframe' AND e.canonical_key<>? AND c.observation_count>0 AND
      ${q ? "(UPPER(COALESCE(c.callsign,'')) LIKE ? ESCAPE '\\' OR e.canonical_key LIKE ? ESCAPE '\\' OR EXISTS(SELECT 1 FROM observations o WHERE o.encounter_id=c.id AND UPPER(COALESCE(o.registration,'')) LIKE ? ESCAPE '\\'))" : 'c.first_seen_at<=? AND c.last_seen_at>=?'}
      ORDER BY c.last_seen_at DESC,c.id DESC LIMIT 60`).bind(...(q ? [hex, like, like, like] : [hex, encounter.last_seen_at, encounter.first_seen_at])).all();
    return response({ ok: true, candidates: candidates.results || [], count_semantics: 'Up to 60 recorded encounters; not all traffic', source: 'DOAA recorded observations' });
  }
  const limit = Math.max(1, Math.min(2000, integer(u.searchParams.get('limit')) || 1000));
  const after = u.searchParams.get('after'), afterId = integer(u.searchParams.get('after_id')) || 0;
  if (after && (!Number.isFinite(Date.parse(after)) || new Date(after).toISOString() !== after)) return response({ ok: false, error: 'Canonical ISO cursor required' }, 400);
  const samples = await env.DB.prepare(`SELECT id,encounter_id,observed_at,latitude,longitude,altitude_ft,groundspeed_kt,track_deg,vertical_rate_fpm,squawk,callsign,type_code,registration,source_provider,received_at,on_ground,geometric_altitude_ft,heading_deg FROM observations WHERE encounter_id=? ${after ? 'AND (observed_at>? OR (observed_at=? AND id>?))' : ''} ORDER BY observed_at,id LIMIT ?`).bind(...(after ? [encounter.id, after, after, afterId, limit + 1] : [encounter.id, limit + 1])).all();
  const rows = samples.results || [], more = rows.length > limit, observations = rows.slice(0, limit), last = observations.at(-1);
  return response({ ok: true, found: true, encounter, observations, next: more ? { after: last.observed_at, after_id: last.id } : null,
    coverage: { kind: 'DOAA observed samples', complete_surveillance: false, sample_count: encounter.observation_count, gap_threshold_ms: 90000, support_ms: 30000,
      note: 'Samples are discrete observations. Sparse collection and reception gaps are not interpolated. Provider labels may be absent on older observations.' } });
}
