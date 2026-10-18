import { DINNER_AMOUNT, DINNER_ITEMS_DEFAULT, DINNER_PEOPLE, WINE_EXCLUDED } from "../data/expenses";
import { POLL_OPTIONS } from "../data/plan";
import type { DemoState } from "./types";

export function createInitialState(): DemoState {
  return {
    renAdded: false,
    poll: {
      status: "none",
      votes: Object.fromEntries(POLL_OPTIONS.map((o) => [o.id, []])),
      winnerId: null,
      lastVoteLabel: null,
      closedEarly: false,
    },
    dinner: {
      logged: false,
      amount: DINNER_AMOUNT,
      whoWasThere: [...DINNER_PEOPLE],
      items: DINNER_ITEMS_DEFAULT.map((item) => ({
        id: item.id,
        title: item.title,
        amount: item.amount,
        included:
          item.id === "wine"
            ? DINNER_PEOPLE.filter((p) => !WINE_EXCLUDED.includes(p))
            : [...DINNER_PEOPLE],
      })),
      splitMode: "by-item",
    },
    paidTransfers: { "ren-ari": true },
    othersAutoSettled: false,
    perspective: "ari",
    toast: null,
    overlayQueue: [],
    justAddedExpense: false,
    dinnerUndone: false,
  };
}
