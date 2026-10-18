import { Image as ImageIcon, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { SheetHeader } from "../components/SheetHeader";
import { PEOPLE } from "../data/people";
import { useDemo } from "../state/DemoContext";
import styles from "./NewTripScreen.module.css";

export function NewTripScreen() {
  const navigate = useNavigate();
  const { dispatch } = useDemo();

  function notAvailable() {
    dispatch({ type: "SHOW_TOAST", toast: { message: "Not part of this demo" } });
  }

  return (
    <div className={styles.screen}>
      <SheetHeader title="New trip" cancelTo="/" cancelLabel="Close" />
      <div className={`${styles.scroll} scroll-area`}>
        <button type="button" className={styles.coverBtn} onClick={notAvailable}>
          <ImageIcon size={22} aria-hidden="true" />
          <b>Add cover photo · optional</b>
          <span>We'll pick one from the destination if you skip</span>
        </button>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="trip-name">Trip name</label>
          <input id="trip-name" className={styles.input} defaultValue="Porto weekend" />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="trip-dest">Destination</label>
          <input id="trip-dest" className={styles.input} defaultValue="Porto, Portugal" />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Dates</span>
          <div className={styles.datesRow}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="trip-from">From</label>
              <input id="trip-from" className={styles.input} defaultValue="Fri, Mar 5" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="trip-to">To</label>
              <input id="trip-to" className={styles.input} defaultValue="Sun, Mar 7" />
            </div>
          </div>
          <span className={styles.hint}>
            3 days · not sure yet? <button type="button" onClick={notAvailable}>Poll the group for dates</button>
          </span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="trip-budget">Group budget · optional</label>
          <input id="trip-budget" className={styles.input} defaultValue="€ 900" />
          <span className={styles.budgetSub}>≈ €225 per person</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Who's coming</span>
          <div className={styles.peopleRow}>
            <Avatar person={PEOPLE.ari} size="picker" />
            <Avatar person={PEOPLE.ana} size="picker" />
            <Avatar person={PEOPLE.mia} size="picker" />
            <button type="button" className={styles.addFriends} onClick={notAvailable}>
              <Users size={14} aria-hidden="true" /> Add friends
            </button>
          </div>
        </div>

        <div className={styles.inviteRow}>
          <span className={styles.inviteText}>Invite link · friends join without an account</span>
          <button type="button" className={styles.shareBtn} onClick={notAvailable}>
            Share
          </button>
        </div>
      </div>
      <div className={styles.footer}>
        <Button variant="main-cta" onClick={() => navigate("/")}>
          Create trip
        </Button>
      </div>
    </div>
  );
}
