import fs from'node:fs';import assert from'node:assert/strict';
const root=process.cwd()+'/',{Game,restoreOfficer,ITEMS,josa}=await import(root+'js/game.js'),{aiThink}=await import(root+'js/ai.js'),main=fs.readFileSync(root+'js/main.js','utf8'),src=main.slice(main.indexOf('      const d = JSON.parse(localStorage.getItem(SAVE_KEY));'),main.indexOf('      game = g; enterGame();')),load=new Function('DATA','Game','restoreOfficer','ITEMS','josa','localStorage','SAVE_KEY','window',src+'return g;');let saved;globalThis.localStorage={setItem(k,v){saved=v}};
function make(raw=fs.readFileSync(root+'tools/fixtures/r245-natural16.json','utf8')){const D={scenarios:Object.fromEntries([184,190,251].map(x=>[x,JSON.parse(fs.readFileSync(root+`data/scenario-${x}.json`))])),officers:Object.fromEntries(JSON.parse(fs.readFileSync(root+'data/officers670.json')).map(o=>[o.idx,o])),skills:JSON.parse(fs.readFileSync(root+'data/skills.json'))};return load(D,Game,restoreOfficer,ITEMS,josa,{getItem:()=>raw,setItem(){}},'x',{});}

const next=aiThink;let n=0;const ok=(name,v)=>{assert(v,name);n++;console.log('PASS',name)};
function setup(policy='attack_city',target=0){const g=make(fs.readFileSync('tools/fixtures/r250-natural20.json','utf8'));const l=g.cityLegion(9);l.policy=policy;l.target=target;g._legionActing=true;const before={ap:g.forces[2].ap,t:g.cityById[9].troops,f:g.cityById[9].food};const u=g.dispatch(9,[116],17000,'sword');assert(u);assert.equal(u.legionId,l.id);return{g,l,u,before}}
function run(x,fn=next,legion=x.l){let s=42;const old=Math.random;Math.random=()=>((s=Math.imul(s,1664525)+1013904223>>>0)/4294967296);try{fn(x.g,2,legion)}finally{Math.random=old}return x}
const b=run(setup());ok('candidate idle legion picks assigned city0',b.u.targetCity===0);ok('dispatch ordinary AP40 cost',b.before.ap-b.g.forces[2].ap===40);ok('dispatch ordinary troop17000 cost',b.before.t-b.g.cityById[9].troops===17000);ok('dispatch ordinary food40800 cost',b.before.f-b.g.cityById[9].food===40800);ok('path assigned by existing order',b.u.path.length>0);
const c=run(setup('attack_force',29));ok('force policy does not attack other force28 and retreats when selected force too strong',c.u.targetCity===9);const d=run(setup('delegate'));ok('delegate nearest existing target unchanged',d.u.targetCity===11);
for(const policy of ['delegate','attack_city','attack_force']){const x=setup(policy,policy==='attack_force'?29:0),y=setup(policy,policy==='attack_force'?29:0);run(x,aiThink,null);run(y,next,null);ok(policy+' fullAI unit exact',JSON.stringify(x.u)===JSON.stringify(y.u));}
{const x=setup();delete x.u.legionId;const before=JSON.stringify(x.u);run(x);ok('direct old unit not processed',before===JSON.stringify(x.u));}
{const x=setup();x.u.legionId=999;const before=JSON.stringify(x.u);run(x);ok('other orphan unit not processed',before===JSON.stringify(x.u));}
{const x=setup('attack_city',11);x.g.diploOf(2,28).truceUntil=100;run(x);ok('truce selected target not attacked',x.u.targetCity===9);}
{const x=setup();x.g.cityById[0].force=2;run(x);ok('already own target returns home',x.u.targetCity===9);}
{const x=setup();x.u.troops=4000;run(x);ok('weak unit retains retreat branch',x.u.targetCity===9);}
{const x=setup();x.u.targetCity=11;const before=x.u.targetCity;run(x);ok('existing manual city order not overwritten',x.u.targetCity===before);}
{const x=setup();x.g._legionActing=false;ok('manual field target remains allowed',x.g.orderUnit(x.u.id,11));}
{const x=setup();x.u.building='진';const before=JSON.stringify(x.u);run(x);ok('building unit no idle reassign',JSON.stringify(x.u)===before);}
{const x=setup();x.u.targetFac=999;run(x);ok('facility attack order retained',x.u.targetCity===null&&x.u.targetFac===999);}
{const x=setup();x.u.repairing=999;run(x);ok('repair remains unaffected',x.u.targetCity===null&&x.u.repairing===999);}
console.log(n+' focused assertions PASS; policy/weak/direct modifications are explicit diagnostics, actual dispatch carries ordinary costs.');
