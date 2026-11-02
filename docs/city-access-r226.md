# R226 nearby-city panel access (local candidate)

Public baseline R225. Existing naturally generated 251/1801 save continued through actual faction join at1821. Several normal city center clicks selected overlapping units. A scan for normal city picks failed at XinYe in four camera rotations in this snapshot. This establishes the observed obstruction, not every possible zoom or camera configuration.

Add read-only nearby-city links to unit panels, within1.2 world distance. Own, enemy, spectator and bandit panels can offer the same public city information. Existing city panel permissions remain authoritative. Revalidate unit existence and current distance at click time; clear selectedUnit/pendingFire before opening the canonical city. No orders, save writes, costs, ownership, targeting priorities or simulation rules change from navigation itself.

Candidate actual390px UI: click overlapped XuZhu2114 -> nearby XinYe link -> XinYe8274/gold220523/food67635 panel. Whole saved string unchanged by navigation. Next actual turn1822 and paid dispatch DengXian485/YinZhi663 7000catapult succeeded. Real reload whole saved string exact, page errors0. Initial ordering attempt selected the preexisting XuZhu instead of the new unit, so new-unit target remains null. Dispatch succeeded but intended attack command and defended-city capture remain unverified.

Nine pure cases + two wiring assertions;22 mounted DOM cases include own/enemy canonical city, nulling targeting, no game mutation, far exclusion, stale removed/moved unit, removed city, delegated/foreign/bandit access. Full71/71 suites. DOM cases use a separate local DOM test harness, not native device testing. First DOM extraction accidentally included boot and failed after synchronous cases; corrected extraction rerun is the evidence.

Not a fresh full natural campaign. Local prepared save transfer preserves prior naturally generated state; no resource/stat/enemy/RNG edits. No physical phone or whole-game-completion claim. Unresolved overlapped-unit selection remains separate. Original user saves untouched, no spending. No PR/merge/publication yet.
