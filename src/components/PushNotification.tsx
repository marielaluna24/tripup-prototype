import type { ReactNode } from "react";
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
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={`Lock screen · ${perspectiveLabel}`}>
      <span className={styles.perspective}>{perspectiveLabel}</span>
      <div className={styles.clock}>
        <div className={styles.time}>{time}</div>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.notifications}>
        <div className={styles.card} aria-live="assertive">
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
        </div>
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
    </div>
  );
}
