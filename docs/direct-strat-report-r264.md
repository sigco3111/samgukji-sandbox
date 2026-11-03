# R264 direct unit stratagem report, local only

Built on reviewed, unpublished R262. Public runtime remains R258. No transmission retry.

`fireStrat` preserves the existing effect implementation in `_fireStratEffects`. For accepted direct fire/ambush/confuse/rumor/calm/douse against a unit, it attaches one historical snapshot to the first new actual command log, then saves that metadata. Rejected commands, city/facility targets, sorcery/thunder and embedded field-combat effects do not gain records. The snapshot does not claim that the command succeeded: exact result text is retained, including failure or no retreat route. Surrounding fire-spread damage is excluded. Snapshot uses the unit leader as the unit label, while outcome text keeps the actual caster, which can be a different officer.

Report shows main-target troops, both units' qi, target confusion/fire duration and whether target city changed. It does not infer past effects from current state or old logs. Existing controller/observer scope and current-vision location button rules apply. Basic-combat map badges exclude these records.

Focused fixture tests cover 6 actions x success/failure RNG boundary x 1/5000 target troops, exact state fields, invalid data, ownership scope, capped log list, rejected repeat. Independent 24-case paired fixture script compares full saves except newly added metadata and random draw counts to R262. All identical. These are prepared fixtures, not naturally occurring battles.

Three unchanged old 1801-turn snapshots were continued 120 engine turns each on R262 and R264, with every-turn whole-save hashes normalized only for strat metadata. Mismatches0, RNG final values identical, checked city gold/food/troop invalid or negative0. This is not strategic-quality proof or physical-phone evidence.

Actual isolated UI: unchanged natural 190/19 saved campaign, real map click on unit46, actual fire command and unit48 target selection. Fire succeeded: 779->732(-47), caster-unit qi65->55, target qi100->100/confusion2->2/fire0->3, target city unchanged29. Caster is XunYou in GaoShun's unit, shown separately. Same UI path on R262 gives byte-equivalent whole save after removing new metadata. Opening report/position focus leaves game JSON unchanged; full saved string survives reload exactly; page errors0. Screenshot390x844 inspected after unit-label clarification; complete report and location/close buttons visible. Account-free desktop Chrome emulation, not physical-phone performance.

Final full gate94/94 suites passed again after the focused suite expanded to408 checks. No outcome, RNG, cost or policy adjustment intended. An additional metadata autosave is performed on recorded commands, so no claim of zero runtime overhead is made. Deployment and public verification remain open.
