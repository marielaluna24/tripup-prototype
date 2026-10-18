import type { PersonId } from "./people";

/**
 * Balances carried into "today" from the trip so far (Thu–Sat, plus Sunday's
 * Tram and Pastéis). Only three of those expenses are itemised below — the
 * rest matches the wireframe, which shows day totals (Sunday €39.60,
 * Saturday €312.40) without itemising every Thursday/Friday purchase either.
 * These numbers are the brief's canon and are asserted against in dev (see
 * assertInvariants in state/selectors.ts): they sum to zero and reproduce
 * "You owe €46.25" for Ari before dinner.
 */
export const OPENING_BALANCES: Record<Exclude<PersonId, "ren">, number> & { ren: number } = {
  ari: -46.25,
  ana: 17.5,
  ben: 77.5,
  mia: -23.75,
  nic: -25.0,
  ren: 0,
};

export interface EarlierExpense {
  id: string;
  title: string;
  dayLabel: string; // "Sunday Oct 12"
  context: string; // "Alfama walk"
  paidBy: PersonId;
  amount: number;
  splitWith: PersonId[];
  yourShare: number; // Ari's share of this expense, for the "you owe" line
}

export const EARLIER_EXPENSES: EarlierExpense[] = [
  {
    id: "tram28",
    title: "Tram 28 tickets",
    dayLabel: "Sunday Oct 12",
    context: "Alfama walk",
    paidBy: "ben",
    amount: 18.0,
    splitWith: ["ari", "ana", "ben", "mia", "nic"],
    yourShare: 3.6,
  },
  {
    id: "pasteis",
    title: "Pastéis de Belém",
    dayLabel: "Sunday Oct 12",
    context: "Belém morning",
    paidBy: "mia",
    amount: 21.6,
    splitWith: ["ari", "ana", "ben", "mia", "nic"],
    yourShare: 4.32,
  },
  {
    id: "sintra",
    title: "Train to Sintra",
    dayLabel: "Saturday Oct 11",
    context: "Sintra day trip",
    paidBy: "ana",
    amount: 48.0,
    splitWith: ["ari", "ana", "ben", "mia", "nic"],
    yourShare: 9.6,
  },
];

export const SATURDAY_ACTIVITY = {
  label: "Nic paid Ana €22.00",
  sub: "via bank transfer",
};

export const DAY_TOTALS_BEFORE = {
  "Sunday Oct 12": 39.6,
  "Saturday Oct 11": 312.4,
};

export const TRIP_TOTAL_BEFORE_DINNER = 1089;

/** The dinner expense Ari logs in the scenario (screen 07). */
export const DINNER_AMOUNT = 195.0;
export const DINNER_PEOPLE: PersonId[] = ["ari", "ana", "ben", "mia", "nic", "ren"];
export const WINE_EXCLUDED: PersonId[] = ["nic", "ren"];

export interface DinnerItem {
  id: string;
  title: string;
  amount: number;
  note?: string;
}

export const DINNER_ITEMS_DEFAULT: DinnerItem[] = [
  { id: "food", title: "Food & mains", amount: 150.0 },
  { id: "wine", title: "Wine · 2 bottles", amount: 45.0 },
];
