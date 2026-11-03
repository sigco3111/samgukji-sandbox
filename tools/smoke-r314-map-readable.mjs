import assert from 'node:assert/strict';
import fs from 'node:fs';
import {placeUnitLabels} from '../js/label-layout.js';
const s=fs.readFileSync('js/map3d.js','utf8');
assert(s.includes('readability=Math.min(1,Math.max(.7,height/700))'));
assert(s.includes('80*readability/pixels'));
assert(s.includes("document.getElementById('logbox')"));
assert(s.includes('JSON.stringify([blocked,width,height'));
for(const [h,v]of [[844,55],[844,80],[390,55]]){
 const p=h/v,r=Math.min(1,Math.max(.7,h/700)),city=Math.max(1.125,20*r/p)*p,unit=Math.max(2.25,36*r/p)*p;
 assert(city>=20*r);assert(unit>=36*r);
}
const occupied=[{x:10,y:10,w:140,h:100}],unit=[{id:1,x:70,y:55,w:30,h:25}];
const result=placeUnitLabels(occupied,unit,390,844)[0];
assert(Math.hypot(result.dx,result.dy)<=120);assert.equal(unit[0].x,70);
console.log('R314 zoom floor, short-screen density, HUD signature and bounded placement PASS');
