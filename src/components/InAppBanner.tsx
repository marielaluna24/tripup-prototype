import { Check, Vote } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./InAppBanner.module.css";

const DISMISS_OFFSET = -60; // px swiped up
const DISMISS_VELOCITY = -500; // px/s flicked up

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
  const reduceMotion = useReducedMotion();

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
    <motion.div
      className={styles.banner}
      role="status"
      aria-live="polite"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      drag={reduceMotion ? false : "y"}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.6, bottom: 0.2 }}
      onDragEnd={(_, info) => {
        if (info.offset.y < DISMISS_OFFSET || info.velocity.y < DISMISS_VELOCITY) onDismiss();
      }}
    >
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
    </motion.div>
  );
}
