// Read-only navigation hints. No command or ownership changes.
export function unitNearbyCities(unit, cities) {
  if (!unit || !Number.isFinite(unit.x) || !Number.isFinite(unit.z)) return [];
  return (cities ?? []).filter(c => Number.isFinite(c.lon) && Number.isFinite(c.lat) && Math.hypot(c.lon-unit.x,c.lat-unit.z)<=1.2);
}
