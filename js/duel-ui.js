import {contestResult,showContestResult} from './contest-result.js?v=r220';
import {contestDelta,contestSnapshots} from './contest-feedback.js?v=r217';
import {createDuelClock} from './duel-clock.js?v=r199';
// A modal owns one clock. The engine is still entirely turn/bout based.
export function mountDuel({game,d,m,portraitCss,save,finish,doc=document}) {
  const pk=d.a.u.force===game.playerForce?'a':'b',ek=pk==='a'?'b':'a';
  const STANCES=[['attack','공격 중시'],['defense','방어 중시'],['spirit','투지 중시'],['burst','일발 중시']];
  const CMDS=[['필살기',100],['급소',200],['무쌍',300],['암기',0],['퇴각',0],['위퇴각',0]];
  let queued=null,disposed=false,previous=null,previousBout=null,lastHit=[false,false];
  const owner={};m.duelOwner=owner;m.classList.remove('hidden');
  m.innerHTML=`<div class="box contest-dialog" style="min-width:420px;gap:4px;padding:14px"><h3 id="duel-title" style="color:#f66"></h3><div id="duel-fighters" class="contest-fighters"></div><p id="duel-feedback" class="contest-feedback" role="status" aria-live="polite" aria-atomic="true"></p><div id="duel-stats" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px"></div><p id="duel-log" role="log" aria-label="최근 일기토 기록" aria-live="off" style="font-size:12px;color:#cbb;min-height:36px"></p><p>방침: ${STANCES.map(([s,n])=>`<button class="cmd duel-stance" data-s="${s}">${n}</button>`).join(' ')}</p><p id="duel-swaps"></p><p>필살: ${CMDS.map(([n,need])=>`<button class="cmd duel-cmd" data-c="${n}">${n}${need?` (투지${need})`:''}</button>`).join(' ')}</p><p id="duel-queued" style="font-size:12px"></p><p id="duel-status" role="status" aria-live="polite"></p><p id="duel-reasons" style="font-size:11px;color:#aaa"></p><p><button class="cmd" id="duel-play">시작</button> <button class="cmd" id="duel-pause">정지</button> <button class="cmd" id="duel-go">합 진행</button> <button class="cmd" id="duel-auto">위임 (자동)</button></p><p style="font-size:11px;color:#aaa">실시간 약1.2초/합 · 정지 중 교체 가능 · 필살은 다음 합에 사용 · 새로고침 시 정지/필살 대기 해제</p></div>`;
  const $=id=>m.querySelector('#'+id);
  const active=()=>!disposed&&game.pendingDuel===d&&!d.done&&m.duelOwner===owner&&!m.classList.contains('hidden');
  const bar=(v,max,color,label)=>`<span role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${Math.max(0,v)}" style="display:inline-block;width:100px;height:10px;background:#333"><span style="display:block;width:${Math.max(0,Math.min(100,v/max*100))}%;height:100%;background:${color}"></span></span>`;
  function render(){
    if(!active())return;
    const P=d[pk],E=d[ek],po=game.duelOfficer(d,pk),eo=game.duelOfficer(d,ek);
    const current=[{id:po.idx,hp:P.hp,spirit:P.spirit},{id:eo.idx,hp:E.hp,spirit:E.spirit}];
    const changes=current.map((x,i)=>{const delta=contestDelta(previous?.[i],x);return delta?(i===0?po:eo).name_ko+': '+delta:''}).filter(Boolean);
    if(previousBout!==d.bout)$('duel-feedback').textContent=changes.length?`${d.bout}합 · ${changes.join(' / ')}`:previous?'체력·투지 변화 없음':d.bout>0?'이전 대결 복원 · 다음 합부터 변화량 표시':'대결 준비 · 시작 또는 합 진행을 누르세요';
    if(previousBout!==d.bout)lastHit=current.map((x,i)=>previous?.[i]?.id===x.id&&x.hp<previous[i].hp);else lastHit=lastHit.map((x,i)=>previous?.[i]?.id===current[i].id&&x);const hit=lastHit;
    previous=contestSnapshots(current);previousBout=d.bout;
    $('duel-title').textContent=`일기토 (${d.bout}합)`;
    $('duel-fighters').textContent=`${po.name_ko} vs ${eo.name_ko}`;
    $('duel-stats').className='contest-sides';
    $('duel-stats').innerHTML=[[P,po],[E,eo]].map(([s,o],i)=>`<section class="contest-side${hit[i]?' contest-hit':''}" aria-label="${i===0?'내':'상대'} 무장"><span class="contest-side-portrait" style="${portraitCss(o.idx)}" aria-hidden="true"></span><b>${o.name_ko}</b><small class="contest-side-role">${i===0?'내 무장':'상대 무장'}${hit[i]?' · 피격':''}</small><div>체력 ${Math.max(0,s.hp)} / 100</div>${bar(s.hp,100,'#d44',o.name_ko+' 체력')}<div>투지 ${s.spirit} / 300</div>${bar(s.spirit,300,'#4a7fd4',o.name_ko+' 투지')}</section>`).join('');
    $('duel-log').textContent=d.log.slice(-3).join('\n');$('duel-log').style.whiteSpace='pre-line';
    m.querySelectorAll('.duel-stance').forEach(b=>{b.style.borderColor=P.stance===b.dataset.s?'#ffd700':'';b.setAttribute('aria-pressed',String(P.stance===b.dataset.s));});
    const choices=game.duelSwapOptions(d,pk);
    $('duel-swaps').innerHTML='교체: '+(choices.map(i=>`<button class="cmd duel-swap" data-i="${i}" ${clock.running?'disabled':''}>${game.officers[i].name_ko} (체력 ${P.hpMap[i]})</button>`).join(' ')||'<span style="color:#999">기참전 교체 무장 없음</span>');
    m.querySelectorAll('.duel-swap').forEach(b=>b.onclick=()=>{if(clock.running||!active())return;if(game.swapDuelOfficer(d,pk,Number(b.dataset.i))){queued=null;save();render();}});
    const reasons=[];
    m.querySelectorAll('.duel-cmd').forEach(b=>{const name=b.dataset.c,need=CMDS.find(x=>x[0]===name)[1];let why=P.spirit<need?`투지 ${need} 필요`:name==='암기'&&P._hiddenUsed?'이미 사용함':name==='암기'&&!game.unitHasItemKind(P.u,'weapon')?'무기 명품 필요':name==='위퇴각'&&!game.unitHasItemKind(P.u,'bow')?'활 명품 필요':'';b.disabled=!!why;b.title=why||`${name} 다음 합 예약/취소`;b.setAttribute('aria-label',name+(why?' · '+why:' · 다음 합 예약/취소'));b.setAttribute('aria-pressed',String(queued===name));if(why)reasons.push(name+': '+why)});
    $('duel-reasons').textContent=reasons.join(' · ');
    $('duel-queued').textContent=queued?`다음 합 필살: ${queued} (다시 누르면 취소)`:'다음 합 필살: 없음';
    $('duel-status').textContent=clock.running?'실시간 진행 중':'정지 중';
    $('duel-play').disabled=clock.running;$('duel-pause').disabled=!clock.running;$('duel-go').disabled=clock.running;
  }
  function present(){showContestResult(doc,contestResult('duel',d,{a:game.duelOfficer(d,'a').name_ko,b:game.duelOfficer(d,'b').name_ko}));}
  function dispose(){if(disposed)return;clock.dispose();disposed=true;doc.removeEventListener('visibilitychange',visibility);if(m.duelOwner===owner)delete m.duelOwner;}
  function tick(){
    if(!active()){dispose();return;}
    const sel={stance:d[pk].stance,cmd:queued};queued=null;
    game.duelTick(d,pk==='a'?sel:game.duelPolicy(d,'a'),pk==='a'?game.duelPolicy(d,'b'):sel);
    if(!save())clock.pause();
    if(game.pendingDuel!==d||d.done){present();dispose();finish();return;}render();
  }
  const clock=createDuelClock({tick,active,hidden:()=>doc.hidden,onState:()=>render()});
  const visibility=()=>{if(doc.hidden)clock.pause();};doc.addEventListener('visibilitychange',visibility);
  m.querySelectorAll('.duel-stance').forEach(b=>b.onclick=()=>{if(!active())return;d[pk].stance=b.dataset.s;if(!save())clock.pause();render();});
  m.querySelectorAll('.duel-cmd').forEach(b=>b.onclick=()=>{if(!active()||b.disabled)return;queued=queued===b.dataset.c?null:b.dataset.c;render();});
  $('duel-play').onclick=()=>{if(game.saveFailed||!active())return;clock.start();if(clock.running)$('duel-pause').focus();};$('duel-pause').onclick=()=>{clock.pause();if(active())$('duel-play').focus();};
  $('duel-go').onclick=()=>{if(!clock.running)tick();};
  $('duel-auto').onclick=()=>{if(!active())return;clock.pause();queued=null;game.duelAuto(d);save();present();dispose();finish();};
  render();return {dispose,pause:()=>clock.pause()};
}
