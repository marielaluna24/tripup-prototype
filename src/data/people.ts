// People in the Lisbon trip. Avatar colors from STYLE.md § Avatars.
export type PersonId = "ari" | "ana" | "ben" | "mia" | "nic" | "ren";

export interface Person {
  id: PersonId;
  name: string;
  initials: string;
  isYou?: boolean;
  isGuest?: boolean;
  guestScope?: string; // e.g. "Dinner only"
  bg: string;
  fg: string;
}

export const PEOPLE: Record<PersonId, Person> = {
  ari: { id: "ari", name: "Ari", initials: "AR", isYou: true, bg: "var(--avatar-ari-bg)", fg: "var(--avatar-ari-fg)" },
  ana: { id: "ana", name: "Ana", initials: "AN", bg: "var(--avatar-ana-bg)", fg: "var(--avatar-ana-fg)" },
  ben: { id: "ben", name: "Ben", initials: "BE", bg: "var(--avatar-ben-bg)", fg: "var(--avatar-ben-fg)" },
  mia: { id: "mia", name: "Mia", initials: "MI", bg: "var(--avatar-mia-bg)", fg: "var(--avatar-mia-fg)" },
  nic: { id: "nic", name: "Nic", initials: "NI", bg: "var(--avatar-nic-bg)", fg: "var(--avatar-nic-fg)" },
  ren: {
    id: "ren",
    name: "Ren",
    initials: "RE",
    isGuest: true,
    guestScope: "Dinner only",
    bg: "var(--avatar-ren-bg)",
    fg: "var(--avatar-ren-fg)",
  },
};

export const CORE_ORDER: PersonId[] = ["ari", "ana", "ben", "mia", "nic"];
export const ALL_ORDER: PersonId[] = ["ari", "ana", "ben", "mia", "nic", "ren"];

export function person(id: PersonId): Person {
  return PEOPLE[id];
}
