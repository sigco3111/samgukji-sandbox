import {createDuelClock} from './duel-clock.js?v=r199';
// A modal owns one clock. The engine is still entirely turn/bout based.
export function mountDuel({game,d,m,portraitCss,save,finish,doc=document}) {
  const pk=d.a.u.force===game.playerForce?'a':'b',ek=pk==='a'?'b':'a';
  const STANCES=[['attack','공격 중시'],['defense','방어 중시'],['spirit','투지 중시'],['burst','일발 중시']];
  const CMDS=[['필살기',100],['급소',200],['무쌍',300],['암기',0],['퇴각',0],['위퇴각',0]];
  let queued=null,disposed=false;
  const owner={};m.duelOwner=owner;m.classList.remove('hidden');
  m.innerHTML=`<div class="box" style="min-width:420px;gap:4px;padding:14px"><h3 id="duel-title" style="color:#f66"></h3><div id="duel-fighters"></div><div id="duel-stats" style="display:grid;grid-template-columns:1fr 1fr;gap:12px"></div><p id="duel-log" style="font-size:12px;color:#cbb;min-height:36px"></p><p>방침: ${STANCES.map(([s,n])=>`<button class="cmd duel-stance" data-s="${s}">${n}</button>`).join(' ')}</p><p id="duel-swaps"></p><p>필살: ${CMDS.map(([n,need])=>`<button class="cmd duel-cmd" data-c="${n}">${n}${need?` (투지${need})`:''}</button>`).join(' ')}</p><p id="duel-queued" style="font-size:12px"></p><p id="duel-status" role="status"></p><p><button class="cmd" id="duel-play">시작</button> <button class="cmd" id="duel-pause">정지</button> <button class="cmd" id="duel-go">합 진행</button> <button class="cmd" id="duel-auto">위임 (자동)</button></p><p style="font-size:11px;color:#aaa">실시간 약1.2초/합 · 정지 중 교체 가능 · 필살은 다음 합에 사용 · 새로고침 시 정지/필살 대기 해제</p></div>`;
  const $=id=>m.querySelector('#'+id);
  const active=()=>!disposed&&game.pendingDuel===d&&!d.done&&m.duelOwner===owner&&!m.classList.contains('hidden');
  const bar=(v,max,color)=>`<span style="display:inline-block;width:100px;height:10px;background:#333"><span style="display:block;width:${Math.max(0,Math.min(100,v/max*100))}%;height:100%;background:${color}"></span></span>`;
  function render(){
    if(!active())return;
    const P=d[pk],E=d[ek],po=game.duelOfficer(d,pk),eo=game.duelOfficer(d,ek);
    $('duel-title').textContent=`일기토 (${d.bout}합)`;
    $('duel-fighters').innerHTML=`<span style="${portraitCss(po.idx)};display:inline-block;width:56px;height:56px;border:2px solid #d44;border-radius:4px"></span> VS <span style="${portraitCss(eo.idx)};display:inline-block;width:56px;height:56px;border:2px solid #47d;border-radius:4px"></span><br>${po.name_ko} vs ${eo.name_ko}`;
    $('duel-stats').innerHTML=[[P,po],[E,eo]].map(([s,o])=>`<div style="margin:2px 0"><b>${o.name_ko}</b><div>체력 ${bar(s.hp,100,'#d44')} ${Math.max(0,s.hp)}</div><div>투지 ${bar(s.spirit,300,'#4a7fd4')} ${s.spirit}</div></div>`).join('');
    $('duel-log').textContent=d.log.slice(-3).join('\n');$('duel-log').style.whiteSpace='pre-line';
    m.querySelectorAll('.duel-stance').forEach(b=>{b.style.borderColor=P.stance===b.dataset.s?'#ffd700':'';b.setAttribute('aria-pressed',String(P.stance===b.dataset.s));});
    const choices=game.duelSwapOptions(d,pk);
    $('duel-swaps').innerHTML='교체: '+(choices.map(i=>`<button class="cmd duel-swap" data-i="${i}" ${clock.running?'disabled':''}>${game.officers[i].name_ko} (체력 ${P.hpMap[i]})</button>`).join(' ')||'<span style="color:#999">기참전 교체 무장 없음</span>');
    m.querySelectorAll('.duel-swap').forEach(b=>b.onclick=()=>{if(clock.running||!active())return;if(game.swapDuelOfficer(d,pk,Number(b.dataset.i))){queued=null;save();render();}});
    m.querySelectorAll('.duel-cmd').forEach(b=>{const name=b.dataset.c,need=CMDS.find(x=>x[0]===name)[1];b.disabled=P.spirit<need||(name==='암기'&&(P._hiddenUsed||!game.unitHasItemKind(P.u,'weapon')))||(name==='위퇴각'&&!game.unitHasItemKind(P.u,'bow'));b.setAttribute('aria-pressed',String(queued===name));});
    $('duel-queued').textContent=queued?`다음 합 필살: ${queued} (다시 누르면 취소)`:'다음 합 필살: 없음';
    $('duel-status').textContent=clock.running?'실시간 진행 중':'정지 중';
    $('duel-play').disabled=clock.running;$('duel-pause').disabled=!clock.running;$('duel-go').disabled=clock.running;
  }
  function dispose(){if(disposed)return;clock.dispose();disposed=true;doc.removeEventListener('visibilitychange',visibility);if(m.duelOwner===owner)delete m.duelOwner;}
  function tick(){
    if(!active()){dispose();return;}
    const sel={stance:d[pk].stance,cmd:queued};queued=null;
    game.duelTick(d,pk==='a'?sel:game.duelPolicy(d,'a'),pk==='a'?game.duelPolicy(d,'b'):sel);
    if(!save())clock.pause();
    if(game.pendingDuel!==d||d.done){dispose();finish();return;}render();
  }
  const clock=createDuelClock({tick,active,hidden:()=>doc.hidden,onState:()=>render()});
  const visibility=()=>{if(doc.hidden)clock.pause();};doc.addEventListener('visibilitychange',visibility);
  m.querySelectorAll('.duel-stance').forEach(b=>b.onclick=()=>{if(!active())return;d[pk].stance=b.dataset.s;if(!save())clock.pause();render();});
  m.querySelectorAll('.duel-cmd').forEach(b=>b.onclick=()=>{if(!active()||b.disabled)return;queued=queued===b.dataset.c?null:b.dataset.c;render();});
  $('duel-play').onclick=()=>{if(game.saveFailed)return;clock.start();};$('duel-pause').onclick=()=>clock.pause();
  $('duel-go').onclick=()=>{if(!clock.running)tick();};
  $('duel-auto').onclick=()=>{if(!active())return;clock.pause();queued=null;game.duelAuto(d);save();dispose();finish();};
  render();return {dispose,pause:()=>clock.pause()};
}
