/* LOOK: explainable cues from the existing SKY observation snapshot. No extra provider calls. */
(() => {
 'use strict';
 const esc = s => String(s ?? '').replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;'}[ch]));
 function candidates(snapshot){
   return (snapshot.aircraft||[]).filter(a=>a&&a.id&&a.lat!=null&&a.lat!==''&&a.lon!=null&&a.lon!==''&&Number.isFinite(Number(a.lat))&&Number.isFinite(Number(a.lon))&&Math.abs(Number(a.lat))<=90&&Math.abs(Number(a.lon))<=180).map(a=>{
     const reasons=[];
     const code=String(a.squawk||'');
     if(a.emergency&&String(a.emergency).toLowerCase()!=='none')reasons.push([100,'Emergency signal reported']);
     if(code==='7700')reasons.push([100,'Emergency transponder code 7700']);
     else if(code==='7600')reasons.push([90,'Radio failure code 7600']);
     else if(code==='7500')reasons.push([95,'Unlawful interference code 7500']);
     const d=a.d==null||a.d===''?NaN:Number(a.d),alt=a.alt==null||a.alt===''?NaN:Number(a.alt);
     if(Number.isFinite(d)&&Number.isFinite(alt)&&alt>0&&d<=8&&alt<5000)reasons.push([25,'Low-altitude contact within 8 NM of selected airport']);
     else if(Number.isFinite(d)&&Number.isFinite(alt)&&alt>0&&d<=20&&alt<3000)reasons.push([18,'Low-altitude contact near selected airport']);
     if(Math.abs(Number(a.vr)||0)>=2000)reasons.push([12,'Rapid vertical movement in current observation']);
     return reasons.length?{a,reasons,score:Math.max(...reasons.map(r=>r[0]))}:null;
   }).filter(Boolean).sort((a,b)=>b.score-a.score||(Number(a.a.d)||0)-(Number(b.a.d)||0)).slice(0,20);
 }
 window.DOAALook={
   render(board,snapshot,onSelect){
     const stamp=Number(snapshot.observedAt)||0;
     const age=Date.now()-stamp;
     const fresh=stamp>0&&age>=0&&age<90000;
     const items=fresh?candidates(snapshot):[];
     board.innerHTML='<div class="boardhead"><span>LOOK · WORTH NOTICING</span><span>'+ (fresh?'RECENT OBSERVATIONS':'OBSERVATIONS PAUSED') +'</span></div>'+
       '<p class="look-intro">Signals surfaced from aircraft already visible to SKY. These are observational cues, not confirmed incidents or complete airspace coverage.</p>'+
       (items.length?items.map(({a,reasons},i)=>'<button class="look-item" type="button" data-look-index="'+i+'"><strong>'+esc(a.call||a.reg||a.id)+'</strong><span>'+esc(a.reg||a.type||a.id.toUpperCase())+' · '+(a.d!=null&&a.d!==''&&Number.isFinite(Number(a.d))?Math.round(Number(a.d))+' NM':'DISTANCE UNKNOWN')+' · '+(a.alt!=null&&a.alt!==''&&Number.isFinite(Number(a.alt))?Math.round(Number(a.alt))+' FT':'ALTITUDE UNKNOWN')+'</span><small>'+reasons.map(r=>esc(r[1])).join(' · ')+'</small></button>').join(''):'<p class="look-empty">'+(fresh?'No noteworthy cues in the available observations. This does not mean the sky is empty.':'Observations are aging or unavailable. LOOK will resume when recent aircraft evidence arrives.')+'</p>');
     board.querySelectorAll('[data-look-index]').forEach(el=>el.addEventListener('click',()=>{const item=items[Number(el.dataset.lookIndex)];if(item)onSelect(item.a.id);}));
   }
 };
})();
