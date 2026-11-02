# R212 automatic field attacks respect peace

R211 fieldTurn checked peace for attacks against a facility, but its trap and catapult-tower target filters omitted that check. A live UI fixture with Cao Cao0 allied to Dong Zhuo5 reproduced fire-trap damage400/confusion1 and rockfall300, plus tower shots. This is a constructed fixture, not a natural campaign or a user's save.

The narrow fix excludes existing isPeace targets in the two automatic attack filters. Trap costs, radii, damage and one-use removal, tower damage/radius, diplomacy values/expiry, AI/economy are unchanged. Peace can prevent a trap from being spent and change subsequent simulation history. No zero-impact or strategic-performance claim.

18 focused cases cover each of fire trap, rockfall and tower against enemy, alliance, truce, expired alliance, same faction and allied-first/enemy-second ordering. Candidate UI alliance and truce fixtures both retain three5000 troops/confusion0 and both traps. Reload and enemy-effect checks are separately recorded when run. Full60 suites pass. Screens are390px emulation, not physical-phone evidence. Candidate, not live.

Additional R211 naval integration (no code change): actual UI ChangAn17→LuoYang15 route25 points, reload/march, interception and turn20 ZhangLiao439 vs CaiMao219 duel restore/auto settlement. Original fixture stopped by multiple enemy units at turn24. Separate turn19 fork removed other field units to isolate arrival: turn21 water endpoint/path0 and coastal siege, turn23 troops2584/food7297/qi100. UI return to ChangAn25 waypoints, turn30 merge: boundary garrison25000→27584, food31027→37229, dou0→1, officer439 city17, unit1 removed. No defended-city capture or natural-campaign victory claim.
