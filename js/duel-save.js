  // R197: persist only encounter data; canonical units are reattached on restore.
export function duelSnapshot() {
    const d = this.pendingDuel;
    if (!d || d.done) return null;
    const side = k => { const x = d[k]; return {unitId:x.u.id,offs:[...x.offs],cur:x.cur,hp:x.hp,hpMap:{...x.hpMap},spirit:x.spirit,stance:x.stance,streak:x.streak,lastStance:x.lastStance,_hiddenUsed:!!x._hiddenUsed}; };
    return {v:1,a:side('a'),b:side('b'),bout:d.bout,log:[...d.log]};
  }
export function restoreDuel(raw) {
    this.pendingDuel = null;
    if (raw == null) return false; // legacy saves never had an encounter field
    const int = (n,lo,hi) => Number.isSafeInteger(n) && n >= lo && n <= hi;
    const stance = x => ['attack','defense','spirit','burst'].includes(x);
    const side = x => {
      if (!x || !int(x.unitId,0,Number.MAX_SAFE_INTEGER)) return null;
      const u = this.units.find(y=>y.id===x.unitId);
      if (!u || !(u.troops>0) || !Number.isFinite(u.troops) || !this.forces[u.force]?.alive || !Array.isArray(x.offs) || !x.offs.length || x.offs.length>3 || new Set(x.offs).size!==x.offs.length) return null;
      if (x.offs.some(i=>!int(i,0,Number.MAX_SAFE_INTEGER) || !u.officers.includes(i) || this.officers[i]?.state?.force!==u.force || !['serving','ruler','taesu'].includes(this.officers[i]?.state?.status))) return null;
      if (!int(x.cur,0,x.offs.length-1) || !int(x.hp,1,100) || !int(x.spirit,0,300) || !int(x.streak,0,50) || !stance(x.stance) || !(x.lastStance===null || stance(x.lastStance)) || typeof x._hiddenUsed!=='boolean') return null;
      if (!x.hpMap || typeof x.hpMap!=='object' || Array.isArray(x.hpMap) || Object.entries(x.hpMap).some(([i,h])=>!x.offs.includes(Number(i)) || !int(h,1,100))) return null;
      return {u,offs:[...x.offs],cur:x.cur,hp:x.hp,hpMap:{...x.hpMap},spirit:x.spirit,stance:x.stance,streak:x.streak,lastStance:x.lastStance,_hiddenUsed:x._hiddenUsed};
    };
    const a = side(raw?.a), b = side(raw?.b);
    if (raw?.v!==1 || !a || !b || a.u===b.u || a.u.force===b.u.force || !int(raw.bout,0,49) || !Array.isArray(raw.log) || raw.log.length>300 || raw.log.some(x=>typeof x!=='string' || x.length>500)) {
      this.log('【안내】저장된 일기토 정보를 복원하지 못했습니다. 대결 결과는 적용하지 않았으며 현재 부대 상태를 유지합니다.',true);
      return false;
    }
    this.pendingDuel = {a,b,bout:raw.bout,log:[...raw.log],done:false};
    return true;
  }
