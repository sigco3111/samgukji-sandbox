import assert from 'node:assert/strict';import fs from 'node:fs';
const src=fs.readFileSync('js/map3d.js','utf8');assert(src.includes('Math.min(128/pixels'));assert(src.includes('Math.min(224/pixels'));assert(src.includes('r.x+r.w+r.extraX>0'));
for(const h of[390,844])for(const v of[14,55,80]){const p=h/v,r=Math.min(1,Math.max(.7,h/700)),w=Math.min(128/p,Math.max(4.5,72*r/p))*p,height=Math.min(64/p,Math.max(2.25,36*r/p))*p;assert(w<=128.001);assert(height<=64.001);assert(w>=72*r-.001);assert(height>=36*r-.001)}
console.log('R316 close-label bounds and old edge visibility preservation PASS');
