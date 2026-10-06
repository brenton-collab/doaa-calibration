const SOURCES=[
  {name:'ADSB.LOL',url:(lat,lon,dist)=>`https://api.adsb.lol/v2/point/${lat}/${lon}/${dist}`},
  {name:'ADSB.FI',url:(lat,lon,dist)=>`https://opendata.adsb.fi/api/v2/lat/${lat}/lon/${lon}/dist/${dist}`}
];
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
async function getTraffic(lat,lon,dist){
  const errors=[];
  for(const source of SOURCES){
    try{
      const r=await fetch(source.url(lat,lon,dist),{headers:{'User-Agent':'DOAA/0.1 Ottawa aviation display'}});
      if(!r.ok)throw new Error(`${r.status}`);
      const j=await r.json();
      return {ok:true,provider:source.name,now:Date.now(),aircraft:j.ac||j.aircraft||[]};
    }catch(e){errors.push(`${source.name}: ${e.message}`)}
  }
  return {ok:false,now:Date.now(),aircraft:[],errors};
}
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','access-control-allow-origin':'*'}});
export default {
  async fetch(request,env){
    const u=new URL(request.url);
    if(u.pathname==='/api/health')return json({ok:true,service:'DOAA',time:new Date().toISOString()});
    if(u.pathname==='/api/traffic'){
      const lat=Number(u.searchParams.get('lat')||45.37094),lon=Number(u.searchParams.get('lon')||-75.70229),dist=clamp(Number(u.searchParams.get('dist')||45),1,80);
      const data=await getTraffic(lat,lon,dist);
      return json(data,data.ok?200:502);
    }
    return env.ASSETS.fetch(request);
  },
  async scheduled(controller,env,ctx){
    // Day-one heartbeat. D1 persistence will be bound after the live API is verified.
    ctx.waitUntil(getTraffic(45.3225,-75.6692,45));
  }
};