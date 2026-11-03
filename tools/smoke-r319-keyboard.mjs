import assert from 'node:assert/strict';import{mapRotationKey}from'../js/map-keyboard.js';
for(const[k,v]of[['q',1],['Q',1],['e',-1],['E',-1],['a',0]])assert.equal(mapRotationKey({key:k}),v);
for(const flag of['defaultPrevented','isComposing','ctrlKey','altKey','metaKey'])assert.equal(mapRotationKey({key:'q',[flag]:true}),0);
assert.equal(mapRotationKey({key:'q',keyCode:229}),0);assert.equal(mapRotationKey({key:'e',target:{isContentEditable:true}}),0);
for(const tag of['input','textarea','select','editable-child'])assert.equal(mapRotationKey({key:'q',target:{closest:()=>({tag})}}),0);
assert.equal(mapRotationKey({key:'Q',shiftKey:true,target:{closest:()=>null}}),1);
console.log('R319 typing, modifiers and composition ignored; plain map Q/E retained PASS');