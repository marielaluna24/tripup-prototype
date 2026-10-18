import { ChevronDown } from "lucide-react";
import type { Person } from "../data/people";
import { Avatar } from "./Avatar";
import styles from "./PillSelect.module.css";

export function PillSelect({ person, label, onClick }: { person: Person; label: string; onClick?: () => void }) {
  return (
    <button type="button" className={styles.pill} onClick={onClick}>
      <Avatar person={person} size="sm" />
      <span className={styles.label}>{label}</span>
      <ChevronDown size={15} color="#1A1A1A" aria-hidden="true" />
    </button>
  );
}
