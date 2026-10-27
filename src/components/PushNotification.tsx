import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./PushNotification.module.css";

export function PushNotification({
  perspectiveLabel,
  time,
  date,
  appName = "TripUp · Lisbon",
  title,
  body,
  secondaryLine,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  onContinue,
}: {
  perspectiveLabel: string;
  time: string;
  date: string;
  appName?: string;
  title: string;
  body: ReactNode;
  secondaryLine?: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  onContinue: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Lock screen · ${perspectiveLabel}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <span className={styles.perspective}>{perspectiveLabel}</span>
      <div className={styles.clock}>
        <div className={styles.time}>{time}</div>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.notifications}>
        <motion.div
          className={styles.card}
          aria-live="assertive"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.35, delay: 0.1 }}
        >
          <div className={styles.cardTop}>
            <span className={styles.appIcon} aria-hidden="true">T</span>
            <span className={styles.appName}>{appName}</span>
            <span className={styles.when}>now</span>
          </div>
          <div className={styles.notifTitle}>{title}</div>
          <div className={styles.notifBody}>{body}</div>
          {(primaryActionLabel || secondaryActionLabel) && (
            <div className={styles.actions}>
              {primaryActionLabel && (
                <button type="button" className={styles.primaryAction} onClick={onPrimaryAction}>
                  {primaryActionLabel}
                </button>
              )}
              {secondaryActionLabel && (
                <button type="button" className={styles.secondaryAction} onClick={onSecondaryAction}>
                  {secondaryActionLabel}
                </button>
              )}
            </div>
          )}
        </motion.div>
        {secondaryLine && (
          <div className={styles.secondary}>
            <span>{secondaryLine}</span>
          </div>
        )}
      </div>
      <div className={styles.bottomBar}>
        <button type="button" className={styles.continue} onClick={onContinue}>
          Continue
        </button>
      </div>
    </motion.div>
  );
}
