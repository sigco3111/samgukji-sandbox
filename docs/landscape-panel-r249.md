# R249 short landscape panel

Display-only CSS: at width>=800,height<=540,landscape reserve8px instead of150px below right panel. Left log max420px/right panel360px retain20px gap at width800. Other layouts unchanged. No engine/save/vision/command changes.

Local R248 baseline and candidate actual UI on isolated copy of preexisting R216 turn20 save, actual city8 map click, facilities list/back, dispatch form, scroll bottom and portrait rotation. No new command execution or fixture gameplay claim.

Panel outer heights:844x390 141->283;932x430 181->323;800x360 111->253. All separate log overlap0, panel horizontal scroll0; close button same coordinates. 780x390,390x844,1024x768 baseline/candidate identical. Portrait panel overlaps log by existing policy, not corrected here. Long content still requires vertical scrolling. Actual physical phone unverified. All screenshot pixels inspected.

After viewport changes advance50ms for existing ResizeObserver. At1024x768 HUD48px yields panel top54px both versions; the prior frozen-frame reading113px was a harness stale observation, not product defect or fix. Game-origin RNG stack calls0 in each same UI sequence; saved string exact both, errors0. Pure CSS source9 assertions and full85/85 suites. An initial source-gate false positive matched min-width as width change; narrowed pattern and reran all85.

No claim that this fixes narrow landscape widths<800, portrait log overlay, whole planning completion, strategic AI, physical devices or panel scrolling generally. Remote fixation/PR/live confirmation still pending at local review.
