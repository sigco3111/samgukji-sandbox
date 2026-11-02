# R230 persist already-reported approach episodes
Current R229 continuous-vs-each-turn-reload study found repeated approach alerts and chronicle records. Existing _siegeWatch episode memory was omitted from saves. R172 retains delegation during alerts, so this is not an automatic-stop regression.

Save siegeWatch and restore only known city keys with integer existing force IDs or neutral -1. Old saves start an empty watch as before. Threat distance/selection, cleared/returning/changed-force episodes and all AI/economy rules remain.

Local75/75 suites;12 save/watch assertions include serialization, actual loader, legacy/malformed entries, same episode silent, threat departure/return/new force/manual/neutral. Nine same-RNG continuous-vs-reload pairs (184/190/251 x7/42/99),120 turns each, match all persisted fields including chronicle except logs. Logs intentionally save only the last60 entries while uninterrupted memory retains more; they were excluded from equality, not claimed fixed. Decisions automatically settled for observation. This is deterministic engine observation, not human UI or strategic-quality evidence.

Baseline first extra chronicle alert:184seed7 turn5 XiaPi,190seed7 turn3 ChenLiu,251seed7 turn8 XiangPing. Baseline economic/unit/officer fields matched; candidate removes duplicate chronicle alerts. Original saves untouched. UI and public verification pending.
