(() => {
  'use strict';
  const C = window.DOAATrackCore, instances = new WeakMap(), colors = ['#2367a2', '#806083'];
  const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const date = t => new Date(t).toLocaleString('en-CA', { timeZone: 'UTC', hour12: false }) + ' UTC';
  const quantity = (v, kind) => v == null ? 'UNKNOWN' : window.DOAAUnits?.format(v, kind) || (Math.round(v).toLocaleString() + (kind === 'altitude' ? ' ft' : ' kt'));
  const merc = p => ({ x: (p.lon + 180) / 360, y: (1 - Math.asinh(Math.tan(Math.max(-85, Math.min(85, p.lat)) * Math.PI / 180)) / Math.PI) / 2 });
  async function read(hex, encounter, signal, onPage) {
    const points = [], q = new URLSearchParams({ hex, limit: '2000' }); if (encounter) q.set('encounter', encounter);
    let data;
    do {
      const r = await fetch('/api/track-history?' + q, { signal, cache: 'no-store' }); data = await r.json();
      if (!r.ok || !data.ok) throw Error(data.error || 'Observed track unavailable');
      points.push(...(data.observations || [])); onPage?.(points.length);
      if (data.next) { q.set('after', data.next.after); q.set('after_id', data.next.after_id); }
    } while (data.next && !signal.aborted);
    return { ...data, hex, points: C.normalize(points) };
  }
  class Workspace {
    constructor(root, subject, compare = false) {
      this.root = root; this.subject = subject; this.compare = compare; this.tracks = []; this.abort = new AbortController();
      this.bookmarkChanged=()=>this.update();window.addEventListener('doaa:bookmark-state',this.bookmarkChanged);
      this.bookmarkClick=e=>{if(e.target.closest('[data-open-gallery]')){window.DOAABookmarks?.open();return;}const b=e.target.closest('[data-save-moment]');if(!b)return;window.DOAABookmarks?.save(Number(b.dataset.saveMoment)).catch(()=>{});};this.root.addEventListener('click',this.bookmarkClick);
      this.tiles = new Map(); this.camera = null; this.follow = ''; this.frame = null; this.disposed = false; this.lastPaint = 0;
      this.resize = new ResizeObserver(() => this.draw()); this.started = performance.now();
      this.root.classList.add('track-workspace'); this.root.innerHTML = '<div class="track-status" role="status">Loading recorded observations…</div>';
      this.loadingTimer = setInterval(() => { if (!this.disposed && !this.clock) this.root.querySelector('.track-status').textContent = 'Loading recorded observations · ' + Math.floor((performance.now() - this.started) / 1000) + 's'; }, 1000);
    }
    async load() {
      try {
        const data = await read(this.subject.hex, this.subject.encounter, this.abort.signal);
        if (this.disposed) return;
        clearInterval(this.loadingTimer);
        if (!data.points.length) { this.root.innerHTML = '<div class="track-status" role="status">No recorded position samples for this Contact. External history is not a DOAA Sighting.</div>'; return; }
        this.tracks = [data]; this.build();if(Number.isFinite(this.subject.cursor)){this.clock.seek(this.subject.cursor);this.update();}
      } catch (e) { if (!this.disposed) { clearInterval(this.loadingTimer); this.root.innerHTML = '<div class="track-status" role="alert">' + esc(e.message) + '</div><button type="button" data-retry>Retry observed track</button>'; this.root.querySelector('[data-retry]').onclick = () => { this.dispose(); mount(this.root, this.subject); }; } }
    }
    build(preserve = false) {
      const range = C.windowFor(this.tracks.map(t => t.points)), old = this.clock;
      this.clock = new C.Clock(range.start, range.end);
      if (preserve && old) { this.clock.seek(old.cursor); this.clock.speed = old.speed; this.clock.loop = old.loop; }
      this.root.innerHTML = '<div class="track-heading"><h3>' + (this.compare ? 'Compare Tracks' : 'Observed Track History') + '</h3><span>' + this.tracks.reduce((n,t) => n + t.points.length,0) + ' samples</span></div>' +
        '<div class="track-layout"><div><div class="track-map"><canvas aria-label="Geographically grounded recorded track map"></canvas><div class="track-attribution"><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a></div></div><div class="track-map-tools"><button type="button" data-fit>Fit tracks</button><label>Camera <select data-follow aria-label="Replay camera"><option value="">Overview</option>' + this.tracks.map((t,i) => '<option value="'+i+'">Follow Track '+(i+1)+'</option>').join('') + '</select></label><button type="button" data-zoom="1.4" aria-label="Zoom track map in">+</button><button type="button" data-zoom="0.714" aria-label="Zoom track map out">−</button></div></div>' +
        (!this.compare ? '<div class="track-charts"><svg class="track-chart" data-chart="alt" role="img" aria-label="Recorded altitude with shared time cursor"></svg><svg class="track-chart" data-chart="gs" role="img" aria-label="Recorded groundspeed with shared time cursor"></svg></div>' : '') + '</div>' +
        '<output class="track-clock" data-clock></output><input class="track-time" type="range" data-time min="'+range.start+'" max="'+range.end+'" step="1" value="'+this.clock.cursor+'" aria-label="Shared absolute observation time">'+
        '<div class="track-controls"><button type="button" data-play>Play</button><label>Speed <select data-speed aria-label="Playback speed">'+[1,5,15,30,60].map(s=>'<option value="'+s+'">'+s+'×</option>').join('')+'</select></label><label><input data-loop type="checkbox"> Loop</label>'+
        (!this.compare ? '<button type="button" data-compare>Compare with…</button>' : '') + '</div><div class="track-coverage" aria-label="Recorded time coverage"></div><div class="track-readouts '+(!this.compare?'single':'')+'"></div><button type="button" data-open-gallery>Saved moments</button>'+
        '<label>Jump to recorded observation <select data-observation aria-label="Jump map and charts to recorded observation">'+this.tracks[0].points.map((p,i)=>'<option value="'+p.t+'">'+esc(date(p.t))+' · '+(i+1)+'</option>').join('')+'</select></label>'+
        (this.compare ? '<div class="track-compare-actions">'+(this.tracks.length===2?'<button type="button" data-replace-first>Replace Track 1</button><button type="button" data-remove-first>Remove Track 1</button>':'')+'<button type="button" data-replace>'+ (this.tracks.length===2?'Replace':'Choose') +' Track 2</button>'+(this.tracks.length===2?'<button type="button" data-remove>Remove Track 2</button>':'')+'</div>':'')+
        (!this.compare&&C.events(this.tracks[0].points).length?'<div class="track-events"><h4>Observed changes</h4>'+C.events(this.tracks[0].points).map(e=>'<button type="button" data-event="'+e.t+'">'+esc(e.label)+' · '+esc(date(e.t))+'</button>').join('')+'</div>':'')+
        '<p class="track-note">Only DOAA-recorded positions. No position or telemetry interpolation. A marker retains a sample for at most 30 seconds and displays its actual timestamp; longer gaps have no marker or telemetry. Map and chart connectors join observations within 90 seconds only. Collection can be sparse. All clock times UTC.</p>';
      this.canvas = this.root.querySelector('canvas'); this.ctx = this.canvas.getContext('2d'); this.resize.disconnect(); this.resize.observe(this.canvas);
      this.root.querySelector('[data-time]').oninput = e => { this.clock.pause(); this.clock.seek(e.target.value); this.update(); };
      this.root.querySelector('[data-play]').onclick = () => { cancelAnimationFrame(this.frame); if (this.clock.playing) this.clock.pause(); else { this.clock.play(); this.tick(); } this.update(); };
      const speed = this.root.querySelector('[data-speed]'); speed.value = this.clock.speed; speed.onchange = () => { this.clock.speed = Number(speed.value); };
      const loop = this.root.querySelector('[data-loop]'); loop.checked = this.clock.loop; loop.onchange = () => { this.clock.loop = loop.checked; };
      this.root.querySelector('[data-observation]').onchange = e => { this.clock.pause(); this.clock.seek(e.target.value); this.update(); };
      this.root.querySelectorAll('[data-event]').forEach(b=>b.onclick=()=>{this.clock.pause();this.clock.seek(b.dataset.event);this.update();});
      this.root.querySelector('[data-follow]').onchange = e => { this.follow = e.target.value; this.draw(); };
      this.root.querySelector('[data-fit]').onclick = () => { this.fit(); this.draw(); };
      this.root.querySelectorAll('[data-zoom]').forEach(b => b.onclick = () => { this.unfollow(); this.camera.scale *= Number(b.dataset.zoom); this.draw(); });
      this.root.querySelector('[data-compare]')?.addEventListener('click', () => this.picker());
      this.root.querySelector('[data-replace]')?.addEventListener('click', () => this.picker());
      this.root.querySelector('[data-replace-first]')?.addEventListener('click', () => this.picker(0));
      this.root.querySelector('[data-remove-first]')?.addEventListener('click', () => { this.tracks = this.tracks.slice(1); this.build(true); });
      this.root.querySelector('[data-remove]')?.addEventListener('click', () => { this.tracks = this.tracks.slice(0,1); this.build(true); });
      this.canvas.onpointerdown = e => { this.unfollow(); this.clock.pause(); this.update(); this.drag = { x:e.clientX,y:e.clientY }; this.canvas.setPointerCapture(e.pointerId); };
      this.canvas.onpointermove = e => { if (!this.drag) return; this.camera.x -= (e.clientX-this.drag.x)/this.camera.scale; this.camera.y -= (e.clientY-this.drag.y)/this.camera.scale; this.drag={x:e.clientX,y:e.clientY}; this.draw(); };
      this.canvas.onpointerup = this.canvas.onpointercancel = () => { this.drag=null; };
      this.canvas.onwheel = e => { e.preventDefault(); this.unfollow(); this.camera.scale *= e.deltaY<0?1.15:1/1.15; this.draw(); };
      this.root.querySelectorAll('[data-chart]').forEach(s=>this.chart(s,s.dataset.chart));
      const duration=this.clock.end-this.clock.start||1;this.root.querySelector('.track-coverage').innerHTML=this.tracks.map((t,i)=>'<div>Track '+(i+1)+' coverage<svg aria-label="Track '+(i+1)+' discrete coverage and gaps" viewBox="0 0 1000 15" preserveAspectRatio="none">'+t.points.map(p=>'<rect fill="'+colors[i]+'" x="'+((p.t-this.clock.start)/duration*1000)+'" y="0" width="'+Math.max(1,Math.min(30000,this.clock.end-p.t)/duration*1000)+'" height="15"/>').join('')+'</svg></div>').join('');
      if (!preserve || !this.camera) this.fit(); this.update();
    }
    unfollow() { this.follow=''; const select=this.root.querySelector('[data-follow]'); if(select)select.value=''; }
    fit() {
      let x0=Infinity,x1=-Infinity,y0=Infinity,y1=-Infinity;for(const t of this.tracks)for(const p of t.points){const m=merc(p);x0=Math.min(x0,m.x);x1=Math.max(x1,m.x);y0=Math.min(y0,m.y);y1=Math.max(y1,m.y);}const box=this.canvas.getBoundingClientRect();
      const width=Math.max(1,box.width-60),height=Math.max(1,box.height-60);
      this.camera={x:(x0+x1)/2,y:(y0+y1)/2,scale:Math.min(width/Math.max(.0008,x1-x0),height/Math.max(.0008,y1-y0))};this.unfollow();
    }
    draw() {
      if(this.disposed||!this.canvas||!this.clock||!this.camera)return;
      const w=this.canvas.clientWidth,h=this.canvas.clientHeight,dpr=window.devicePixelRatio||1;if(!w||!h)return;
      if(this.follow!==''){const sample=C.sampleAt(this.tracks[Number(this.follow)]?.points||[],this.clock.cursor);if(sample)Object.assign(this.camera,merc(sample.point));}
      if(this.canvas.width!==Math.round(w*dpr)||this.canvas.height!==Math.round(h*dpr)){this.canvas.width=Math.round(w*dpr);this.canvas.height=Math.round(h*dpr);}const ctx=this.ctx;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#edf2f4';ctx.fillRect(0,0,w,h);
      const project=p=>{const m=merc(p);return{x:(m.x-this.camera.x)*this.camera.scale+w/2,y:(m.y-this.camera.y)*this.camera.scale+h/2};};
      this.canvas.setAttribute('aria-label','Recorded track map. '+this.tracks.map((t,i)=>{const s=C.sampleAt(t.points,this.clock.cursor);return 'Track '+(i+1)+(s?' at '+s.point.lat.toFixed(5)+', '+s.point.lon.toFixed(5)+' observed '+date(s.point.t):' has no supported position');}).join('. '));
      const z=Math.max(2,Math.min(13,Math.floor(Math.log2(this.camera.scale/256)))),n=2**z,size=this.camera.scale/n;
      const x0=Math.floor((this.camera.x-w/2/this.camera.scale)*n),x1=Math.floor((this.camera.x+w/2/this.camera.scale)*n),y0=Math.max(0,Math.floor((this.camera.y-h/2/this.camera.scale)*n)),y1=Math.min(n-1,Math.floor((this.camera.y+h/2/this.camera.scale)*n));
      for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++){
        const key=z+'/'+((x%n+n)%n)+'/'+y;let im=this.tiles.get(key);
        if(!im){im=new Image();im.crossOrigin='anonymous';im.onload=()=>this.draw();im.onerror=()=>{im.failed=true;};im.src='https://tile.openstreetmap.org/'+key+'.png';this.tiles.set(key,im);}
        if(im.complete&&im.naturalWidth)ctx.drawImage(im,(x/n-this.camera.x)*this.camera.scale+w/2,(y/n-this.camera.y)*this.camera.scale+h/2,size,size);
      }
      // A coordinate graticule is grounded even when an external tile provider is unavailable.
      const inverseY=y=>Math.atan(Math.sinh(Math.PI*(1-2*y)))*180/Math.PI;
      const west=(this.camera.x-w/2/this.camera.scale)*360-180,east=(this.camera.x+w/2/this.camera.scale)*360-180;
      const north=inverseY(this.camera.y-h/2/this.camera.scale),south=inverseY(this.camera.y+h/2/this.camera.scale);
      const spacing=span=>{const base=10**Math.floor(Math.log10(Math.max(.0001,span/4)));return [1,2,5,10].map(v=>v*base).find(v=>v>=span/4);};
      const dx=spacing(east-west),dy=spacing(north-south);ctx.strokeStyle='#68849938';ctx.lineWidth=.5;ctx.fillStyle='#46637b';ctx.font='10px system-ui';
      for(let lon=Math.ceil(west/dx)*dx;lon<=east;lon+=dx){const q=project({lat:north,lon});ctx.beginPath();ctx.moveTo(q.x,0);ctx.lineTo(q.x,h);ctx.stroke();ctx.fillText(lon.toFixed(2)+'°',q.x+3,12);}
      for(let lat=Math.ceil(south/dy)*dy;lat<=north;lat+=dy){const q=project({lat,lon:west});ctx.beginPath();ctx.moveTo(0,q.y);ctx.lineTo(w,q.y);ctx.stroke();ctx.fillText(lat.toFixed(2)+'°',3,q.y-3);}
      if(!Array.from(this.tiles.values()).some(im=>im.complete&&im.naturalWidth)){ctx.fillStyle='#edf2f4e8';ctx.fillRect(3,h-35,Math.min(w-6,260),18);ctx.fillStyle='#46637b';ctx.fillText('Geographic tiles unavailable · coordinate grid',7,h-22);}
      this.tracks.forEach((t,i)=>{
        ctx.strokeStyle=colors[i];ctx.fillStyle=colors[i];ctx.lineWidth=2;
        for(const seg of C.segments(t.points)){ctx.beginPath();seg.forEach((p,j)=>{const q=project(p);j?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();}
        for(const p of t.points){const q=project(p);ctx.beginPath();ctx.arc(q.x,q.y,2,0,Math.PI*2);ctx.fill();}
        const sample=C.sampleAt(t.points,this.clock.cursor);if(!sample)return;const p=sample.point,q=project(p);ctx.save();ctx.translate(q.x,q.y);const direction=p.heading??p.track;
        if(direction!=null){ctx.rotate(direction*Math.PI/180);ctx.beginPath();ctx.moveTo(0,-11);ctx.lineTo(6,9);ctx.lineTo(0,5);ctx.lineTo(-5,9);ctx.closePath();}else{ctx.beginPath();ctx.arc(0,0,6,0,Math.PI*2);}
        ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.stroke();ctx.fill();ctx.restore();ctx.font='bold 12px system-ui';ctx.fillText('Track '+(i+1),q.x+12,q.y-8);
      });
    }
    chart(svg,key) {
      const points=this.tracks[0].points.map(p=>({...p,[key]:window.DOAAUnits.convert(p[key],key==='alt'?'altitude':'speed')})),known=points.filter(p=>p[key]!=null),w=420,h=140,left=42,right=12,top=27,bottom=23,range=this.clock.end-this.clock.start||1;
      let min=known.length?known.reduce((v,p)=>Math.min(v,p[key]),Infinity):0,max=known.length?known.reduce((v,p)=>Math.max(v,p[key]),-Infinity):1;if(max===min){max+=1;min-=1;}
      const x=t=>left+(t-this.clock.start)/range*(w-left-right),y=v=>h-bottom-(v-min)/(max-min)*(h-top-bottom);
      const traces=C.segments(points).flatMap(seg=>{const paths=[];let chunk=[];for(const p of seg){if(p[key]==null){if(chunk.length)paths.push(chunk);chunk=[];}else chunk.push(p);}if(chunk.length)paths.push(chunk);return paths;});
      svg.setAttribute('viewBox','0 0 '+w+' '+h);
      svg.innerHTML='<text x="10" y="17">'+(key==='alt'?'Altitude':'Groundspeed')+'</text><text x="4" y="'+(top+8)+'">'+esc(Math.round(max))+'</text><text x="4" y="'+(h-bottom)+'">'+esc(Math.round(min))+'</text>'+traces.map(seg=>'<path class="trace" d="'+seg.map((p,i)=>(i?'L':'M')+x(p.t).toFixed(2)+' '+y(p[key]).toFixed(2)).join(' ')+'"/>').join('')+known.map(p=>'<circle class="sample" cx="'+x(p.t)+'" cy="'+y(p[key])+'" r="2.5"/>').join('')+'<line class="cursor" x1="'+x(this.clock.cursor)+'" x2="'+x(this.clock.cursor)+'" y1="'+top+'" y2="'+(h-bottom)+'"/><text x="'+left+'" y="'+(h-5)+'">'+window.DOAAUnits.unit(key==='alt'?'altitude':'speed')+' · discrete observed samples</text>'+(known.length?'':'<text x="100" y="80">Telemetry unavailable</text>');
    }
    update() {
      if(this.disposed||!this.clock)return;
      const label=date(this.clock.cursor);this.root.querySelector('[data-clock]').textContent=label;const range=this.root.querySelector('[data-time]');range.value=this.clock.cursor;range.setAttribute('aria-valuetext',label);this.root.querySelector('[data-play]').textContent=this.clock.playing?'Pause':'Play';
      this.root.querySelector('.track-readouts').innerHTML=this.tracks.map((t,i)=>{const s=C.sampleAt(t.points,this.clock.cursor),p=s?.point;return '<section class="track-readout" aria-label="Track '+(i+1)+' synchronized telemetry"><strong style="color:'+colors[i]+'">Track '+(i+1)+' · '+esc(t.encounter?.callsign||t.hex)+'</strong>'+(p?'<dl><dt>Altitude</dt><dd>'+quantity(p.alt,'altitude')+'</dd><dt>Groundspeed</dt><dd>'+quantity(p.gs,'speed')+'</dd><dt>'+(p.heading!=null?'Reported heading':'Ground track')+'</dt><dd>'+(p.heading!=null||p.track!=null?Math.round(p.heading??p.track)+'°':'UNKNOWN')+'</dd></dl><time>'+esc(date(p.t))+'</time><small>'+Math.floor(s.ageMs/1000)+'s before clock · '+esc(p.source||'Provider not recorded')+'</small>'+(Number.isSafeInteger(p.id)?'<button type="button" data-save-moment="'+p.id+'" '+(['saved','saving'].includes(window.DOAABookmarks?.state(p.id))?'disabled':'')+'>'+({saved:'Moment saved',saving:'Saving moment…',failed:'Retry saving moment'}[window.DOAABookmarks?.state(p.id)]||'Save moment')+'</button>':''):'<p>No supported observation at this clock time</p>')+'</section>';}).join('');
      const x=42+(this.clock.cursor-this.clock.start)/(this.clock.end-this.clock.start||1)*366;this.root.querySelectorAll('[data-chart] .cursor').forEach(s=>{s.setAttribute('x1',x);s.setAttribute('x2',x);});this.draw();
    }
    tick() { if(this.disposed||!this.clock.playing)return;this.frame=requestAnimationFrame(t=>{this.clock.advance(t);if(t-this.lastPaint>=75||!this.clock.playing){this.lastPaint=t;this.update();}this.tick();}); }
    async picker(slot = 1) {
      this.clock.pause();this.update();const focus=document.activeElement,dialog=document.createElement('dialog');dialog.className='track-dialog track-workspace';
      dialog.innerHTML='<header><h2>Choose Track '+(slot+1)+'</h2><button type="button" data-close aria-label="Close comparison picker">×</button></header><p>Other genuinely recorded encounters. Overlapping windows and nearby observations appear first. Select deliberately.</p><form class="track-picker-form"><input type="search" aria-label="Search recorded callsign or registration" placeholder="Callsign or registration"><button>Search</button></form><div class="track-candidates" role="status">Loading recorded candidates…</div>';
      this.pickerDialog=dialog;document.body.appendChild(dialog);const controller=new AbortController();dialog.onclose=()=>{controller.abort();dialog.remove();this.pickerDialog=null;focus?.focus();};dialog.querySelector('[data-close]').onclick=()=>dialog.close();dialog.showModal();
      let sequence=0;const load=async(q='')=>{const seq=++sequence,box=dialog.querySelector('.track-candidates');box.textContent='Loading recorded candidates…';try{
        const retained=this.tracks[slot===0?1:0];
        const params=new URLSearchParams({hex:retained.hex,encounter:retained.encounter.id,candidates:'1',q}),r=await fetch('/api/track-history?'+params,{signal:controller.signal,cache:'no-store'}),j=await r.json();if(!r.ok||!j.ok)throw Error(j.error||'Candidate lookup unavailable');if(seq!==sequence||!dialog.open)return;
        const candidates=C.rankCandidates(j.candidates||[],C.windowFor([retained.points]),retained.points[0]);box.innerHTML=candidates.length?candidates.map((c,i)=>'<button type="button" data-candidate="'+i+'"><strong>'+esc(c.callsign||c.registration||c.hex)+'</strong><small>'+esc(c.registration||c.hex)+' · '+esc(date(Date.parse(c.first_seen_at)))+' → '+esc(date(Date.parse(c.last_seen_at)))+'</small><small>'+(c.overlap?'Overlapping observation window':'Separate observation window')+(Number.isFinite(c.distance_nm)?' · '+window.DOAAUnits.format(c.distance_nm,'distance')+' between first recorded positions':'')+'</small></button>').join(''):'No matching recorded encounters. Coverage can be incomplete.';
        box.querySelectorAll('[data-candidate]').forEach(b=>b.onclick=async()=>{const candidate=candidates[Number(b.dataset.candidate)];box.textContent='Loading chosen observations…';try{const second=await read(candidate.hex,candidate.encounter_id,controller.signal);if(!dialog.open||this.disposed)return;if(!second.points.length)throw Error('No recorded positions for chosen encounter');dialog.close();if(this.compare){this.tracks=slot===0?[second,retained]:[retained,second];this.build(true);}else openCompare(retained,second);}catch(e){if(dialog.open)box.textContent=e.message;}});
      }catch(e){if(dialog.open&&seq===sequence)box.textContent=e.message;}};
      dialog.querySelector('form').onsubmit=e=>{e.preventDefault();load(dialog.querySelector('input').value);};load();
    }
    dispose(){this.disposed=true;this.pickerDialog?.close();this.abort.abort();this.clock?.pause();cancelAnimationFrame(this.frame);clearInterval(this.loadingTimer);this.resize.disconnect();window.removeEventListener('doaa:units-changed',this.unitsChanged);window.removeEventListener('doaa:bookmark-state',this.bookmarkChanged);this.root.removeEventListener('click',this.bookmarkClick);}
  }
  function openCompare(first,second){const focus=document.activeElement,dialog=document.createElement('dialog');dialog.className='track-dialog';dialog.innerHTML='<header><h2>Two-aircraft comparison</h2><button type="button" aria-label="Close Compare Tracks">Close</button></header><div data-workspace></div>';document.body.appendChild(dialog);dialog.showModal();const workspace=listenUnits(new Workspace(dialog.querySelector('[data-workspace]'),{hex:first.hex,encounter:first.encounter.id},true));clearInterval(workspace.loadingTimer);workspace.tracks=[first,second];workspace.build();dialog.querySelector('header button').onclick=()=>dialog.close();dialog.onclose=()=>{workspace.dispose();dialog.remove();focus?.focus();};}
  function listenUnits(workspace){workspace.unitsChanged=()=>{workspace.root.querySelectorAll('[data-chart]').forEach(s=>workspace.chart(s,s.dataset.chart));workspace.update();};window.addEventListener('doaa:units-changed',workspace.unitsChanged);return workspace;}
  function mount(root,subject){instances.get(root)?.dispose();const workspace=listenUnits(new Workspace(root,subject));instances.set(root,workspace);workspace.load();return workspace;}
  function dispose(container){for(const root of container.querySelectorAll('[data-track-workspace]'))instances.get(root)?.dispose();}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('[data-track-workspace]').forEach(root=>{const w=instances.get(root);w?.clock?.pause();w?.update();});});
  window.DOAATrackHistory={mount,dispose};
})();
