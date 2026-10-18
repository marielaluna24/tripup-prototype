import { useEffect } from "react";
import { useDemo } from "../state/DemoContext";
import styles from "./Toast.module.css";

export function Toast() {
  const { state, dispatch } = useDemo();
  const toast = state.toast;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch({ type: "DISMISS_TOAST" }), 4000);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
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
    </div>
  );
}
