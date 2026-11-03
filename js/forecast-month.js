// forceOverview returns a calendar month, not elapsed months. Next12month window.
export function shortageMonthText(currentMonth, predictedMonth){
 if(!Number.isInteger(currentMonth)||currentMonth<1||currentMonth>12||!Number.isInteger(predictedMonth)||predictedMonth<1||predictedMonth>12)return '시점 확인 필요';
 const elapsed=(predictedMonth-currentMonth+12)%12||12;
 return `${predictedMonth}월 (${elapsed}개월 후)`;
}
