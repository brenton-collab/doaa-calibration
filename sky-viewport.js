/* SKY viewport assembly. The host supplies existing canvases, geometry and actions.
 * One lifecycle owns canvas, projection, compass geometry and pointer input.
 * No Inspector, provider, storage or application DOM selectors.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAASkyViewport=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 function mount({overlay,base,getView,getArea,getRange,getActive,units,onNavigate,onTap,onSettle,geometry,camera,canvas,input,traffic,hitTest,tiles,onInvalidate}){
  if(!overlay||!base||!geometry||!camera||!canvas||!input||!traffic||!hitTest||!tiles)throw new TypeError('Missing SKY viewport dependency');
  const surfaces=canvas.create({overlay,base});
  const projection=camera.create({getView,getArea,getRange});
  const tileLayer=tiles.create({ctx:surfaces.tg,project:projection.project,unproject:projection.unproject,extent:projection.extent,area:getArea,imageFactory:()=>new Image(),onInvalidate});
  const rad=n=>n*Math.PI/180;
  let destroyed=false;
  const requireAlive=()=>{if(destroyed)throw new Error('SKY viewport destroyed')};
  const events=input.mount({
   element:overlay,getView,scale:()=>projection.baseScale()*getView().zoom,nmlon:projection.nmlon,
   onNavigate,onTap,onSettle
  });
  const api={
   ctx:surfaces.ctx,tg:surfaces.tg,
   project:(lat,lon)=>{requireAlive();return projection.project(lat,lon)},
   unproject:(x,y)=>{requireAlive();return projection.unproject(x,y)},
   baseScale:()=>{requireAlive();return projection.baseScale()},
   nmlon:()=>{requireAlive();return projection.nmlon()},
   extent:()=>{requireAlive();return projection.extent()},
   centered:()=>{requireAlive();return projection.centered(getActive())},
   resize:(width,height,dpr)=>{requireAlive();surfaces.resize(width,height,dpr)},
   drawInstruments:(height)=>{
    requireAlive();
    const env={ctx:surfaces.ctx,area:getArea,project:projection.project,unproject:projection.unproject,view:getView(),innerHeight:height};
    geometry.drawGraticule(env);
    geometry.drawRangeRings({...env,ACTIVE:getActive(),baseScale:projection.baseScale,rad,DOAAUnits:units});
   },
   drawTiles:(data)=>{requireAlive();return tileLayer.draw(data)},
   hitTest:(data)=>{requireAlive();return hitTest.hit({...data,project:projection.project})},
   drawTraffic:(data)=>{requireAlive();traffic.drawTraffic({...data,ctx:surfaces.ctx,project:projection.project,area:getArea})},
   getViewState:()=>{requireAlive();const v=getView();return Object.freeze({cx:v.cx,cy:v.cy,zoom:v.zoom})},
   destroy:()=>{if(destroyed)return;destroyed=true;events.destroy();tileLayer.destroy()}
  };
  return Object.freeze(api);
 }
 return Object.freeze({mount});
});
