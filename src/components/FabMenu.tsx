import { ListPlus, Receipt, Vote } from "lucide-react";
import styles from "./FabMenu.module.css";

export interface FabMenuAction {
  key: "add-expense" | "create-poll" | "add-to-plan";
  label: string;
}

const ITEMS: { key: FabMenuAction["key"]; label: string; icon: JSX.Element }[] = [
  { key: "add-to-plan", label: "Add to plan", icon: <ListPlus size={20} aria-hidden="true" /> },
  { key: "create-poll", label: "Create poll", icon: <Vote size={20} aria-hidden="true" /> },
  { key: "add-expense", label: "Add expense", icon: <Receipt size={20} aria-hidden="true" /> },
];

export function FabMenu({
  onSelect,
  onClose,
}: {
  onSelect: (key: FabMenuAction["key"]) => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className={styles.scrim} onClick={onClose} aria-hidden="true" />
      <div className={styles.menu} role="menu" aria-label="Create">
        {ITEMS.map((item) => (
          <div className={styles.item} key={item.key}>
            <span className={styles.label}>{item.label}</span>
            <button
              type="button"
              className={styles.circle}
              role="menuitem"
              onClick={() => onSelect(item.key)}
              aria-label={item.label}
            >
              {item.icon}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
