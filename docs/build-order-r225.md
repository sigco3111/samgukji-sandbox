# R225 construction replaces an old facility attack
Local candidate, public R220 unchanged. No policy adoption or deployment yet.

R220 buildField cleared path/tx/tz/targetCity but retained targetFac. A successful new construction could execute the previous facility attack during stepUnit while fieldTurn advanced construction. The unit panel showed only construction, hiding the old target. A prepared catapult at distance2 from an enemy fort reproduced HP600to441 while building a two-turn camp. This is a constructed isolated fixture, not a natural campaign or user save.

The fix adds only targetFac=null after successful construction. Rejected builds retain their previous order. It does not change building eligibility, costs, construction speed, unit type eligibility, adjacent automatic field attrition, AI, diplomacy or economy coefficients. Future world outcomes can change because an unintended attack no longer executes. Existing saved conflicting orders are not migrated.

42 focused explicit assertions cover three building types, unchanged cost/progress, rejection for money/confusion/unknown type/proximity preserving the order and treasury, city-order replacement, existing adjacent automatic attrition and catapult out-of-adjacency old attack removal. Full70 suites and four runtime syntax checks pass.

Actual390px isolated UI in baseline and candidate: real unit click -> enemy fort map click -> real camp-build button -> reload Continue whole saved string exact -> real turn button. With2633 catapult troops/distance2, baseline targetFac persists/fort600to441, candidate targetFac null/fort600unchanged, both camp left2to1, errors0. Spear distance1.1 control has600to547 both versions because unchanged automatic adjacent attrition remains: do not claim construction prevents all damage. These separate full-world UI runs are unseeded; other AI logs differ and are not an equal-world comparison. Focused command tests isolate causality.

Pixels inspected: both catapult images show37turn/camp-building label/2633troops/food4762. They do not show fort HP; HP/target fields are runtime evidence. Initial camera probe used lat as z and failed before any game command. It was corrected; no product bug from that harness error. Physical phone not tested. R167/R182/economy/diplomacy holds remain, coarse80/60 unchanged.
