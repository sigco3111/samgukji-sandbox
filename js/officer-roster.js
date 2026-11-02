// Read-only roster projection. Never returns undiscovered or unseen unrelated officers.
export function rosterRows(game, query = '', sort = 'name') {
  const own = game.playerForce, observing = own == null;
  const rows = [];
  for (const o of Object.values(game.officers)) {
    const st = o.state;
    if (!st || ['dead', 'not_yet'].includes(st.status)) continue;
    const mine = own != null && st.force === own;
    const held = own != null && st.status === 'captive' && st.captor === own;
    const city = game.cityById[st.city];
    const unit = game.units.find(u => u.officers.includes(o.idx));
    if (!mine && !held && !(observing && st.status !== 'free')) continue;
    if (st.status === 'free' && st.found === false) continue;
    let status, location;
    if (st.status === 'captive') {
      status = observing ? '포로' : held ? '억류 중인 타 세력 포로' : '타 세력에 억류된 내 무장';
      const visible = held || observing || (city && game.cityVisible(city));
      location = visible && city ? city.name_ko : '억류 위치 미관측';
    } else if (unit) { status = '출진'; location = `${unit.label} 부대`; }
    else if (city && city.force === st.force && city.officers.includes(o.idx)) { status = st.status === 'ruler' ? '군주' : st.status === 'taesu' ? '태수' : '주둔'; location = city.name_ko; }
    else { status = '복귀 대기'; location = '주둔 도시 없음'; }
    const force = st.force == null ? '무소속' : game.forceName(st.force);
    if (!`${o.name_ko} ${o.name_zh}`.toLowerCase().includes(query.trim().toLowerCase())) continue;
    rows.push({idx:o.idx,name:o.name_ko,force,forceId:st.force,status,location,captor:st.status==='captive'?game.forceName(st.captor):null,mine,held});
  }
  const keys = new Set(['ldr','war','int','pol','chr']);
  rows.sort((a,b) => keys.has(sort) ? (game.officers[b.idx][sort]-game.officers[a.idx][sort] || a.idx-b.idx) : a.name.localeCompare(b.name,'ko') || a.idx-b.idx);
  return rows;
}
export function rosterOfficer(game, idx) {
  return rosterRows(game).find(r=>r.idx===idx) ?? null;
}
