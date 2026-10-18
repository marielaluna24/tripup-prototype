import { Check } from "lucide-react";
import type { Person } from "../data/people";
import styles from "./Avatar.module.css";

type Size = "sm" | "header" | "picker";

export function Avatar({
  person,
  size = "header",
  bordered,
  borderOn = "dark",
  excluded = false,
  selected = false,
  style,
}: {
  person: Person;
  size?: Size;
  bordered?: boolean;
  borderOn?: "dark" | "light";
  excluded?: boolean;
  selected?: boolean;
  style?: React.CSSProperties;
}) {
  const sizeClass = size === "sm" ? styles["size-sm"] : size === "picker" ? styles["size-picker"] : styles["size-header"];
  const borderClass = bordered ? (borderOn === "light" ? styles.borderedLight : styles.bordered) : "";
  return (
    <div
      className={[styles.avatar, sizeClass, borderClass, excluded ? styles.excluded : ""].join(" ")}
      style={excluded ? style : { background: person.bg, color: person.fg, ...style }}
      aria-hidden="true"
    >
      {person.initials}
      {selected && (
        <span className={styles.checkBadge}>
          <Check size={9} strokeWidth={3} color="#FFFFFF" aria-hidden="true" />
        </span>
      )}
    </div>
  );
}
