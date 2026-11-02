// Persist the already-paid negotiation, never replay its initiating command.
export function debateSnapshot() {
  const d=this.pendingDebate;if(!d||d.done)return null;
  const side=x=>({o:x.o,hp:x.hp,cds:{...x.cds},seal:x.seal});
  const c=d.ctx,ctx={kind:c.kind,fid:c.fid,tid:c.tid,cityId:c.cityId};
  if(c.kind==='recruit')ctx.officerIdx=c.officerIdx;
  if(c.reoffer!==undefined)ctx.reoffer=c.reoffer;
  return {v:1,a:side(d.a),b:side(d.b),bout:d.bout,log:[...d.log],ctx};
}
export function restoreDebate(raw) {
  this.pendingDebate=null;if(raw==null)return false;
  const int=(x,l,h)=>Number.isSafeInteger(x)&&x>=l&&x<=h;
  const fail=()=>{this.log('【안내】저장된 설전 정보를 복원하지 못했습니다. 협상 결과를 적용하지 않았으며 현재 세력·무장 상태를 유지합니다.',true);return false;};
  const c=raw?.ctx,city=this.cityById[c?.cityId];
  if(raw?.v!==1||!c||!['alliance','truce','recruit'].includes(c.kind)||!int(c.fid,0,9999)||!int(c.tid,0,9999)||!int(c.cityId,0,9999)||!this.forces[c.fid]?.alive||!this.forces[c.tid]?.alive||!city||city.force!==c.fid||!(c.reoffer===undefined||typeof c.reoffer==='boolean'))return fail();
  if(c.kind==='recruit'?(c.fid!==c.tid||c.reoffer===true||!int(c.officerIdx,0,99999)||raw.b?.o!==c.officerIdx||this.recruitChance(c.cityId,c.officerIdx)<=0):(c.fid===c.tid))return fail();
  const cards=this.debateCardList();
  const side=x=>{
    if(!x||!int(x.o,0,99999)||!this.officers[x.o]?.state||!int(x.hp,1,100)||typeof x.seal!=='boolean'||!x.cds||typeof x.cds!=='object'||Array.isArray(x.cds))return null;
    if(Object.entries(x.cds).some(([k,v])=>!Object.hasOwn(cards,k)||!int(v,-14,cards[k].cd??0)))return null;
    return {o:x.o,hp:x.hp,cds:{...x.cds},seal:x.seal};
  };
  const a=side(raw.a),b=side(raw.b),active=o=>['ruler','taesu','serving'].includes(o?.state?.status);
  if(!a||!b||a.o===b.o||!active(this.officers[a.o])||this.officers[a.o].state.force!==c.fid||!city.officers.includes(a.o)||!int(raw.bout,0,14)||!Array.isArray(raw.log)||raw.log.length>300||raw.log.some(x=>typeof x!=='string'||x.length>500))return fail();
  if(c.kind!=='recruit'&&(!active(this.officers[b.o])||this.officers[b.o].state.force!==c.tid))return fail();
  const ctx={kind:c.kind,fid:c.fid,tid:c.tid,cityId:c.cityId};if(c.kind==='recruit')ctx.officerIdx=c.officerIdx;if(c.reoffer!==undefined)ctx.reoffer=c.reoffer;
  this.pendingDebate={a,b,bout:raw.bout,log:[...raw.log],done:false,winner:null,ctx};return true;
}
