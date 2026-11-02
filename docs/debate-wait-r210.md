# R210: preserve the speaker while a player debate waits

## Natural defect
An isolated generated 190 world reached turn 73 as Ma Teng. Actual delegate/join controls switched to Dong Zhuo at turn 86. The UI created legion 2 under Zhang Liao (439), with Chengdu (39) and Jianning (40) as the explicit target. On turn 87, a failed attempt to recruit captive Wu Ban (209) naturally opened a player debate. The same AI call then dispatched speaker 439 with 3,000 spears. His city became null and he left the source roster. Continue in a new page safely rejected the paid debate. The unit survived, but the negotiation was lost. Wu Ban was a captive, not a free officer.

## Change and boundary
Return after an AI command creates a new player debate. On later AI entries, wait only for the negotiation's source/target forces and the active forces of its two speakers. A captive's original force is not blocked solely because it once owned the captive. Other forces continue their ordinary actions.

Other AI forces exclude the two waiting speakers from recruitment targets. `tryDebate` refuses to start another debate while one is pending: an unrelated automatic debate would otherwise clear the paid player debate through `finishDebate`. This guard consumes no RNG draws. Other paid failed negotiations keep their existing cost and failure result, but do not create a second simultaneous debate. No queue or new UI is introduced.

Restore validation, costs, probabilities outside that pending window and recruitment policy outside the two protected speakers are unchanged. Already-invalid saves are not repaired. After settlement, affected AI resumes on its next normal turn. No end-turn bookkeeping code changes.

The first candidate used a global AI-entry return. It was rejected before publication because it skipped unrelated forces by iteration order. On the same generated turn-86 fixture, seed 11 and two diagnostic recruitment draws, both candidates retain the exact turn-87 debate and restore successfully. The narrow version allows forces 6/11/14/18 to spend AP: global-versus-narrow final AP is 40/0, 45/15, 40/0 and 40/10. Shouchun commerce is 53 versus 61. Both end at turn 87, year 192, month 5, dan 3. Thus the no-debate comparison alone was not sufficient evidence for the global guard.

## Verification
- The published fixture is the generated turn-86 formation state, not an original user save.
- A diagnostic reproduction uses seed 11 and forces only two recruitment RNG draws: failure, then debate. R209 dispatches 439 and restore fails. R210 keeps him in city 39 and restores the exact debate snapshot. This is not a second unforced occurrence.
- 44 focused checks cover speaker/roster, stable cost, blocked next turn, AI-entry immutability, each alliance/truce/recruit wait boundary, resume after clearing, and rejection of a departed speaker. Command doubles isolate the boundaries, not negotiation probabilities. Existing malformed-state and outcome suites remain unchanged.
- Superseded global-candidate UI evidence, not narrow-candidate proof: play 11 card bouts, Continue in a new page with HP 13/20 and cooldown 2 preserved, then lose bout 12. No extra charge; 439 remains in Chengdu. Whole-save Continue after settlement is exact. Turn 88 dispatches him, followed by normal march to turn 95.
- On that diagnostic-derived trajectory, a new unforced turn-96 debate between Gao Shun (169) and Wu Ban opens. Actual Continue/auto settles a win, recruits 209 once and clears captivity. Actual turn 98 captures neutral Jianning, removes the unit and puts 439 in city 40. This does not prove defended capture or an entirely unforced campaign.
- Narrow-candidate actual 390x844 UI: paid turn-87 Continue, three card bouts, new-page Continue restores HP 74/72 at bout 3, actual auto settlement, then actual turn 88 dispatches Zhang Liao 439 and Gao Shun 169 with 3,000 spears. No page errors. Screenshots show the bout-3 modal and turn-88 world. Numerical dispatch evidence comes from the runtime/save, not the map screenshot.
- A separate unforced formation replay runs turns 87-94 with no debate and a normal march. It was not rerolled until a debate appeared.
- Full regression: 58/58 suites and two syntax checks. Three fully delegated 120-turn continuations (184/190/251, turns 1801-1921, seed 411) have exact R209 final-save SHA and zero checked invariant violations. These are bounded comparisons, not general AI or real-phone proof.

## Release status
Separate candidate branch and PR. Public release requires final scope review. R167/R182, economy, diplomacy tuning and portrait holds remain. The game is still in development.
