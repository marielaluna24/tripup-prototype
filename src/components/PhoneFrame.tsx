import { RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { useDemo } from "../state/DemoContext";
import { useNavigate } from "react-router-dom";
import styles from "./PhoneFrame.module.css";

export function PhoneFrame({ children }: { children: ReactNode }) {
  const { dispatch } = useDemo();
  const navigate = useNavigate();

  function handleRestart() {
    dispatch({ type: "RESTART" });
    navigate("/");
  }

  return (
    <div className={styles.stage}>
      <div className={styles.device}>
        <button
          type="button"
          className={styles.restart}
          onClick={handleRestart}
          aria-label="Restart demo"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Restart demo
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
