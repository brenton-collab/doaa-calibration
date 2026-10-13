/* Canvas ownership for a mountable SKY viewport. No application DOM selectors. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAASkyViewportCanvas=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 function create({overlay,base}){
  if(!overlay?.getContext||!base?.getContext)throw new TypeError('SKY requires two canvas elements');
  const ctx=overlay.getContext('2d'),tg=base.getContext('2d');
  if(!ctx||!tg)throw new Error('SKY canvas 2D context unavailable');
  function resize(width,height,dpr=1){
   if(!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0)throw new RangeError('Invalid viewport dimensions');
   const ratio=Number.isFinite(dpr)&&dpr>0?dpr:1;
   for(const canvas of [overlay,base]){
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    canvas.style.width=width+'px';canvas.style.height=height+'px';
    canvas.getContext('2d').setTransform(ratio,0,0,ratio,0,0);
   }
  }
  return Object.freeze({overlay,base,ctx,tg,resize});
 }
 return Object.freeze({create});
});
