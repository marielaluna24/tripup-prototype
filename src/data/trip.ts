import type { PersonId } from "./people";

export const TRIP = {
  id: "lisbon",
  name: "Lisbon",
  dateRange: "Oct 9 – 12",
  startDate: "2026-10-09",
  today: "2026-10-12", // Sunday, day 4 of 4
  budget: 1500,
};

export interface DayInfo {
  date: number;
  weekday: string;
  key: "thu" | "fri" | "sat" | "sun";
  isToday: boolean;
  isPast: boolean;
}

export const TRIP_DAYS: DayInfo[] = [
  { date: 9, weekday: "Thu", key: "thu", isToday: false, isPast: true },
  { date: 10, weekday: "Fri", key: "fri", isToday: false, isPast: true },
  { date: 11, weekday: "Sat", key: "sat", isToday: false, isPast: true },
  { date: 12, weekday: "Today", key: "sun", isToday: true, isPast: false },
];

export const BASE_TRIP_MEMBERS: PersonId[] = ["ari", "ana", "ben", "mia", "nic"];
