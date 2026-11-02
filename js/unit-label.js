// Display-only, no game-state writes. Unknown troop values are never guessed.
export function unitLabelText(unit){
 const name=String(unit.displayName??unit.label??'부대');
 const troops=Number.isFinite(unit.troops)?Math.max(0,Math.floor(unit.troops)).toLocaleString('en-US')+'명':'병력 미상';
 return {name,troops,key:JSON.stringify([name,troops])};
}
