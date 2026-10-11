(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAACatchment=api;})(globalThis,function(){
 'use strict';
 function valid(ap){return ap&&/^[A-Z0-9]{3,8}$/.test(ap.icao||'')&&ap.lat!=null&&ap.lon!=null&&ap.lat!==''&&ap.lon!==''&&Number.isFinite(Number(ap.lat))&&Number.isFinite(Number(ap.lon))&&Math.abs(Number(ap.lat))<=85&&Math.abs(Number(ap.lon))<=180;}
 class Context {
  constructor(home,radius=45,recent=[]){if(!valid(home))throw Error('Invalid Home airfield');this.home={...home};this.homeRadius=radius;this.active={...home};this.radius=radius;this.recent=recent.filter(valid).slice(0,8);this.exploring=false;}
  setHome(ap,radius=this.homeRadius){if(!valid(ap))throw Error('Invalid Home airfield');this.home={...ap};this.homeRadius=radius;this.exploring=this.active.icao!==ap.icao||this.radius!==radius;}
  explore(ap){if(!valid(ap))throw Error('Invalid explored airfield');this.active={...ap};this.exploring=true;this.recent=[{...ap},...this.recent.filter(x=>x.icao!==ap.icao)].slice(0,8);}
  setRadius(radius){this.radius=radius;if(!this.exploring)this.homeRadius=radius;}
  returnHome(){this.active={...this.home};this.radius=this.homeRadius;this.exploring=false;}
 }
 return {Context,valid};
});
