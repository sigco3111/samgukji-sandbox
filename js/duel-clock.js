// UI-only scheduler. Combat/AI engines never use wall-clock time.
export function createDuelClock({tick,active,hidden,onState=()=>{},delay=1200,set=setTimeout,clear=clearTimeout}) {
  let timer=null,running=false,disposed=false;
  const cancel=()=>{if(timer!==null)clear(timer);timer=null;};
  const pause=()=>{cancel();if(running){running=false;onState(false);}return false;};
  const schedule=()=>{timer=set(()=>{timer=null;if(disposed||!running)return;if(hidden()||!active()){pause();return;}try{tick();}catch(e){pause();throw e;}if(!running||disposed)return;if(!active()||hidden()){pause();return;}schedule();},delay);};
  return {
    start(){if(disposed||running||hidden()||!active())return false;running=true;onState(true);schedule();return true;},
    pause,
    dispose(){pause();disposed=true;},
    get running(){return running;},
  };
}
