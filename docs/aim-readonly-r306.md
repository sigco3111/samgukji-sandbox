# R306 read-only aim target navigation

Local candidate on R305. No diplomacy policy, command-success, RNG, cost, engine-effect or save schema change.

The old aimTargets called Game.isPeace while enumerating rows. isPeace lazily creates default diplomacy records for missing pairs, even distant city owners checked before range. Opening then cancelling target chooser could change game object without issuing a command. Fix reads existing alliance/truce expiries directly with identical missing-record default0 and inclusive>=turn semantics. Same-force and neutral rules preserved. Existing stubbed R244 test updated from fake isPeace override to real diplomacy record, keeping target expectations.

116/116 groups pass. New70 actual-Game cases cover missing/default, alliance/truce inclusive expiry, past/future atturn1/10 acrossfive aim kinds and whole-game readonly. Fire target results match engine peace semantics. Old completeAim execution checks still run.

Prepared actual UI121turn/controller2direct ship213, diplo reset empty for test only. Real bodyclick -> fire chooser -> cancel. Baseline creates14default diplomacy rows and arm/cancel game JSON differs; candidate creates0 and arm/cancel whole game JSON exact. Both versions show same6candidate labels, localStorage unchanged, errors0, no command issued/turn advanced. Screenshots390x844 inspected: same readable chooser, showing absence of visual target regression, not proof of internal records. No natural campaign occurrence or physical phone test. Ring pixels are from prior frame because clock held before redraw; no new selected-ring or frame-hiding claim.

Game engine module unchanged exceptcacheimports. Original user saves/portrait660/remote untouched. Broader read-only diplomacy materialization paths are not claimed fixed globally.
