import { useNavigate } from "react-router-dom";
import { PEOPLE, type PersonId } from "../data/people";
import { useDemo } from "../state/DemoContext";
import { Avatar } from "./Avatar";
import { BottomSheet } from "./BottomSheet";
import styles from "./PeopleSheet.module.css";

export function PeopleSheet({ peopleIds, onClose }: { peopleIds: PersonId[]; onClose: () => void }) {
  const navigate = useNavigate();
  const { dispatch } = useDemo();

  return (
    <BottomSheet title="People on this trip" onClose={onClose}>
      <div className={styles.invite}>
        <span className={styles.inviteText}>Friends join from a link, no account needed</span>
        <button
          type="button"
          className={styles.shareBtn}
          onClick={() => dispatch({ type: "SHOW_TOAST", toast: { message: "Invite link copied" } })}
        >
          Share
        </button>
      </div>

      {peopleIds.map((id) => {
        const p = PEOPLE[id];
        const scope = id === "ari" ? "Organizer" : p.isGuest ? `${p.guestScope} · Guest` : "Whole trip";
        return (
          <div className={styles.row} key={id}>
            <Avatar person={p} size="picker" />
            <div className={styles.body}>
              <div className={styles.name}>{p.isYou ? `${p.name} (you)` : p.name}</div>
              <div className={styles.scope}>{scope}</div>
            </div>
          </div>
        );
      })}

      <div className={styles.divider} />

      <button
        type="button"
        className={styles.addBtn}
        onClick={() => {
          onClose();
          navigate("/trip/lisbon/add-member");
        }}
      >
        Add someone
      </button>
      <button
        type="button"
        className={styles.leaveBtn}
        onClick={() => dispatch({ type: "SHOW_TOAST", toast: { message: "Not part of this demo" } })}
      >
        Leave trip
      </button>
    </BottomSheet>
  );
}
