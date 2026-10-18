import { Check, Vote } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./InAppBanner.module.css";

export function InAppBanner({
  icon = "check",
  title,
  sub,
  actionLabel,
  onAction,
  onDismiss,
  perspectiveLabel,
}: {
  icon?: "check" | "vote";
  title: string;
  sub?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss: () => void;
  perspectiveLabel?: string;
}) {
  // onDismiss is a fresh closure every render (it comes from an inline
  // handler in OverlayHost), but the 4s auto-dismiss must survive unrelated
  // re-renders elsewhere in the app (e.g. scripted votes landing every ~2s
  // during Live Votes) without restarting its timer each time. A ref keeps
  // the effect itself mount-once while still calling the latest callback.
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;
  useEffect(() => {
    const t = setTimeout(() => onDismissRef.current(), 4000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">
        {icon === "check" ? (
          <Check size={16} color="var(--money-positive)" aria-hidden="true" />
        ) : (
          <Vote size={16} color="var(--color-primary)" aria-hidden="true" />
        )}
      </span>
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        {sub && <div className={styles.sub}>{perspectiveLabel ? `${perspectiveLabel} · ${sub}` : sub}</div>}
      </div>
      {actionLabel && (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
