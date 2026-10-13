/* SKY selection hit testing. Coordinates use the viewport's own projection. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAASkyViewportHit=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 function hit({x,y,aircraft,airports,project,inView,radius=20}){
  let best=null,bd=radius;
  for(const a of aircraft.filter(q=>!q.ground&&inView(q))){
   const p=project(a.lat,a.lon),d=Math.hypot(p.x-x,p.y-y);
   if(d<bd){bd=d;best={type:'aircraft',id:a.id}}
  }
  if(best)return best;
  bd=radius;
  for(const ap of airports){
   const p=project(ap.lat,ap.lon),d=Math.hypot(p.x-x,p.y-y);
   if(d<bd){bd=d;best={type:'airport',ap}}
  }
  return best;
 }
 return Object.freeze({hit});
});
