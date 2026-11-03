import fs from 'node:fs';import assert from 'node:assert/strict';
const css=fs.readFileSync('css/style.css','utf8');
const s=css.slice(css.indexOf('/* R291:'));
assert.equal(s.trim(), '/* R291: portrait panel covers the bottom log; suppress bleed while it is open. */\n@media (max-width:480px){\n #panel:not(.hidden) ~ #logbox{visibility:hidden}\n}');
assert(css.includes('(min-width:481px) and (max-width:799px)'));
console.log('R291 narrow portrait panel visibility scope PASS');
