import { Plus } from "lucide-react";
import { PEOPLE, type PersonId } from "../data/people";
import { Avatar } from "./Avatar";
import styles from "./AvatarStack.module.css";

export function AvatarStack({
  ids,
  max = 3,
  onOpenPeople,
  onAdd,
  borderOn = "dark",
}: {
  ids: PersonId[];
  max?: number;
  onOpenPeople?: () => void;
  onAdd?: () => void;
  borderOn?: "dark" | "light";
}) {
  const shown = ids.slice(0, max);
  const overflow = ids.length - shown.length;

  return (
    <div className={styles.stack}>
      <button
        type="button"
        className={styles.button}
        onClick={onOpenPeople}
        aria-label={`People on this trip, ${ids.length} total. Open people list.`}
      >
        {shown.map((id) => (
          <Avatar key={id} person={PEOPLE[id]} bordered borderOn={borderOn} />
        ))}
        {overflow > 0 && (
          <Avatar
            person={{ ...PEOPLE.ari, initials: `+${overflow}`, bg: "var(--avatar-more-bg)", fg: "var(--avatar-more-fg)" }}
            bordered
            borderOn={borderOn}
          />
        )}
      </button>
      {onAdd && (
        <button type="button" className={styles.addButton} onClick={onAdd} aria-label="Add member">
          <Plus size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
