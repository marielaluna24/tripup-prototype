import { formatEUR } from "../state/selectors";
import styles from "./BudgetBar.module.css";

export function BudgetBar({ spent, total, left }: { spent: number; total: number; left: number }) {
  const pct = Math.min(100, Math.round((spent / total) * 100));
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>
        Trip total <strong>{formatEUR(spent)}</strong> of {formatEUR(total)} group budget · {formatEUR(left)} left
      </span>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Group budget: ${spent.toFixed(0)} of ${total.toFixed(0)} euros used`}
      >
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
