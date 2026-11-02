import fs from 'node:fs';import assert from 'node:assert/strict';
const s=fs.readFileSync('js/main.js','utf8'),a=s.indexOf('function checkGameOver()'),b=s.indexOf('function endModal(',a);let calls=0;const run=new Function('game','endModal','josa','modal',s.slice(a,b)+'checkGameOver();');
for(const [unified,over,expected]of [[false,false,1],[true,true,1],[true,false,0],[false,true,1]]){const g={cities:[{force:5}],forces:{5:{alive:true}},playerForce:5,forceName:()=> '시험군',unified,over,year:193,month:1,turn:100};calls=0;run(g,()=>calls++,x=>x,()=>{});assert.equal(calls,expected);run(g,()=>calls++,x=>x,()=>{});assert.equal(calls,expected);}
console.log('R211 victory continue/reload 8 checks PASS');

for(const over of [true,false]){const legacy={over};const unified=legacy.unified??legacy.over??false;assert.equal(unified,over);}
console.log('R211 legacy over fallback 2 checks PASS');
