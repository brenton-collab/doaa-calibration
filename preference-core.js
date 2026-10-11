(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAAPreferenceCore=api;})(globalThis,function(){
 'use strict';
 const keys=['doaa.units','doaa.homeAerodrome','doaa.homeAerodromeData','doaa.catchmentNm','doaa.recentCatchments','doaa.mapLayer','doaa.ambient.mode','doaa.ambient.idle'];
 function clean(snapshot){const out={};for(const k of keys)if(typeof snapshot?.settings?.[k]==='string'&&snapshot.settings[k].length<=6000)out[k]=snapshot.settings[k];return{settings:out};}
 class Sync {
  constructor({subject,request,persistence,onChange=()=>{},schedule=(fn,ms)=>setTimeout(fn,ms),cancel=id=>clearTimeout(id)}){if(typeof subject!=='string'||!subject)throw Error('Authenticated subject required');Object.assign(this,{subject,request,persistence,onChange,schedule,cancel});this.namespace='doaa.account.'+encodeURIComponent(subject)+'.';this.snapshot={settings:{}};this.version=0;this.pending=false;this.busy=false;this.attempt=0;this.state='loading';}
  read(key){try{return JSON.parse(this.persistence?.getItem(this.namespace+key)||'null');}catch{return null;}}
  persist(key,value){try{value==null?this.persistence?.removeItem(this.namespace+key):this.persistence?.setItem(this.namespace+key,JSON.stringify(value));}catch{}}
  emit(){this.onChange({state:this.state,pending:this.pending,revision:this.revision||0});}
  async load(){const pending=this.read('pending');try{const accepted=await this.request('GET');this.revision=accepted.revision;this.snapshot=clean(accepted.snapshot);this.persist('accepted',this.snapshot);this.state='saved';}catch{this.snapshot=clean(this.read('accepted'));this.state='unavailable';}
   if(pending){this.snapshot=clean(pending);this.pending=true;this.version++;this.state='pending';this.queue(0);}this.emit();return this.snapshot;}
  getItem(key){return this.snapshot.settings[key]??null;}
  setItem(key,value){if(!keys.includes(key))throw Error('Unsupported preference');this.snapshot=clean({settings:{...this.snapshot.settings,[key]:String(value)}});this.version++;this.pending=true;this.attempt=0;this.state='pending';this.persist('pending',this.snapshot);this.emit();this.queue(350);}
  queue(delay){this.cancel(this.timer);this.timer=this.schedule(()=>this.flush(),delay);}
  async flush(){if(!this.pending||this.busy)return;this.cancel(this.timer);this.busy=true;this.state='saving';this.emit();const version=this.version,snapshot=clean(this.snapshot);
   try{const accepted=await this.request('PUT',snapshot);this.revision=accepted.revision;this.persist('accepted',clean(accepted.snapshot));this.attempt=0;if(version===this.version){this.snapshot=clean(accepted.snapshot);this.pending=false;this.persist('pending',null);this.state='saved';}else this.state='pending';}
   catch{this.attempt++;this.state='failed';}finally{this.busy=false;this.emit();if(this.pending&&this.attempt<5)this.queue(this.attempt?Math.min(30000,1000*2**this.attempt):350);}
  }
  async refresh(){if(this.pending){this.attempt=0;return this.flush();}if(this.busy)return;this.busy=true;try{const accepted=await this.request('GET');if(this.pending)return;this.snapshot=clean(accepted.snapshot);this.revision=accepted.revision;this.persist('accepted',this.snapshot);this.state='saved';this.emit();return this.snapshot;}catch{this.state='unavailable';this.emit();}finally{this.busy=false;if(this.pending)this.queue(350);}}
  dispose(){this.cancel(this.timer);}
 }
 return{Sync,clean,keys};
});
