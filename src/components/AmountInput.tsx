import { ChevronDown } from "lucide-react";
import styles from "./AmountInput.module.css";

export function AmountInput({
  value,
  onChange,
  helper,
  readOnly,
}: {
  value: number;
  onChange?: (n: number) => void;
  helper?: string;
  readOnly?: boolean;
}) {
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Amount</span>
      <div className={styles.row}>
        <span className={styles.chip}>
          EUR <ChevronDown size={13} aria-hidden="true" />
        </span>
        <div className={styles.inputWrap}>
          <input
            className={`${styles.input} tnum`}
            type="text"
            inputMode="decimal"
            value={value.toFixed(2)}
            readOnly={readOnly}
            aria-label="Amount, euros"
            onChange={(e) => {
              const n = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
              onChange?.(Number.isFinite(n) ? n : 0);
            }}
          />
        </div>
      </div>
      {helper && <span className={styles.helper}>{helper}</span>}
    </div>
  );
}
