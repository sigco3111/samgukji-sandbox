# R229 open unit panel visibility
Existing doTurn and post-decision panel refresh checked only that a selected unit still existed. A previously visible foreign unit could leave player vision and its open panel would continue to reveal current troops, orders and nearby links. This is an existing refresh-path issue, separate from R228 overlap list/click filtering.

showUnitPanel now checks the same delegated/own/inVision predicate before rendering. Missing or currently hidden foreign units hide and clear the panel, selected unit and pending aim. Own and delegated viewing remain. Engine, AI, vision radius and command rules unchanged.

Local full74/74 suites,66 mounted DOM assertions including prior38 and hidden enemy/neutral, removed unit, own and delegated exceptions, empty hidden content, cleared selection/aim and no game-state mutation. Three source-wiring checks.

390px actual isolated app fixture: select visible ZhuJu2111 using actual map click, change only that existing unit location outside vision, then actual end-turn1822->1823. Unit still alive, mesh absent, panel hidden and empty, errors0. Before/after pixels inspected. This is explicit fixture evidence, not natural battle causality. Original saves untouched. Public verification pending at candidate stage.
