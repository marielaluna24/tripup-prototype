import { Clock } from "lucide-react";
import type { ReactNode } from "react";
import { Illustration, type IllustrationKind } from "../art/Illustration";
import type { BadgeKind } from "./StatusBadge";
import { StatusBadge } from "./StatusBadge";
import styles from "./PlanCard.module.css";

export function PlanCard({
  badge,
  badgeLabel,
  title,
  timeLabel,
  art,
  actions,
  isNew,
}: {
  badge: BadgeKind;
  badgeLabel?: string;
  title: string;
  timeLabel: string;
  art: IllustrationKind;
  actions?: ReactNode;
  isNew?: boolean;
}) {
  return (
    <div className={styles.card}>
      {isNew && <span className={styles.newTag}>NEW</span>}
      <div className={styles.body}>
        <StatusBadge kind={badge} label={badgeLabel} />
        <div className={styles.title}>{title}</div>
        <div className={styles.meta}>
          <Clock size={15} aria-hidden="true" />
          <span>{timeLabel}</span>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <div className={styles.art}>
        <Illustration kind={art} />
      </div>
    </div>
  );
}
