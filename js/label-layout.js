// Bounded display-only layout. Earlier labels win; every label keeps all text.
// If no free nearby slot exists, keep the old position rather than hide information.
export function placeUnitLabels(fixed, units, width, height) {
  const occupied = fixed.map(r => ({...r})), out = [];
  const overlap = (a,b) => a.x < b.x+b.w+3 && a.x+a.w+3 > b.x && a.y < b.y+b.h+3 && a.y+a.h+3 > b.y;
  const candidates=[[0,0],[0,-24],[0,24],[-32,0],[32,0],[0,-48],[0,48],[-32,-24],[32,-24],[-32,24],[32,24],[0,-72],[0,72],[-64,0],[64,0],[0,-96],[0,96],[-96,0],[96,0],[0,-120],[0,120]];
  // Dense map views also need diagonal slots, searched nearest-first within 120px.
  const extra=[];for(let y=-112;y<=112;y+=16)for(let x=-112;x<=112;x+=16)if(x*x+y*y<=14400)extra.push([x,y]);
  extra.sort((a,b)=>a[0]*a[0]+a[1]*a[1]-b[0]*b[0]-b[1]*b[1]);candidates.push(...extra);
  for (const r of [...units].sort((a,b)=>a.id-b.id)) {
    let chosen = {...r, dx:0, dy:0};
    for (const [dx,dy] of candidates) {
      const c = {...r, x:r.x+dx, y:r.y+dy, dx, dy};
      if(c.x<4 || c.y<4 || c.x+c.w>width-4 || c.y+c.h>height-4 || occupied.some(o=>overlap(c,o)))continue;
      chosen=c;break;
    }
    occupied.push(chosen);out.push(chosen);
  }
  return out;
}
