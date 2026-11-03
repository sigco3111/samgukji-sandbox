import fs from'node:fs';import assert from'node:assert/strict';import{Game,restoreOfficer,ITEMS,josa}from'../js/game.js';import{aiThink}from'../js/ai.js';
const main=fs.readFileSync('js/main.js','utf8'),src=main.slice(main.indexOf('      const d = JSON.parse(localStorage.getItem(SAVE_KEY));'),main.indexOf('      game = g; enterGame();')),load=new Function('DATA','Game','restoreOfficer','ITEMS','josa','localStorage','SAVE_KEY','window',src+'return g;');const captured=JSON.parse(fs.readFileSync('tools/fixture-r208-natural-ai.json')),base=JSON.parse(captured.raw),sc=JSON.parse(fs.readFileSync('data/scenario-251.json')),skills=JSON.parse(fs.readFileSync('data/skills.json'));globalThis.localStorage={getItem:()=>captured.raw,setItem(){}};const make=()=>load({scenarios:{251:structuredClone(sc)},officers:Object.fromEntries(JSON.parse(fs.readFileSync('data/officers670.json')).map(o=>[o.idx,o])),skills},Game,restoreOfficer,ITEMS,josa,localStorage,'unused',{});let seed;const reset=()=>{seed=captured.rng;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296)};let n=0;const ok=(label,test)=>{test();n++;console.log('PASS '+label)};
function run(edit=()=>{},legion,think=aiThink){const g=make();edit(g);const before={ap:g.forces[21].ap,troops:g.cityById[6].troops,food:g.cityById[6].food,gold:g.cityById[6].gold,units:g.units.length},d=[];const dispatch=g.dispatch.bind(g);g.dispatch=(...a)=>{const u=dispatch(...a);if(u)d.push(structuredClone(u));return u};reset();think(g,21,legion);return{g,before,d,rng:seed}}

const ai=fs.readFileSync('js/ai.js','utf8');
let oldSource=ai.replace('u.force !== fid && u.targetCity === c.id && (u.force < 0 || !game.isPeace(fid, u.force))); // R315: treaty-protected movement is not a hostile city threat.','u.force !== fid && u.targetCity === c.id);');
assert.notEqual(ai,oldSource);
oldSource=oldSource.replace(/from '(.+?)'/g,(_,x)=>`from '${new URL('../js/'+x.slice(2),import.meta.url).href}'`);
const oldThink=(await import('data:text/javascript;base64,'+Buffer.from(oldSource).toString('base64'))).aiThink;
const rows=[];
for(const kind of ['alliance','truce'])for(const offset of [-1,0,1])for(const extraEnemy of [false,true]){
 const edit=g=>{g.diploOf(21,2)[kind+'Until']=g.turn+offset;g.units.push({id:99999,force:2,targetCity:6,x:116.4,z:39.9,troops:1000,type:'sword',officers:[],qi:100});if(extraEnemy)g.units.push({id:99998,force:11,targetCity:6,x:100,z:30,troops:5000,type:'sword',officers:[],qi:100})};
 const old=run(edit,undefined,oldThink),now=run(edit),peace=offset>=0;
 const target=now.g.units.find(u=>u.id===3929)?.targetCity;
 if(peace&&!extraEnemy){assert.equal(target,5);assert.equal(old.g.units.find(u=>u.id===3929)?.targetCity,13)}
 else{assert.equal(JSON.stringify(now.g),JSON.stringify(old.g));assert.equal(now.rng,old.rng);assert.equal(target,13)}
 rows.push({kind,offset,extraEnemy,target,wholeEqual:JSON.stringify(now.g)===JSON.stringify(old.g),rngEqual:now.rng===old.rng});
}
const hostile=g=>g.units.push({id:99999,force:2,targetCity:6,x:116.4,z:39.9,troops:1000,type:'sword',officers:[],qi:100});
const old=run(hostile,undefined,oldThink),now=run(hostile);assert.equal(JSON.stringify(now.g),JSON.stringify(old.g));assert.equal(now.rng,old.rng);
const bandit=g=>g.units.push({id:99999,force:-1,targetCity:6,x:116.4,z:39.9,troops:1000,type:'sword',officers:[],qi:100});
const oldBandit=run(bandit,undefined,oldThink),nowBandit=run(bandit);assert.equal(JSON.stringify(nowBandit.g),JSON.stringify(oldBandit.g));assert.equal(nowBandit.rng,oldBandit.rng);
// Command-legal route: treaty establishment must not be mistaken for target cancellation.
for(const kind of ['alliance','truce']){
 const g=make();g.delegated=true;g.forces[2].ap=100;const c=g.cityById[2],off=c.officers.find(i=>(g.officers[i].state.injuredUntil??0)<=g.turn),u=g.dispatch(2,[off],1000,'sword');assert(u);assert(g.orderUnit(u.id,6));g.playerForce=21;g.diploOf(2,21).v=kind==='alliance'?70:20;g.forces[2].ap=100;assert(kind==='alliance'?g.proposeAlliance(2,21,2):g.requestTruce(2,21,2));const pending=g.pendingDiplo.find(x=>x.kind===kind);assert(pending);assert(g.resolveDiplo(pending.id,true));assert(g.isPeace(2,21));assert.equal(u.targetCity,6);g.stepUnit(u);assert.equal(u.targetCity,6);
}
console.log(JSON.stringify({kind:'R315 prepared boundary pairs, not natural strategy outcome',rows,hostileWholeAndRngEqual:true,legalTreatyRouteBoth:true},null,2));
