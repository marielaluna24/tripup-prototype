import { AlertTriangle, Check } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./InfoRow.module.css";

export function InfoRow({
  variant = "info",
  text,
  trailing,
  onClick,
  as = "div",
}: {
  variant?: "info" | "warning";
  text: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  as?: "div" | "button";
}) {
  const Comp = as === "button" ? "button" : "div";
  return (
    <Comp
      className={`${styles.row} ${variant === "info" ? styles.info : styles.warning}`}
      onClick={onClick}
      type={as === "button" ? "button" : undefined}
    >
      <span className={styles.iconWrap}>
        {variant === "info" ? (
          <Check size={14} strokeWidth={3} color="var(--success-text)" aria-hidden="true" />
        ) : (
          <AlertTriangle size={14} strokeWidth={2.5} color="var(--warn-icon)" aria-hidden="true" />
        )}
      </span>
      <span className={styles.text}>{text}</span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </Comp>
  );
}
