// Bell inbox (01 Home). Badge counts only "needs you" items — CLAUDE.md.
export interface InboxItem {
  id: string;
  group: "needs-you" | "updates";
  title: string;
  sub: string;
  tripName: string;
  /** In-app route to deep-link to; omitted for trips outside this demo. */
  to?: string;
}

export const INBOX_ITEMS: InboxItem[] = [
  {
    id: "tram-owed",
    group: "needs-you",
    title: "Pay Ben for Tram 28 tickets",
    sub: "Lisbon · you owe €3.60",
    tripName: "Lisbon",
    to: "/trip/lisbon/expenses",
  },
  {
    id: "pasteis-owed",
    group: "needs-you",
    title: "Pay Mia for Pastéis de Belém",
    sub: "Lisbon · you owe €4.32",
    tripName: "Lisbon",
    to: "/trip/lisbon/expenses",
  },
  {
    id: "primavera-vote",
    group: "needs-you",
    title: "Vote: Primavera Sound dates",
    sub: "Primavera Sound · poll closes soon",
    tripName: "Primavera Sound",
  },
  {
    id: "sintra-update",
    group: "updates",
    title: "Ana added Train to Sintra · €48.00",
    sub: "Lisbon · Saturday",
    tripName: "Lisbon",
    to: "/trip/lisbon/expenses",
  },
];

export const NEEDS_YOU_COUNT = INBOX_ITEMS.filter((i) => i.group === "needs-you").length;
