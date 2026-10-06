const SOURCES=[
  // adsb.fi v3 is the current geographic endpoint; v2 lat/lon is deprecated.
  {name:'ADSB.FI',url:(lat,lon,dist)=>`https://opendata.adsb.fi/api/v3/lat/${lat}/lon/${lon}/dist/${dist}`},
  {name:'ADSB.ONE',url:(lat,lon,dist)=>`https://api.adsb.one/v2/point/${lat}/${lon}/${dist}`},
  {name:'ADSB.LOL',url:(lat,lon,dist)=>`https://api.adsb.lol/v2/point/${lat}/${lon}/${dist}`}
];
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const CACHE_SECONDS=15;
async function getTraffic(lat,lon,dist){
  const errors=[];
  for(const source of SOURCES){
    try{
      const r=await fetch(source.url(lat,lon,dist),{headers:{'Accept':'application/json'}});
      if(!r.ok)throw new Error(`${r.status}`);
      const j=await r.json();
      return {ok:true,provider:source.name,now:Date.now(),aircraft:j.ac||j.aircraft||[]};
    }catch(e){errors.push(`${source.name}: ${e.message}`)}
  }
  return {ok:false,now:Date.now(),aircraft:[],errors};
}
const json=(data,status=200,cache='no-store')=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':cache,'access-control-allow-origin':'*'}});
export default {
  async fetch(request,env,ctx){
    const u=new URL(request.url);
    if(u.pathname==='/api/health')return json({ok:true,service:'DOAA',time:new Date().toISOString()});
    if(u.pathname==='/api/traffic'){
      const lat=Number(u.searchParams.get('lat')||45.37094),lon=Number(u.searchParams.get('lon')||-75.70229),dist=clamp(Number(u.searchParams.get('dist')||45),1,80);
      // Collapse all viewers onto one Ottawa snapshot instead of hitting providers per client.
      const cache=await caches.open('doaa-traffic-v1');
      const key=new Request(`${u.origin}/__cache/traffic?lat=${lat.toFixed(3)}&lon=${lon.toFixed(3)}&dist=${Math.round(dist)}`);
      const hit=await cache.match(key);
      if(hit)return hit;
      const data=await getTraffic(lat,lon,dist);
      const response=json(data,data.ok?200:502,data.ok?`public, max-age=${CACHE_SECONDS}`:'no-store');
      if(data.ok)ctx.waitUntil(cache.put(key,response.clone()));
      return response;
    }
    return env.ASSETS.fetch(request);
  },
  async scheduled(controller,env,ctx){
    // Background observation remains deliberately slow. Persistence comes next.
    ctx.waitUntil(getTraffic(45.3225,-75.6692,45));
  }
};