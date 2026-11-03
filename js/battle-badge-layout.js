// Preserve newest record/end-point order and exact anchors; hide collisions, never move history.
export function nonOverlappingBadges(rects,gap=4){
 const placed=[];
 return rects.map(r=>{if(!r?.eligible||!['x','y','w','h'].every(k=>Number.isFinite(r[k]))||r.w<=0||r.h<=0)return false;
 if(placed.some(p=>r.x<p.x+p.w+gap&&p.x<r.x+r.w+gap&&r.y<p.y+p.h+gap&&p.y<r.y+r.h+gap))return false;
 placed.push(r);return true;});
}
