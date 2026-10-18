# TripUp prototype links

## Wireflow arrows (from the Figma wireflow)
Solid = user tap · Dashed = system event / notification

| From | Tap on / event | To |
|---|---|---|
| 01 Home | Lisbon trip card | 02 Plan |
| 02 Plan | + next to the avatars ("Add guest") | 03 Add Ren |
| 03 Add Ren | Add guest | 02 Plan (Ren added, back to plan) |
| 02 Plan | Start a poll (Dinner card) | 04 New poll |
| 02 Plan | + (FAB) | 02a + menu |
| 02a + menu | Create poll | 04 New poll |
| 02a + menu | Add expense | 07 Add expense |
| 04 New poll | Create poll | 05 Live votes |
| 04 New poll | (dashed) everyone notified | 04a Push · 04b In-app |
| 05 Live votes | Back arrow | 04 Edit poll |
| 05 Live votes | Close poll (closes early) | 06 Winner added |
| 05 Live votes | Go to trip | 02 Plan (poll keeps running) |
| 06 Winner added | Log expense (plan card) | 07 Add expense |
| 07 Add expense | Save expense | 08 Expenses updated |
| 08 Expenses updated | See everyone's balance | 08a Everyone's balance |
| 08 Expenses updated | Settle up | 09 Settle up |
| 08a Everyone's balance | Settle up transfers | 09 Settle up |
| 09 Settle up | (dashed) Remind everyone pending → Nic gets the reminder | 10 Pay (Nic's view) |
| 10 Pay | (dashed) Pay Ari, then Ben, and everyone pays | 10a Push · 10b In-app |

## Every link in the HTML pages
| From frame | Tap on | Go to frame |
|---|---|---|
| 01-Home | Day 4 of 4 · Today Trip cover image Lisbon Oct 9 – 12 · 5 pe | 02-Plan |
| 01-Home | New trip | S4-New-trip |
| 02-Plan | Back to trips | 01-Home |
| 02-Plan | Add member | 03-Add-member |
| 02-Plan | Polls | S1-Polls-tab |
| 02-Plan | Expenses, you owe money | S2-Expenses-before-dinner |
| 02-Plan | Start a poll | 04-Create-poll |
| 02-Plan | Create: expense, poll or plan item | 02a-Plus-menu |
| 02a-Plus-menu | Back to trips | 01-Home |
| 02a-Plus-menu | Add member | 03-Add-member |
| 02a-Plus-menu | Polls | S1-Polls-tab |
| 02a-Plus-menu | Expenses, you owe money | S2-Expenses-before-dinner |
| 02a-Plus-menu | Start a poll | 04-Create-poll |
| 02a-Plus-menu | Add expense | 07-Add-expense-by-item |
| 02a-Plus-menu | Create poll | 04-Create-poll |
| 02a-Plus-menu | Add to plan | 02-Plan |
| 02a-Plus-menu | Close menu | 02-Plan |
| 03-Add-member | Close | 02-Plan |
| 03-Add-member | Add guest | 02-Plan |
| 04-Create-poll | Cancel | 02-Plan |
| 04-Create-poll | Create poll | 05-Live-votes |
| 04a-Poll-push | T TripUp · Lisbon now Ari started a poll Where should we eat | 05-Live-votes |
| 04a-Poll-push | Vote | 05-Live-votes |
| 04b-Poll-in-app | Ari started a poll Where should we eat tonight? · closes 19: | 05-Live-votes |
| 04b-Poll-in-app | Vote | 05-Live-votes |
| 05-Live-votes | Back to edit poll | 04-Create-poll |
| 05-Live-votes | Close poll | 06-Plan-winner |
| 05-Live-votes | Go to trip | 02-Plan |
| 06-Plan-winner | Back to trips | 01-Home |
| 06-Plan-winner | Add member | 03-Add-member |
| 06-Plan-winner | Polls | S1-Polls-tab |
| 06-Plan-winner | Expenses, you owe money | S2-Expenses-before-dinner |
| 06-Plan-winner | Log expense | 07-Add-expense-by-item |
| 06-Plan-winner | Create: expense, poll or plan item | 02a-Plus-menu |
| 07-Add-expense-by-item | Cancel | S2-Expenses-before-dinner |
| 07-Add-expense-by-item | Equally | S3-Add-expense-equally |
| 07-Add-expense-by-item | Save expense | 08-Expenses-updated |
| 08-Expenses-updated | Back to trips | 01-Home |
| 08-Expenses-updated | Add member | 03-Add-member |
| 08-Expenses-updated | Plan | 06-Plan-winner |
| 08-Expenses-updated | Polls | S1-Polls-tab |
| 08-Expenses-updated | See everyone's balance | 08a-Everyones-balance |
| 08-Expenses-updated | Settle up | 09-Settle-up |
| 08-Expenses-updated | Add expense | S3-Add-expense-equally |
| 08a-Everyones-balance | Close | 08-Expenses-updated |
| 08a-Everyones-balance | Settle up transfers | 09-Settle-up |
| 09-Settle-up | Back to expenses | 08-Expenses-updated |
| 09-Settle-up | Remind everyone pending | 10-Pay-Nic |
| 10-Pay-Nic | Back to settle up | 09-Settle-up |
| 10-Pay-Nic | Pay Ari €27.50 | 10a-Squared-push |
| 10a-Squared-push | T TripUp · Lisbon now Everyone's squared up All 5 payments a | 09-Settle-up |
| 10b-Squared-in-app | Everyone's squared up All 5 payments done · €153.75 | 09-Settle-up |
| S1-Polls-tab | Back to trips | 01-Home |
| S1-Polls-tab | Add member | 03-Add-member |
| S1-Polls-tab | Plan | 02-Plan |
| S1-Polls-tab | Expenses, you owe money | S2-Expenses-before-dinner |
| S1-Polls-tab | Live · closes 19:30 Fills Dinner 20:30 Where should we eat t | 05-Live-votes |
| S1-Polls-tab | New poll | 04-Create-poll |
| S2-Expenses-before-dinner | Back to trips | 01-Home |
| S2-Expenses-before-dinner | Add member | 03-Add-member |
| S2-Expenses-before-dinner | Plan | 02-Plan |
| S2-Expenses-before-dinner | Polls | S1-Polls-tab |
| S2-Expenses-before-dinner | Settle up | 09-Settle-up |
| S2-Expenses-before-dinner | Add expense | S3-Add-expense-equally |
| S3-Add-expense-equally | Cancel | S2-Expenses-before-dinner |
| S3-Add-expense-equally | By item | 07-Add-expense-by-item |
| S3-Add-expense-equally | Save expense | 08-Expenses-updated |
| S4-New-trip | Close | 01-Home |
| S4-New-trip | Create trip | 01-Home |
