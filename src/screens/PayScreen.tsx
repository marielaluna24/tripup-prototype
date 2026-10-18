import { Check, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { PerspectiveChip } from "../components/PerspectiveChip";
import { TRANSFERS } from "../data/transfers";
import { useEnsureRenAdded } from "../hooks/useEnsureRenAdded";
import { useDemo } from "../state/DemoContext";
import { formatEUR } from "../state/selectors";
import styles from "./PayScreen.module.css";

type Method = "card" | "paypal" | "applepay";

const NIC_TRANSFER_IDS = ["nic-ari", "nic-ben"];
const CONTEXT: Record<string, string> = {
  "nic-ari": "Paid tonight's dinner",
  "nic-ben": "Paid Tram 28 & more",
};

export function PayScreen() {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  useEnsureRenAdded();
  const [method, setMethod] = useState<Method>("card");

  useEffect(() => {
    dispatch({ type: "SET_PERSPECTIVE", perspective: "nic" });
    if (!state.othersAutoSettled) {
      const t = setTimeout(() => dispatch({ type: "AUTO_SETTLE_OTHERS" }), 3200);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nicTransfers = TRANSFERS.filter((t) => NIC_TRANSFER_IDS.includes(t.id));
  const pending = nicTransfers.filter((t) => !state.paidTransfers[t.id]);
  const totalOwed = nicTransfers.reduce((s, t) => s + t.amount, 0);
  const next = pending[0];
  const upNext = pending[1];

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button type="button" className={styles.backBtn} onClick={() => navigate("/trip/lisbon/settle")} aria-label="Back to settle up">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span className={styles.title}>Settle up</span>
      </div>

      <div className={`${styles.scroll} scroll-area`}>
        <div className={styles.perspectiveWrap}>
          <PerspectiveChip label="Nic's view" />
        </div>

        {next ? (
          <>
            <div>
              <h1 className={styles.h1}>Pay your share</h1>
              <div className={styles.sub}>
                You owe {formatEUR(totalOwed)} · simplified to {nicTransfers.length} payments
              </div>
            </div>

            <fieldset style={{ border: "none", padding: 0, margin: 0 }} className={styles.section}>
              <legend className={styles.legend}>Who are you paying now?</legend>
              {nicTransfers.map((t) => {
                const paid = Boolean(state.paidTransfers[t.id]);
                const toName = t.to === "ari" ? "Ari" : "Ben";
                return (
                  <div className={`${styles.payRow} ${paid ? styles.done : ""}`} key={t.id}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: t.to === "ari" ? "var(--avatar-ari-bg)" : "var(--avatar-ben-bg)",
                        color: t.to === "ari" ? "var(--avatar-ari-fg)" : "var(--avatar-ben-fg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 13,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {t.to === "ari" ? "AR" : "BE"}
                    </div>
                    <div className={styles.payBody}>
                      <div className={styles.payName}>{toName}</div>
                      <div className={styles.paySub}>{CONTEXT[t.id]}</div>
                    </div>
                    {paid ? (
                      <span className={styles.doneTag}>✓ Paid</span>
                    ) : (
                      <span className={styles.payAmount}>{formatEUR(t.amount)}</span>
                    )}
                  </div>
                );
              })}
            </fieldset>

            <fieldset style={{ border: "none", padding: 0, margin: 0 }} className={styles.section}>
              <legend className={styles.legend}>Choose payment method</legend>
              <MethodRow label="Card" sub="•••• 8463" code="VISA" active={method === "card"} onClick={() => setMethod("card")} />
              <MethodRow label="PayPal" sub="nic•••••@gmail.com" code="PP" active={method === "paypal"} onClick={() => setMethod("paypal")} />
              <MethodRow label="Apple Pay" sub="This iPhone" code="" active={method === "applepay"} onClick={() => setMethod("applepay")} />
              <button
                type="button"
                className={styles.addMethodBtn}
                onClick={() => dispatch({ type: "SHOW_TOAST", toast: { message: "Not part of this demo" } })}
              >
                Add payment method
              </button>
            </fieldset>
          </>
        ) : (
          <div className={styles.allDone}>
            <span className={styles.allDoneIcon}>
              <Check size={26} color="#047857" aria-hidden="true" />
            </span>
            <span className={styles.allDoneTitle}>You're all settled</span>
            <span className={styles.allDoneSub}>Both payments are done · {formatEUR(totalOwed)}</span>
          </div>
        )}
      </div>

      {next && (
        <div className={styles.footer}>
          {upNext && <span className={styles.footerNote}>{upNext.to === "ari" ? "Ari" : "Ben"} ({formatEUR(upNext.amount)}) next</span>}
          <Button variant="main-cta" onClick={() => dispatch({ type: "PAY_TRANSFER", id: next.id })}>
            Pay {next.to === "ari" ? "Ari" : "Ben"} {formatEUR(next.amount)}
          </Button>
        </div>
      )}
    </div>
  );
}

function MethodRow({
  label,
  sub,
  code,
  active,
  onClick,
}: {
  label: string;
  sub: string;
  code: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" className={styles.methodRow} onClick={onClick} role="radio" aria-checked={active}>
      <span className={styles.methodIcon} aria-hidden="true">{code || "🍎"}</span>
      <span className={styles.methodBody}>
        <span className={styles.methodName}>{label}</span>
        <span className={styles.methodSub}>{sub}</span>
      </span>
      <span className={`${styles.radio} ${active ? styles.on : ""}`}>{active && <span className={styles.radioDot} />}</span>
    </button>
  );
}
