import assert from 'node:assert/strict';import fs from 'node:fs';
const src=fs.readFileSync('js/map3d.js','utf8'),body=src.split('  bindInput(el) {')[1].split('\n  setSelectedUnit(')[0].replace(/\n  }\s*$/,'');
class V{constructor(x=0,y=0,z=0){Object.assign(this,{x,y,z})}normalize(){return this}crossVectors(){return this}}
const handlers={},el={clientHeight:844,addEventListener:(n,f)=>handlers[n]=f,setPointerCapture(){},getBoundingClientRect:()=>({left:0,top:0,width:390,height:844})},m={view:26,camera:{getWorldDirection(){}},camTarget:{x:0,z:0,addScaledVector(v,s){this.x+=s;return this}},updateFrustum(){},onPick(){picks++}};let picks=0;new Function('el','THREE','addEventListener',body).call(m,el,{Vector3:V},()=>{});const e={clientX:50,clientY:60,pointerId:1};
handlers.pointerdown(e);handlers.pointerup(e);assert.equal(picks,1);
for(const kind of ['pointercancel','lostpointercapture']){handlers.pointerdown(e);handlers[kind](e);const before=m.camTarget.x;handlers.pointermove({...e,clientX:70});assert.equal(m.camTarget.x,before);handlers.pointerup(e);assert.equal(picks,1);handlers.pointerdown(e);handlers.pointerup(e);assert.equal(picks,2);picks=1;}
handlers.pointerdown(e);handlers.pointermove({...e,clientX:80});assert.notEqual(m.camTarget.x,0);handlers.pointerup(e);assert.equal(picks,1);handlers.pointermove({...e,clientX:100});assert.equal(picks,1);
console.log('R324 map cancellation, lost capture, no stale picks, fresh click and ordinary drag PASS');
