(()=>{
const MAP_BUILD='vector-1';
const old=document.getElementById('map');if(old)old.style.display='none';
const attr=document.querySelector('.attrib');if(attr)attr.textContent='GEOGRAPHY © OPENSTREETMAP CONTRIBUTORS';
const geo=document.createElement('canvas');geo.id='geo';geo.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0';
const sky=document.getElementById('sky');sky.parentNode.insertBefore(geo,sky);sky.style.zIndex='1';
const g=geo.getContext('2d');let features=[],ready=false,lastKey='';
const Q='[out:json][timeout:25];(way[waterway~"river|canal"](44.55,-76.70,46.05,-74.65);way[highway~"motorway|trunk|primary"](44.55,-76.70,46.05,-74.65););out geom;';
function classify(e){const t=e.tags||{};if(t.waterway){let n=(t.name||'').toLowerCase();return{kind:'water',major:/ottawa|outaouais/.test(n)?3:/rideau/.test(n)?2:1,name:t.name||''}}return{kind:'road',major:t.highway==='motorway'?3:t.highway==='trunk'?2:1,name:t.ref||t.name||''}}
function simplify(a,step){if(a.length<=3)return a;const out=[a[0]];for(let i=step;i<a.length-1;i+=step)out.push(a[i]);out.push(a[a.length-1]);return out}
async function load(){try{const u='https://overpass-api.de/api/interpreter?data='+encodeURIComponent(Q),r=await fetch(u),j=await r.json();features=(j.elements||[]).filter(e=>e.geometry?.length>1).map(e=>({pts:simplify(e.geometry,e.geometry.length>120?4:e.geometry.length>50?2:1),...classify(e)}));ready=true;drawGeo(true)}catch(e){console.warn('DOAA vector geography unavailable',e)}}
function path(f){g.beginPath();for(let i=0;i<f.pts.length;i++){let q=project(f.pts[i].lat,f.pts[i].lon);i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y)}g.stroke()}
function drawGeo(force=false){if(!ready)return;const key=[innerWidth,innerHeight,view.cx.toFixed(4),view.cy.toFixed(4),view.zoom.toFixed(3)].join(':');if(!force&&key===lastKey)return;lastKey=key;const d=devicePixelRatio||1;if(geo.width!==Math.round(innerWidth*d)||geo.height!==Math.round(innerHeight*d)){geo.width=Math.round(innerWidth*d);geo.height=Math.round(innerHeight*d);geo.style.width=innerWidth+'px';geo.style.height=innerHeight+'px'}g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,innerWidth,innerHeight);g.lineCap='round';g.lineJoin='round';
for(const f of features.filter(x=>x.kind==='road')){g.strokeStyle=f.major===3?'rgba(66,135,160,.34)':f.major===2?'rgba(54,112,134,.25)':'rgba(45,91,110,.17)';g.lineWidth=(f.major===3?1.15:f.major===2?.85:.55)*Math.min(1.7,Math.max(.8,view.zoom));path(f)}
for(const f of features.filter(x=>x.kind==='water')){g.shadowColor='rgba(25,190,235,.25)';g.shadowBlur=f.major===3?5:2;g.strokeStyle=f.major===3?'rgba(29,190,231,.78)':f.major===2?'rgba(38,172,211,.62)':'rgba(35,126,158,.32)';g.lineWidth=(f.major===3?7:f.major===2?3.6:1.15)*Math.min(1.8,Math.max(.85,view.zoom));path(f)}g.shadowBlur=0}
addEventListener('resize',()=>drawGeo(true));setInterval(drawGeo,120);load();
})();