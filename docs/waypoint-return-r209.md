# R209: stop overshooting a nearby land waypoint

## Natural reproduction
An isolated190MaTeng manual campaign dispatched MaChao515/PangDe558 with2500 cavalry from Wuwei21. Actual city targeting and turn buttons approached Anding19. Turn6 naturally met YangRen unit5: cavalry2500→1872, enemy19000→18697. Manualcharge cost qi100→90 and inflicted295 with pushback. No player duel occurred. The player then ordered a return to Wuwei rather than attacking with a much smaller force.

Turns11–13 alternated between(102.21290407192006,38.093547964039956) and(103,37.7) around the final waypoint(102.6,37.9). The R208 method applied the full0.88 cavalry movement distance even when the remaining waypoint distance was about0.43. The preserved turn13 state repeats this for8 direct steps without merging.

## Change
Clamp the existing generic movement step to min(existing speed, remaining waypoint distance). No new speed, pathfinding, AI, cost, combat, economy or diplomacy rule. Naval polyline walking and tagged coastal land routes keep their prior code. The shared fallback also cannot overshoot a nearby target; existing water checks still apply. Existing close direct-target arrival logic and one-step-per-turn behavior remain, so reaching a waypoint does not spend spare movement elsewhere.

## Evidence
- Natural turn13 fixture contains generated simulation state, not an actual user save or account data. Exact Continue in isolated390x844 Chrome/DPR0.5/softwareWebGL, then actual turn buttons:14 reaches Wuwei coordinates;15 merges. Wuwei10500→12372, both officers once across city/unit rosters and canonical state; unit removed; page errors0.
- Focused99 checks: natural return/1872troop conservation/officers once; every9land types close-waypoint/finite values;9types×8 long-step modes compared byte-for-byte with the reconstructed exactR208 method(base,疾風,神行,music platform,elite pike,field slow,pass slow,verified river point); all3naval polylines exactR208; engaged offensive stop and confusion remain.
- Full57/57 suites and game/main syntax checks pass. Existing long scenario simulations, coastal-route, naval-route, combat and save suites remain in that run. Test instrumentation for each movement modifier is explicit and is not a natural battlefield claim.
- ActualContinue preserves the whole prior saved string before any turn action. Screenshot shows turn15 Wuwei map, not the invisible troop/roster assertions. Physical phone/GPU performance not tested.

## Scope and status
Local candidate, not public until remote-byte/PR/final review/Pages/live checks. The intended natural player duel did not occur in this sortie; no forced RNG or resources, no claim of that coverage being complete. R167/R182/economy/diplomacy/portrait holds unchanged. Whole agreed-game development remains active.
