import type { PersonId } from "./people";

export interface PlanItem {
  id: string;
  dayKey: "thu" | "fri" | "sat" | "sun";
  title: string;
  timeLabel: string; // "until 20:00", "20:30"
  art: "house" | "restaurant" | "belem" | "alfama";
  earlierToday?: boolean; // grouped under the "Earlier today" info row
  done?: boolean;
}

// Earlier today (Sunday), already done — collapsed under the info row.
export const EARLIER_TODAY: PlanItem[] = [
  { id: "belem", dayKey: "sun", title: "Pastéis de Belém", timeLabel: "09:30", art: "belem", earlierToday: true, done: true },
  { id: "alfama-walk", dayKey: "sun", title: "Alfama walk", timeLabel: "11:00", art: "alfama", earlierToday: true, done: true },
];

export const FREE_TIME: PlanItem = {
  id: "free-time",
  dayKey: "sun",
  title: "Free time at the house",
  timeLabel: "until 20:00",
  art: "house",
};

export const DINNER_PLACE = {
  name: "Taberna da Rua",
  tagline: "Cozy local tasca · €€ · 8 min",
};

export interface RestaurantOption {
  id: string;
  name: string;
  tagline: string;
  price: "€€" | "€€€";
  walk: string;
  hours: string;
  votes: PersonId[];
}

export const POLL_OPTIONS: RestaurantOption[] = [
  {
    id: "taberna",
    name: "Taberna da Rua",
    tagline: "Portuguese tasca",
    price: "€€",
    walk: "8 min walk",
    hours: "Open till 23:00",
    votes: ["ari", "ben", "ren"],
  },
  {
    id: "rooftop",
    name: "Park Rooftop",
    tagline: "Rooftop bar · sunset",
    price: "€€€",
    walk: "15 min walk",
    hours: "Open till 00:00",
    votes: ["ana", "mia"],
  },
  {
    id: "ramiro",
    name: "Cervejaria Ramiro",
    tagline: "Seafood classic",
    price: "€€",
    walk: "12 min walk",
    hours: "Open till 00:00",
    votes: [],
  },
];

export const POLL_QUESTION = "Where should we eat tonight?";
export const POLL_CLOSES_LABEL = "19:30";
