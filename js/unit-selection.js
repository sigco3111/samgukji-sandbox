// Display the already-selected visible body, never choose a new command target.
export function selectedVisibleUnit(game,id,open){
 if(!game||game.over||!open||id==null)return null;
 const u=game.units.find(u=>u.id===id);
 if(!u||(!game.delegated&&u.force!==game.playerForce&&!game.inVision(u.x,u.z)))return null;
 return u.id;
}
