// Read-only city snapshot. Call only after the city's existing visibility check.
export function cityFacilitySummary(city){
 const list=Array.isArray(city.facilities)?city.facilities:[],groups=new Map();
 for(const f of list){if(!f||typeof f.type!=='string')continue;const level=Number.isSafeInteger(f.level)&&f.level>=1?Math.min(3,f.level):1;const key=JSON.stringify([f.type,!!f.done,level,f.done?null:f.progress]);let row=groups.get(key);if(!row){row={type:f.type,done:!!f.done,level,progress:Number.isFinite(f.progress)?Math.max(0,f.progress):0,count:0};groups.set(key,row)}row.count++;}
 return {total:list.length,done:list.filter(f=>f?.done).length,building:list.filter(f=>f&&!f.done).length,rows:[...groups.values()]};
}
export function renderCityFacilitySummary(city,specs,open=false){
 const s=cityFacilitySummary(city),escape=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const rows=s.rows.map(f=>`<li><span>${escape(f.type)}${f.done?` Lv${f.level}`:' 공사'}</span><small>${f.done?'완성':`${f.progress}/${Number.isFinite(specs[f.type]?.turns)?specs[f.type].turns:'?'}턴`}${f.count>1?` · ${f.count}개`:''}</small></li>`).join('');
 return `<section class="city-fac-summary" aria-label="도시 시설 현황"><details${open?' open':''}><summary>시설 현황 <small>완성 ${s.done} · 공사 ${s.building}</small></summary>${rows?`<ul>${rows}</ul>`:'<p class="st">시설 없음</p>'}<p class="st">선택한 도시의 현재 시설 상태입니다.</p></details></section>`;
}
