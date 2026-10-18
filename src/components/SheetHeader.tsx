import { Link } from "react-router-dom";
import styles from "./SheetHeader.module.css";

export function SheetHeader({
  title,
  cancelTo,
  onCancel,
  cancelLabel = "Cancel",
}: {
  title: string;
  cancelTo?: string;
  onCancel?: () => void;
  cancelLabel?: string;
}) {
  return (
    <div className={`${styles.header} ${styles.wrap}`}>
      {cancelTo ? (
        <Link to={cancelTo} className={styles.cancel}>{cancelLabel}</Link>
      ) : (
        <button type="button" className={styles.cancel} onClick={onCancel}>{cancelLabel}</button>
      )}
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.spacer} aria-hidden="true" />
    </div>
  );
}
