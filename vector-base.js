/* DOAA Base cartography experiment. Loaded only on development branch.
   A genuine selective map; falls back to existing OSM tiles until loaded. */
(function(){
'use strict';
let map=null,failed=false;
const root=document.documentElement;
function style(){return {version:8,glyphs:'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
sources:{osm:{type:'vector',url:'https://tiles.openfreemap.org/planet/latest'}},
layers:[
{id:'paper',type:'background',paint:{'background-color':'#f3f5f5'}},
{id:'parks',type:'fill',source:'osm','source-layer':'landcover',filter:['in','class','wood','grass'],paint:{'fill-color':'#e5ebe4','fill-opacity':.7}},
{id:'water',type:'fill',source:'osm','source-layer':'water',paint:{'fill-color':'#c3d9df'}},
{id:'waterways',type:'line',source:'osm','source-layer':'waterway',filter:['in','class','river','canal'],paint:{'line-color':'#a9c8d3','line-width':1.3}},
{id:'roads',type:'line',source:'osm','source-layer':'transportation',filter:['in','class','motorway','trunk','primary'],paint:{'line-color':'#aebcbf','line-width':['interpolate',['linear'],['zoom'],6,.8,12,2.5]}},
{id:'secondary',type:'line',source:'osm','source-layer':'transportation',minzoom:10,filter:['==','class','secondary'],paint:{'line-color':'#c6cdca','line-width':.8}},
{id:'places',type:'symbol',source:'osm','source-layer':'place',filter:['in','class','city','town','village','suburb'],layout:{'text-field':['coalesce',['get','name:en'],['get','name']],'text-font':['Noto Sans Regular'],'text-size':11},paint:{'text-color':'#536b79','text-halo-color':'#f3f5f5','text-halo-width':1.2}}
]}}
window.doaaVectorSync=function({lon,lat,zoom,mode}){
root.dataset.mapLayer=mode;
if(mode!=='base'||failed)return;
if(!map){
if(!window.maplibregl){failed=true;return}
try{
map=new maplibregl.Map({container:'vector-base',style:style(),center:[lon,lat],zoom,interactive:false,attributionControl:false,fadeDuration:0});
map.on('load',()=>{root.dataset.vectorReady='yes';window.dispatchEvent(new Event('doaa-vector-ready'))});
map.on('error',e=>{console.warn('DOAA vector error',e.error||e);if(!map.loaded())root.dataset.vectorReady='no'});
setTimeout(()=>{if(!map.loaded())root.dataset.vectorReady='no'},12000);
}catch(e){failed=true;console.warn('DOAA vector failed',e)}
}
if(map){map.resize();map.jumpTo({center:[lon,lat],zoom:Math.max(0,Math.min(18,zoom))})}
};
})();
