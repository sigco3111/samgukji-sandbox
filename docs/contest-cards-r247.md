# R247 contest fighter cards - local review candidate

## Scope
Display-only grouping of each fighter portrait, name, side, HP/logic and spirit. Warm border and explicit text mark damage to the same officer in the latest bout. Highlight remains on same-bout stance render, resets on a new bout or changed officer. Existing R217 delta text and R220 result summaries are not new work. Original engine, command handlers, duel clock, selection rules and save schema are unchanged. No AI/economy/diplomacy tuning or manual authority change.

## Evidence
- Actual isolated Chromium 390x844: unchanged natural turn-200 duel save, defense stance, three real bouts, auto settlement; bout and settled saves reload byte-exact, no browser errors.
- Diagnostic R210 paid debate save: first three usable cards and auto settlement. This is not an unforced natural debate.
- Same seed411, same commands, R245 vs candidate: all four intermediate/final saves are exact for each contest and each motion setting; duel RNG9, debate RNG18; eight browser runs, zero errors. These are controlled continuation pairs, not long-run AI quality proof.
- Browser animation API: normal mode reports contest-flash running, zero animations after1000ms; reduced-motion reports none throughout. Text/border remain readable without animation. No physical-phone GPU or background proof.
- Portrait390x844: all three latest duel logs visible; last instruction accessible with a short vertical scroll. Landscape844x390: actual last logs, command rows and bottom instruction/auto buttons reached by scrolling. No horizontal overflow: duel699=699, debate474=474. Not all controls fit at once.
- R24729 source/fixture assertions; full83/83 suites. Source gates are not counted as runtime pixel or engine proof.

## Unrelated test defects separated
R16 expected literal portraitCss(po.idx). The new two-side loop calls portraitCss(o.idx). Gate now requires both portrait invocation and portrait class; actual browser checks show two portrait elements with CSS backgrounds. It does not prove every officer has an approved image.

Old yuxi gate appended the item then sliced to three. If ruler already held three items, yuxi was dropped. Seed23 R245 and candidate both fail104->112 with qinggang/yitian/fangtian and no yuxi; fixture-only insertion first yields104->122. Original items restored after the test. No product rule change. The first unseeded571->579 failure has no item snapshot, so this is evidence of the same reproducible failure class, not proof of that exact past cause.

## Status
Local review candidate only. Public remains R245. Remote publication requires fixed-byte verification, PR review, successful deployment and separate live UI checks. Original historical save files untouched; diagnostic saves and evidence stored separately.
