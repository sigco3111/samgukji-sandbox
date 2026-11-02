# R231 pending duel lifecycle

A natural 251/seed99 observation selected units229/230 for a manual duel during turn134 ->135. A later field battle in that same turn destroyed229, leaving a pending duel with an absent participant. Continuing could settle that absent unit while loading rejected the invalid encounter.

At the final end-turn autosave boundary, recheck canonical unit existence, positive troops, living force and selected officer membership/active-force status. Cancel only an invalid pending duel, marking its old object done and clearing pending state, with a no-result notice. Do not call finishDuel, award duel merit/tech, apply duel casualties, or consume random numbers. Keep valid pending objects unchanged. Do not pause subsequent battles or change battle order/outcome rules.

Evidence: 55 lifecycle assertions across normal, damaged-but-valid, absent/dead units, captured/departed officers and dead force cases;76/76 suites. R230's isolated watch block test boundary now ends before the new independent lifecycle call.

Nine fixed-RNG engine pairs (184/190/251 x7/42/99),180 turns with6join requests each, continuous versus actual loader every turn: persisted state matches except intentional last60logs cap; no observed negative city resources/duplicate roster. Auto-settled encounter/diplomacy decisions are study mechanics, not strategy quality or all-combat stability.

Actual isolated390px UI from natural pre134 snapshot, engine-only fixed RNG, actual end-turn button:135, RNG1893829419,229 absent,230 at2296troops, pending cleared, actual Chronicle cancellation notice. Actual reload preserves saved string exactly, errors0. Original user saves untouched. No physical phone claim. Broad combat/AI quality remains open.
