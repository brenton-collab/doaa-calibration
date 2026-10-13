/* Extracted verbatim from inherited SKY graticule and graduated range-ring renderer.
 * The host supplies geometry and canvas context. No DOM, network, or Inspector dependencies.
 * Maintain drawing parity when refining ring visibility.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAASkyViewportGeometry=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 function drawGraticule({ctx,area,unproject,project,view,innerHeight}){
 const a=area(),top=a.top,bottom=innerHeight-a.bottom;
 const nw=unproject(0,top),se=unproject(a.w,bottom);
 const latSpan=Math.abs(nw.lat-se.lat),lonSpan=Math.abs(se.lon-nw.lon);
 const intervals=[1/60,2/60,5/60,10/60,15/60,30/60,1,2,5,10];
 const latStep=intervals.find(v=>latSpan/v<=7)||10;
 const lonStep=intervals.find(v=>lonSpan/v<=7)||10;
 ctx.save();ctx.beginPath();ctx.rect(0,top,a.w,bottom-top);ctx.clip();
 ctx.strokeStyle='rgba(61,85,96,.105)';ctx.lineWidth=.65;
 for(let lat=Math.ceil(se.lat/latStep)*latStep;lat<=nw.lat+1e-8;lat+=latStep){
  const y=project(lat,view.cx).y;
  ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(a.w,y);ctx.stroke();
 }
 for(let lon=Math.ceil(nw.lon/lonStep)*lonStep;lon<=se.lon+1e-8;lon+=lonStep){
  const x=project(view.cy,lon).x;
  ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x,bottom);ctx.stroke();
 }
 ctx.restore();
}
function drawRangeRings({ctx,area,project,ACTIVE,baseScale,view,innerHeight,rad,DOAAUnits}){
 const a=area(),origin=project(ACTIVE.lat,ACTIVE.lon),scale=baseScale()*view.zoom;
 if(!Number.isFinite(scale)||scale<=0)return;
 const maxRange=Math.hypot(Math.max(origin.x,a.w-origin.x),Math.max(origin.y-a.top,innerHeight-a.bottom-origin.y))/scale;
 const steps=[1,2,5,10,20,25,50,100,200,500];
 const target=Math.max(5,maxRange/4),step=steps.find(x=>x>=target)||500;
 const outer=Math.min(500,Math.ceil(maxRange/step)*step);
 const count=Math.min(12,Math.floor(outer/step));
 if(!count)return;
 const bottom=innerHeight-a.bottom;
 ctx.save();ctx.beginPath();ctx.rect(0,a.top,a.w,bottom-a.top);ctx.clip();
 const visible=[];
 for(let i=1;i<=count;i++){
  const nm=i*step,r=nm*scale;
  ctx.beginPath();ctx.arc(origin.x,origin.y,r,0,Math.PI*2);
  ctx.strokeStyle='rgba(64,91,105,.20)';
  ctx.lineWidth=.7;ctx.stroke();
  let samples=0;
  for(let d=0;d<360;d+=2){
   const angle=rad(d),x=origin.x+Math.sin(angle)*r,y=origin.y-Math.cos(angle)*r;
   if(x>=0&&x<=a.w&&y>=a.top&&y<=bottom)samples++;
  }
  if(samples>=3)visible.push(r);
  const lx=origin.x+Math.sin(rad(45))*r,ly=origin.y-Math.cos(rad(45))*r;
  if(lx>8&&lx<a.w-48&&ly>a.top+12&&ly<bottom-8){
   ctx.fillStyle='rgba(54,79,93,.62)';ctx.font='500 10px ui-monospace,monospace';
   ctx.textAlign='left';ctx.fillText(DOAAUnits.format(nm,'distance'),lx+5,ly-5);
  }
 }
 const r=visible.length>=2?visible[visible.length-2]:visible[0];
 if(!r){ctx.restore();return;}
 // At small radii, omit fine marks rather than crowding the chart.
 const fine=r>=150?1:r>=85?2:5;
 for(let d=0;d<360;d+=fine){
  const angle=rad(d),sn=Math.sin(angle),cs=Math.cos(angle);
  const x=origin.x+sn*r,y=origin.y-cs*r;
  if(x<3||x>a.w-3||y<a.top+3||y>bottom-3)continue;
  const major=d%30===0,medium=d%10===0,minor=d%5===0;
  const len=major?9:medium?6:minor?4:2;
  ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-sn*len,y+cs*len);
  ctx.strokeStyle=major?'rgba(47,76,91,.48)':'rgba(55,83,96,.31)';
  ctx.lineWidth=major?1.1:medium?.8:.6;ctx.stroke();
  if(major&&r>=80){
   const tx=x-sn*17,ty=y+cs*17;
   if(tx>18&&tx<a.w-18&&ty>a.top+12&&ty<bottom-12){
    ctx.fillStyle='rgba(46,71,85,.64)';ctx.textAlign='center';
    ctx.font='500 9px ui-monospace,monospace';
    ctx.fillText(String(d).padStart(3,'0'),tx,ty+3);
   }
  }
 }
 ctx.restore();
}

 return Object.freeze({drawGraticule,drawRangeRings});
});
