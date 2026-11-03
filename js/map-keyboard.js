// Map shortcuts must not consume typing, modified shortcuts or IME composition.
export function mapRotationKey(e){
 if(e.defaultPrevented||e.isComposing||e.keyCode===229||e.ctrlKey||e.altKey||e.metaKey)return 0;
 const t=e.target;if(t?.isContentEditable||t?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"])'))return 0;
 return e.key==='q'||e.key==='Q'?1:e.key==='e'||e.key==='E'?-1:0;
}
