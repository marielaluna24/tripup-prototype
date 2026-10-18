# TripUp · Lisbon prototype

An interactive, mobile prototype for Task #6 (TripUp redesign brief): the last evening of a
group trip to Lisbon, from Ari opening the app to everyone being squared up. Built with
**Vite + React + TypeScript**, laid out at exactly **390 × 844 pt** (iPhone 14), with one route
per screen so every step of the scenario is deep-linkable.

No backend — all state lives in a single React Context (`src/state`) and resets on reload, per
the brief. A small **Restart demo** control (top-right of the device frame) resets it on demand.

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
npm run typecheck # tsc -b --noEmit
```

## Deploying

`vercel.json` and `netlify.toml` are both included (SPA rewrite to `index.html` so every deep
link resolves). Either:

- **Vercel**: `npx vercel` from the project root (or connect the repo in the Vercel dashboard).
- **Netlify**: `npx netlify deploy --build --prod` (or connect the repo; it reads `netlify.toml`).

## Walking the scenario

Start at `/` and follow the taps below — this is the brief's user scenario end to end. Each step
also deep-links directly (see the route table), and screens reached mid-scenario (poll, expenses,
settle up, pay) silently assume Ren has already joined, so a direct link never shows an
inconsistent 5-person trip.

1. **Home** (`/`) — tap the live **Lisbon** card.
2. **Plan** (`/trip/lisbon/plan`) — tap **+** next to the avatars.
3. **Add Ren** (sheet) — **Add guest**. Back on Plan: 5 → 6 avatars, toast "Ren added to Dinner".
4. **Start a poll** on the Dinner card → **New poll** → **Create poll**. A lock-screen push and
   an in-app banner fire (dismiss with Continue / let the banner auto-dismiss).
5. **Live votes** — four votes arrive on a timer (~2–9 s apart), the "Leading" tag moves live.
   **Close poll** ends it early (Nic never votes, matching the brief).
6. Back on **Plan**, the Dinner card becomes **"Taberna da Rua · Won the poll"** with a toast.
   Tap **Log expense**.
7. **Add expense · By item** — €195, Food €150 split 6 ways, Wine €45 with **Nic & Ren excluded**
   (tap an avatar on the Wine item to toggle; the amount/warning row updates live). **Save**.
8. **Expenses** — balance flips to "You're owed €112.50", a NEW row, a toast with **Undo**.
   **See everyone's balance** opens the 8a sheet.
9. **Settle up** — 5 transfers instead of 11. **Remind everyone pending** switches perspective
   to **Nic's view** (a labelled chip) and opens **Pay**.
10. **Pay** — Nic pays Ari €27.50, then Ben €22.50 (the other three transfers settle quietly in
    the background, same as real friends paying in parallel). The last payment fires the
    "Everyone's squared up" push and banner; Expenses and Home both flip to **All settled**.

## Routes

| Route | Screen |
|---|---|
| `/` | 01 Home |
| `/trip/lisbon/plan` | 02 Plan (states: not decided · poll open · winner added) |
| `/trip/lisbon/plan?menu=open` | 02a + menu |
| `/trip/lisbon/add-member` | 03 Add Ren (sheet, over Plan) |
| `/trip/lisbon/polls/new` | 04 New poll |
| `/trip/lisbon/polls/dinner` | 05 Live votes |
| `/trip/lisbon/expenses` | 08 Expenses (states: before dinner · after saving · all settled) |
| `/trip/lisbon/expenses/new` | 07 Add expense (Equally / By item) |
| `/trip/lisbon/balances` | 8a Everyone's balance (sheet, over Expenses) |
| `/trip/lisbon/settle` | 09 Settle up |
| `/trip/lisbon/pay` | 10 Pay (Nic's view) |
| `/trip/lisbon/polls` | Polls tab (supporting) |
| `/trips/new` | New trip (supporting) |

Notifications (04a/04b poll, 10a/10b squared-up) are overlays fired automatically at their
scenario moment, not routes — a lock-screen push first, then an in-app banner (`~4s`,
`aria-live`), both replayable by redoing the triggering action after Restart demo.

## Structure

```
src/
  art/         Illustration.tsx (plan-card SVGs), TripCover.tsx (trip cover SVG)
  components/  Shared UI: TripHeader, TabRow, PlanCard, Avatar(Stack), Button, BottomSheet,
               Toast, PushNotification, InAppBanner, Fab(Menu), ItemCard, BudgetBar, …
  data/        Static mock data (people, trip, plan/poll, expenses, transfers) — the numbers
               from the brief, asserted internally for consistency (see below).
  state/       DemoContext (one reducer), selectors.ts (all derived values — balances, tallies,
               the plan-card button rule, tab dots), types.ts.
  screens/     One file per route.
  styles/      tokens.css (copied from style/tokens.css, extended — see below) + global.css.
```

## Design tokens

`src/styles/tokens.css` starts as a verbatim copy of `style/tokens.css`. A block at the bottom,
marked `EXTENDED — not in STYLE.md`, adds what the style guide didn't cover: cover-collapse
height, scrim/sheet/focus-ring tokens, toast and banner geometry, the *Poll open* / *Won the poll*
badge colors, progress-bar tokens, a warning-state palette (item mismatch in Add expense), and an
illustration palette for the plan-card art (derived from the brand palette, since no image assets
shipped with the brief). All additions are derived from the existing tokens and the two hi-fi
screens in `design/hifi/`, which are the fidelity reference for every screen in the app.

## Known deviations from the source material

- **Imagery**: the trip cover and plan-card illustrations are authored inline SVG in the brand
  palette (no external image assets were provided). The cover SVG reproduces the hi-fi photo's
  composition — Lisbon's skyline and a dome at dusk — rather than being abstract.
- **Icons**: Lucide (`lucide-react`), per STYLE.md's own recommendation between the two choices
  it left open.
- **"Equally" split** (07/S3) is fully interactive but intentionally doesn't feed into the
  scenario's downstream numbers — the brief's balances, settle-up transfers, and trip totals are
  all pinned to the **By item** split with Nic & Ren excluded from wine, which is the scripted
  path. Switching to Equally and saving computes a true equal split instead, so exploring it is
  honest (it doesn't silently keep the canon numbers) but is a deliberate off-script branch.
- A few buttons that aren't part of the brief's scenario (Scan receipt, Fill from receipt, Edit
  budget, Leave trip, Add payment method, Trip recap, profile) are present for layout fidelity but
  show a brief "Not part of this demo" toast instead of doing nothing silently.
