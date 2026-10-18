import type { PersonId } from "./people";

export interface Transfer {
  id: string;
  from: PersonId;
  to: PersonId;
  amount: number;
  /** Ren's is already settled before the scenario starts (paid via Apple Pay). */
  initiallyPaid?: boolean;
  method?: string;
}

/**
 * Fixed mock data, not derived by debt-simplification from the balances —
 * greedy simplification of the balances below yields 4 transfers (Nic → Ari
 * €50), not the brief's scripted 5. The brief's "5 transfers instead of 11
 * · €153.75" is the canon story beat, so it's listed literally here. Each
 * person's transfers net to their derived after-dinner balance (asserted in
 * dev — see assertInvariants in state/selectors.ts).
 */
export const TRANSFERS: Transfer[] = [
  { id: "mia-ari", from: "mia", to: "ari", amount: 60.0 },
  { id: "nic-ari", from: "nic", to: "ari", amount: 27.5 },
  { id: "ren-ari", from: "ren", to: "ari", amount: 25.0, initiallyPaid: true, method: "Apple Pay" },
  { id: "nic-ben", from: "nic", to: "ben", amount: 22.5 },
  { id: "ana-ben", from: "ana", to: "ben", amount: 18.75 },
];

export const TRANSFERS_TOTAL = 153.75;
export const TRANSFER_COUNT = TRANSFERS.length;
export const NAIVE_TRANSFER_COUNT = 11;
