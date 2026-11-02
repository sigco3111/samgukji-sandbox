import {battleReports} from './battle-report.js?v=r252';
// Only newly appended, validated basic strike records. Never infer totals from logs.
export function newBattleMarkers(game,oldRows){
 const records=battleReports({...game,logs:(game.logs??[]).filter(l=>!oldRows.has(l))}).slice(0,3);
 return records.flatMap(r=>[r.a,r.b].filter(s=>game.delegated||game.inVision(s.x,s.z)).map((s,i)=>({x:s.x,z:s.z,text:`${s.name} -${s.loss.toLocaleString()}명${r.kind==='siege'&&s===r.b?` · 내구 -${s.hpLoss.toLocaleString()}`:''}`,side:i})));
}
export function createMapBattleFeedback({doc=document,now=()=>Date.now()}){
 let root=null,markers=[],until=0,owner=null;
 const clear=()=>{root?.remove();root=null;markers=[];owner=null};
 return {clear,show(game,oldRows){clear();markers=newBattleMarkers(game,oldRows);if(!markers.length)return;owner={game,fid:game.playerForce,delegated:game.delegated};until=now()+5000;root=doc.createElement('div');root.id='map-battle-feedback';root.setAttribute('aria-hidden','true');for(const m of markers){const el=doc.createElement('div');el.className='map-battle-badge';el.textContent='기본교전(최근3건) · '+m.text;root.append(el);m.el=el}doc.body.append(root)},render(game,project){if(!root)return;if(now()>until||owner.game!==game||owner.fid!==game.playerForce||owner.delegated!==game.delegated){clear();return}const hud=doc.getElementById('hud-top')?.getBoundingClientRect(),panel=doc.getElementById('panel'),pr=panel&&!panel.classList.contains('hidden')?panel.getBoundingClientRect():null;const modal=doc.getElementById('modal'),blocked=modal&&!modal.classList.contains('hidden');for(const m of markers){const p=project(m.x,m.z),el=m.el;const x=p.x,y=p.y-48-m.side*40,w=el.offsetWidth,h=el.offsetHeight;el.hidden=blocked||!(game.delegated||game.inVision(m.x,m.z))||p.depth<-1||p.depth>1||x-w/2<0||x+w/2>innerWidth||y<(hud?.bottom??0)||y+h>innerHeight||(pr&&x+w/2>pr.left&&x-w/2<pr.right&&y+h>pr.top&&y<pr.bottom);el.style.left=x+'px';el.style.top=y+'px'}}};
}
