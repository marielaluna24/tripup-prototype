# TripUp prototype

Interactive, mobile prototype for a UX/UI design test: a redesign of **TripUp**, a group-travel app.
It must walk through the full user scenario below at demo fidelity, using mock data. It is the
**primary deliverable**: a product manager should be able to use it without explanation.

The full brief is in `design/TripUp-brief.pdf`. Read it before planning.

## Hard rules (from the brief)
- **Reference device: iPhone 14, 390 × 844 pt.** Lay the app out at exactly that size, no scaling.
  On a desktop browser, show it as a centered 390 × 844 phone frame; on a real phone, full screen.
- **All text in English.** Real content only, never lorem ipsum.
- **Mock data is fine.** No backend. State lives in the client and resets on reload
  (add a small, unobtrusive "Restart demo" control).
- The two **hi-fi screens** in `design/hifi/` must appear in the prototype and match them closely.
  Their visual language, defined in `design/style/`, is the style for **every** screen.
- Must be real code producing a working web app, hosted at a public URL (Vercel or Netlify).

## Stack
- Vite + React + TypeScript. Plain CSS modules or Tailwind, whichever stays simplest.
- React Router, one route per screen (list below), so screens can be deep-linked.
- Design tokens (colors, type scale, spacing, radius) in one file.
- No UI kit that imposes its own look.
- Commit after each working screen.

## Reference material in `design/`
- `TripUp-brief.pdf`: the brief.
- `TripUp-wireframes/`: lo-fi wireframes as HTML pages (`01-Home.html` … `10b-Squared-in-app.html`,
  plus `S1`–`S4` supporting screens). **These hold the real layouts, copy and numbers. Treat them
  as the spec for structure and content.**
- `PROTOTYPE-LINKS.md`: the wireflow arrows (what each tap does), then every link in the pages.
- `TripUp-wireflow-notes.md`: the design reasoning per screen (states, rules, edge cases).
- `wireframes-png/`: Figma exports of the same screens. **If an HTML page and the Figma PNG
  disagree, the PNG wins.**
- `hifi/`: the two hi-fi screens (added later).
- `style/`: the visual style: `STYLE.md` (tokens and rules) plus exports of the style guide.

## Structure vs. style
- **Wireframes = structure and content** (what's on each screen, in what order, what it says,
  where taps go). They are greyscale on purpose. **Never copy their visual look.**
- **`style/` and `hifi/` = the look** for every screen: colors, typography, spacing, radius,
  shadows, icons, component styling. Turn `STYLE.md` into the design tokens file first,
  then build every screen from those tokens.
- If the style guide doesn't cover something, extend it in the same spirit (derive it from the
  existing tokens and the hi-fi screens) and list what you added so it can be reviewed.
- Use the fonts named in `STYLE.md` (Google Fonts, or the font files in `style/fonts/`).

## The scenario (the main path to demo)
Ari (participant) on the last evening of a Lisbon trip:
1. **01 Home**: all her trips. Taps the live Lisbon card.
2. **02 Trip › Plan**: today's itinerary. Taps **+** next to the avatars.
3. **03 Add Ren** (bottom sheet): Ren joins for **Sunday · Dinner** only, as a guest. Back on Plan,
   Ren's avatar joins the stack (5 → 6 people) and a toast says "Ren added to Dinner".
4. **04 New poll**: from the Dinner card's **Start a poll**. 3 restaurants, Create poll.
   Everyone is notified (**04a** lock-screen push, **04b** in-app banner on Nic's phone).
5. **05 Live votes**: results update in real time (simulate votes arriving on a timer:
   Ben votes, the "Leading" tag moves). **Close poll** ends it early.
6. **06 Winner added**: the Dinner slot becomes "Taberna da Rua · Won the poll" for everyone,
   toast with Undo. Later: **Log expense** on that card.
7. **07 Add expense · By item**: €195, paid by Ari. Food €150 for all 6; Wine €45 with
   **Nic and Ren excluded**. Shares recalculate live. Save.
8. **08 Expenses**: balance flips from "You owe €46.25" to "You're owed €112.50", NEW row, toast.
   **8a Everyone's balance** sheet from "See everyone's balance".
9. **09 Settle up**: debts combined, "5 transfers instead of 11". Remind everyone pending.
10. **10 Pay (Nic's view)**: Nic pays Ari €27.50, then Ben. When the last payment lands:
    **10a** push and **10b** in-app banner, "Everyone's squared up", balance card "All settled".

Clearly label perspective switches in the UI (e.g. a "Nic's phone" chip) so a PM isn't confused.

## Screens / routes
| Route | Screen |
|---|---|
| `/` | 01 Home |
| `/trip/lisbon/plan` | 02 Plan (states: before poll · poll open · winner added) |
| `/trip/lisbon/plan?menu=open` | 02a + menu (FAB menu over Plan) |
| `/trip/lisbon/add-member` | 03 Add Ren (sheet) |
| `/trip/lisbon/polls/new` | 04 New poll |
| `/trip/lisbon/polls/dinner` | 05 Live votes |
| `/trip/lisbon/expenses` | 08 Expenses (states: before dinner · after saving · all settled) |
| `/trip/lisbon/expenses/new` | 07 Add expense (Equally / By item) |
| `/trip/lisbon/balances` | 8a Everyone's balance (sheet) |
| `/trip/lisbon/settle` | 09 Settle up |
| `/trip/lisbon/pay` | 10 Pay (Nic's view) |
| `/trip/lisbon/polls` | Polls tab (supporting) |
| `/trips/new` | New trip (supporting) |

Notifications (04a/04b, 10a/10b) are **overlays**, not routes: a lock-screen style push and an
in-app banner that slides down for ~4 s and is announced to screen readers.

## Design decisions to keep
- **No bottom nav bar.** Hub and spoke: Home → trip. The bell on Home is an inbox for all trips;
  its badge counts only "needs you" items (3).
- **Trip header:** large cover image (240 px) with back button, trip title and avatar stack at the
  bottom. **Fixed, not collapsing:** the header stays pinned (sticky) at a constant size — no
  compact-bar animation. The tab row, and (on Plan) the date strip, are sticky directly below it
  with a frosted/blurred background, so the content under them (on Plan: "earlier today" + the
  plan cards; on Expenses/Polls: everything below the tab row) scrolls up visibly-but-blurred
  behind this fixed chrome rather than stopping at a flat edge.
- **Tabs inside a trip: Plan · Polls · Expenses** (no People tab). Dot on Expenses = you owe money.
  Dot on Polls = a poll waits for your vote. Tapping the avatar stack opens a People sheet;
  the + next to it adds someone.
- **Round FAB (+)** inside a trip opens a Material 3 style menu: Add expense · Create poll ·
  Add to plan, with a scrim; + turns into ×. Home uses an extended "New trip" button instead.
- **Plan cards:** text left, image right. Status badges: *Ongoing* (outline + dot),
  *Not decided yet* (dashed), *Poll open* (outline + dot), *Won the poll* (filled).
  Card buttons follow a rule, not AI: not decided → Start a poll / Add a place;
  upcoming with a place → Directions; just finished, no expense → Log expense; nothing otherwise.
- **Poll creation:** Places / Simple. Options auto-fill from a place search (same card for any
  place type). "✨ Suggest" = AI suggestions. Settings in the scroll; only "Create poll" pinned.
- **Live votes:** radio circles; your vote is grey, others disabled; "Change vote"; "Remind" Nic.
  Bottom: Close poll · Go to trip.
- **Add expense:** "Who was there" row on top; split **Equally** or **By item** only. If items
  don't add up to the amount, show a warning and disable Save.
- **Toasts with Undo** after state changes. Feedback is instant and visible in the itinerary.
- Accessibility: tap targets ≥ 44 px, never color alone for meaning, visible focus states,
  `aria-live` for banners and live vote updates.

## Mock data (must stay consistent across screens)
- Trip: **Lisbon**, Thu Oct 9 – Sun Oct 12 (today = Sunday, day 4 of 4).
- People: **Ari (you), Ana, Ben, Mia, Nic** + **Ren** (guest, dinner only) = 6 at dinner.
- Today's plan: earlier (done) Pastéis de Belém, Alfama walk · Free time at the house until 20:00
  (ongoing) · Dinner 20:30.
- Poll "Where should we eat tonight?", closes 19:30: **Taberna da Rua 3** (Ari, Ben, Ren),
  **Park Rooftop 2** (Ana, Mia), **Cervejaria Ramiro 0**; waiting on Nic. Ari closes it early.
- Earlier expenses, split 5 ways: Tram 28 €18 (Ben paid, you owe €3.60), Pastéis €21.60
  (Mia paid, you owe €4.32), Train to Sintra €48 (Ana paid, you owe €9.60).
- Ari's balance before dinner: **you owe €46.25**.
- Dinner €195 paid by Ari: Ari, Ana, Ben, Mia **€36.25** each; Nic, Ren **€25.00** each.
- After dinner: Ari gets €112.50 · Ben gets €41.25 · Ana owes €18.75 · Mia owes €60 ·
  Nic owes €50 · Ren owes €25.
- Transfers (5 instead of 11, total €153.75): Mia → Ari €60 · Nic → Ari €27.50 ·
  Ren → Ari €25 (paid via Apple Pay) · Nic → Ben €22.50 · Ana → Ben €18.75.
- Trip total **€1,284** of a **€1,500** group budget (€216 left). Sunday total €234.60.
  Ari's share of the trip: €241.

## How to work
- Plan first, then build **one screen at a time** in scenario order (01 → 10), then the overlays
  and supporting screens.
- After each screen, check it at 390 × 844 against the wireframe PNG and the hi-fi files.
- Keep components reusable: trip header, tab row, plan card, status badge, button, toast,
  notification banner, bottom sheet, avatar stack.
