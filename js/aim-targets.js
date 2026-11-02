// Read-only target navigation. The command engine still decides cost/effect/success.
import {RULES,SHIP_TYPES,SIEGE_TYPES,TACTICS,STRATS,TRAPS} from './game.js?v=r247';
export function aimTargets(g,pf){
 const u=g.units.find(x=>x.id===pf.uid);if(!u||g.delegated||u.force!==g.playerForce||(u.conf??0)>0||!['tactic','fire','confuse','rumor','calm','sorcery','thunder'].includes(pf.kind))return[];if(pf.kind!=='tactic'&&(u._stratTurn??-1)===g.turn)return[];
 if(pf.kind!=='tactic'){const S=STRATS[pf.kind],cas=u.officers.map(i=>g.officers[i]).filter(Boolean);if((u.qi??100)<S.qi||Math.max(...cas.map(o=>o.int))<(S.minInt??0))return[];if(['sorcery','thunder'].includes(pf.kind)&&!cas.some(o=>o.skill===(pf.kind==='sorcery'?'요술':'낙뢰')))return[];}
 const peace=f=>f===u.force||(f!=null&&g.isPeace(u.force,f));
 const near=(x,z,r=2.2)=>Number.isFinite(x+z)&&Math.hypot(x-u.x,z-u.z)<r;
 const visible=(x,z)=>g.inVision(x,z);
 const tac=pf.kind==='tactic'?g.tacticInfo(u)?.opts.find(x=>x.id===(pf.tid??'base')):null;
 if(pf.kind==='tactic'&&(!tac||tac.block))return[];
 const out=[];
 for(const d of g.units){if(!near(d.x,d.z)||!visible(d.x,d.z))continue;const own=d.force===u.force;if(pf.kind==='calm'?!own:peace(d.force))continue;if(pf.kind==='tactic'&&!g._tacTargetOk(u,d,tac))continue;if(pf.kind!=='tactic'&&pf.kind!=='calm'&&g.unitHasSkill(d,'위장'))continue;
 out.push({type:'unit',id:d.id,name:`부대 · ${g.officers[d.officers?.[0]]?.name_ko??d.label}`});}
 if(pf.kind==='fire'||(tac&&(pf.tid??'base')==='base'&&(!RULES.cityTacticSiegeOnly||SIEGE_TYPES.has(u.type))))for(const c of g.cities){if(peace(c.force)||(pf.kind==='fire'&&c.force==null)||!near(c.lon,c.lat)||!visible(c.lon,c.lat))continue;out.push({type:'city',id:c.id,name:`도시 · ${c.name_ko}`});}
 if(pf.kind==='fire'||(tac&&TACTICS[u.type]?.fac&&((pf.tid??'base')==='base'||u.type==='bow')))for(const f of g.fieldFacs??[]){const reach=pf.kind==='fire'?2.2:SHIP_TYPES.has(u.type)?1.6:u.type==='catapult'?3:2.2;if(TRAPS.hasOwnProperty(f.type)||f.force==null||peace(f.force)||!near(f.x,f.z,reach)||!visible(f.x,f.z))continue;out.push({type:'fac',id:f.id,name:`시설 · ${f.type} #${f.id}`});}
 return out;
}
export function mountAim({g,pf,label,box,doc=document,onTarget,onCancel}){
 box.replaceChildren();const h=doc.createElement('h3'),note=doc.createElement('p');const u=g.units.find(x=>x.id===pf.uid);h.textContent=`${g.officers[u?.officers?.[0]]?.name_ko??'부대'} · ${label} 대상 선택`;note.textContent=pf.kind==='calm'?'주변 아군 부대를 선택하세요. 지도에서도 고를 수 있습니다.':'현재 시야 안의 주변 대상을 선택하세요. 지도에서도 고를 수 있습니다.';box.append(h,note);const info=doc.createElement('p');info.className='st';info.textContent='아래는 대상 후보입니다. 발동 조건은 선택할 때 다시 확인하며, 발동 성공을 보장하지 않습니다.';box.append(info);const targets=aimTargets(g,pf);if(!targets.length){const e=doc.createElement('p');e.textContent='현재 표시할 주변 대상 후보가 없습니다.';box.append(e)}
 for(const t of targets){const b=doc.createElement('button');b.className='cmd aim-target';b.textContent=t.name;b.dataset.type=t.type;b.dataset.id=t.id;b.onclick=()=>{if(b.disabled)return;if(!aimTargets(g,pf).some(x=>x.type===t.type&&x.id===t.id)){b.disabled=true;info.textContent='대상 상태나 시야가 바뀌었습니다. 취소 후 다시 선택하세요.';return;}onTarget(t)};box.append(b)}
 const cancel=doc.createElement('button');cancel.className='cmd';cancel.id='up-cancel';cancel.textContent='취소';cancel.onclick=onCancel;box.append(cancel);
}
