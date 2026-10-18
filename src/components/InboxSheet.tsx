import { useNavigate } from "react-router-dom";
import { INBOX_ITEMS } from "../data/inbox";
import { BottomSheet } from "./BottomSheet";
import styles from "./InboxSheet.module.css";

export function InboxSheet({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const needsYou = INBOX_ITEMS.filter((i) => i.group === "needs-you");
  const updates = INBOX_ITEMS.filter((i) => i.group === "updates");

  function go(to?: string) {
    onClose();
    if (to) navigate(to);
  }

  return (
    <BottomSheet title="Inbox" onClose={onClose}>
      <div className={styles.groupLabel}>Needs you</div>
      {needsYou.map((item) => (
        <button key={item.id} type="button" className={styles.item} onClick={() => go(item.to)}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.body}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.sub}>{item.sub}</span>
          </span>
        </button>
      ))}
      <div className={styles.groupLabel}>Updates</div>
      {updates.map((item) => (
        <button key={item.id} type="button" className={styles.item} onClick={() => go(item.to)}>
          <span className={styles.dotPlaceholder} aria-hidden="true" />
          <span className={styles.body}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.sub}>{item.sub}</span>
          </span>
        </button>
      ))}
    </BottomSheet>
  );
}
