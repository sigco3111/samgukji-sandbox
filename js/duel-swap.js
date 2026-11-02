// The current slot remains the highest entered slot. Only its entered prefix is reordered.
// Thus the original support rule still sees the next never-entered officer at cur + 1.
export function duelSwapOptions(d,k) {
  if (d !== this.pendingDuel || d?.done || !['a','b'].includes(k)) return [];
  const s=d[k];
  if (!s || !(s.hp>0)) return [];
  return s.offs.slice(0,s.cur).filter(i=>Number.isInteger(s.hpMap[i]) && s.hpMap[i]>0 && s.hpMap[i]<=100);
}
export function swapDuelOfficer(d,k,idx) {
  if (!duelSwapOptions.call(this,d,k).includes(idx)) return false;
  const s=d[k],j=s.offs.indexOf(idx),old=s.offs[s.cur];
  s.hpMap[old]=s.hp;
  [s.offs[j],s.offs[s.cur]]=[s.offs[s.cur],s.offs[j]];
  s.hp=s.hpMap[idx];
  d.log=d.log.slice(-100); // Bound repeated UI switches so our own snapshot stays restorable.
  d.log.push(`${this.officers[idx].name_ko} 자유 교체 출전!`);
  return true;
}
