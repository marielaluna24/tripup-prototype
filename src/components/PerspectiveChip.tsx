import styles from "./PerspectiveChip.module.css";

/** Labels perspective switches so a PM isn't confused — CLAUDE.md. */
export function PerspectiveChip({ label }: { label: string }) {
  return (
    <span className={styles.chip}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}
