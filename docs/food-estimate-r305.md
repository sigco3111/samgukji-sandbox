# R305 unit food estimate correction

Local candidate on R304. Engine consumption, AI/economy policy and saves unchanged.

The previous panel rounds food / unrounded per-turn consumption to nearest10days. Actual engine rounds per-turn consumption to integer with minimum1. At4198troops/food336, old panel says10days while actual consumption560 cannot be funded. New pure view uses exact engine consumption expression and floor to whole consumable turns, explicitly current troop count/no resupply estimate. Snapshot may change through casualties, resupply, confusion or fire, so it is not starvation ETA. Zero full turns means next consumption not covered, not immediate guaranteed desertion. Old economy1 clearly says unit food not consumed, missing food is uninitialized rather than invented amount.

115/115 groups pass. 30 troop/food boundaries, old-economy/missing/invalid/read-only tests; actual isolated Game.stepUnit with4198troops/food336/remote from friendly cities consumes zeroes food and loses troops, confirming insufficiency. This is prepared no-burn/no-confusion/no-supply case, not natural campaign coverage.

Actual local390x844 same prepared turn121/controller2direct snapshot with only ship213food336 edited. Real map bodyclick selects ship, old10days vs new0turns/consumption560 screenshots inspected, text readable. Opening panel leaves whole game JSON/storage exact and pageerrors0. No turn processed by UI. No physical-phone/performance/deployment claim. Runtime game.js changes cache imports only. Original user saves and660portraits untouched.
