# TripUp wireflow · sticky notes

One section per screen, in wireflow order. Paste each block into a sticky next to its frame.

## 01 Home

HOME = all trips (scenario step 1).
The live trip gets the big card with what needs you: open poll and your balance, so Participants see it without digging.
Upcoming and past trips stay small. The labelled 'New trip' button creates a trip.

BELL = inbox for all trips (no nav bar needed).
Two groups: NEEDS YOU (vote, pay) on top, UPDATES (someone added an expense, poll closed) below.
Badge counts only Needs-you items. Here 3 = Ben's Tram tickets + Mia's Pastéis (both waiting to be paid) + the Primavera vote waiting.
Every item deep-links to the exact screen (poll, Pay your share, plan card). Small events are batched: '3 people voted, Taberna da Rua leading'.
Same events drive the tab dots inside a trip; opening one clears both.

## 02 Trip plan

REINVENT: the itinerary drives decisions. Tonight's dinner is an empty slot with 'Start a poll', so the poll is born inside the plan and the winner lands back in this slot.
TWO PATHS: 'Start a poll' (primary, group decides) or 'Add a place' (secondary, already decided). Both open the SAME place search: pick 1 place → 'Add to plan'; pick 2+ → 'Start poll with 3 options'.
Added directly? Group is notified, card shows 'Added by Ari' + 'Suggest another' (turns it into a poll with that place as option 1).
Date strip = trip days, today selected.

NO PEOPLE TAB: managing members is rare, so it doesn't earn a permanent tab. 3 tabs (Plan · Polls · Expenses) also leave more room per label.
TAP THE AVATAR STACK → People sheet: every member with role and scope ('Ari · Organizer', 'Ren · Dinner only · Edit'), invite link + 'Add someone' (same flow as screen 3), Leave trip. Remove member is for the Organizer only.
The + next to the avatars stays as the quick shortcut to add someone.

## 02a + menu open

GLOBAL + (Material 3 FAB menu): one entry point to create anything, 2 taps from any tab.
Opens over the Plan screen: + turns into ×, a scrim dims the screen, tap outside to close.
Add expense → Add expense (7) · Create poll → New poll (4) · Add to plan → new plan item. Closest to the thumb = most likely action for the tab.
Contextual buttons (Start a poll, Log expense) stay on the cards; the + is for everything else.

## 03 Add Ren

ANY member can add people, not only the Organizer (shared ownership).
REINVENT: scope by DAYS first (always exist), then optionally by that day's PLANS. Past days are disabled. Here Sunday + Dinner are preselected, since tonight is all that's left.
No plans on a day yet? Empty state: 'Ren will be included in anything added for this day.'
Ren never appears in older costs. Changeable later in the People sheet (tap the avatars).
Guests join from a link, no account needed (Splitwise complaint).
→ AFTER ADDING: back on Plan (2), Ren's avatar joins the header (5 → 6 people) and a toast says 'Ren added to Dinner'. From screen 4 on, every screen shows 6.

## 04 New poll

Opened from the empty dinner slot, so question, time and voters are pre-filled. PLACES vs SIMPLE (text options like 'taxi or metro').
NO FORMS: search a place and the card fills itself: photo, price, type + 2 key facts, distance from where the group is NOW. Same card for any place: restaurant = cuisine + hours, beach = sand/water + free, pool = heated + €6 entry.
Only human input: an optional note (e.g. 'Ana's pick, great petiscos').
✨ SUGGEST (AI): 3 places that fit THIS group RIGHT NOW, using what TripUp already knows: group size (6, Ren included), time + location (open at 20:30, walkable from the house), remaining budget (€216), past votes (picked tascas over fancy places twice). Each suggested card shows why: 'Fits your budget · open late · 8 min walk'.
SETTINGS live in the scroll, after the options (natural order: ask, add options, adjust, create). Smart defaults, so most people never touch them: Winner is linked to Dinner · Sun 20:30 (or other open slots, '+ New plan item', 'Don't add to plan'), closes Today 19:30, single answer, names visible.
ONLY 'Create poll' is pinned, with a one-line summary under it ('Fills Dinner · closes 19:30 · Edit') that scrolls to Settings. Notifies all 6, Ren included.

## 04a Poll push (phone locked)

SCENARIO: 'the app sends a notification to everyone'. Sent to all 6 the moment Ari taps Create poll (Ren too, via his guest link).
The options are in the notification itself, so people know what they're voting on before opening the app.
Quick actions: 'Vote' opens the poll ready to tap (screen 5); 'Remind me in 10 min' for someone busy getting ready.
Only one push per poll; later votes are batched ('3 people voted') to avoid notification overload.

## 04b Poll in-app (Nic's phone)

APP OPEN (Nic is in the trip): same two layers as the 'squared up' confirmation.
1) IN-APP BANNER at the top: 'Ari started a poll' with a Vote button right in it, so voting is 1 tap. Stays ~4 s.
2) PERSISTENT STATE: the empty dinner slot becomes 'Poll open · closes 19:30 · you haven't voted' with a Vote button, and the Polls tab gets a dot. Both disappear once Nic votes.

## 05 Live votes

REAL-TIME: bars and the 'Leading' tag update as votes arrive, with a live line ('Ben just voted').
Shows who is still missing + one-tap Remind, so nobody has to chase in WhatsApp.
TWO EXITS: 'Close poll' ends it early (winner goes to the plan → 6). 'Go to trip' leaves it running and returns to the plan. Back arrow → edit the poll (4).
Tie rule: the creator decides.
IF 'HIDE VOTER NAMES' IS ON (set in 4): no avatars under each bar, only the counts. 'Waiting on Nic' becomes '5 of 6 voted', and the live line says 'Someone just voted'.

## 06 Winner added

STATE CHANGE: Ari closed the poll early (Nic hadn't voted), so the 'Not decided yet' slot becomes a real plan item tagged 'Won the poll'. Everyone's itinerary updates at once.
CARD-BUTTON RULE: dinner is upcoming, so DIRECTIONS is the main button. 'Log expense' is secondary now.
→ ARROW TO 7, 'later that evening, after dinner': the card switches and Log expense becomes the main button (opens Add expense pre-filled with this dinner and its 6 guests).

## 07 Add expense · By item

ADD EXPENSE, 'By item' selected: the items section opens right under the split buttons (same screen as 'Equally', new state; Equally is a supporting screen).
TWO MODES ONLY: Equally and By item. Fewer choices; By item covers uneven bills.
TOP ROW = who was there. ITEMS = who had what. Removing someone at the top removes them everywhere; removing them from an item only affects that item.
Scenario moment: Wine excludes Nic & Ren. Per-person shares recalculate live, and the check confirms the items add up to €195.
IF ITEMS DON'T ADD UP (e.g. €180): the check turns into a warning '€15 unassigned' and Save is disabled, or the amount at the top recalculates from the items.
ADOPT (free, not Pro): itemized split.

## 08 Expenses updated

EXPENSES TAB, AFTER SAVING: no extra balances page, Save returns to the Expenses tab.
STATE CHANGES: balance flips from 'You owe €46.25' to 'You're owed €112.50', trip total and budget bar update (€1,284 · €216 left), the dinner appears at the top marked NEW, and a toast confirms with Undo.

## 08a Everyone's balance

SCENARIO: 'the app updates EACH PERSON'S total trip balance'. Opened from 'See everyone's balance' on the balance card (screen 8).
Bottom sheet, not a new page: per person, tonight's change + whole-trip balance (gets / owes). Nic shows 'no wine', Ren 'dinner only', so the wine exclusion is visible.
All balances add up to zero. One button continues to Settle up (5 transfers).

## 09 Settle up

ADOPT: debt simplification, but made visible ('5 transfers instead of 11').
Ari is owed money, so her actions are Remind, not Pay. Grouped: To you / Between others.

## 10 Pay (Nic's view)

PERSPECTIVE SWITCH: 9 is Ari's phone, 10 is NIC'S phone (label in the header). → ARROW 9 → 10: 'Nic gets Ari's reminder and opens Pay'.
REINVENT: pay inside the app. Pick who to pay first (bank transfers go one at a time). Paying marks the debt settled automatically, so there is no separate 'record payment' step (top Splitwise complaint).

## 10a Squared up push

CONFIRMATION (scenario's last step) as a PUSH NOTIFICATION, not a new screen.
Sent to all 6 when the LAST payment lands (here Nic → Ben), so everyone hears it even with the app closed.
Push, not an alert dialog: alerts block the screen and are for decisions or errors; a 'done' message shouldn't need an OK tap.
Tapping it opens Settle up showing '5 of 5 settled'. Small payment updates are bundled underneath.

## 10b Squared up in-app

APP OPEN: two layers so nobody misses it.
1) IN-APP BANNER slides down at the top of whatever screen you're on (dark, check icon), stays ~4 s, tap opens Settle up. Announced to screen readers.
2) PERSISTENT STATE: the balance card itself changes to 'All settled · 5 of 5 payments', so anyone opening Expenses later still sees it. Home's trip card shows 'All settled' too.
Below: trip cost + your share and a 'Trip recap' link (ready for the next adventure).

## Supporting · Polls tab

POLLS TAB = every decision of the trip in one place.
OPEN on top: live dinner poll (leading option, mini result bar, who's missing) opens screen 5. Simple text poll by Mia shows another kind.
DECIDED below, compact: what won and where it landed in the plan, so the group remembers how choices were made.
Dot on this tab only when a poll waits for YOUR vote. + creates a poll.

## Supporting · Expenses before dinner

EXPENSES TAB before dinner (state before screen 8).
ADOPT: trip = group with its own friends; history by day with concept, who paid, amount; payments shown as activity rows.
REINVENT: balance is the first thing you see, with trip total vs group budget.

## Supporting · Add expense (Equally)

ADD EXPENSE with 'Equally' (default state of screen 7).
Opened from the dinner card, so title, place, date and guests are pre-filled.
'Who was there': Select all / Unselect all + tap avatars (Canva-pages pattern). Add guest.
ADOPT (free): currency, receipt scan from camera OR photo library.

## Supporting · New trip

NEW TRIP, opened from the labelled 'New trip' button on Home (extended FAB, so it isn't confused with the in-trip + menu).
Only the name is required: cover, budget and friends are optional, so starting a trip takes seconds.
No cover? One is picked from the destination. Dates unsure? 'Poll the group for dates' reuses the poll flow.
Invite link: friends join without an account (Splitwise complaint). Budget feeds the Expenses tab bar.
