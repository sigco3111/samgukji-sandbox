# R268 explicit existing-save replacement
2026-11-03. Local candidate on reviewed unpublished R267; publicR258 unchanged.

Actual isolated existing19turn save -> NewGame -> first scenario -> first ruler on R267 immediately replaced the stored game with184/ZhangJiao turn1 without a replacement confirmation. No user's real save involved.

Candidate asks only at completed scenario/ruler selection if a save key exists, including unreadable content. Choosing NewGame or browsing scenarios writes nothing. The confirmation names the selected year/ruler, warns that the browser save will be overwritten irreversibly, and offers explicit overwrite/start or cancel. Cancel is focused by default. No new Game construction or save write happens before confirmation. Confirm calls the original startGame, and a detached or hidden old confirm handler cannot start a second game. Leaving the ruler screen removes the prompt. Without an existing save the ordinary first-game route is unchanged. No engine/cost/AI/economy/save-schema changes and no backup/recovery guarantee.

13 focused assertions plus full96/96 suites passed. Actual390px existing natural19save: browse and confirm prompt retain exact original bytes; Cancel retains exact bytes; renewed prompt and explicit overwrite starts184 turn1, subsequent reload entire save exact/errors0. Final prompt pixels inspected: full warning, both buttons and selected-ruler list readable in viewport. Baseline overwrite was reproduced separately.

Normal Continue/fire/report/focus/reload path with unchanged natural19save and same0.1 roll retains exact whole final save versus R267, errors0. The candidate does not fix all malformed internal save schemas or storage permission failures. It does not ask a user to perform any upload. Publication and physical-phone checks remain open.
