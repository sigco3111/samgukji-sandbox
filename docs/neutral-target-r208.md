# R208 neutral-target selection, isolated candidate

## Observed gap
Previously preserved natural251/seed91/turn1801: force21 atYe6 has8070troops/AP55. Nearest enemyXuchang13 has12777troops, so the ordinary offensive threshold is unmet. NeutralJinyang5 is2.56away with existing landpath3 and0defenders, but is never considered. Same naturalstate/RNG isolatedAI call: baseline issues0militaryorders; candidate dispatches existingformula3000spear/officers0+152 and orders5/path3. AP55→15/troops8070→5070/food24589→17389/gold83797unchanged. EndRNG equal. The new decision is not caused by an initial randomoutcome change.

## Scope
Only when the ordinary nearest enemy is not eligible AND no current threatened-city exception applies: find nearest neutral in the existing enemyCities list that meets existingtroops>max(neutraldefenders*1.5,6000)/distance<12 and existing landpath. No broader weakforeigntarget search. Existing legion city/forcefilters apply before this choice. Threatened defence, validordinaryoffensive target, costs, troopformula, pathimplementation, AIrecruitment, economy, diplomacy and gameengine unchanged.

## Checks and limits
-16focusedchecks: naturalchoice/cost/path, explicitlegioncity/force constraints, explicitneutrallegion target, ordinarytarget unchanged, threatenedbranch unchanged, unreachable neutral excluded, strict6000boundary and below, distance12boundary, neutralgarrisonthreshold, noforeignfallback, existingpathprobe.
-56/56fullsuites. R190 historicalnavalfixture generator now strips R208 from its oldAI reconstruction; withoutthis, its natural13snapshot had changed and initialtestfailed. Eighteennavalroute assertions remain unchanged/passed. This is testbaseline correction, not a naval runtimeedit.
-Nine continued1801→1921runs:3scenarios×3seeds411/412/413. Perturncityresource/roster/duplicate/unitfinite checks0violations. Finalstrings equal the neutral-only experimentalmodule. All190runs with noneutralcity equal oldbaselineentiresave. 251all3seeds captureJinyang1805;184capturesJianning in2/3;allunifiedfalse. Wholeworldstrategy not established and divergentRNGdraws prevent simple per-event causal claims afterfirstchoice.
-ActualisolatedChrome390×844/DPR0.5/softwareWebGL: originalnatural1801world, explicitlychanged commandowner21/manual for UIobservation only. ActualContinue→delegate→stop. Noresource/stat/unit/RNGediting. Stopprocessed1812, Jinyangforce21/troops5850/officers0/152/566/270, actualnewpageContinuefullsavedstringexact/eachofficeronce/errors0. Screenshotshows1812finalownership/garrison, not1805capturetime. Originalusersave untouched, physicalphone/performance notvalidated.
-Initial broadtargetalternative and removethreatenedexception alternatives were diagnostic only and rejected; not in candidate.

## Publication
Localcandidate only. Parentfinalscope decision, remotebyteproof/PR, merge/Pages/live checks still required. No completionpercentage change. R167/R182, economy/diplomacyretuning, portraitupload400 and physicaldevice limitations remain held.

## Fixture
`tools/fixture-r208-natural-ai.json` preserves generated simulationstate+RNG+callcontext at firstdifferingdecision. No externalaccountdata or actualusergame save. Boundary tests explicitlyalterselected fields and isolate recruitment to hold the intended garrison threshold. Suchtests are fixtures, not naturalplay outcomes.


## Provenance correction and evidence relationship
The first internal summary mislabeled force21 as YuanShao. Exact archivedworld data has ruler636LiuBiao, so all force21 claims refer to LiuBiao, as the actualUI shows. This was a reportname error, not a different city owner. Officers0阿會喃 and152邢道榮 are exactroster identities. FirstAI-call snapshot is during1801turn processing immediately before force21AI(AP55). ActualUI starts the same generatedworld's1801turn-boundary save(AP25). Fixture changesonly playerForce0→21/delegatedtrue→false/monthlyReview+reviewBase reset. Actualdelegateclick makes21AIagain; allotherforces remainAI. UI usesunforcedRNG, notseed411;1812/5850includes laterreinforcement and is not presented as the seeded1805/3000firstcapture. Afterstop21manual; noAIcommands issued onitsbehalf untilnextdelegate.
