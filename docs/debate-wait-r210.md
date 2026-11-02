# R210: preserve the speaker while a player debate waits

## Natural defect
An isolated generated 190 world reached turn 73 as Ma Teng. Actual delegate/join controls switched to Dong Zhuo at turn 86. The UI created legion 2 under Zhang Liao (439), with Chengdu (39) and Jianning (40) as the explicit target. On turn 87, a failed attempt to recruit captive Wu Ban (209) naturally opened a player debate. The same AI call then dispatched speaker 439 with 3,000 spears. His city became null and he left the source roster. Continue in a new page safely rejected the paid debate. The unit survived, but the negotiation was lost. Wu Ban was a captive, not a free officer.

## Change and boundary
Return at AI entry and immediately after alliance, truce and recruitment commands only while `pendingDebate` exists. This prevents later commands from moving the speaker or replacing the negotiation. Full-AI debates still settle automatically. Costs, probabilities, recruitment policy and restore validation are unchanged. Already-invalid saves are not repaired.

The entry guard also skips later forces and legions in that turn while the player debate waits. End-turn AP recovery and remaining world bookkeeping still finish. After settlement, AI resumes at the next normal turn, not from a serialized mid-command continuation. No game engine or end-turn code changes are included. This is a command boundary fix, not a new simultaneous-world pause system.

## Verification
- The published fixture is the generated turn-86 formation state, not an original user save.
- A diagnostic reproduction uses seed 11 and forces only two recruitment RNG draws: failure, then debate. R209 dispatches 439 and restore fails. R210 keeps him in city 39 and restores the exact debate snapshot. This is not a second unforced occurrence.
- 25 focused checks cover speaker/roster, stable cost, blocked next turn, AI-entry immutability, each alliance/truce/recruit wait boundary, resume after clearing, and rejection of a departed speaker. Command doubles isolate the boundaries, not negotiation probabilities. Existing malformed-state and outcome suites remain unchanged.
- Actual 390x844 UI on the diagnostic paid turn-87 state: play 11 card bouts, Continue in a new page with HP 13/20 and cooldown 2 preserved, then lose bout 12. No extra charge; 439 remains in Chengdu. Whole-save Continue after settlement is exact. Turn 88 dispatches him, followed by normal march to turn 95.
- On that diagnostic-derived trajectory, a new unforced turn-96 debate between Gao Shun (169) and Wu Ban opens. Actual Continue/auto settles a win, recruits 209 once and clears captivity. Actual turn 98 captures neutral Jianning, removes the unit and puts 439 in city 40. This does not prove defended capture or an entirely unforced campaign.
- A separate unforced formation replay runs turns 87-94 with no debate and a normal march. It was not rerolled until a debate appeared.
- Full regression: 58/58 suites and two syntax checks. Three fully delegated 120-turn continuations (184/190/251, turns 1801-1921, seed 411) have exact R209 final-save SHA and zero checked invariant violations. These are bounded comparisons, not general AI or real-phone proof.

## Release status
Separate candidate branch and PR. Public release requires final scope review. R167/R182, economy, diplomacy tuning and portrait holds remain. The game is still in development.
