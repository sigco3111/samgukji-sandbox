# R228 preserve fog-of-war in overlap panel links
R227 new overlap links omitted the normal map unit visibility check. At an existing5-unit vision boundary a visible foreign source4.99 and hidden target5.03 can be within the new0.05 overlap threshold. Mounted UI reproduced hidden link and target selection. This is a regression in the R227 auxiliary path, not a change to vision policy.

Use the existing delegated/own/inVision condition both when listing links and at click-time revalidation. No game.js, vision radius, map picking or command-rule changes. Same-side explicit selection remains.

Local73/73 suites,38 mounted DOM cases: prior32 preserved plus hidden listing exclusion, delegated exception, stale visible-then-hidden rejection/no game mutation, own listing/selection. Two source-wiring checks guard both filters.

Actual390px explicit fixture shifts only two existing foreign unit positions to opposite sides of an existing player-vision boundary. Source visible/mesh present, target not visible/no mesh, hidden target link0/errors0. Screenshot inspected: visible ZhuJu2111 panel with no hidden-unit button. This is fixture evidence, not natural campaign proof. Separate existing natural-history1822 own path: XuZhu3951 -> DengXian3964/7000, save unchanged, actual YangYang target29/path1, real reload exact/errors0.

Original saves untouched. No defended-city capture, all-screen-overlap, physical-phone or whole-game completion claim. Public repair not yet verified in this candidate document.
