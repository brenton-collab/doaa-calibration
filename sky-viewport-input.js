/* Reusable SKY pointer/pinch/wheel interaction controller.
 * Owns listener lifecycle; the host owns camera state, hit-testing and acquisition.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAASkyViewportInput=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 function mount({element,getView,scale,nmlon,onNavigate,onTap,onSettle}){
  if(!element?.addEventListener||!element?.removeEventListener)throw new TypeError('SKY input requires an event target');
  const pointers=new Map();let moved=false,pinch=null,destroyed=false;
  const clamp=z=>Math.max(.22,Math.min(8,z));
  function down(e){element.setPointerCapture?.(e.pointerId);moved=false;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY});}
  function move(e){
   const p=pointers.get(e.pointerId);if(!p)return;
   const dx=e.clientX-p.x,dy=e.clientY-p.y;
   if(Math.hypot(e.clientX-p.sx,e.clientY-p.sy)>7)moved=true;
   p.x=e.clientX;p.y=e.clientY;
   const view=getView();
   if(pointers.size===1&&moved){view.cx-=dx/scale()/nmlon();view.cy+=dy/scale()/60;onNavigate();}
   if(pointers.size===2){const ps=[...pointers.values()],d=Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y);if(!pinch)pinch={d,z:view.zoom};else{view.zoom=clamp(pinch.z*d/pinch.d);onNavigate();}}
  }
  function up(e){const p=pointers.get(e.pointerId);pointers.delete(e.pointerId);if(pointers.size<2)pinch=null;if(!moved&&p)onTap(e.clientX,e.clientY);else onSettle();}
  function wheel(e){e.preventDefault();const view=getView();view.zoom=clamp(view.zoom*Math.exp(-e.deltaY*.001));onNavigate();onSettle();}
  const listeners=[['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',up],['wheel',wheel,{passive:false}]];
  for(const [name,fn,options] of listeners)element.addEventListener(name,fn,options);
  return Object.freeze({destroy(){if(destroyed)return;destroyed=true;for(const [name,fn,options] of listeners)element.removeEventListener(name,fn,options);pointers.clear();pinch=null;}});
 }
 return Object.freeze({mount});
});
