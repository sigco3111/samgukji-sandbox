# R216 facility descriptions and economy gate isolation

Local candidate, not public. Public runtime remains R214 until an approved merge and Pages validation.

## Product change
Completed-facility descriptions only. Market/farm level contribution, mint/granary modifier and seasonal farm timing; barracks level contribution; office/library level contribution and force cap; smith/stable manual production level and flat monthly automatic production. Engine formulas, thresholds, costs, AI and data unchanged. main.js calls the pure description helper for completed rows. Query/BUILD_ID/meta cascade R216. game.js bytes exactly unchanged; ai.js changes query token only; map3d.js query token only.

The original generic +25% description was not evidence of wrong income. Controlled same scenario/city/commerce50/startinggold10000/salary551/no-other-facility month-end actual settlement: no market450, Lv1=563, Lv2=675, Lv3=788. forceOverview predictions match each. This is fixture engine evidence, not natural economic benefit or policy tuning.

80 focused assertions cover all19 facility descriptions x levels1/2/3, level formulas, modifier, seasonal/legacy timing and an independent confusion/merge rule: conf1 at a friendly city remains outside roster after first step(conf0), next step merges. No relaxation of confusion behavior.

## Existing unstable economy gate
First unchanged full run 63/64 failed R-eco merge-not-processed. Original unseeded random stream is not recoverable. Same failure reproduced by setting initial LCGseed2 and running all preceding smoke.mjs context. At merge precondition turn4 the unit has conf2, valid home12/coordinates and no pending duel/debate/diplomacy. stepUnit correctly decrements2->1 and returns before merge. Subsequent combat displaces/damages it. This establishes a reproducible test-state interference, not proof the initial failure had precisely that cause.

Test-only fix: four g4.endTurn calls in the economy-specific block use no-op AI instead of all-world aiThink. The unchanged other economy portions and separate AI suites remain. Candidate same preceding context seeds1/2/3/7/42 pass, isolated economy block100seeds pass. Independent confusion nonmerge test remains. Initial failure and prior post-failure passes retained, not erased. Final full65/65 passes.

Initial new-version full check failed three version-consistency suites due omitted ai import query cascade. Only query fixed, final65/65. Initial screenshot mixed public root indexR214 with candidate scriptsR216 due QA routing and showed version warning. Corrected QA route serves root index from same fixed candidate; final390 UI no warning/errors0. No product logic correction inferred from harness mistakes.

## Visual inspection
Isolated natural-path turn20 XiaPi save from the R216 integration. Actual continue -> city-coordinate click -> facility panel. 390x844/DPR0.5 pixels show marketLv2 +50%, farm harvest-month +25%, barracks+30%, smith manual500 and monthly-level-independent wording. Actual game save/resources unchanged by opening description. Original user save never touched. Final screenshot inspected directly; physical phone/high-resolution performance not claimed. Portrait state updated independently by parent:660 approved,514 public+146 approved pending, no connection action/retry authorized here.
