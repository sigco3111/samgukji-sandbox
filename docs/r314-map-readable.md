# R314 distant map label readability

Confirmed current R313 map at portrait 390x844 view80 had very small city and two-line unit text. Initial claim of existing city-city collision was not confirmed and is not the reason for this change.

R314 keeps near zoom scale, adds screen-size floors for distant city (canvas height20px) and unit (36px) sprites in tall views, reduced proportionally below700px screen height to avoid crowding short landscape view. City text occupies50/64 of sprite height, unit text106/128. Those are canvas bounds, not CSS font-size claims. City placement runs before unit placement; both retain all text, obey existing120px bounded offsets, use more nearest diagonal candidate slots and connector lines. Top HUD and log rectangles become obstacles and part of layout cache key. No game state, fog permission, picking body or combat/AI policy change.

Actual prepared turn121/controller2/direct fixture, clock paused, identical baseline/candidate camera. Four sizes/zooms below; final portrait55,80,landscape55 and near14 actual pixels inspected. Portrait distant labels visibly more readable; landscape scaled floor avoids the failed first prototype's center congestion. Source change only, real phone/touch and all map orientations remain unverified.

r313 390x844 v14: visible labels 7, rectangle overlaps 3
r313 390x844 v55: visible labels 24, rectangle overlaps 0
r313 390x844 v80: visible labels 31, rectangle overlaps 0
r313 844x390 v55: visible labels 51, rectangle overlaps 0
r314 390x844 v14: visible labels 7, rectangle overlaps 3
r314 390x844 v55: visible labels 25, rectangle overlaps 0
r314 390x844 v80: visible labels 31, rectangle overlaps 0
r314 844x390 v55: visible labels 51, rectangle overlaps 0

Near14 retains three baseline overlaps from labels clipped on the left edge; not presented as globally collision-free. In the 3 distant checks rectangle overlap count remains zero. Geometry checks are not proof all visual objects never overlap. Original ship213 center close-view remains readable. WholeGameJSON and disk save exact in both versions; runtime errors0. No saved fixture or original save modified.

122/122 curated suites pass with new zoom/layout gate. An exploratory glob of every historical smoke file hit standalone R149 natural-production assertion, also reproduced unchanged on baseline R313; official current smoke-all excludes that suite in baseline too. Its absence does not establish obsolescence, and fixture-based command checks do not replace natural AI production evidence. No AI production code changed and no claim that all historical standalone scripts pass. No suite removed or relaxed.

No public deployment, portrait changes, policy adoption or remote retry. Morning single full source still required.
