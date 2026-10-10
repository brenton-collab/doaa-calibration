'use strict';
// Process-local defensive throttle. Never represents provider-authoritative remaining quota.
// Enrichment is disabled by default; explicit opt-in is required after quota verification.
function createAirlabsBudget({monthlyCap=900,boardReserve=200,enrichmentDailyCap=0,now=()=>Date.now()}={}){
  const counts={month:'',day:'',total:0,enrichment:0,board:0,dailyEnrichment:0};
  function refresh(){
    const d=new Date(now()),month=d.toISOString().slice(0,7),day=d.toISOString().slice(0,10);
    if(counts.month!==month){counts.month=month;counts.total=0;counts.enrichment=0;counts.board=0;counts.day=day;counts.dailyEnrichment=0;}
    else if(counts.day!==day){counts.day=day;counts.dailyEnrichment=0;}
  }
  function take(endpoint){
    refresh();
    const board=endpoint==='flights'||endpoint==='schedules';
    if(counts.total>=monthlyCap)return{ok:false,reason:'monthly local cap'};
    if(!board){
      if(enrichmentDailyCap<=0)return{ok:false,reason:'enrichment disabled pending verified quota'};
      if(counts.dailyEnrichment>=enrichmentDailyCap)return{ok:false,reason:'daily enrichment cap'};
      if(counts.enrichment>=Math.max(0,monthlyCap-boardReserve))return{ok:false,reason:'BOARD reserve'};
    }
    counts.total++;if(board)counts.board++;else{counts.enrichment++;counts.dailyEnrichment++;}
    return{ok:true};
  }
  function snapshot(){refresh();return{...counts,monthlyCap,boardReserve,enrichmentDailyCap,scope:'relay process only; resets on restart; provider circuit is authoritative'};}
  return{take,snapshot};
}
module.exports={createAirlabsBudget};
