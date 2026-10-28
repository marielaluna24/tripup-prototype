import { Check } from "lucide-react";
import { useState } from "react";
import { DayStrip } from "./DayStrip";
import { TRIP_DAYS } from "../data/trip";
import { BottomSheet } from "./BottomSheet";
import styles from "./AddMemberSheet.module.css";

export function AddMemberSheet({ onClose, onAdded }: { onClose: () => void; onAdded: () => void }) {
  const [mode, setMode] = useState<"whole" | "specific">("specific");
  const [dinnerChecked, setDinnerChecked] = useState(true);
  const [freeTimeChecked, setFreeTimeChecked] = useState(false);

  return (
    <BottomSheet title="Add to Lisbon" onClose={onClose} dismissible={false}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="member-name">Name, phone or email</label>
        <input id="member-name" className={styles.input} defaultValue="Ren" />
        <div className={styles.suggestion}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--avatar-ren-bg)",
              color: "var(--avatar-ren-fg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 13,
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            RE
          </div>
          <div className={styles.suggestionBody}>
            <div className={styles.suggestionName}>Ren Takahashi</div>
            <div className={styles.suggestionSub}>From contacts · not on TripUp yet</div>
          </div>
        </div>
      </div>

      <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
        <legend className={styles.legend}>Joining for</legend>
        <div className={styles.radioRow} role="radiogroup">
          <button
            type="button"
            className={`${styles.radioOption} ${mode === "whole" ? styles.active : ""}`}
            aria-pressed={mode === "whole"}
            onClick={() => setMode("whole")}
          >
            Whole trip
          </button>
          <button
            type="button"
            className={`${styles.radioOption} ${mode === "specific" ? styles.active : ""}`}
            aria-pressed={mode === "specific"}
            onClick={() => setMode("specific")}
          >
            Specific days
          </button>
        </div>
      </fieldset>

      {mode === "specific" && (
        <>
          <DayStrip days={TRIP_DAYS} selectedKey="sun" disablePast />
          <div className={styles.plansLabel}>Plans on Sunday</div>
          <button
            type="button"
            className={styles.checkRow}
            onClick={() => setDinnerChecked((v) => !v)}
            aria-pressed={dinnerChecked}
          >
            <span className={`${styles.checkbox} ${dinnerChecked ? styles.checked : ""}`}>
              {dinnerChecked && <Check size={13} strokeWidth={3} color="#FFFFFF" aria-hidden="true" />}
            </span>
            <span className={styles.checkBody}>
              <span className={styles.checkTitle}>Dinner · 20:30</span>
              <span className={styles.checkSub}>Not decided yet · Ren can vote</span>
            </span>
          </button>
          <button
            type="button"
            className={styles.checkRow}
            onClick={() => setFreeTimeChecked((v) => !v)}
            aria-pressed={freeTimeChecked}
          >
            <span className={`${styles.checkbox} ${freeTimeChecked ? styles.checked : ""}`}>
              {freeTimeChecked && <Check size={13} strokeWidth={3} color="#FFFFFF" aria-hidden="true" />}
            </span>
            <span className={styles.checkBody}>
              <span className={styles.checkTitle}>Free time at the house</span>
            </span>
          </button>
        </>
      )}

      <div className={styles.helper}>Ren joins from a link as a guest, no account needed</div>

      <button type="button" className={styles.submit} onClick={onAdded}>
        Add guest
      </button>
    </BottomSheet>
  );
}
