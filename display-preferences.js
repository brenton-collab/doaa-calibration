/* DOAA appearance preference. Local only; no network requests. */
(function(){
 'use strict';
 const key='doaa.appearance';
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
 apply();
 window.DOAADisplayPreferences={get appearance(){return choice;},get effective(){return document.documentElement.getAttribute('data-doaa-theme');}};
})();
