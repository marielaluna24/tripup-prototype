import { useNavigate } from "react-router-dom";
import { PEOPLE, type PersonId } from "../data/people";
import { useDemo } from "../state/DemoContext";
import { formatEUR, formatSignedEUR, getBalances, getPeopleIds, getTonightDelta } from "../state/selectors";
import { Avatar } from "./Avatar";
import { BottomSheet } from "./BottomSheet";
import styles from "./BalancesSheet.module.css";

const NOTE: Partial<Record<PersonId, string>> = {
  ari: "You",
  nic: "no wine",
  ren: "dinner only",
};

export function BalancesSheet({ onClose }: { onClose: () => void }) {
  const { state } = useDemo();
  const navigate = useNavigate();
  const peopleIds = getPeopleIds(state);
  const balances = getBalances(state);
  const tonight = getTonightDelta(state);

  return (
    <BottomSheet title="Everyone's balance" onClose={onClose}>
      <div className={styles.sub}>Whole trip · updated after Dinner</div>
      <div className={styles.headerRow}>
        <span>Person</span>
        <span>Tonight</span>
        <span style={{ textAlign: "right" }}>Balance</span>
      </div>
      {peopleIds.map((id) => {
        const p = PEOPLE[id];
        const bal = balances[id];
        const t = tonight[id];
        return (
          <div className={styles.row} key={id}>
            <div className={styles.personCell}>
              <Avatar person={p} size="sm" />
              <span>
                <span className={styles.personName}>{p.name}</span>
                {NOTE[id] && <span className={styles.personNote}>{NOTE[id]}</span>}
              </span>
            </div>
            <span className={`${styles.tonight} ${t > 0 ? styles.pos : t < 0 ? styles.neg : ""}`}>
              {t === 0 ? "—" : formatSignedEUR(t)}
            </span>
            <span className={styles.balanceCell}>{bal === 0 ? "settled" : bal > 0 ? `gets ${formatEUR(bal)}` : `owes ${formatEUR(bal)}`}</span>
          </div>
        );
      })}
      <button
        type="button"
        className={styles.submit}
        onClick={() => {
          onClose();
          navigate("/trip/lisbon/settle");
        }}
      >
        Settle up transfers
      </button>
    </BottomSheet>
  );
}
