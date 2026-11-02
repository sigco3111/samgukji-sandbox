// A display snapshot after the existing engine has settled. Never settles again.
export function contestResult(kind,d,names){
 if(!d?.done)return null;
 if(kind==='duel'){
  const fled=d.fled,win=fled?'':d.a.hp<=0&&d.b.hp<=0?'':d.a.hp<=0?'b':d.b.hp<=0?'a':'';
  return {title:'일기토 결과',text:fled?`${names[fled]} 퇴각`:win?`${names[win]} 승리`:'무승부',detail:`${d.bout}합 · ${names.a} 체력 ${Math.max(0,d.a.hp)} / ${names.b} 체력 ${Math.max(0,d.b.hp)}`};
 }
 return {title:'설전 결과',text:d.winner?`${names[d.winner]} 승리`:'무승부',detail:`${d.bout}합 · ${names.a} 논리 ${Math.max(0,d.a.hp)} / ${names.b} 논리 ${Math.max(0,d.b.hp)}`};
}
export function showContestResult(doc,result){
 if(!result)return;
 doc.getElementById('contest-result')?.remove();
 const box=doc.createElement('aside');box.id='contest-result';box.setAttribute('aria-label',result.title);
 const status=doc.createElement('div');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 const title=doc.createElement('b');title.textContent=result.title+' · '+result.text;
 const detail=doc.createElement('p');detail.textContent=result.detail;
 const note=doc.createElement('small');note.textContent='대결 종료 · 결과는 이미 반영되었습니다';
 const close=doc.createElement('button');close.textContent='닫기';close.setAttribute('aria-label','대결 결과 닫기');close.onclick=()=>box.remove();
 status.append(title,detail,note);box.append(status,close);doc.body.append(box);
}
