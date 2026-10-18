import { ALL_ORDER, CORE_ORDER, type PersonId } from "../data/people";
import { OPENING_BALANCES, TRIP_TOTAL_BEFORE_DINNER } from "../data/expenses";
import { POLL_OPTIONS } from "../data/plan";
import { TRANSFERS } from "../data/transfers";
import { TRIP } from "../data/trip";
import type { DemoState, DinnerItemState } from "./types";

export function getPeopleIds(state: DemoState): PersonId[] {
  return state.renAdded ? ALL_ORDER : CORE_ORDER;
}

export function getPeopleCount(state: DemoState): number {
  return getPeopleIds(state).length;
}

/** Per-person share for one dinner item, given who is included in it. */
export function getItemShare(item: DinnerItemState, p: PersonId): number {
  if (!item.included.includes(p)) return 0;
  if (item.included.length === 0) return 0;
  return item.amount / item.included.length;
}

/** Live per-person dinner share across all items (recalculates as items/inclusion change). */
export function getDinnerShares(state: DemoState): Record<PersonId, number> {
  const shares: Partial<Record<PersonId, number>> = {};
  for (const p of state.dinner.whoWasThere) {
    shares[p] = state.dinner.items.reduce((sum, it) => sum + getItemShare(it, p), 0);
  }
  return shares as Record<PersonId, number>;
}

export function getItemsTotal(state: DemoState): number {
  return round2(state.dinner.items.reduce((s, it) => s + it.amount, 0));
}

export function getItemsMismatch(state: DemoState): { mismatched: boolean; diff: number } {
  const diff = round2(state.dinner.amount - getItemsTotal(state));
  return { mismatched: Math.abs(diff) > 0.005, diff };
}

/**
 * Trip balance per person: opening balance plus tonight's dinner swing, once
 * logged. Positive = you're owed; negative = you owe. Ari paid, so her swing
 * is +amount minus her own share; everyone else's swing is just −share.
 */
export function getBalances(state: DemoState): Record<PersonId, number> {
  const shares = getDinnerShares(state);
  const balances: Partial<Record<PersonId, number>> = {};
  for (const p of ALL_ORDER) {
    const opening = OPENING_BALANCES[p] ?? 0;
    if (!state.dinner.logged) {
      balances[p] = round2(opening);
      continue;
    }
    const share = shares[p] ?? 0;
    const paidByThem = p === "ari" ? state.dinner.amount : 0;
    balances[p] = round2(opening + paidByThem - share);
  }
  return balances as Record<PersonId, number>;
}

/** "Tonight" delta shown on 08a — 0 before the dinner expense is saved. */
export function getTonightDelta(state: DemoState): Record<PersonId, number> {
  const shares = getDinnerShares(state);
  const delta: Partial<Record<PersonId, number>> = {};
  for (const p of ALL_ORDER) {
    if (!state.dinner.logged) {
      delta[p] = 0;
      continue;
    }
    const share = shares[p] ?? 0;
    const paidByThem = p === "ari" ? state.dinner.amount : 0;
    delta[p] = round2(paidByThem - share);
  }
  return delta as Record<PersonId, number>;
}

export function getYourBalance(state: DemoState): number {
  return getBalances(state).ari;
}

export function getTripTotal(state: DemoState): number {
  return round2(TRIP_TOTAL_BEFORE_DINNER + (state.dinner.logged ? state.dinner.amount : 0));
}

export function getBudget(state: DemoState) {
  const spent = getTripTotal(state);
  const total = TRIP.budget;
  const left = round2(total - spent);
  const pct = Math.min(100, Math.round((spent / total) * 100));
  return { spent, total, left, pct };
}

/** CLAUDE.md: Ari's trip share = €241 (opening share €46 + tonight's €36.25 + rest). Fixed canon. */
export const YOUR_TRIP_SHARE = 241;

export interface PollTally {
  optionId: string;
  count: number;
  leading: boolean;
}

export function getPollTallies(state: DemoState): PollTally[] {
  const counts = POLL_OPTIONS.map((o) => ({
    optionId: o.id,
    count: state.poll.votes[o.id]?.length ?? 0,
  }));
  const max = Math.max(0, ...counts.map((c) => c.count));
  return counts.map((c) => ({ ...c, leading: c.count > 0 && c.count === max }));
}

export function getVotedCount(state: DemoState): number {
  return Object.values(state.poll.votes).reduce((s, v) => s + v.length, 0);
}

export function getWaitingOn(state: DemoState): PersonId[] {
  const voted = new Set(Object.values(state.poll.votes).flat());
  return getPeopleIds(state).filter((p) => !voted.has(p));
}

export function getYourVoteOptionId(state: DemoState): string | null {
  for (const [optionId, voters] of Object.entries(state.poll.votes)) {
    if (voters.includes("ari")) return optionId;
  }
  return null;
}

export type DinnerCardStatus = "not-decided" | "poll-open" | "won";

export function getDinnerCardStatus(state: DemoState): DinnerCardStatus {
  if (state.poll.status === "closed") return "won";
  if (state.poll.status === "open") return "poll-open";
  return "not-decided";
}

export interface CardAction {
  label: string;
  variant: "primary" | "secondary";
  kind: "start-poll" | "add-place" | "directions" | "log-expense" | "view-poll" | "vote";
}

/** The plan card button rule from CLAUDE.md — a rule, not AI. */
export function getDinnerCardActions(state: DemoState): CardAction[] {
  const status = getDinnerCardStatus(state);
  if (status === "not-decided") {
    return [
      { label: "Start a poll", variant: "primary", kind: "start-poll" },
      { label: "Add a place", variant: "secondary", kind: "add-place" },
    ];
  }
  if (status === "poll-open") {
    const youVoted = getYourVoteOptionId(state) !== null;
    return youVoted
      ? [{ label: "View results", variant: "secondary", kind: "view-poll" }]
      : [{ label: "Vote", variant: "primary", kind: "vote" }];
  }
  // won
  if (state.dinner.logged) {
    return [{ label: "Directions", variant: "secondary", kind: "directions" }];
  }
  return [
    { label: "Log expense", variant: "primary", kind: "log-expense" },
    { label: "Directions", variant: "secondary", kind: "directions" },
  ];
}

export function getPollsTabDot(state: DemoState): boolean {
  // A poll waits for YOUR vote. Ari auto-votes on creation, so this is for completeness.
  return state.poll.status === "open" && getYourVoteOptionId(state) === null;
}

export function getExpensesTabDot(state: DemoState): boolean {
  return getYourBalance(state) < 0; // you owe money
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function formatEUR(n: number): string {
  const abs = Math.abs(round2(n));
  return `€${abs.toFixed(2)}`;
}

export function formatSignedEUR(n: number): string {
  const r = round2(n);
  const sign = r > 0 ? "+" : r < 0 ? "−" : "";
  return `${sign}€${Math.abs(r).toFixed(2)}`;
}

export function getPendingTransferTotal(state: DemoState): number {
  return round2(
    TRANSFERS.filter((t) => !state.paidTransfers[t.id]).reduce((s, t) => s + t.amount, 0)
  );
}

export function getPaidTransferCount(state: DemoState): number {
  return TRANSFERS.filter((t) => state.paidTransfers[t.id]).length;
}

export function getAllSquaredUp(state: DemoState): boolean {
  return TRANSFERS.every((t) => state.paidTransfers[t.id]);
}

/**
 * Dev-only sanity check: opening balances sum to zero, and the fixed
 * transfer list nets to each person's after-dinner balance exactly. Run once
 * at module load in development; throws loudly if the mock data ever drifts.
 */
export function assertInvariants() {
  const openingSum = Object.values(OPENING_BALANCES).reduce((s, v) => s + v, 0);
  if (Math.abs(openingSum) > 0.01) {
    throw new Error(`OPENING_BALANCES must sum to 0, got ${openingSum}`);
  }
  const net: Partial<Record<PersonId, number>> = {};
  for (const p of ALL_ORDER) net[p] = 0;
  for (const t of TRANSFERS) {
    net[t.from] = round2((net[t.from] ?? 0) - t.amount);
    net[t.to] = round2((net[t.to] ?? 0) + t.amount);
  }
  // After-dinner balances with the canon dinner split applied.
  const dinnerShare: Record<PersonId, number> = {
    ari: 36.25,
    ana: 36.25,
    ben: 36.25,
    mia: 36.25,
    nic: 25.0,
    ren: 25.0,
  };
  for (const p of ALL_ORDER) {
    const paid = p === "ari" ? 195 : 0;
    const after = round2((OPENING_BALANCES[p] ?? 0) + paid - dinnerShare[p]);
    if (Math.abs((net[p] ?? 0) - after) > 0.01) {
      throw new Error(
        `Transfers for ${p} net to ${net[p]}, expected to match balance ${after}`
      );
    }
  }
}

if (import.meta.env.DEV) {
  assertInvariants();
}
