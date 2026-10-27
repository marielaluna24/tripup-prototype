import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";
import styles from "./BottomSheet.module.css";

const CLOSE_OFFSET = 120; // px dragged down
const CLOSE_VELOCITY = 500; // px/s flicked down

export function BottomSheet({
  title,
  onClose,
  children,
  closeLabel = "Close",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  closeLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    ref.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className={styles.scrim}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
        animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
        transition={reduceMotion ? { duration: 0.2 } : { type: "spring", bounce: 0, duration: 0.4 }}
        drag={reduceMotion ? false : "y"}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.15, bottom: 0.7 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > CLOSE_OFFSET || info.velocity.y > CLOSE_VELOCITY) onClose();
        }}
      >
        <div
          className={styles.handle}
          aria-hidden="true"
          onPointerDown={(e) => dragControls.start(e)}
        />
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label={closeLabel}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </motion.div>
    </motion.div>
  );
}
