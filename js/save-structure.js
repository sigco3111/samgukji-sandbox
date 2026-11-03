// Minimum restore containers, not repair or complete save validation.
const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const roster=v=>v===undefined||Array.isArray(v)&&v.every(Number.isSafeInteger);
export function saveStructureOkay(d){
 if(!record(d)||!Array.isArray(d.cities)||!d.cities.length||!Array.isArray(d.units)||!record(d.forces)||!record(d.officerStates)||!Array.isArray(d.logs))return false;
 if(!d.cities.every(c=>record(c)&&Number.isSafeInteger(c.id)&&roster(c.officers)&&roster(c.captives)&&(c.facilities===undefined||Array.isArray(c.facilities)&&c.facilities.every(record))))return false;
 if(!d.units.every(u=>record(u)&&Number.isSafeInteger(u.id)&&Array.isArray(u.officers)&&u.officers.every(Number.isSafeInteger)&&(u.path==null||Array.isArray(u.path))))return false;
 if(!Object.values(d.forces).every(f=>record(f)&&(f.legions===undefined||Array.isArray(f.legions)&&f.legions.every(l=>record(l)&&Array.isArray(l.cities)))))return false;
 if(!Object.values(d.officerStates).every(st=>record(st)&&(st.items===undefined||Array.isArray(st.items))&&(st.sworn===undefined||Array.isArray(st.sworn))))return false;
 if(!d.logs.every(record))return false;
 for(const k of['fieldFacs','chronicle','pendingDiplo'])if(d[k]!=null&&(!Array.isArray(d[k])||!d[k].every(record)))return false;
 return true;
}
