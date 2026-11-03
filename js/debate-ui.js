import {contestResult,showContestResult} from './contest-result.js?v=r220';
import {contestDelta,contestSnapshots} from './contest-feedback.js?v=r217';
// Display-only debate view. Cards and outcome rules remain in Game.
export function mountDebate({game,d,m,portraitCss,save,finish}) {
 const pk=d.ctx?.fid===game.playerForce?'a':d.ctx?.tid===game.playerForce?'b':'a',ek=pk==='a'?'b':'a';
 const po=game.officers[d[pk].o],eo=game.officers[d[ek].o];let disposed=false,previous=null,previousBout=null,lastHit=[false,false];
 const ctxName={alliance:'동맹 제의',truce:'정전 요청',recruit:'등용'}[d.ctx?.kind]??'협상';
 const owner={};m.debateOwner=owner;
 m.classList.remove('hidden');m.innerHTML=`<div class="box contest-dialog" style="min-width:420px;gap:8px"><h3 id="debate-title" style="color:#6cf"></h3><p class="contest-fighters" style="margin:4px 0">${po.name_ko} vs ${eo.name_ko}</p><p id="debate-feedback" class="contest-feedback" role="status" aria-live="polite" aria-atomic="true"></p><div id="debate-stats" style="text-align:left"></div><p id="debate-log" role="status" aria-live="polite" aria-atomic="true" style="font-size:12px;color:#cbb;min-height:54px;white-space:pre-line"></p><p>화술: ${Object.keys(game.debateCardList()).map(c=>`<button class="cmd debate-card" data-c="${c}">${c}</button>`).join(' ')}</p><p id="debate-status" style="font-size:12px;color:#bcd"></p><p style="font-size:11px;color:#999">반박=공격 무효·반격 · 경청=논리 회복 · 도발=다음 화술 봉인 · 🔒=지력 부족(서적 보유 시 해금)</p><p><button class="cmd" id="debate-auto">위임 (자동)</button></p></div>`;
 // R322: existing controls stay in a non-overlapping footer while logs/details scroll.
 const dialog=m.querySelector('.contest-dialog');dialog.classList.add('debate-dialog');
 const doc=m.ownerDocument,body=doc.createElement('div'),footer=doc.createElement('div');body.className='debate-body';footer.className='debate-footer';
 const children=[...dialog.children];for(const el of children.slice(0,5))body.appendChild(el);
 for(const el of children.slice(5))footer.appendChild(el);dialog.appendChild(body);dialog.appendChild(footer);
 const $=id=>m.querySelector('#'+id),active=()=>!disposed&&game.pendingDebate===d&&!d.done&&m.debateOwner===owner&&!m.classList.contains('hidden');
 function render(){if(!active())return;const P=d[pk],E=d[ek];const current=[{id:po.idx,hp:P.hp,hpLabel:'논리'},{id:eo.idx,hp:E.hp,hpLabel:'논리'}];const changes=current.map((x,i)=>{const delta=contestDelta(previous?.[i],x);return delta?(i===0?po:eo).name_ko+': '+delta:''}).filter(Boolean);if(previousBout!==d.bout)$('debate-feedback').textContent=changes.length?`${d.bout}합 · ${changes.join(' / ')}`:previous?'논리 변화 없음':d.bout>0?'이전 설전 복원 · 다음 합부터 변화량 표시':'화술을 골라 설전을 시작하세요';if(previousBout!==d.bout)lastHit=current.map((x,i)=>previous?.[i]?.id===x.id&&x.hp<previous[i].hp);else lastHit=lastHit.map((x,i)=>previous?.[i]?.id===current[i].id&&x);const hit=lastHit;previous=contestSnapshots(current);previousBout=d.bout;
 $('debate-title').textContent=`설전 (${d.bout}합) ${ctxName}`;
 $('debate-stats').className='contest-sides';
 $('debate-stats').innerHTML=[[P,po],[E,eo]].map(([s,o],i)=>`<section class="contest-side${hit[i]?' contest-hit':''}" aria-label="${i===0?'내':'상대'} 무장"><span class="contest-side-portrait" style="${portraitCss(o.idx)}" aria-hidden="true"></span><b>${o.name_ko}</b><small class="contest-side-role">${i===0?'내 무장':'상대 무장'}${hit[i]?' · 논리 감소':''}</small><div>논리 ${Math.max(0,s.hp)} / 100${s.seal?' · 봉인':''}</div><span role="progressbar" aria-label="${o.name_ko} 논리" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.max(0,s.hp)}" style="display:inline-block;width:100px;height:10px;background:#333"><span style="display:block;width:${Math.max(0,s.hp)}%;height:100%;background:#d44"></span></span></section>`).join('');
 $('debate-log').textContent=d.log.slice(-3).join('\n');
 const available=[];m.querySelectorAll('.debate-card').forEach(b=>{const c=b.dataset.c,owned=!!game.debateCards(P.o)[c],cd=Math.max(0,P.cds[c]??0),can=game.debateCardUsable(d,pk,c);b.disabled=!can;b.textContent=c+(cd?` (쿨 ${cd})`:'')+(owned?'':' 🔒');b.title=can?`${c} 사용`:!owned?'지력 또는 서적 필요':P.seal?'이번 화술은 봉인됨':`재사용까지 ${cd}합`;if(can)available.push(c)});
 $('debate-status').textContent=P.seal?'화술 봉인 중: 위임으로 다음 합을 진행할 수 있습니다.':available.length?`사용 가능: ${available.join(' · ')}`:'사용 가능한 화술 없음: 위임으로 진행할 수 있습니다.';
 }
 function after(){if(game.pendingDebate===d&&!d.done)render();else{showContestResult(m.ownerDocument,contestResult('debate',d,{a:game.officers[d.a.o].name_ko,b:game.officers[d.b.o].name_ko}));disposed=true;if(m.debateOwner===owner)delete m.debateOwner;finish()}}
 m.querySelectorAll('.debate-card').forEach(b=>b.onclick=()=>{if(!active()||b.disabled)return;const c=b.dataset.c;game.debateTick(d,pk==='a'?c:game.debatePolicy(d,'a'),pk==='a'?game.debatePolicy(d,'b'):c);save();after();if(active()&&b.disabled)$('debate-auto').focus()});
 $('debate-auto').onclick=()=>{if(!active())return;game.debateAuto(d);save();after()};render();return{dispose(){disposed=true;if(m.debateOwner===owner)delete m.debateOwner}};
}
