// Home screen's other trips. Only the Lisbon trip is a modeled, interactive
// route — the others are flat mock cards for "Upcoming" / "Past" (CLAUDE.md
// says Home lists all her trips; the scenario itself is Lisbon only).
export interface OtherTrip {
  id: string;
  name: string;
  destination?: string;
  dateRange: string;
  peopleLabel: string;
  whenLabel: string;
  status: "upcoming" | "past";
  note?: string; // "1 vote waiting", "all settled"
}

export const OTHER_TRIPS: OtherTrip[] = [
  {
    id: "innsbruck",
    name: "Ski weekend",
    destination: "Innsbruck",
    dateRange: "Jan 16 – 18",
    peopleLabel: "5 people",
    whenLabel: "in 3 months",
    status: "upcoming",
  },
  {
    id: "primavera",
    name: "Primavera Sound",
    destination: "Barcelona",
    dateRange: "Jun 3 – 7",
    peopleLabel: "8 people",
    whenLabel: "in 8 months",
    status: "upcoming",
    note: "1 vote waiting",
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    dateRange: "Mar 2026",
    peopleLabel: "",
    whenLabel: "",
    status: "past",
    note: "all settled",
  },
];
