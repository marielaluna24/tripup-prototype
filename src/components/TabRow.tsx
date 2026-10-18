import { Link } from "react-router-dom";
import styles from "./TabRow.module.css";

export type TabKey = "plan" | "polls" | "expenses";

export function TabRow({
  active,
  tripId,
  pollsDot,
  expensesDot,
}: {
  active: TabKey;
  tripId: string;
  pollsDot?: boolean;
  expensesDot?: boolean;
}) {
  const tabs: { key: TabKey; label: string; to: string; dot?: boolean; dotLabel?: string }[] = [
    { key: "plan", label: "Plan", to: `/trip/${tripId}/plan` },
    { key: "polls", label: "Polls", to: `/trip/${tripId}/polls`, dot: pollsDot, dotLabel: "a poll waits for your vote" },
    { key: "expenses", label: "Expenses", to: `/trip/${tripId}/expenses`, dot: expensesDot, dotLabel: "you owe money" },
  ];

  return (
    <nav className={styles.track} aria-label="Trip sections">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          to={tab.to}
          className={`${styles.tab} ${active === tab.key ? styles.tabActive : ""}`}
          aria-current={active === tab.key ? "page" : undefined}
        >
          {tab.label}
          {tab.dot && <span className={styles.dot} aria-label={tab.dotLabel} />}
        </Link>
      ))}
    </nav>
  );
}
