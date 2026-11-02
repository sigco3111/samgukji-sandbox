# R196 read-only officer roster

Original plan line 154: officer list/detail, abilities, skill, relationships and treasures. Menu > 무장 명부 is now an own-force read-only view. It includes own officers detained elsewhere and enemy officers held by the player, with distinct status labels and separate current force/captor fields. Field officers appear once with their unit. No officer commands were added.

Names can be searched in Korean/Chinese; abilities sort descending. Detail reuses the officer row for five abilities, skill, loyalty, merit, relationships and items, plus status, location, six aptitudes and office. Own prisoners' holding cities require existing city visibility. Undiscovered free officers, dead/not-yet officers and unrelated enemy staff are excluded. Delegation does not widen scope. Pure spectator mode shows assigned officers. No AI, economy, diplomacy or officer state rules changed.

## Validation (2026-11-02 KST)
- Node: 28 focused checks; full smoke 44/44 suites; six changed/relevant modules parse.
- Isolated raw.githack preview, not the public origin or user's real save. Artificial 190 Dong Zhuo fixture: Jia Xu (60) detained by Zhang Lu, Yan Pu (21) held by Dong Zhuo, Wang Yun (25) dispatched through actual engine dispatch. Fixture removed before release.
- Actual Continue > Menu > roster > search > detail. PC and 390x844 pixels inspected. Own/held-enemy prisoner force/status/captor correctly separate. Mobile sheet scrolls vertically with no horizontal overflow (388px client/scroll). This is viewport QA, not a physical phone/touch test.
- Cold-cache actual game JSON and save string remained byte-identical through menu, search, detail, numeric sort and viewport changes. First attempt created the existing relation cache; fixed by pure relation projection and repeated actual cold-cache test.
- Actual intellect order 97/94/81/80/78/78. Actual dispatched Wang Yun shows 출진 and unit, once. Fixture Jia Xu item 손자병법 shown. Dong Zhuo real relationship 친애: 여포 shown. Actual end-turn 1->2 with roster open preserved search/detail and refreshed Jia Xu loyalty 85->83. This intentional turn changes state, not counted as read-only equality.
- Unobserved holding-city suppression and pure-spectator boundaries have Node coverage; not separately reproduced on screen. No natural capture claim.

## Limits
R167/R182 remain held. Portrait upload 400 is not retried without new signal. Physical phone testing remains open. Remote envoy/field recruitment/neutral-city search remain optional held expansion, not silently added requirements. This release does not mean the whole game is complete.
