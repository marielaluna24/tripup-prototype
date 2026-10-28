import { Check } from "lucide-react";
import styles from "./StatusBadge.module.css";

export type BadgeKind = "ongoing" | "not-decided" | "poll-open" | "won";

const LABELS: Record<BadgeKind, string> = {
  ongoing: "Ongoing",
  "not-decided": "Not decided yet",
  "poll-open": "Poll open",
  won: "Won the poll",
};

const CLASS: Record<BadgeKind, string> = {
  ongoing: styles.ongoing,
  "not-decided": styles.notDecided,
  "poll-open": styles.pollOpen,
  won: styles.won,
};

export function StatusBadge({ kind, label }: { kind: BadgeKind; label?: string }) {
  return (
    <span className={`${styles.badge} ${CLASS[kind]}`}>
      {kind === "won" && <Check size={12} strokeWidth={3} color="var(--badge-won-icon)" aria-hidden="true" />}
      {/* Per CLAUDE.md: Ongoing/Poll open are outline + dot, Not decided
          yet is dashed only — no dot (it previously rendered an invisible
          one here, leaving a gap before the text). */}
      {(kind === "ongoing" || kind === "poll-open") && <span className={styles.dot} aria-hidden="true" />}
      {label ?? LABELS[kind]}
    </span>
  );
}
