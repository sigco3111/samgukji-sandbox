# R300 bounded map-label layout

## Actual problem and change
R299 completed251 turn121/controller2/direct prepared view: Pingyuan city4, unit212 YuanTan, and unit213 XuYou labels overlap. Name/troop label existed sinceR218, but global collisions explicitly remained open. This is a display change, not another battle-rule or AI strategy test.

Keep city labels fixed. Measure painted text bounds on existing canvas labels. Stable numeric unit-id order tries21 nearby screen-space offsets, largest displacement120px. Never hides, abbreviates or drops a unit name/troop value. If no free bounded slot fits, retain old position, so full-world overlap elimination is NOT promised. Sprite.center moves text only. Unit body, original label position, picking, game data, vision and orders stay unchanged. Thin leader lines connect displaced labels to original body anchors. Leaders update only when geometry changes, dispose replaced geometry/material. Camera/visible mesh-position/label-key/view-size signature skips layout on unchanged frames. Existing canvas textures remain reused; no per-frame texture recreation.

Initial candidate using whole256px transparent canvas bounds found no nearby slot; actual pixels stayed unchanged. Corrected to measured painted-text bounds and bounded extra slots, then reran all. First moved-label candidate lacked body association; added leader lines and reviewed final pixels. These are development iterations, not finished evidence.

## Verification
111/111 suites including deterministic order, input preservation, clear colliding fixed/units, edge correction, bounded failure fallback, unchanged-frame cache and disposal source guards. Existing pick() body algorithm untouched; game.js exactR299, data unchanged. Source-only tests do not establish GPU performance.

Actual isolated390x844 view14, view26, rotated view14 and844x390view14. Same prepared controller-changed natural engine observation snapshot asR299, no new natural UI campaign claim. Actual pixels of all four views directly inspected. City Pingyuan, YuanTan4120, XuYou4198 separately readable. The tested ship213 label overlaps neither city4 nor unit212 in all four output rectangle measurements; baseline both overlap. This limited fixture does not establish absence of other city/city, facility, HUD or dense-world collisions. At rotated close zoom some other city names remain under HUD; unchanged out-of-scope issue.

Actual body-coordinate clicks still select XuYou ship213 in each of four views, both versions. R300 leader geometry identity unchanged after two unchanged-frame renders. Per-version gameJSON before/after all view/rotation/panel clicks exact, disk exact, pageerror0. Post-view wholeJSON versions exact. Original saves untouched; no remote writes, no save format/policy/portrait changes. Software renderer and emulated viewports, not physicalphone/performance pass. Adds one optional LineSegments draw and CPU layout work on camera/data changes; no overhead0 claim.
