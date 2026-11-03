// UI only. Keep full threat analysis available to non-UI callers.
export function visibleThreats(game, threats){
 return (threats??[]).filter(t=>{const u=game.units.find(u=>u.id===t.unitId);return u&&(game.delegated||u.force===game.playerForce||game.inVision(u.x,u.z));});
}
