# R245 legion field-unit scope, candidate A

## Defect and design boundary
R244 filters cities for a legion, but all four later field-unit sections process every same-force unit. With two legions, siege age increments twice per turn for a direct unit. Existing plan distinguishes player direct command from delegated city groups. It does not clearly prohibit player intervention in a legion's field units. A changes AI processing scope and preserves all existing manual field commands. B, which blocked manual commands, is not adopted or included.

Existing natural184turn16 save has direct SunJian unit13, target10, siegeAge1. Actual formation of XiaPi8/legion2 and XiaoPei9/legion3 with the existing engine makes R244's two AI calls change age1to2to3. Candidate leaves it1. Actual isolated candidate UI formation and endturn17 also leaves1. This is the natural save continued with explicit formation, not a fresh campaign. An explicit idle-order diagnostic on that unit makes R244 issue successful support-camp construction from legionAI; A leaves it unchanged. The idle alteration is a fixture, not natural observed command theft. Thirty-turn baseline observation produced no additional successful commands to the two pre-existing direct units, so no broader natural incidence claim.

## Candidate rules
- Add optional `legionId` only when an actual dispatch originates in a current legion city. Existing old units without it remain direct. Never infer ownership from location, current leader or nearby city.
- For a legion AI entry, field construction, siege relief, idle unit orders/repair and direct tactic/stratagem casting process only that legion's units. Other full-force AI entries, including full delegation, retain all units. Adjacent support/target facts may still include other friendly units, but commands do not issue through them.
- Existing manual unit commands remain available. The panel says the legion AI operates the unit and direct commands remain possible. Direct units are labelled direct. Next ordinary legionAI entry may still replace a manual order under the existing AI logic; no new manual-override persistence guarantee.
- Disband clears the optional tag. Existing governor-invalid reconciliation still disbands. Invalid tag/type, no valid governor, wrong force/no matching legion, or loss of all currently owned cities in the legion clears the tag. Loss of one city does not clear it while another own city remains. No-city legion itself is retained as before. Recapture does not restore cleared tags.
- Restore checks optional tags after officer reconciliation. It does not assign a tag to old units. Invalid ownership returns to direct processing; it does not fabricate a source city or leader replacement. Current ownership lookup already returns null before cleanup when no valid match.
- No change to movement, city merge/capture/roster rules, costs, combat formulas, diplomacy/economy/recruitment policies, probabilities or siege10turn/strength thresholds.

## Evidence
23 focused assertions and82full suites pass. Focused cases include natural existing unit unaffected by two calls; explicit idle fixture unchanged; assigned own unit increments once/other legion unchanged; dispatch/save/reload/disband; bad tag/type/force/governor/allcitieslost/partialcityloss/recapture; fullAI and directreturn boundaries; manual engine order retained; siegeAge8to9 once under two legions, target retained at9, retreat at10. Ownership assigned to a historical field unit in some gates is explicitly diagnostic.

Separate R244engine+AI versus Aengine+AI, seed411, three historical1801 saves through120turns with observer/fullAI: entire finalsave SHA and RNGcalls equal,1846121/1906392/2519712. This checks the fullAI path without legion dispatch provenance; it is not long-term legion strategy quality. Initial AI-only comparison was superseded by separately imported engines.

Actual local390x844/softwareWebGL UI: old natural16 save, actual two formations,17directage unchanged; same controlled seed42 gameplay sequence, actual new recruitment debate auto control,28HanDang7800sword dispatch from legion3 city9 targetingPuYang11, tag3 saved. Whole save string survives actual reload exactly/errors0. Panel shows AIownership and manual command controls. NearbyXiaoPei information button opens city, actual legion3 disband clears unit29 tag while legion2 remains. Whole save exact again after reload,tag absent. No resources/stats/outcomes edited in this UI path. Seed is controlled, so not an unforced RNG trajectory. Screens inspected directly. Raw pre-R245 historical16save unchanged.

Harness issues: wrong Playwright argument, old debate auto selector and map-coordinate city pick hitting overlapping unit were corrected. Existing nearbycity button reaches city; no product fix attributed to these automation errors. Broad real-phone, highresolutionGPU, all multi-legion campaigns, natural premature retreat incidence and strategy quality remain unproven.

## Status
Local candidate only. No PR/remote/public change until parent review. B manual-command blocking remains isolated and rejected for lack of clear design basis. Runtime publicR244 remains current.
