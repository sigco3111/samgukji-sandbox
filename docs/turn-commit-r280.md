# R280 completed-turn persistence
2026-11-03 local candidate on reviewedR278. PublicR258 unchanged, upload stopped. R279research excluded.

## Reproduced boundary
Current fresh184SunJianseed1 first endTurn writes partialturn1 then completedturn2. Injecting failure only on finalturn2 leaves memory2/saveFailedtrue but diskturn1 changed from starting snapshot in cities/forces/units/IDs/logs/diplo/chronicle/officerStates. Actual loader can restore and continue this partial world as turn1. This is injected persistence failure, not a naturally damaged user save or proven exact doubled loss.

Actual390px prepared21monthlyfixture Continue→delegate→one350ms4xauto turn→stop. Baseline game-key writes21six times then22three failed writes; stored21 differs from after-delegate/pre-turn bytes. Candidate writes21once for delegatebutton, then22three failures(finalturncommit+existingUIrefresh/stop saves); stored21 exactly equals after-delegate/pre-turn bytes. Memory22/saveFailedtrue/banner visible. Actualreload→Continue restores unchangedraw21/errors0. Do not claim UIwrites1 or closingtab recovers22. Storage fault is injected QuotaExceededError, not real user's quota.

## Change
endTurn owns a synchronous guard and invokes existing body. Internal autosave requests are deferred; after normal body return, commit once if requested. No endTurn write on blocked/over paths without requests. finally always clears guard/request. Reentry ignored. If body throws, no partial commit, saveFailed/notificationfalse while original exception propagates; no rollback of partially changed in-memory game. Out-of-turn commands, reports and UI refresh remain immediate saves. No schema/cost/RNG/AI/rule changes. Existing console-style exceptions are not converted into playable rollback recovery.

## Verification
28new assertions:onecompletewrite/finalfailurekeepspriorbytes/retrycurrentstate/safeexceptionguardreleaseandnotification/reentry/normaldirectwrites/blockedpaths. Full103/103suites. R180production regression intentionally changed from intermediate disk equality after eachproduceArms to same exact commanddelta checks PLUS whole cities/forces/turn/armsBudget equality at final endTurncommit. Original100/102researchfailure belongs toR279; this candidate first101/102failed only oldR180intermediate-contract assumption. No test removed. Production100s-of-turn actualengine study still requiresnaturalproductionoccurrence.

Normal3scenario601->721paired120turns:all3wholefinalsaves/RNGsameR278,41restoresperversion/scenario with5stats/skills equal. These are whole-ended-turn results, not saving-mid-exception equivalence or strategicquality. Integratednormalactual390pxthirdstage21->22 stillresearch/merge/defaultHouCheng173맹돌,whole rawreloadexact/errors0. Faultfinal integratedrun same preservedpriorbytes/warning/reload behavior. Inspected finalpixels show22turn map and readable persistentfailurebanner/retry, not diskturn21 onscreen; diskturn is runtime proof.

Limits:doesnotrollbackin-memoryexceptions,transactionalize every UI workflow,cloudbackup,restore unsavedclosedtab,guarantee diskdurabilityoutsidebrowser,reduce allUIwrites,prove nojsperfimpactorphysicalphonebehavior. reviewpending. Originaluser saves untouched. Coarse80/60 unchanged.

Exception follow-up13:45: immediate doTurn refresh is skipped by unwinding, but later Retry/Stop/otherUI save can persist partial in-memory state and clear warning. Confirmed actualmanual/auto exception fixtures at19gold6768->6645, prior diskraw initiallyexact, actualRetry/Stop thenstores6645at19. This is not exception-wide atomicity or always-complete-turn disk. See transferred exception addendum.
