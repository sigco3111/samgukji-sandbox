# R304 threat-list visibility correction

Local candidate based on R303. No deployment or AI/economy policy change.

## Confirmed mismatch
The map hides units outside current manual-control vision, but forceOverview's threat analysis includes any enemy targeting one's city regardless of distance. Dashboard used those full rows. A prepared hidden enemy at75,15 targeting owned city appears with name9876troops and47.62distance while inVision=false and no map mesh.

## Correction
Add unitId to existing threat rows, preserving full analysis for other callers (arms-policy uses forceOverview). New pure UI helper resolves existing units by ID and shows only current-vision units in direct control, all existing units in delegation. Missing units suppressed. Main dashboard uses filtered rows for both body and empty state; empty text says current vision. No threat-policy, distance, path, AI, RNG or save schema modification.

## Evidence
114/114 groups pass. Pure tests visible/hidden/own/delegated/removed/duplicate labels/readonly; actual Game.forceOverview still retains hidden-target threat while UI helper filters it. Actual local390x844 pages compare same prepared turn121/controller2direct/July snapshot with owned resources adjusted for R303 and one enemy moved outside vision. Baseline shows hidden expedition name9876troops/distance47.62; candidate removes that row while preserving the three currently visible threats. Screenshots inspected with internal dashboard body scrolled380px; readable full threat rows. Whole game JSON and localStorage unchanged on opening; pageerrors0. No turn processed or natural-hidden-threat occurrence claim. Delegated/all-show is pure-function evidence, not screenshot coverage. Original user saves untouched.

Initial captures had threat body below fold; replaced by final inspected internally-scrolled captures, not treated as proof. Engine game.js changes only unitId metadata plus versioned imports. No overall-completion claim or physical-phone validation.
