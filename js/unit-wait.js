// Current interception condition only, not a claim about the last turn or an ETA.
// Do not call isPeace: its lazy record creation would mutate a read-only view.
export function unitWaitText(game, u) {
  if (!u || u.tx == null || (u.conf ?? 0) > 0 || u.targetFac != null) return '';
  const target = game.cityById?.[u.targetCity];
  if (target?.force === u.force) return ''; // Friendly-city return bypasses interception.
  const peace = fid => {
    const k = fid < u.force ? `${fid}_${u.force}` : `${u.force}_${fid}`;
    const d = game.diplo?.[k];
    return (d?.allianceUntil ?? 0) >= game.turn || (d?.truceUntil ?? 0) >= game.turn;
  };
  const engaged = (game.units ?? []).some(v => v !== u && v.force !== u.force &&
    (v.force < 0 || !peace(v.force)) && Math.hypot(v.x - u.x, v.z - u.z) < 2.2);
  return engaged ? '현재 인접 적 부대로 진격 대기 조건입니다. 목표·경로는 유지됩니다. 다음 턴 이동을 보장하지 않습니다.' : '';
}
