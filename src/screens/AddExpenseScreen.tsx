import { Camera, Image as ImageIcon, Link2, Plus, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AmountInput } from "../components/AmountInput";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { InfoRow } from "../components/InfoRow";
import { ItemCard } from "../components/ItemCard";
import { PillSelect } from "../components/PillSelect";
import { SegmentedControl } from "../components/SegmentedControl";
import { SheetHeader } from "../components/SheetHeader";
import { DINNER_PLACE } from "../data/plan";
import { PEOPLE } from "../data/people";
import { useEnsureRenAdded } from "../hooks/useEnsureRenAdded";
import { useDemo } from "../state/DemoContext";
import {
  formatEUR,
  getDinnerShares,
  getItemsMismatch,
  getItemsTotal,
  getPeopleIds,
} from "../state/selectors";
import styles from "./AddExpenseScreen.module.css";

export function AddExpenseScreen() {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  useEnsureRenAdded();

  const peopleIds = getPeopleIds(state);
  const { whoWasThere, items, splitMode, amount } = state.dinner;
  const shares = getDinnerShares(state);
  const itemsTotal = getItemsTotal(state);
  const { mismatched, diff } = getItemsMismatch(state);

  function notAvailable() {
    dispatch({ type: "SHOW_TOAST", toast: { message: "Not part of this demo" } });
  }

  function handleSave() {
    dispatch({ type: "LOG_DINNER_EXPENSE" });
    dispatch({
      type: "SHOW_TOAST",
      toast: {
        message: "Dinner saved · group notified",
        actionLabel: "Undo",
        onAction: () => dispatch({ type: "UNDO_DINNER_EXPENSE" }),
      },
    });
    navigate("/trip/lisbon/expenses");
  }

  const equalItem = items[0];

  return (
    <div className={styles.screen}>
      <SheetHeader title="New expense" cancelTo="/trip/lisbon/expenses" />
      <div className={`${styles.scroll} scroll-area`}>
        <div className={styles.scanRow}>
          <button type="button" className={styles.scanBtn} onClick={notAvailable}>
            <Camera size={16} aria-hidden="true" /> Scan receipt
          </button>
          <button type="button" className={styles.scanBtn} onClick={notAvailable}>
            <ImageIcon size={16} aria-hidden="true" /> From photos
          </button>
        </div>

        <AmountInput
          value={amount}
          onChange={(n) => dispatch({ type: "SET_AMOUNT", amount: n })}
          helper="Each person sees it in their own currency"
        />

        <div className={styles.linkedRow}>
          <span className={styles.linkIcon}>
            <Link2 size={15} color="#1A1A1A" aria-hidden="true" />
          </span>
          <div>
            <div className={styles.linkedBody}>
              Linked to Dinner · <strong>{DINNER_PLACE.name}</strong>
            </div>
            <div className={styles.linkedSub}>Today 20:30 · from itinerary</div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.paidByRow}>
          <span className={styles.rowLabel}>Paid by</span>
          <PillSelect person={PEOPLE.ari} label="You (Ari)" onClick={notAvailable} />
        </div>

        <div className={styles.whoSection}>
          <div className={styles.whoHeader}>
            <span className={styles.rowLabel}>Who was there</span>
            <div className={styles.whoLinks}>
              <button
                type="button"
                className={styles.whoLink}
                onClick={() => peopleIds.forEach((p) => !whoWasThere.includes(p) && dispatch({ type: "TOGGLE_WHO_WAS_THERE", personId: p }))}
              >
                Select all
              </button>
              <button
                type="button"
                className={`${styles.whoLink} ${styles.muted}`}
                onClick={() => whoWasThere.forEach((p) => dispatch({ type: "TOGGLE_WHO_WAS_THERE", personId: p }))}
              >
                Unselect all
              </button>
            </div>
          </div>
          <div className={styles.avatarsRow}>
            {peopleIds.map((p) => {
              const included = whoWasThere.includes(p);
              return (
                <div className={styles.avatarItem} key={p}>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_WHO_WAS_THERE", personId: p })}
                    aria-pressed={included}
                    aria-label={`${PEOPLE[p].name}${included ? ", there, tap to remove" : ", not there, tap to add"}`}
                  >
                    <Avatar person={PEOPLE[p]} size="picker" excluded={!included} selected={included} />
                  </button>
                  <span className={styles.avatarName}>{PEOPLE[p].isYou ? "You" : PEOPLE[p].name}</span>
                </div>
              );
            })}
            <div className={styles.avatarItem}>
              <button type="button" onClick={notAvailable} aria-label="Add guest">
                <span className={styles.addGuestCircle}>
                  <Plus size={20} aria-hidden="true" />
                </span>
              </button>
              <span className={styles.avatarName}>Add guest</span>
            </div>
          </div>
        </div>

        <div>
          <span className={styles.splitLabel}>How to split</span>
          <div style={{ marginTop: 10 }}>
            <SegmentedControl
              value={splitMode}
              onChange={(mode) => dispatch({ type: "SET_SPLIT_MODE", mode })}
              options={[
                { value: "equally", label: "Equally" },
                { value: "by-item", label: "By item" },
              ]}
            />
          </div>
        </div>

        {splitMode === "equally" && equalItem ? (
          <div className={styles.equalCard}>
            <span className={styles.equalLabel}>Each person pays</span>
            <span className={styles.equalDetail}>
              {formatEUR(amount)} split equally · {equalItem.included.length} people
            </span>
            <span className={styles.equalEach}>
              {formatEUR(equalItem.included.length ? amount / equalItem.included.length : 0)}
            </span>
          </div>
        ) : (
          <>
            <div className={styles.itemsList}>
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  peopleIds={peopleIds}
                  mismatched={mismatched}
                  onToggle={(personId) => dispatch({ type: "TOGGLE_ITEM_PERSON", itemId: item.id, personId })}
                  onAmountChange={(n) => dispatch({ type: "SET_ITEM_AMOUNT", itemId: item.id, amount: n })}
                  onRemove={items.length > 1 ? () => dispatch({ type: "REMOVE_DINNER_ITEM", itemId: item.id }) : undefined}
                />
              ))}
            </div>
            <div className={styles.itemButtons}>
              <button type="button" className={styles.itemBtn} onClick={notAvailable}>
                <Receipt size={15} aria-hidden="true" /> Fill from receipt
              </button>
              <button type="button" className={styles.itemBtn} onClick={() => dispatch({ type: "ADD_DINNER_ITEM" })}>
                <Plus size={15} aria-hidden="true" /> Add item
              </button>
            </div>

            <div>
              <span className={styles.splitLabel}>Each person pays</span>
              <div className={styles.payGrid} style={{ marginTop: 10 }}>
                {peopleIds.map((p) => (
                  <div className={styles.payRow} key={p}>
                    <span className={styles.payName}>{PEOPLE[p].isYou ? "You" : PEOPLE[p].name}</span>
                    <span className={`${styles.payAmount} tnum`}>{formatEUR(shares[p] ?? 0)}</span>
                  </div>
                ))}
              </div>
            </div>

            <InfoRow
              variant={mismatched ? "warning" : "info"}
              text={mismatched ? `€${Math.abs(diff).toFixed(2)} unassigned` : `Items add up to ${formatEUR(itemsTotal)}`}
            />
          </>
        )}
      </div>

      <div className={styles.footer}>
        <Button variant="main-cta" disabled={mismatched} onClick={handleSave}>
          Save expense
        </Button>
      </div>
    </div>
  );
}
