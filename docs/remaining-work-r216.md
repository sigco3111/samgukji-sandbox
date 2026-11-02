# R216 current runtime evidence and remaining work

Runtime: public R214. PR118 proof-only merge 35257d65b85fe5ad9066b8fb54a4d12e19f97bc8. R216 changes no runtime, data or version. This is a local evidence draft, not a release.

## Legion observations
Current R214 engine, actual createLegion, seed42, 184/190/251 x delegate/attack_city/attack_force, each through 180 end-turn calls or game end. No stat/resource/RNG outcome fixtures. Resolve player duels/debates automatically and accept envoy/reject other pending diplomacy so the observation can proceed; this is not a continuous human UI playthrough. Gold/food/troops finite and nonnegative and roster uniqueness checks reported zero. These checks do not establish all invariants or strategy quality.

184: delegate orders city9 on turn5, neutral10 on turns8/9; targeted policies order9 on turns5/10. City9 captured12. Delegate also captures10 turn14. 190: all three policies order11 on3/capture45, but player force dies by the observation end. 251: targeted policies order1 on119, no capture, return0 on134. Target filtering works in these observations; none establishes long-term strategic success.

251 trace: home10534 vs target19000-20000 during long periods does not meet existing 1.5x attack threshold. At order time119 target3000, dispatch7534/food12131. At return order134 unit4523/food7215/siegeAge10, ai.js:258 existing siege relief branch. Values captured after full endTurn differ because subsequent forces act. Stack trace establishes which branch issued the order; order target home0 is retreat, not an unrelated attack. Existing single-city recruit condition is already the R182 held issue. Do not reclassify it as a new discovered feature or apply the held change silently.

## Actual isolated UI continuation
Public R214 at https://sigco3111.github.io/samgukji-sandbox/ . Continue unchanged R204 natural final turn16 save, in separate account-free Chrome390x844/DPR0.5. This combines an older natural campaign snapshot with current code, not a fresh natural R214 campaign. Actual city/legion controls created legion2/governor116/city9/attack_city/target10 on turn16. Existing units13 and16 already targeted10 before creation. A natural recruitment debate opened17; actual automatic debate button resolves it; next actual turn18 captures neutral10. Panel pixels show Suchun/SunJian/2870. Whole saved string survives reload exactly, page errors0. Capture is NOT evidence that the newly created legion dispatched the winning units. Original user saves untouched.

## Facility-map combined workflow
Continue the same isolated natural-path save at18. Actual XiaPi city click -> facility panel -> market build: city gold4443->4243/AP40->20, slots6->7, builders198/533/466. Actual turn19/20 completion progress1/2 and done; monthly city gold5278/AP50 at20 before merge. Actual merge: gold5278->5078/AP50->40/slots7->6/marketLv2. No resources, stats, facilities or outcomes directly edited. Existing legion and intervening AI decisions continue, so full turns are not isolated facility-effect experiments.

390px panel screenshots visually confirm 7/12/building phase header, then 6/12/marketLv2/city5078/AP40. Construction row is below the first screenshot fold; do not claim its progress text is visible there. Map screenshot after closing panel shows facilities around cities and actual completion/merge logs. Map render metadata has six XiaPi meshes and market level2 in signature. Tiny golden level markers are not clearly resolved in the overview pixels, so distant level recognition remains limited. Viewport844x390 actual map-coordinate city click selects XiaPi correctly; reload whole saved string exact, page errors0. Desktop-emulated viewport is not physical-phone touch or performance evidence.

Automation failures kept separate: wrong debate selector, wrong mesh collection method, nonexistent close/camera method. All affected attempts stop, then resume from persisted post-operation state without issuing duplicate in-game builds/merges. No product bug conclusion from these harness errors.

## Remaining assessment
Estimated implementation around80% (75-85) and screen/integration verification around60% (55-65) remain coarse judgments, not counts of releases/coverage rows. No upward change justified by this evidence.

Confirmed core work still open: long-term AI/delegation strategic quality across three scenarios; integration stress across battle/diplomacy/recruitment/transfer/restore; legible battle/duel/debate presentation rather than only functioning controls; map/facility interaction readability at narrow viewports and orientation boundaries. Gates and prepared UI evidence for explicit five-stat effects are now present, but not all natural combinations. Existing studies show surviving factions and captures, not a stable quality target or natural unification guarantee.

Environment-dependent verification: actual phone touch/orientation/audio/performance; normal high-resolution GPU speed; actual background-tab visibility pause/resume. Prior software rendering was very slow and actual hidden-state reproduction failed; do not mark those passed or repeat the identical blocked environment test.

Held decisions: R167 monthly AI research/merge, R182 recruitment/economy effects, economy/diplomacy tuning; portrait400 external retry needs a new signal. Parent final visual review: all660 approved, canonical146 waiting connections/public514 remains separate from gameplay completion.

Unconfirmed/optional rather than mandatory missing features: reconnect catch-up option, kiai-like enhancement, PK battle-mode and six extra scenarios. Explicit excluded technology additions and server-persistent simulation remain excluded; no new mandatory travel/field/neutral recruitment expansion.

Scheduling judgment: previous 2-4 days for a bounded integration pass excluding external blockers remains a planning window, not an all-game completion promise. About one week for stabilization cannot guarantee strategy balance or physical-phone checks; those need evidence and environment, and held policy choices can change scope.

## Coverage freshness
Existing design-coverage historical sections label R201-R214 candidates/local/unpublished. They are historical snapshots, not current publication state: R201-R212 are already in public R214 and R214 itself is public via PR117. R215 proof-only PR118 is merged. Do not count these already completed releases as pending or multiply them into remaining work. This draft changes no historical evidence.

## New investigation status
Initial unchanged full-suite rerun:63/64, R-eco merge-not-processed once. Nonfixed initial RNG not recoverable. Repro same failure with whole preceding context and initial seed2: unit conf2 at turn4, no pending decisions, stepUnit correctly decrements confusion and returns before merge. Economy test previously ran all AI and inherited combat state. Local test-only isolation under investigation; no product-rule diagnosis from the initial failure and no release approval. Market level controlled monthly settlement: no market450/Lv1 563/Lv2 675/Lv3 788; forceOverview predictions match, salary551. Flat +25% description lacks the level-scaled explanation; income logic works in these cases.
