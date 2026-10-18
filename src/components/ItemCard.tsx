import { X } from "lucide-react";
import { PEOPLE, type PersonId } from "../data/people";
import { getItemShare } from "../state/selectors";
import type { DinnerItemState } from "../state/types";
import { Avatar } from "./Avatar";
import styles from "./ItemCard.module.css";

export function ItemCard({
  item,
  peopleIds,
  onToggle,
  onAmountChange,
  onRemove,
  mismatched,
}: {
  item: DinnerItemState;
  peopleIds: PersonId[];
  onToggle: (personId: PersonId) => void;
  onAmountChange: (amount: number) => void;
  onRemove?: () => void;
  mismatched?: boolean;
}) {
  const excludedPeople = peopleIds.filter((p) => !item.included.includes(p));
  const each = item.included.length ? getItemShare(item, item.included[0]) : 0;

  const excludedNote =
    excludedPeople.length > 0
      ? `${excludedPeople.map((p) => PEOPLE[p].name).join(" & ")} excluded · tap an avatar to change`
      : item.included.length === peopleIds.length
        ? `Everyone (${peopleIds.length}) · tap an avatar to exclude`
        : null;

  return (
    <div className={`${styles.card} ${mismatched ? styles.focused : ""}`}>
      <div className={styles.topRow}>
        <span className={styles.title}>{item.title}</span>
        <div className={styles.amountWrap}>
          <span aria-hidden="true">€</span>
          <input
            className={`${styles.amount} tnum`}
            type="text"
            inputMode="decimal"
            value={item.amount.toFixed(2)}
            aria-label={`${item.title} amount, euros`}
            onChange={(e) => {
              const n = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
              onAmountChange(Number.isFinite(n) ? n : 0);
            }}
          />
          {onRemove && (
            <button type="button" className={styles.removeBtn} onClick={onRemove} aria-label={`Remove ${item.title}`}>
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <div className={styles.peopleRow}>
        <div className={styles.avatars}>
          {peopleIds.map((p) => {
            const included = item.included.includes(p);
            return (
              <button
                key={p}
                type="button"
                className={styles.avatarBtn}
                onClick={() => onToggle(p)}
                aria-pressed={included}
                aria-label={`${PEOPLE[p].name}${included ? ", included, tap to exclude" : ", excluded, tap to include"}`}
              >
                <Avatar person={PEOPLE[p]} size="sm" excluded={!included} />
              </button>
            );
          })}
        </div>
        <span className={styles.each}>{item.included.length ? `€${each.toFixed(2)} each` : "—"}</span>
      </div>
      {excludedNote && <div className={styles.noteChip}>{excludedNote}</div>}
    </div>
  );
}
