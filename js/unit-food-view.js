// Snapshot estimate only. No future resupply, losses or skipped consumption assumed.
export function unitFoodView(game,u,monthlyRate){
 if(game.econV!==2)return{text:'구 경제: 부대 병량 소비 없음',low:false};
 if(u.food==null)return{text:'휴대 병량 미초기화',low:false};
 if(!Number.isFinite(u.food)||u.food<0||!Number.isFinite(u.troops)||u.troops<0||!Number.isFinite(monthlyRate)||monthlyRate<0)return{text:'병량 상태 확인 필요',low:false};
 const eat=Math.max(1,Math.round(u.troops*monthlyRate/3)),turns=Math.floor(u.food/eat);
 return{text:`현 병력·무보급 기준 ${turns}턴분 (소비 시 턴당 ${eat})`,low:turns<=3};
}
