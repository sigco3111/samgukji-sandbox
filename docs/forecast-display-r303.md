# R303 forecast calendar-month display correction

Local candidate based on R302. No deployment, save migration, engine/economy/AI changes.

## Defect and fix
forceOverview simulates k=1..12 future months and returns calendar month m for foodLackMonth/goldLackMonth. The old dashboard interpreted m as elapsed months. Prepared July state predicted August shortage but printed 8 months later. New UI prints `8월 (1개월 후)`. Next January from December is 1 month later; same calendar month is 12 months later.

The new pure helper validates input and maps exactly the existing 12-month horizon. Both food and gold warning templates use it. Engine game.js differs only in cache import version.

## Evidence
113/113 regression groups pass. New gate exhausts 144 current/next-month combinations, invalid inputs, and both source warning paths. Actual Game.forceOverview July and December prepared city tests confirm next-month values, unchanged whole game JSON, no engine calculation modification.

390x844 actual local UI baseline/candidate on same prepared turn121 snapshot (controller2 direct, calendar July, owned city food0/troops10000/farm0/gold0/commerce0). Baseline says 8 months later; candidate August in 1 month. Both screenshots inspected: warnings readable in modal without truncation. UI opening leaves whole game JSON and localStorage exact and pageerror0. No game turn processed and no natural shortage claim. Visible screenshots establish food path only; gold path shares helper with source guard, not actual gold shortage screenshot.

R104 old wording gate encoded the wrong month interpretation. Updated it to require calendar-to-elapsed helper use; no economics test weakened.

## Remaining
No claim of overall completion, real phone/GPU verification, strategy-quality approval or deployment. Public release remains older than local candidate. Canonical660 untouched, original user save untouched.
