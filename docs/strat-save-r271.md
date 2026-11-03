# R271 persist strat report in the original command save
2026-11-03. Local candidate on reviewed R269. PublicR258 unchanged.

R264 deliberately used an extra autosave to attach command-end report metadata after the existing effect save. R271 invokes a command-local beforeSave callback immediately before each accepted effect branch's existing autosave. It completes the same snapshot and attaches it to the same first new log; no report append save follows. Unsupported/untracked targets have no callback. Rejected commands do not save. No global autosave override, temporary game callback, altered action success, RNG, cost, AI, data or schema. No entire-game performance claim.

24 paired prepared cases compare entire final serialized saves including report metadata and random draws against R269: exact. Focused single-save168 assertions across6kinds x2rolls xstorage success/failure: one command write and one notification, failure preserves old disk plus in-memory report, later retry saves report, repeat rejection adds no write. Full98/98 suites pass.

Natural601->681 three scenarios, actual AI925 reports, all240per-turn entire-save hashes including metadata and RNG/drawcounts equal to R269. Each version independently restores925 command checkpoints with whole-save and persisted-report equality. This is command-boundary restore, not interrupted endTurn-resume guarantee.

Actual390px natural19save same0.1roll, real map pick/fire/target/report/focus/reload: whole final save equals previous reviewed path, errors0, readonly report/focus, reload exact. Measured actual UI writes for fire click+existing refreshAll: R2693 -> R2712. Pure engine accepted command2 ->1; UI still saves again in refreshAll, so do not claim one total UI write or all save duplication removed. Screenshot inspected, same47damage/qi65->55/fire0->3/unchanged confusion. Physical-phone speed unverified; storage-write reduction count is evidence, not timed speed improvement.
