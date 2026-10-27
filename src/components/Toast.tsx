import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useDemo } from "../state/DemoContext";
import styles from "./Toast.module.css";

export function Toast() {
  const { state, dispatch } = useDemo();
  const toast = state.toast;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch({ type: "DISMISS_TOAST" }), 4000);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className={styles.toast}
          role="status"
          aria-live="polite"
          initial={reduceMotion ? { opacity: 0, x: "-50%" } : { opacity: 0, x: "-50%", y: 12 }}
          animate={reduceMotion ? { opacity: 1, x: "-50%" } : { opacity: 1, x: "-50%", y: 0 }}
          exit={reduceMotion ? { opacity: 0, x: "-50%" } : { opacity: 0, x: "-50%", y: 12 }}
          transition={{ type: "spring", bounce: 0, duration: 0.35 }}
        >
          <span className={styles.message}>{toast.message}</span>
          {toast.actionLabel && (
            <button
              type="button"
              className={styles.action}
              onClick={() => {
                toast.onAction?.();
                dispatch({ type: "DISMISS_TOAST" });
              }}
            >
              {toast.actionLabel}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
