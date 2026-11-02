# R211: keep continued play after unification on reload

## Observed failure
A deliberately prepared near-victory fixture started with 41 owned cities and a unit at the final neutral city. Actual UI turn 97 to 98 captured it, promoted the force from king to emperor and showed the unification modal. This was not a natural campaign victory.

Reloading the ended turn-98 save correctly showed the end modal. Choosing Continue spectating, advancing and stopping at turn 104 produced `unified=true, over=false`. Reloading that save unexpectedly showed the end modal again and changed runtime `over` to true. The disk save still said false. The modal also described the current turn 104 as the unification turn.

## Narrow fix
In `checkGameOver`, when every city has one owner, return without an end modal only if `unified && !over`. The engine already prevents a second unification event. This makes the UI respect the saved choice to continue. No new persistent fields, event-time guesses, engine rules, AI or costs change.

First victory and ended-save reload still show the modal. A legacy save missing `unified` keeps the existing `unified = over` fallback. A save that never reached unification is not suppressed. The nonpersistent `_endShown` still prevents repeated modals in an existing session.

## Event-time boundary
The engine records capture/unification before the final clock increment. The fixture's event log is turn 97, August 192; the UI after that endTurn is turn 98, September 192. The first modal uses the UI's current turn. This pre-existing timestamp difference is documented, not corrected by inventing an earlier saved time. No exact victory-event timestamp exists in the current save schema.

## Verification
- 10 focused assertions: first victory, ended reload, continued reload, legacy-compatible ended state and once-per-session display; existing legacy-over fallback checks.
- Full 59 suites; syntax checks and three 120-turn scenario final-save comparisons against R210.
- Actual local 390x844 UI: first capture 41 to 42 and king to emperor, ended turn-98 reload, legacy missing-unified reload, and continued turn-104 reload with no modal. Legacy load normalizes the existing schema, so whole-string equality is not claimed for that case.
- Actual continued play to turn 105, then manual Jianning farm 45 to 52, gold 514 to 214, AP 35 to 5. `over=false, unified=true` remains. Zero page errors. Other modern-save Continue strings remain exact.
- Physical phone and natural unification remain unverified. Fixture saves are isolated generated data, not the user's original save.

Candidate only until review and deployment. No queue, economy tuning or new systems.
