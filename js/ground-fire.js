// Terrain fire: no instant hit, no spread, no stacked damage. Contact uses existing unit burn next turn.
export function groundFireTargets(g,u){if(!u)return[];const out=[];for(const [dx,dz]of[[-.9,0],[.9,0],[0,-.9],[0,.9],[-.9,-.9],[-.9,.9],[.9,-.9],[.9,.9]]){const x=Math.round((u.x+dx)*10)/10,z=Math.round((u.z+dz)*10)/10;if(g.canGroundFire(u,x,z))out.push({type:'ground',x,z,name:`지형 · ${x.toFixed(1)}, ${z.toFixed(1)}`});}return out;}
export function restoreGroundFires(raw){return Array.isArray(raw)?raw.filter(f=>f&&Number.isFinite(f.x)&&Number.isFinite(f.z)&&f.x>=100&&f.x<=126.5&&f.z>=21.5&&f.z<=43&&Number.isInteger(f.left)&&f.left>0&&f.left<=3).slice(0,100).map(f=>({x:f.x,z:f.z,left:f.left,...(Array.isArray(f.touched)?{touched:[...new Set(f.touched.filter(Number.isInteger))].slice(0,1000)}:{})})):[];}
// Bounded AI use: remove a fire threatening a current friendly position/next waypoint;
// otherwise ignite an empty next waypoint of a nearby hostile, never a known friendly route.
export function aiGroundAction(g,u,offense=true){
 const near=(a,b,r)=>Math.hypot(a.x-b.x,a.z-b.z)<r;
 const own=g.units.filter(v=>v.force===u.force||g.isPeace(u.force,v.force));
 const points=v=>[v,...(v.path??[]).slice(0,2).map(p=>({x:p[0],z:p[1]}))];
 const fire=(g.groundFires??[]).find(f=>near(f,u,2.2)&&own.some(v=>points(v).some(p=>near(f,p,.7))));
 if(fire&&g.fireStrat(u.id,'douse',{type:'ground',x:fire.x,z:fire.z}))return true;
 if(!offense)return false;
 const hostile=g.units.filter(v=>v.force!==u.force&&!g.isPeace(u.force,v.force)&&near(v,u,3));
 for(const v of hostile){const p=v.path?.[0];if(!p)continue;const [x,z]=p;
  if(own.some(v=>points(v).some(p=>near({x,z},p,.8))))continue;
  if(g.canGroundFire(u,x,z)&&g.fireStrat(u.id,'fire',{type:'ground',x,z}))return true;
 }return false;
}
