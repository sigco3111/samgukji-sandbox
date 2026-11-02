// Read only existing order fields. A route count is not an arrival-time estimate.
export function unitOrderText(unit,cities={},facilities=[]){
 const route=`남은 경로 ${(unit.path??[]).length}`;
 const fac=id=>facilities.find(f=>f.id===id);
 if(unit.building&&unit.tx==null&&!unit.path?.length)return `${unit.building} 건설 중`;
 if(unit.repairing!=null&&unit.tx==null&&!unit.path?.length){const f=fac(unit.repairing);return f?`${f.type} 보수 중`:'보수 대상 확인 필요';}
 if(unit.targetFac!=null){const f=fac(unit.targetFac);return f?`목표: ${f.type} 공격 · ${route}`:'시설 공격 대상 확인 필요';}
 if(unit.targetCity!=null){const c=cities[unit.targetCity];return c?`목표: ${c.name_ko} · ${route}`:'도시 목표 확인 필요';}
 if(unit.targetRepair!=null){const f=fac(unit.targetRepair);return f?`목표: ${f.type} 보수 이동 · ${route}`:'보수 이동 대상 확인 필요';}
 if(unit.tx!=null&&unit.tz!=null)return `지정 지점 이동 · ${route}`;
 return '부여된 목표 없음';
}
