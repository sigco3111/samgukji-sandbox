import fs from 'node:fs';import assert from 'node:assert/strict';
const src=fs.readFileSync('js/main.js','utf8'),body=src.slice(src.indexOf('function sndScanLogs()'),src.indexOf('function refreshLog()'));
const run=new Function('game','sndOn','sfx','seen',`let sndLogRows=seen;${body};sndScanLogs();return sndLogRows`);
let seen=new Set(),heard=[],g={logs:Array.from({length:200},(_,i)=>({msg:'normal '+i}))};
const scan=(on=true)=>{seen=run(g,on,k=>heard.push(k),seen)};
scan();assert.deepEqual(heard,[]);
for(const [msg,kind]of[['【계략】fire','strat'],['【전법】strike','hit'],['일기토','duel'],['함락','city']]){g.logs.shift();g.logs.push({msg});scan();assert.equal(heard.pop(),kind);scan();assert.equal(heard.length,0)}
g.logs.shift();g.logs.push({msg:'【계략】muted'});scan(false);scan();assert.equal(heard.length,0);
g.logs=g.logs.slice(-60);scan();assert.equal(heard.length,0);g.logs.push({msg:'설전'});scan();assert.deepEqual(heard,['duel']);
assert.equal(seen.size,g.logs.length);assert(seen.size<=200);console.log('R294 capped log sound selection PASS');
