import {battleReports} from './battle-report.js?v=r328';
// Historical command snapshot only. Never infer success or query live target values.
export function commandFeedback(game,oldRows,pf,hit){
 if(hit?.type!=='unit')return '';
 const kind=pf.kind==='tactic'?'tactic':'strat';
 const r=battleReports({...game,logs:(game.logs??[]).filter(l=>!oldRows.has(l))}).find(r=>r.kind===kind&&r.a.id===pf.uid&&r.b.id===hit.id);
 if(!r)return '';
 let text=`명령 전후 · ${r.b.name} 병력 ${r.b.before.toLocaleString()} → ${r.b.after.toLocaleString()} (피해 ${r.b.loss.toLocaleString()}) · ${r.a.name} 부대 기력 ${r.qiBefore} → ${r.qiAfter} · 대상 혼란 ${r.confBefore} → ${r.confAfter}턴`;
 if(kind==='strat')text+=` · 대상 화재 ${r.burnBefore} → ${r.burnAfter}턴`;
 if(r.area)text+=` · 광역 표시 대상 ${r.area.length}부대 (상세는 전투 보고)`;
 return text+' · 주 대상 기록이며 현재 상태·전투 전체 피해가 아닙니다.';
}
