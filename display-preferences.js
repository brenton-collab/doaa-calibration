/* DOAA appearance preference. Local only; no network requests. */
(function(){
 'use strict';
 const key='doaa.appearance';
 const unitsKey='doaa.units';
 const altitudeKey='doaa.altitudeUnits';
 const unitChoices=['nm','km','mi'];
 const altitudeChoices=['ft','m'];
 let units='nm',altitude='ft';
 try{const u=localStorage.getItem(unitsKey),a=localStorage.getItem(altitudeKey);if(unitChoices.includes(u))units=u;if(altitudeChoices.includes(a))altitude=a;}catch(e){}
 const unitSelect=document.getElementById('doaa-units');
 const altitudeSelect=document.getElementById('doaa-altitude-units');
 const valid=['light','dark','system'];
 const select=document.getElementById('doaa-theme');
 const media=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)');
 let choice='system';
 try{const stored=localStorage.getItem(key);if(valid.includes(stored))choice=stored;}catch(e){}
 function apply(){
  const effective=choice==='system'?(media&&media.matches?'dark':'light'):choice;
  document.documentElement.setAttribute('data-doaa-theme',effective);
  if(select)select.value=choice;
 }
 if(select)select.addEventListener('change',function(){
  if(!valid.includes(select.value))return;
  choice=select.value;
  try{localStorage.setItem(key,choice);}catch(e){}
  apply();
 });
 if(media&&media.addEventListener)media.addEventListener('change',function(){if(choice==='system')apply();});
 function measure(value,kind){
  if(value===null||value===undefined||value==='')return null;
  const n=Number(value);
  if(!Number.isFinite(n))return null;
  if(!['distance','speed','altitude'].includes(kind))return null;
  const factors=kind==='distance'?{nm:1,km:1.852,mi:1.150779448}:kind==='speed'?{nm:1,km:1.852,mi:1.150779448}:{ft:1,m:.3048};
  const key=kind==='altitude'?altitude:units;
  if(!Object.prototype.hasOwnProperty.call(factors,key))return null;
  const suffix=kind==='distance'?{nm:'NM',km:'KM',mi:'MI'}[key]:kind==='speed'?{nm:'KT',km:'KM/H',mi:'MPH'}[key]:{ft:'FT',m:'M'}[key];
  return {value:n*factors[key],unit:suffix};
 }
 function notify(){
  if(unitSelect)unitSelect.value=units;
  if(altitudeSelect)altitudeSelect.value=altitude;
  window.dispatchEvent(new Event('doaa:units'));
 }
 unitSelect?.addEventListener('change',function(){
  if(!unitChoices.includes(unitSelect.value))return;
  units=unitSelect.value;try{localStorage.setItem(unitsKey,units);}catch(e){}
  notify();
 });
 altitudeSelect?.addEventListener('change',function(){
  if(!altitudeChoices.includes(altitudeSelect.value))return;
  altitude=altitudeSelect.value;try{localStorage.setItem(altitudeKey,altitude);}catch(e){}
  notify();
 });
 apply();
 window.DOAADisplayPreferences={get appearance(){return choice;},get effective(){return document.documentElement.getAttribute('data-doaa-theme');},get units(){return units;},get altitudeUnits(){return altitude;},measure};
})();
