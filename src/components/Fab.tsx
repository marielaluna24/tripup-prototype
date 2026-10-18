import { Plus } from "lucide-react";
import styles from "./Fab.module.css";

export function Fab({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`${styles.fab} ${open ? styles.open : ""}`}
      onClick={onClick}
      aria-label={open ? "Close create menu" : "Create: expense, poll or plan item"}
      aria-expanded={open}
    >
      <span className={styles.icon}>
        <Plus size={26} strokeWidth={2.5} aria-hidden="true" />
      </span>
    </button>
  );
}
