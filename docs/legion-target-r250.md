# R250 idle legion target boundary

Original plan line122 has city attack / force attack / delegate policies. R245 scopes which unit a legion can process, but idle reassignment previously searched every enemy city. Candidate reuses the earlier enemyCities policy-filtered list in that idle branch, retaining alive-force filtering. Existing movement, strength/distance thresholds, retreat/home selection, support/repair/facility attack priorities, manual field orders and full-force AI remain unchanged. No economy/diplomacy/recruitment tuning.

## Diagnostic boundary, not natural incidence
Continue old natural turn20 save used by R216 facilities workflow. Existing legion2/city9 target10. Explicitly change its policy target to city0 (XiangPing), call ordinary engine dispatch of HanDang116/sword17000 under _legionActing. The unit receives legion2 and default null city target. AP40, troops17000, carried food40800 are ordinary costs, not edited stats. Baseline assigns nearby PuYang11/path4; candidate assigns selected XiangPing0/path66. Target policy is diagnostic state editing and dispatch is an API call, not a natural legionAI sortie or actual UI dispatch. No claim that long path is strategically better. Unit strength5000/15000 was insufficient against baseline nearest city and caused retreat; candidate selected neutral target uses existing lower threshold. Tests use4000 to verify weak retreat.

Baseline/candidate diagnostic after-snapshots separately loaded in actual390x844 UI. Real map unit click displays expected respective target, ownership and existing manual command controls. Whole saved string exact after continue/read; errors0. This is UI inspection of diagnostic snapshots, not UI reproduction of gameplay command sequence. Original saves untouched.

## Other evidence
20 release focused assertions plus baseline-specific diagnostic assertion in separate script; full86/86. Policy field edits, orphan tags, troop4000, truce/own target, building/repair/facility orders in focused tests are explicit diagnostics. FullAI no-legion delegate/city/force scenarios retain exact unit state. Full120turn observer comparison from old1801 snapshots, seed411, all three scenarios final whole-save SHA equal; finite/nonnegative city resources violations0 in this window. This is not fresh natural long campaign or strategic quality proof.

Current baseline3scenarios x3policies,seed42,180turn window produced0 observed off-policy idle reassignment. Natural incidence not established. The boundary defect exists in reachable engine dispatch default-idle state, not claimed frequent AI failure. Decisions auto-resolved by harness with envoy accepted/other offers rejected to continue observations, not decision-free human play.

## Limits/status
Only enemy-city selection for no-target field units changes; existing active/manual target is not replaced by this branch, full-force delegation does not impose per-legion policy, retreat and defensive/support actions are not redefined. This does not guarantee a commanded assault succeeds or fixes broad AI strategic quality. R167/R182 held; manual blocking rejected. Local candidate pending parent review/fixation/PR/public verification.
