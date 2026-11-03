"""Reproducible own-data era-inspired starts, not exact historical rosters."""
from pathlib import Path
import json,copy
root=Path(__file__).resolve().parents[1];read=lambda f:json.loads((root/'data'/f).read_text())
base=read('scenario-190.json');hero=read('scenario-251.json');offs=read('officers670.json');by={o['idx']:o for o in offs};states={o['idx']:o for o in base['officers']}
# ruler: cities. Different territorial pressure and starting resource profiles.
settings={200:{343:[8,9,11,12,13,14,15,16,17],18:[2,3,4,5,6,7],635:[10],370:[22,23,24,25,26],636:[27,28,29,30,31,32,33,34],624:[37,38,39,40,41],517:[19,20,21],442:[36],182:[0,1]},208:{343:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],367:[22,23,24,25,26],635:[28],636:[27,29,30,31,32,33,34],624:[37,38,39,40,41],517:[19,20,21],442:[36],179:[0,1]},225:{347:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,21,28,29],629:[18,35,36,37,38,39,40,41],367:[22,23,24,25,26,27,30,31,32,33,34],178:[0,1]}}
# Carry faction families, then explicit later-era migrations. IDs reference existing unchanged officers.
families={343:[343],18:[18],635:[635],370:[365,370],367:[365,370,367],636:[636],624:[614,624],517:[517,515],442:[442],182:[182],179:[182,179],347:[343,347,18,517,515,636],629:[635,629,614,624],178:[182,179,178]}
extra={343:[60,63,254,290,439,461,411,340,331],635:[98,432,395,289,185,124,556,557,45],370:[245,667,661,602],367:[245,667,661,602],347:[60,290,439,411,340,331],629:[98,432,395,289,185,124,556,557,45,136]}
for year,layout in settings.items():
 month=7 if year==208 else 1
 s={'id':str(year),'year':year,'month':month,'forces':[],'cities':copy.deepcopy(base['cities']),'officers':[],'rulesNote':'시대 구도를 바탕으로 한 자체 배치. 정밀 고증·전투 재현이 아니며 자원·무장 소재는 플레이용으로 구성했습니다.'}
 if year<220:s['emperorCity']=13
 fidByRuler={r:i for i,r in enumerate(layout)};owner={c:fidByRuler[r]for r,cs in layout.items()for c in cs}
 available=lambda o:o['avail']<=year<=o['death']
 affiliated={}
 for r in layout:
  family=families[r];pool=set()
  for src in (base,hero):
   for f in src['forces']:
    if f['ruler']in family:pool.update(f['officers'])
  pool.update(extra.get(r,[]));pool.add(r)
  for i in sorted(pool):
   if available(by[i])and i not in affiliated:affiliated[i]=r
 # explicit current rulers and migrations override inherited affiliations
 for r in layout:affiliated[r]=r
 for r in layout:
  for i in extra.get(r,[]):
   if available(by[i]):affiliated[i]=r
 # 200 Liu Bei has not yet recruited Zhuge Liang/Zhao Yun; they remain searchable.
 if year==200:
  for i in [289,395,185,124,556,557,45]:
   if affiliated.get(i)==635:del affiliated[i]
 # Fill era-active regional staff from their existing data home city. This is an
 # explicit gameplay allocation, not a claim of exact historical allegiance.
 for o in offs:
  i=o['idx'];home=states[i].get('city',i%42)
  if i not in affiliated and available(o) and home in owner and i%4!=0:
   affiliated[i]=list(layout)[owner[home]]
 for r,cs in layout.items():
  pool=sorted(i for i,k in affiliated.items()if k==r);fid=fidByRuler[r]
  assert r in pool
  s['forces'].append({'id':fid,'ruler':r,'cities':cs,'officers':pool})
  for n,i in enumerate([r]+[i for i in pool if i!=r]):
   city=cs[0]if i==r else cs[(n-1)%len(cs)]
   s['officers'].append({'idx':i,'loyal':100 if i==r else 85,'status':'ruler'if i==r else'serving','force':fid,'city':city})
 for o in offs:
  i=o['idx']
  if i in affiliated:continue
  rec={'idx':i,'loyal':80,'status':'dead'if o['death']<year else'not_yet'if o['avail']>year else'free'}
  if rec['status']!='dead':rec['city']=states[i].get('city',i%42)
  s['officers'].append(rec)
 for c in s['cities']:
  fid=owner.get(c['id']);c['force']=fid;c['district']=fid;c['taesu']=None
  if fid is None:
   for k in ['troops','gold','food','spears','pikes','bows','horses']:c[k]=0
  else:
   # Explicit own-data supply, not historical troop totals.
   c['troops']=14000+(c['id']%4)*2000+(4000 if year==225 else 0);c['gold']=4500;c['food']=85000
   for k,rate in [('spears',.7),('pikes',.5),('bows',.5),('horses',.4)]:c[k]=int(c['troops']*rate)
   if c['id']in [22,23,24,25,26,27,30,31,32,33,34]:c.update({'junks':2,'lous':1})
   roster=[o for o in s['officers']if o.get('city')==c['id']and o.get('force')==fid];c['taesu']=max(roster,key=lambda x:by[x['idx']]['pol'])['idx']if roster else None
 s['officers'].sort(key=lambda o:o['idx']);(root/'data'/f'scenario-{year}.json').write_text(json.dumps(s,ensure_ascii=False,indent=2)+'\n')
 print(year,[(by[f['ruler']]['name_ko'],len(f['cities']),len(f['officers']))for f in s['forces']])
