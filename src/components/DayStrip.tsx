import type { DayInfo } from "../data/trip";
import styles from "./DayStrip.module.css";

export function DayStrip({
  days,
  selectedKey,
  onSelect,
  disablePast,
}: {
  days: DayInfo[];
  selectedKey: string;
  onSelect?: (key: DayInfo["key"]) => void;
  disablePast?: boolean;
}) {
  return (
    <div className={styles.strip}>
      {days.map((d) => {
        const isSelected = d.key === selectedKey;
        const isDisabled = disablePast && d.isPast;
        return (
          <button
            key={d.key}
            type="button"
            className={`${styles.chip} ${d.isToday && isSelected ? styles.today : ""} ${isDisabled ? styles.disabled : ""}`}
            aria-current={isSelected ? "date" : undefined}
            aria-label={isDisabled ? `${d.weekday} ${d.date}, already past` : undefined}
            disabled={isDisabled}
            onClick={() => onSelect?.(d.key)}
          >
            <span className={styles.num}>{d.date}</span>
            <span className={styles.wk}>{d.isToday ? "Today" : d.weekday}</span>
          </button>
        );
      })}
    </div>
  );
}
