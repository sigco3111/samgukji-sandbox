// Display-only bout feedback. Snapshots never enter game state or saved data.
export function contestDelta(previous,current) {
 if(!previous||previous.id!==current.id)return '';
 const parts=[];
 for(const [key,label]of [['hp',current.hpLabel??'체력'],['spirit','투지']]){
  if(!Number.isFinite(previous[key])||!Number.isFinite(current[key]))continue;
  const n=current[key]-previous[key];if(n)parts.push(`${label} ${n>0?'+':''}${n}`);
 }
 return parts.join(' · ');
}
export function contestSnapshots(rows){return rows.map(x=>({...x}));}
