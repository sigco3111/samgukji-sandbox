// Read-only panel navigation for units whose map markers share a position.
export function overlappingUnits(unit, units) {
  if (!unit || !Number.isFinite(unit.x) || !Number.isFinite(unit.z)) return [];
  return (units ?? []).filter(other => other.id !== unit.id && Number.isFinite(other.x) && Number.isFinite(other.z) && Math.hypot(other.x-unit.x,other.z-unit.z)<=0.05);
}
