import { ListPlus, Receipt, Vote } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
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
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        className={styles.scrim}
        onClick={onClose}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <div className={styles.menu} role="menu" aria-label="Create">
        {ITEMS.map((item, i) => (
          <motion.div
            className={styles.item}
            key={item.key}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.25,
              // Cascades up from the FAB (closest item first), reversed on the way out.
              delay: (ITEMS.length - 1 - i) * 0.03,
            }}
          >
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
          </motion.div>
        ))}
      </div>
    </>
  );
}
