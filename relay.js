const http = require('http');

const PORT = process.env.PORT || 10000;
const CYOW = { lat: 45.3225, lon: -75.6692 };
const SOURCES = [
  { name: 'ADSB.FI', url: d => `https://opendata.adsb.fi/api/v3/lat/${CYOW.lat}/lon/${CYOW.lon}/dist/${d}` },
  { name: 'ADSB.ONE', url: d => `https://api.adsb.one/v2/point/${CYOW.lat}/${CYOW.lon}/${d}` },
  { name: 'ADSB.LOL', url: d => `https://api.adsb.lol/v2/point/${CYOW.lat}/${CYOW.lon}/${d}` }
];
const UA = 'DOAA-Ottawa-Aviation/1.0 (+https://github.com/brenton-collab/doaa-calibration)';
const TIMEOUT = 3500;
let cache = null;
let cacheAt = 0;
let inFlight = null;
const CACHE_MS = 30000;

async function sourceFetch(source, dist) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const r = await fetch(source.url(dist), { headers: { Accept: 'application/json', 'User-Agent': UA }, signal: controller.signal });
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    return { ok: true, relay: 'render-1', provider: source.name, now: Date.now(), aircraft: j.ac || j.aircraft || [] };
  } finally { clearTimeout(timer); }
}

async function acquire(dist) {
  const errors = [];
  for (const source of SOURCES) {
    try { return await sourceFetch(source, dist); }
    catch (e) { errors.push(`${source.name}: ${e.name === 'AbortError' ? 'TIMEOUT' : e.message}`); }
  }
  return { ok: false, relay: 'render-1', now: Date.now(), aircraft: [], errors };
}

async function traffic(dist) {
  if (cache && Date.now() - cacheAt < CACHE_MS) return { ...cache, cached: true };
  if (!inFlight) inFlight = acquire(dist).then(x => { if (x.ok) { cache = x; cacheAt = Date.now(); } return x; }).finally(() => { inFlight = null; });
  return inFlight;
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://${req.headers.host}`);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (u.pathname === '/health') return res.end(JSON.stringify({ ok: true, service: 'DOAA ADS-B Relay', build: 'render-1' }));
  if (u.pathname !== '/traffic') { res.statusCode = 404; return res.end(JSON.stringify({ ok: false, error: 'not found' })); }
  const dist = Math.max(1, Math.min(80, Number(u.searchParams.get('dist') || 45)));
  try {
    const data = await traffic(dist);
    res.statusCode = data.ok ? 200 : 502;
    res.setHeader('Cache-Control', data.ok ? 'public, max-age=30' : 'no-store');
    res.end(JSON.stringify(data));
  } catch (e) {
    res.statusCode = 502;
    res.end(JSON.stringify({ ok: false, relay: 'render-1', error: e.message }));
  }
});
server.listen(PORT, '0.0.0.0', () => console.log(`DOAA relay listening on ${PORT}`));
