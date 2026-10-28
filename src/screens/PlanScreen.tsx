import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { InfoRow } from "../components/InfoRow";
import { PlanCard } from "../components/PlanCard";
import { EARLIER_TODAY, FREE_TIME, POLL_CLOSES_LABEL } from "../data/plan";
import { useDemo } from "../state/DemoContext";
import { getDinnerCardActions, getDinnerCardStatus, getPeopleCount, getVotedCount } from "../state/selectors";
import styles from "./PlanScreen.module.css";

// Plan tab's own scrolling content. Rendered inside TripScreen's shared
// shell (header, tab row, day strip, FAB, sheets), which stays static while
// this cross-fades on tab switches — see TripScreen.tsx.
export function PlanBody() {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  const [earlierExpanded, setEarlierExpanded] = useState(false);

  const cardStatus = getDinnerCardStatus(state);
  const cardActions = getDinnerCardActions(state);

  function notAvailable() {
    dispatch({ type: "SHOW_TOAST", toast: { message: "Not part of this demo" } });
  }

  function handleCardAction(kind: string) {
    switch (kind) {
      case "start-poll":
        navigate("/trip/lisbon/polls/new");
        break;
      case "log-expense":
        navigate("/trip/lisbon/expenses/new");
        break;
      case "view-poll":
      case "vote":
        navigate("/trip/lisbon/polls/dinner");
        break;
      default:
        notAvailable();
    }
  }

  const dinnerBadge = cardStatus === "not-decided" ? "not-decided" : cardStatus === "poll-open" ? "poll-open" : "won";
  const dinnerTitle = cardStatus === "won" ? "Taberna da Rua" : "Dinner";
  const dinnerTime =
    cardStatus === "poll-open"
      ? `Closes ${POLL_CLOSES_LABEL} · ${getVotedCount(state)} of ${getPeopleCount(state)} voted`
      : cardStatus === "won"
        ? "Dinner · 20:30"
        : "20:30";

  return (
    <div className={styles.content}>
      <InfoRow
        as="button"
        text={`Earlier today · Pastéis de Belém, Alfama walk`}
        trailing={
          <>
            2 done <ChevronDown size={14} style={{ transform: earlierExpanded ? "rotate(180deg)" : undefined }} aria-hidden="true" />
          </>
        }
        onClick={() => setEarlierExpanded((v) => !v)}
      />
      {earlierExpanded && (
        <div className={styles.earlierList}>
          {EARLIER_TODAY.map((item) => (
            <div className={styles.earlierItem} key={item.id}>
              <span>{item.title}</span>
              <span>{item.timeLabel}</span>
            </div>
          ))}
        </div>
      )}

      <PlanCard badge="ongoing" title={FREE_TIME.title} timeLabel={FREE_TIME.timeLabel} art="house" />

      <PlanCard
        badge={dinnerBadge}
        title={dinnerTitle}
        timeLabel={dinnerTime}
        art="restaurant"
        isNew={false}
        actions={
          <>
            {cardActions.map((a) => (
              <Button
                key={a.kind}
                variant={a.variant === "primary" ? "card-primary" : "card-secondary"}
                onClick={() => handleCardAction(a.kind)}
              >
                {a.label}
              </Button>
            ))}
          </>
        }
      />
    </div>
  );
}
