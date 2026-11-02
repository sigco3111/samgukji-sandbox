# R210: preserve the speaker while a player debate waits

## Natural defect
An isolated generated190world reached73 as MaTeng, then actualdelegate/join switched to DongZhuo at86. ActualUI created legion2 under ZhangLiao439, cityChengdu39, explicitcitytargetJianning40. Next actualturn87 naturally failed captiveWuBan209 recruitment and opened a playerdebate. The sameAIcall continued and dispatched speaker439 with3000spears, so his city became null and he left the source roster. ActualnewpageContinue rejected the paiddebate with the existing safe-failure notice. No result was applied and the unit survived, but the pending negotiation was lost. WuBan was a captive, not free; initial report corrected.

## Change
At AI entry and immediately after alliance/truce/recruit commands, return only while pendingDebate exists. This stops later commands from moving the speaker or replacing the pending negotiation. It does not relax restore validation, repair already-invalid saves, change costs/probabilities/recruit policy, pause world processing mid-turn, or apply pending outcomes automatically. No endTurn/game engine changes. FullAI debates still settle automatically and the no-pending path proceeds.

## Evidence and limits
- Natural86formation and87brokenevent saves retained separately. Newpublishedfixture is generated86state, not useraccountdata/actualusersave.
- Diagnostic reproduction uses seed11 and forces only two RNG calls inside paidrecruitment(fail then debate). OldAI dispatches439 and restorefails; candidate retains439 at39 and exactdebate restore succeeds. This is not another naturalrandom occurrence.
- Focused25 assertions cover naturaldiagnostic speaker/roster/cost/turn blocking, AIentry immutability, alliance/truce/recruit pending boundaries and resume after clearing, invaliddepartedspeaker still rejects. Command-boundary doubles explicitly isolate transitions, not probabilities. Existing R200 malformed-state and outcome suites unchanged.
- Actual390x844/DPR0.5/softwareWebGL diagnosticpaid87Continue/cards through11bouts, actualnewpageContinue at11 preserves HP13/20 and cooldown2, then actualcard loses12thbout. Captive remains, noextra commandcharge,439staysChengdu; settledwhole-saveContinue exact. Actualturn88 dispatches439 only aftersettlement, normalmarch to95. A newunforced96captive debate GaoShun169/WuBan209 naturally opens on this diagnosticderivedtrajectory; actualContinue/auto settleswin,209joins39once/captivecleared. Actualturn98 capturesneutralJianning40/439nowcity40. This is not defendedcapture or originalunforcedcampaign success.
- Separateunforced86formation replay runs87–94withoutdebate and marchesnormally; not rerolled untildebate.
- Full58/58suites,2syntaxchecks. Three120turn fullydelegated no-pending scenario continuations have exactR209 finalsave SHA and0invariant violations. These are bounded checks, not globalAI/unification/realphone claims.

## Status
Localcandidate, pendingremote/PR/finalscope review beforepublic. R167/R182/economy/diplomacy/portrait holds unchanged. Oldinvalidsavedebate validation unchanged. Overallgame remains in development.
