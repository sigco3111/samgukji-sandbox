# R241 decision owner before command handoff

A prepared190 scenario invokes actual proposeAlliance(1->player5) during an endTurn with pendingJoin0. R236 transfers to0 at the same boundary, leaving tid5 request displayed to0. Actual public390 UI accepts for1/5 while header isCaoCao0. This is explicit fixture reproduction, not confirmed natural occurrence.

The narrow fix retains current player/pendingJoin while a duel,debate or incoming diplomacy remains. Resolve under the old controller, then transfer at the next safe endTurn. Invalid dead/self requests still clear. No new cost, probability, diplomacy duration, AI or economy policy. Existing stale imported cross-controller queues are not migrated. Automatic turns wait normally while decisions exist.

128assertions cover8decision masks x valid/dead/self requests, actual proposal and acceptance, restoration, no duplicate handoff. The first mixed fixture used a dispatched officer as negotiation initiator and was rightly rejected by existing loader; corrected to a real city officer. Full79suites pass. R236 comparison184/190/251 x7/42/99,120turn,4joinrequests each equal persisted state except bounded logs60; those paths have no simultaneous incoming request, not natural proof of this corner.

Actual local390 fixture: DongZhuo header receivesLiuBei proposal, join0 remains; accept applies1/5,whole stored string reload exact; actual stopauto and endturn then transfersCaoCao0,joinnull/queueempty,whole stored string reload exact/errors0. Two screenshots inspected. No physicalphone, strategy-quality, all old-save migration or overall completion claim.
