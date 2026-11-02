// UI only. Engine costs, income and facility effects remain in game.js.
export function facilityEffectDesc(game, city, facility, spec) {
 const level=facility.level??1;
 if(facility.type==='시장'||facility.type==='농장'){
  const market=facility.type==='시장',boost=game.cityFac(city,market?'조폐':'곡창').length?1.5:1;
  const timing=market?'매월 금':game.econV===2?'수확월(1·4·7·10월) 병량':'매월 병량';
  return `이 시설: 기본 ${timing} 수입 +${25*level*boost}% (Lv${level} × 25%${boost>1?' × '+(market?'조폐':'곡창')+' 1.5':''})`;
 }
 if(facility.type==='병영')return `이 시설: 기본 징병량 +${30*level}% (Lv${level} × 30%)`;
 if(facility.type==='부절대')return `이 시설: 턴 시작 행동력 회복 +${10*level} (세력 시설 Lv 합산 최대 +30) · 이 도시 포로 충성 추가 하락은 레벨과 무관`;
 if(facility.type==='서재')return `이 시설: 세력 기교P 매월 +${10*level} (세력 시설 Lv 합산 최대 +30)`;
 if(facility.type==='대장간'||facility.type==='마구간')return `${spec.desc} · 수동 생산 1회 ${500*level} (Lv${level} × 500), 월 자동생산은 레벨과 무관`;
 return spec.desc;
}
