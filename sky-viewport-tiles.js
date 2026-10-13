/* Inherited OSM fallback tile renderer, scoped to a SKY viewport instance. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAASkyViewportTiles=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 const rad=n=>n*Math.PI/180,deg=n=>n*180/Math.PI;
 function ll2tile(lat,lon,z){const n=2**z;return{x:(lon+180)/360*n,y:(1-Math.asinh(Math.tan(rad(lat)))/Math.PI)/2*n}}
 function tile2ll(x,y,z){const n=2**z;return{lon:x/n*360-180,lat:deg(Math.atan(Math.sinh(Math.PI*(1-2*y/n))))}}
 function create({ctx,project,unproject,extent,area,imageFactory,onInvalidate}){
  const cache=new Map();let destroyed=false;
  function draw({width,height,mode='base',vectorReady=false}){
   if(destroyed)throw new Error('SKY tiles destroyed');
   ctx.clearRect(0,0,width,height);ctx.fillStyle='#f3f5f5';ctx.fillRect(0,0,width,height);
   const e=extent(),z=e<=12?11:e<=25?10:e<=50?9:e<=80?8:7,a=area();
   const nw=unproject(-256,a.top-256),se=unproject(a.w+256,height-a.bottom+256);
   const t0=ll2tile(nw.lat,nw.lon,z),t1=ll2tile(se.lat,se.lon,z);
   let drawn=0,pending=0;
   for(let x=Math.floor(t0.x);x<=Math.floor(t1.x);x++)for(let y=Math.floor(t0.y);y<=Math.floor(t1.y);y++){
    const key=`${mode}/${z}/${x}/${y}`;let im=cache.get(key);
    if(!im){
     im=imageFactory();im.crossOrigin='anonymous';
     im.onload=()=>{if(!destroyed)onInvalidate()};
     im.onerror=()=>{im.bad=true;if(!destroyed)onInvalidate()};
     im.src=`https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
     cache.set(key,im);pending++;continue;
    }
    if(im.bad)continue;
    if(!im.complete){pending++;continue}
    if(!im.naturalWidth||!im.naturalHeight)continue;
    const p0=tile2ll(x,y,z),p1=tile2ll(x+1,y+1,z),q0=project(p0.lat,p0.lon),q1=project(p1.lat,p1.lon);
    ctx.drawImage(im,q0.x,q0.y,q1.x-q0.x,q1.y-q0.y);drawn++;
   }
   const state=drawn?'READY':pending?'LOADING':'UNAVAILABLE';
   return mode==='base'&&vectorReady?'BASE · © OPENSTREETMAP / OPENFREEMAP':mode==='base'?`BASE FALLBACK · ${state} · © OPENSTREETMAP CONTRIBUTORS`:`STREET · ${state} · © OPENSTREETMAP CONTRIBUTORS`;
  }
  return Object.freeze({draw,destroy(){destroyed=true;for(const im of cache.values()){im.onload=null;im.onerror=null}cache.clear()}});
 }
 return Object.freeze({create});
});
