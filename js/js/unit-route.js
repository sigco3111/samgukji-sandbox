// Own selected order only. A polyline is not a passability or ETA promise.
export function selectedUnitRoute(game,id,visible){
 if(!game||game.over||!visible||game.delegated||game.playerForce==null)return[];
 const u=game.units.find(u=>u.id===id&&u.force===game.playerForce);
 if(!u||!Array.isArray(u.path)||!u.path.length||u.path.length>2048)return[];
 const points=[[u.x,u.z],...u.path];
 return points.every(p=>Array.isArray(p)&&p.length===2&&Number.isFinite(p[0])&&Number.isFinite(p[1])&&p[0]>=70&&p[0]<=140&&p[1]>=10&&p[1]<=60)?points.map(p=>[...p]):[];
}
