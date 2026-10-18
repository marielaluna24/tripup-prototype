import type { PersonId } from "../data/people";

export type PollStatus = "none" | "open" | "closed";

export interface PollState {
  status: PollStatus;
  votes: Record<string, PersonId[]>; // optionId -> voters
  winnerId: string | null;
  lastVoteLabel: string | null; // "Ben just voted Taberna da Rua"
  closedEarly: boolean;
}

export interface DinnerItemState {
  id: string;
  title: string;
  amount: number;
  included: PersonId[];
}

export interface DinnerState {
  logged: boolean;
  amount: number;
  whoWasThere: PersonId[];
  items: DinnerItemState[];
  splitMode: "equally" | "by-item";
}

export type Perspective = "ari" | "nic";

export interface ToastState {
  id: number;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export type OverlayKind = "poll-push" | "poll-banner" | "squared-push" | "squared-banner";

export interface OverlayState {
  id: number;
  kind: OverlayKind;
}

export interface DemoState {
  renAdded: boolean;
  poll: PollState;
  dinner: DinnerState;
  paidTransfers: Record<string, boolean>;
  othersAutoSettled: boolean;
  perspective: Perspective;
  toast: ToastState | null;
  overlayQueue: OverlayState[];
  justAddedExpense: boolean;
  dinnerUndone: boolean;
}
