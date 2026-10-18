import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { PEOPLE } from "../data/people";
import { TRANSFERS, TRANSFERS_TOTAL, NAIVE_TRANSFER_COUNT } from "../data/transfers";
import { useEnsureRenAdded } from "../hooks/useEnsureRenAdded";
import { useDemo } from "../state/DemoContext";
import { formatEUR, getPaidTransferCount, getPendingTransferTotal } from "../state/selectors";
import styles from "./SettleUpScreen.module.css";

export function SettleUpScreen() {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  useEnsureRenAdded();

  const toYou = TRANSFERS.filter((t) => t.to === "ari");
  const betweenOthers = TRANSFERS.filter((t) => t.to !== "ari");
  const toYouTotal = toYou.reduce((s, t) => s + t.amount, 0);
  const paidCount = getPaidTransferCount(state);
  const pendingTotal = getPendingTransferTotal(state);

  function remind(name: string) {
    dispatch({ type: "SHOW_TOAST", toast: { message: `Reminder sent to ${name}` } });
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button type="button" className={styles.backBtn} onClick={() => navigate("/trip/lisbon/expenses")} aria-label="Back to expenses">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span className={styles.title}>Settle up</span>
      </div>

      <div className={`${styles.scroll} scroll-area`}>
        <div className={styles.heroCard}>
          <span className={styles.heroTitle}>{TRANSFERS.length} transfers instead of {NAIVE_TRANSFER_COUNT}</span>
          <span className={styles.heroSub}>We combined debts so fewer people pay. Totals don't change.</span>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionTitle}>To you</span>
            <span className={styles.sectionAmount}>{formatEUR(toYouTotal)}</span>
          </div>
          {toYou.map((t) => {
            const paid = Boolean(state.paidTransfers[t.id]);
            const p = PEOPLE[t.from];
            return (
              <div className={styles.row} key={t.id}>
                <Avatar person={p} size="picker" />
                <div className={styles.rowBody}>
                  <div className={styles.rowTitle}>{p.name} → you</div>
                  <div className={`${styles.rowStatus} ${paid ? styles.paid : styles.pending}`}>
                    {paid ? `✓ Paid${t.method ? ` via ${t.method}` : ""}` : "Pending"}
                  </div>
                </div>
                <div className={styles.rowRight}>
                  <span className={styles.rowAmount}>{formatEUR(t.amount)}</span>
                  {!paid && (
                    <Button variant="card-secondary" onClick={() => remind(p.name)}>
                      Remind
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Between others</span>
          {betweenOthers.map((t) => {
            const paid = Boolean(state.paidTransfers[t.id]);
            const from = PEOPLE[t.from];
            const to = PEOPLE[t.to];
            return (
              <div className={styles.row} key={t.id}>
                <Avatar person={from} size="picker" />
                <div className={styles.rowBody}>
                  <div className={styles.rowTitle}>{from.name} → {to.name}</div>
                  <div className={`${styles.rowStatus} ${paid ? styles.paid : styles.pending}`}>
                    {paid ? "✓ Paid" : "Pending"}
                  </div>
                </div>
                <span className={styles.rowAmount}>{formatEUR(t.amount)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.progressFooter}>
        <div className={styles.progressRow}>
          <span>
            <strong>{paidCount}</strong> of {TRANSFERS.length} settled
          </span>
          <span>{formatEUR(TRANSFERS_TOTAL - pendingTotal)} of {formatEUR(TRANSFERS_TOTAL)}</span>
        </div>
        <Button
          variant="main-cta-dark"
          onClick={() => {
            dispatch({ type: "SET_PERSPECTIVE", perspective: "nic" });
            navigate("/trip/lisbon/pay");
          }}
        >
          Remind everyone pending
        </Button>
      </div>
    </div>
  );
}
