import type { PersonId } from "../data/people";
import { TRANSFERS } from "../data/transfers";
import { DINNER_ITEMS_DEFAULT, WINE_EXCLUDED } from "../data/expenses";
import { createInitialState } from "./initialState";
import type { DemoState, OverlayKind, ToastState } from "./types";

let idSeq = 1;
const nextId = () => idSeq++;

export type Action =
  | { type: "ADD_REN" }
  | { type: "ENSURE_REN_ADDED" }
  | { type: "CREATE_POLL" }
  | { type: "ENSURE_POLL_OPEN" }
  | { type: "RECEIVE_VOTE"; optionId: string; voter: PersonId; label: string }
  | { type: "CHANGE_VOTE"; optionId: string }
  | { type: "CLOSE_POLL"; winnerId: string }
  | { type: "UNDO_CLOSE_POLL" }
  | { type: "SET_AFTER_DINNER" }
  | { type: "SET_AMOUNT"; amount: number }
  | { type: "SET_SPLIT_MODE"; mode: "equally" | "by-item" }
  | { type: "TOGGLE_WHO_WAS_THERE"; personId: PersonId }
  | { type: "SET_ITEM_AMOUNT"; itemId: string; amount: number }
  | { type: "TOGGLE_ITEM_PERSON"; itemId: string; personId: PersonId }
  | { type: "ADD_DINNER_ITEM" }
  | { type: "REMOVE_DINNER_ITEM"; itemId: string }
  | { type: "LOG_DINNER_EXPENSE" }
  | { type: "UNDO_DINNER_EXPENSE" }
  | { type: "PAY_TRANSFER"; id: string }
  | { type: "AUTO_SETTLE_OTHERS" }
  | { type: "SET_PERSPECTIVE"; perspective: "ari" | "nic" }
  | { type: "SHOW_TOAST"; toast: Omit<ToastState, "id"> }
  | { type: "DISMISS_TOAST" }
  | { type: "ENQUEUE_OVERLAY"; kind: OverlayKind }
  | { type: "DEQUEUE_OVERLAY" }
  | { type: "RESTART" };

function withSquaredOverlayIfComplete(state: DemoState): DemoState {
  const allPaid = TRANSFERS.every((t) => state.paidTransfers[t.id]);
  const alreadyQueued = state.overlayQueue.some(
    (o) => o.kind === "squared-push" || o.kind === "squared-banner"
  );
  if (allPaid && !alreadyQueued) {
    return {
      ...state,
      overlayQueue: [
        ...state.overlayQueue,
        { id: nextId(), kind: "squared-push" },
        { id: nextId(), kind: "squared-banner" },
      ],
    };
  }
  return state;
}

export function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case "ADD_REN":
      return {
        ...state,
        renAdded: true,
        toast: { id: nextId(), message: "Ren added to Dinner" },
      };

    case "ENSURE_REN_ADDED":
      return state.renAdded ? state : { ...state, renAdded: true };

    case "CREATE_POLL":
      return {
        ...state,
        poll: {
          ...state.poll,
          status: "open",
          votes: { ...state.poll.votes, taberna: ["ari"] },
          lastVoteLabel: null,
        },
        overlayQueue: [
          ...state.overlayQueue,
          { id: nextId(), kind: "poll-push" },
          { id: nextId(), kind: "poll-banner" },
        ],
      };

    case "ENSURE_POLL_OPEN":
      if (state.poll.status !== "none") return state;
      return {
        ...state,
        poll: { ...state.poll, status: "open", votes: { ...state.poll.votes, taberna: ["ari"] } },
      };

    case "RECEIVE_VOTE": {
      if (state.poll.status !== "open") return state;
      const votes = { ...state.poll.votes };
      for (const key of Object.keys(votes)) {
        votes[key] = votes[key].filter((v) => v !== action.voter);
      }
      votes[action.optionId] = [...votes[action.optionId], action.voter];
      return {
        ...state,
        poll: { ...state.poll, votes, lastVoteLabel: action.label },
      };
    }

    case "CHANGE_VOTE": {
      const votes = { ...state.poll.votes };
      for (const key of Object.keys(votes)) {
        votes[key] = votes[key].filter((v) => v !== "ari");
      }
      votes[action.optionId] = [...votes[action.optionId], "ari"];
      return { ...state, poll: { ...state.poll, votes } };
    }

    case "CLOSE_POLL":
      // Toast (with Undo) is dispatched separately by the caller, same as
      // LOG_DINNER_EXPENSE/UNDO_DINNER_EXPENSE — its onAction needs to close
      // over dispatch, which a reducer case can't do.
      return {
        ...state,
        poll: { ...state.poll, status: "closed", winnerId: action.winnerId, closedEarly: true },
      };

    case "UNDO_CLOSE_POLL":
      return {
        ...state,
        poll: { ...state.poll, status: "open", winnerId: null, closedEarly: false },
        toast: null,
        afterDinner: false,
      };

    case "SET_AFTER_DINNER":
      return { ...state, afterDinner: true };

    case "SET_AMOUNT":
      return { ...state, dinner: { ...state.dinner, amount: action.amount } };

    case "SET_SPLIT_MODE": {
      if (action.mode === state.dinner.splitMode) return state;
      const items =
        action.mode === "equally"
          ? [{ id: "equal", title: "Split equally", amount: state.dinner.amount, included: [...state.dinner.whoWasThere] }]
          : DINNER_ITEMS_DEFAULT.map((item) => ({
              id: item.id,
              title: item.title,
              amount: item.amount,
              included: state.dinner.whoWasThere.filter((p) => item.id !== "wine" || !WINE_EXCLUDED.includes(p)),
            }));
      return { ...state, dinner: { ...state.dinner, splitMode: action.mode, items } };
    }

    case "TOGGLE_WHO_WAS_THERE": {
      const inList = state.dinner.whoWasThere.includes(action.personId);
      const whoWasThere = inList
        ? state.dinner.whoWasThere.filter((p) => p !== action.personId)
        : [...state.dinner.whoWasThere, action.personId];
      const items = state.dinner.items.map((it) => ({
        ...it,
        included: inList ? it.included.filter((p) => p !== action.personId) : it.included,
      }));
      return { ...state, dinner: { ...state.dinner, whoWasThere, items } };
    }

    case "SET_ITEM_AMOUNT":
      return {
        ...state,
        dinner: {
          ...state.dinner,
          items: state.dinner.items.map((it) =>
            it.id === action.itemId ? { ...it, amount: action.amount } : it
          ),
        },
      };

    case "TOGGLE_ITEM_PERSON":
      return {
        ...state,
        dinner: {
          ...state.dinner,
          items: state.dinner.items.map((it) => {
            if (it.id !== action.itemId) return it;
            const included = it.included.includes(action.personId)
              ? it.included.filter((p) => p !== action.personId)
              : [...it.included, action.personId];
            return { ...it, included };
          }),
        },
      };

    case "ADD_DINNER_ITEM": {
      const n = state.dinner.items.length + 1;
      return {
        ...state,
        dinner: {
          ...state.dinner,
          items: [
            ...state.dinner.items,
            { id: `item-${nextId()}`, title: `New item ${n}`, amount: 0, included: [...state.dinner.whoWasThere] },
          ],
        },
      };
    }

    case "REMOVE_DINNER_ITEM":
      return {
        ...state,
        dinner: { ...state.dinner, items: state.dinner.items.filter((it) => it.id !== action.itemId) },
      };

    case "LOG_DINNER_EXPENSE":
      return {
        ...state,
        dinner: { ...state.dinner, logged: true },
        justAddedExpense: true,
        dinnerUndone: false,
      };

    case "UNDO_DINNER_EXPENSE":
      return {
        ...state,
        dinner: { ...state.dinner, logged: false },
        justAddedExpense: false,
        dinnerUndone: true,
        toast: null,
      };

    case "PAY_TRANSFER": {
      const paidTransfers = { ...state.paidTransfers, [action.id]: true };
      return withSquaredOverlayIfComplete({ ...state, paidTransfers });
    }

    case "AUTO_SETTLE_OTHERS":
      return withSquaredOverlayIfComplete({
        ...state,
        paidTransfers: { ...state.paidTransfers, "mia-ari": true, "ana-ben": true },
        othersAutoSettled: true,
      });

    case "SET_PERSPECTIVE":
      return { ...state, perspective: action.perspective };

    case "SHOW_TOAST":
      return { ...state, toast: { id: nextId(), ...action.toast } };

    case "DISMISS_TOAST":
      return { ...state, toast: null };

    case "ENQUEUE_OVERLAY":
      return { ...state, overlayQueue: [...state.overlayQueue, { id: nextId(), kind: action.kind }] };

    case "DEQUEUE_OVERLAY":
      return { ...state, overlayQueue: state.overlayQueue.slice(1) };

    case "RESTART":
      return createInitialState();

    default:
      return state;
  }
}
