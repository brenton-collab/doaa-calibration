/* SKY projection and camera mathematics, independent of page layout and DOM.
 * Inputs are explicit so the same camera can be used by an embedded viewport.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAASkyViewportCamera=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 const rad=n=>n*Math.PI/180;
 const hav=(a,b,c,d)=>{const p1=rad(a),p2=rad(c),dp=rad(c-a),dl=rad(d-b),q=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return 2*3440.065*Math.asin(Math.sqrt(q))};
 function create({getView,getArea,getRange}){
  const view=()=>getView(),area=()=>getArea();
  function nmlon(){return 60*Math.cos(rad(view().cy))}
  function baseScale(){const a=area();return Math.min(a.w*.9,a.h*.94)/(getRange()*2)}
  function project(lat,lon){const v=view(),a=area(),s=baseScale()*v.zoom;return{x:a.cx+(lon-v.cx)*nmlon()*s,y:a.cy-(lat-v.cy)*60*s}}
  function unproject(x,y){const v=view(),a=area(),s=baseScale()*v.zoom;return{lon:v.cx+(x-a.cx)/s/nmlon(),lat:v.cy-(y-a.cy)/s/60}}
  function extent(){const a=area(),c=unproject(a.cx,a.cy),e=unproject(a.w,a.cy);return Math.max(1,Math.round(hav(c.lat,c.lon,e.lat,e.lon)))}
  function centered(active){const v=view();return hav(active.lat,active.lon,v.cy,v.cx)<Math.max(1,getRange()*.025)}
  return Object.freeze({nmlon,baseScale,project,unproject,extent,centered});
 }
 return Object.freeze({create});
});
