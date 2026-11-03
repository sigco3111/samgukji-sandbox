# R273 initial storage read failure
2026-11-03 local candidate on reviewedR271, publicR258 unchanged.

Separate390px browser fault injection throws SecurityError only for getItem(game save key), not a claim that the user's storage is actually blocked. R271 boot raises an uncaught error; title NewGame remains enabled though storage cannot be inspected. R273 catches this initial boot read, explains that storage cannot be read and no save was deleted, disables NewGame while existence is unknown, and turns Continue into an explicit reload/retry. It does not guess an empty save, erase bytes, reset a campaign or bypass storage permissions.

10 focused checks: success path unchanged, failed read no write/delete, visible notice, disabled NewGame and usable retry/reload. Full99/99 suites pass. Actual390px fault case errors0/title stays, full warning/buttons visible in inspected pixels. Existing modern19save bytes remain exact through blocked state and successful retry after simulated permission restoration, Continue restores19 and retains entire save exact/errors0.

The first recovery check used the old R206 save; ordinary loader adds the already-existing empty siegeWatch compatibility field. That normalization is not a R273 mismatch or repair. Final preservation proof uses the unchanged modern R27119save. Original user saves untouched.

Scope: initial game-key read only. Does not fix permission failures later during scenario/ruler confirmation or writes, browser denial reasons, internally malformed supported-scenario saves, cloud backup/recovery, physical-phone behavior. Existing R181 save-write warning and R267 format preflight remain separate. No engine/RNG/cost/AI/schema changes. Publication stopped.
