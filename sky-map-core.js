/* Display policy only: no acquisition, persistence, or predicted observations. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAASkyMapCore=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 const HOUR=3600000,UNKNOWN=[112,124,132],STOPS=[[0,[153,197,222]],[10000,[94,151,188]],[25000,[43,104,151]],[45000,[20,48,84]]];
 const number=v=>v===null||v===undefined||v===''||!Number.isFinite(Number(v))?null:Number(v);
 function altitude(p){for(const [key,basis] of [['alt_baro','barometric'],['alt_geom','geometric'],['alt','reported; type unspecified']]){const value=number(p?.[key]);if(value!==null)return{value,basis};}return{value:null,basis:'unknown'};}
 function colour(p){const alt=altitude(p).value;if(alt===null)return UNKNOWN;const v=Math.max(0,Math.min(45000,alt));for(let i=1;i<STOPS.length;i++){const [hi,b]=STOPS[i],[lo,a]=STOPS[i-1];if(v<=hi)return a.map((x,j)=>Math.round(x+(b[j]-x)*(v-lo)/(hi-lo)));}return STOPS.at(-1)[1];}
 function alpha(t,now,selected=false){const age=now-number(t);return age<0||age>=HOUR?0:Math.min(1,(selected?.9:.72)*Math.pow(1-age/HOUR,1.2));}
 function valid(p,now){return number(p?.t)!==null&&p.t<=now&&p.t>now-HOUR&&number(p.lat)!==null&&Math.abs(p.lat)<=90&&number(p.lon)!==null&&Math.abs(p.lon)<=180;}
 function mergeTrails(previous,incoming,now){const out=new Map();for(const [id,e] of [...previous,...incoming]){const old=out.get(id),points=[...(old?.points||[]),...(e.points||[])].filter(p=>valid(p,now)).sort((a,b)=>a.t-b.t),unique=[];for(const p of points){if(unique.at(-1)?.t===p.t)unique[unique.length-1]=p;else unique.push(p);}if(unique.length)out.set(id,{...e,points:unique,lastSeen:unique.at(-1).t});}return out;}
 function fresh(a,now){const t=number(a?.observed_at);return !!a&&!a._pinned&&!a.ground&&/^[0-9a-f]{6}$/i.test(a.id||'')&&t!==null&&now>=t&&now-t<90000&&number(a.lat)!==null&&Math.abs(a.lat)<=90&&number(a.lon)!==null&&Math.abs(a.lon)<=180;}
 function target(a,rect){const x=(rect.left+rect.right)/2,y=(rect.top+rect.bottom)/2,heading=number(a.trk),offset=Math.min(rect.right-rect.left,rect.bottom-rect.top)*.12;if(heading===null||heading<0||heading>=360)return{x,y};const angle=heading*Math.PI/180;return{x:x-Math.sin(angle)*offset,y:y+Math.cos(angle)*offset};}
 return{HOUR,altitude,colour,alpha,mergeTrails,fresh,target};
});
