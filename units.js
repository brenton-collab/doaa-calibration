(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAAUnits=api;})(globalThis,function(){
 'use strict';
 // Canonical input: NM, knots, feet, Celsius, hPa, statute miles visibility, ft/min.
 const choices={distance:['NM','km','mi'],speed:['kt','km/h','mph'],altitude:['ft','m'],temperature:['°C','°F'],pressure:['hPa','inHg'],visibility:['SM','km','m'],verticalSpeed:['ft/min','m/s']};
 const defaults=Object.fromEntries(Object.entries(choices).map(([k,v])=>[k,v[0]]));
 function normalize(value){return Object.fromEntries(Object.entries(choices).map(([k,v])=>[k,v.includes(value?.[k])?value[k]:defaults[k]]));}
 let preferences={...defaults};try{preferences=normalize(JSON.parse((globalThis.DOAAStorage||globalThis.localStorage)?.getItem('doaa.units')||'null'));}catch{}
 function convert(value,kind,unit=preferences[kind]){
  if(value==null||value===''||typeof value==='boolean'||!Number.isFinite(Number(value)))return null;
  if(!choices[kind]?.includes(unit))throw Error('Unsupported quantity/unit');
  const n=Number(value),factor={distance:{NM:1,km:1.852,mi:1.150779448},speed:{kt:1,'km/h':1.852,mph:1.150779448},altitude:{ft:1,m:.3048},pressure:{hPa:1,inHg:1/33.8638866667},visibility:{SM:1,km:1.609344,m:1609.344},verticalSpeed:{'ft/min':1,'m/s':.3048/60}};
  return kind==='temperature'?(unit==='°F'?n*9/5+32:n):n*factor[kind][unit];
 }
 function format(value,kind,options={}){const unit=options.unit||preferences[kind],n=convert(value,kind,unit);if(n==null)return options.unknown||'UNKNOWN';const digits=options.digits??(kind==='pressure'&&unit==='inHg'?2:kind==='temperature'||kind==='visibility'||kind==='verticalSpeed'&&unit==='m/s'?1:0);return n.toLocaleString('en-CA',{maximumFractionDigits:digits,minimumFractionDigits:kind==='pressure'&&unit==='inHg'?2:0})+' '+unit;}
 function set(value){preferences=normalize({...preferences,...value});try{(globalThis.DOAAStorage||globalThis.localStorage)?.setItem('doaa.units',JSON.stringify(preferences));}catch{}if(globalThis.dispatchEvent&&globalThis.CustomEvent)globalThis.dispatchEvent(new CustomEvent('doaa:units-changed',{detail:{...preferences}}));return {...preferences};}
 function mount(container){const labels={distance:'Distance',speed:'Speed',altitude:'Altitude / elevation',temperature:'Temperature',pressure:'Pressure',visibility:'Visibility',verticalSpeed:'Vertical speed'};container.innerHTML='<fieldset class="unit-preferences"><legend>Display units</legend>'+Object.entries(choices).map(([k,v])=>'<label>'+labels[k]+'<select aria-label="'+labels[k]+' units" data-unit="'+k+'">'+v.map(u=>'<option'+(preferences[k]===u?' selected':'')+'>'+u+'</option>').join('')+'</select></label>').join('')+'<button type="button" data-unit-reset>Aviation standard</button><small>Raw METAR, flight levels and runway identifiers retain their aviation notation.</small></fieldset>';container.querySelectorAll('[data-unit]').forEach(s=>s.onchange=()=>set({[s.dataset.unit]:s.value}));container.querySelector('[data-unit-reset]').onclick=()=>{set(defaults);mount(container);};}
 function reload(){try{preferences=normalize(JSON.parse((globalThis.DOAAStorage||globalThis.localStorage)?.getItem('doaa.units')||'null'));}catch{preferences={...defaults};}if(globalThis.dispatchEvent&&globalThis.CustomEvent)globalThis.dispatchEvent(new CustomEvent('doaa:units-changed'));}
 return {reload,choices,defaults,normalize,convert,format,set,mount,get:()=>({...preferences}),unit:kind=>preferences[kind]};
});
