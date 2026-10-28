import { X } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./SheetHeader.module.css";

export function SheetHeader({
  title,
  cancelTo,
  onCancel,
  cancelLabel = "Cancel",
  closeIcon = false,
}: {
  title: string;
  cancelTo?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  /** Show a round X button instead of the "Cancel" text link. */
  closeIcon?: boolean;
}) {
  const btnClass = closeIcon ? styles.closeBtn : styles.cancel;
  const content = closeIcon ? <X size={18} aria-hidden="true" /> : cancelLabel;
  return (
    <div className={`${styles.header} ${styles.wrap}`}>
      {cancelTo ? (
        <Link to={cancelTo} className={btnClass} aria-label={closeIcon ? cancelLabel : undefined}>
          {content}
        </Link>
      ) : (
        <button type="button" className={btnClass} onClick={onCancel} aria-label={closeIcon ? cancelLabel : undefined}>
          {content}
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
      <span className={closeIcon ? styles.spacerIcon : styles.spacer} aria-hidden="true" />
    </div>
  );
}
