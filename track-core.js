(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DOAATrackCore = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const numeric = v => v == null || v === '' || !Number.isFinite(Number(v)) ? null : Number(v);
  const time = v => typeof v === 'number' ? v : Date.parse(v);
  function normalize(rows) {
    const points = [];
    for (const r of rows || []) {
      const t = time(r.observed_at ?? r.t), lat = numeric(r.latitude ?? r.lat), lon = numeric(r.longitude ?? r.lon);
      if (!Number.isFinite(t) || lat == null || lon == null || Math.abs(lat) > 90 || Math.abs(lon) > 180) continue;
      points.push({ ...r, t, lat, lon, alt: numeric(r.altitude_ft ?? r.alt), gs: numeric(r.groundspeed_kt ?? r.gs),
        track: numeric(r.track_deg ?? r.track), heading: numeric(r.heading_deg), vr: numeric(r.vertical_rate_fpm),
        source: r.source_provider || r.source || null });
    }
    points.sort((a, b) => a.t - b.t || (numeric(a.id) || 0) - (numeric(b.id) || 0));
    return points;
  }
  function windowFor(tracks) {
    const starts = tracks.filter(t => t.length).map(t => t[0].t), ends = tracks.filter(t => t.length).map(t => t.at(-1).t);
    return starts.length ? { start: Math.min(...starts), end: Math.max(...ends) } : null;
  }
  // Step observations only. The age is always shown; this never creates an intermediate position.
  function sampleAt(points, cursor, supportMs = 30000) {
    let lo = 0, hi = points.length - 1, found = -1;
    while (lo <= hi) { const mid = (lo + hi) >> 1; if (points[mid].t <= cursor) { found = mid; lo = mid + 1; } else hi = mid - 1; }
    if (found < 0) return null;
    const p = points[found], ageMs = cursor - p.t;
    return ageMs <= supportMs && cursor <= points.at(-1).t ? { point: p, ageMs } : null;
  }
  function segments(points, gapMs = 90000) {
    const out = []; let segment = [];
    for (const p of points) { if (segment.length && (p.t - segment.at(-1).t > gapMs || p.encounter_id !== segment.at(-1).encounter_id)) { out.push(segment); segment = []; } segment.push(p); }
    if (segment.length) out.push(segment);
    return out;
  }
  // Literal observation changes only; these are not inferred operational milestones.
  function events(points) {
    const out=[];
    for(let i=1;i<points.length;i++){
      const before=points[i-1],after=points[i];
      if(after.t-before.t>90000||before.encounter_id!==after.encounter_id)continue;
      for(const [field,label] of [['callsign','Callsign'],['squawk','Transponder code'],['on_ground','Ground report']]){
        if(before[field]==null||after[field]==null||before[field]===after[field])continue;
        out.push({t:after.t,label:label+' changed: '+String(before[field])+' → '+String(after[field]),observation_id:after.id});
      }
    }
    return out;
  }
  class Clock {
    constructor(start, end) { this.start = start; this.end = end; this.cursor = start; this.speed = 1; this.playing = false; this.loop = false; this.last = null; }
    seek(value) { this.cursor = Math.max(this.start, Math.min(this.end, Number(value))); this.last = null; }
    play() { if (this.cursor >= this.end) this.seek(this.start); this.playing = this.end > this.start; this.last = null; }
    pause() { this.playing = false; this.last = null; }
    advance(monotonicMs) {
      if (!this.playing) return this.cursor;
      if (this.last == null) { this.last = monotonicMs; return this.cursor; }
      const delta = Math.max(0, monotonicMs - this.last); this.last = monotonicMs;
      const next = this.cursor + delta * this.speed, duration = this.end - this.start;
      if (next >= this.end) { if (this.loop && duration > 0) this.cursor = this.start + (next - this.start) % duration; else { this.cursor = this.end; this.pause(); } }
      else this.cursor = next;
      return this.cursor;
    }
  }
  function rankCandidates(candidates, range, first) {
    const distance = p => { if (!first || p.latitude == null || p.longitude == null) return Infinity; const dy = (p.latitude - first.lat) * 60, dx = (p.longitude - first.lon) * 60 * Math.cos(first.lat * Math.PI / 180); return Math.hypot(dx, dy); };
    return candidates.map(c => ({ ...c, overlap: time(c.first_seen_at) <= range.end && time(c.last_seen_at) >= range.start, distance_nm: distance(c) }))
      .sort((a, b) => Number(b.overlap) - Number(a.overlap) || a.distance_nm - b.distance_nm || time(b.last_seen_at) - time(a.last_seen_at));
  }
  return { numeric, normalize, windowFor, sampleAt, segments, events, Clock, rankCandidates };
});
