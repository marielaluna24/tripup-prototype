import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AddMemberSheet } from "../components/AddMemberSheet";
import { Button } from "../components/Button";
import { DayStrip } from "../components/DayStrip";
import { Fab } from "../components/Fab";
import { FabMenu, type FabMenuAction } from "../components/FabMenu";
import { InfoRow } from "../components/InfoRow";
import { PeopleSheet } from "../components/PeopleSheet";
import { PlanCard } from "../components/PlanCard";
import { TabRow } from "../components/TabRow";
import { TripHeader } from "../components/TripHeader";
import { EARLIER_TODAY, FREE_TIME, POLL_CLOSES_LABEL } from "../data/plan";
import { TRIP_DAYS } from "../data/trip";
import { useScrollCollapse } from "../hooks/useScrollCollapse";
import { useDemo } from "../state/DemoContext";
import {
  getDinnerCardActions,
  getDinnerCardStatus,
  getExpensesTabDot,
  getPeopleCount,
  getPeopleIds,
  getPollsTabDot,
  getVotedCount,
} from "../state/selectors";
import styles from "./PlanScreen.module.css";

export function PlanScreen({ addMemberSheet = false }: { addMemberSheet?: boolean }) {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { ref, collapsed } = useScrollCollapse<HTMLDivElement>();
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [earlierExpanded, setEarlierExpanded] = useState(false);

  const peopleIds = getPeopleIds(state);
  const cardStatus = getDinnerCardStatus(state);
  const cardActions = getDinnerCardActions(state);
  const fabOpen = searchParams.get("menu") === "open";

  function openMenu() {
    setSearchParams({ menu: "open" }, { replace: false });
  }
  function closeMenu() {
    navigate("/trip/lisbon/plan", { replace: true });
  }

  function handleMenuSelect(key: FabMenuAction["key"]) {
    closeMenu();
    if (key === "add-expense") navigate("/trip/lisbon/expenses/new");
    if (key === "create-poll") navigate("/trip/lisbon/polls/new");
  }

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
    <div className={styles.screen}>
      <TripHeader
        collapsed={collapsed}
        title="Lisbon"
        onBack={() => navigate("/")}
        peopleIds={peopleIds}
        onOpenPeople={() => setPeopleOpen(true)}
        onAdd={() => navigate("/trip/lisbon/add-member")}
      />
      <div ref={ref} className={`${styles.scroll} scroll-area`}>
        <div className={styles.tabsWrap}>
          <TabRow active="plan" tripId="lisbon" pollsDot={getPollsTabDot(state)} expensesDot={getExpensesTabDot(state)} />
        </div>
        <DayStrip days={TRIP_DAYS} selectedKey="sun" />
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

      <Fab open={fabOpen} onClick={fabOpen ? closeMenu : openMenu} />
      {fabOpen && <FabMenu onSelect={handleMenuSelect} onClose={closeMenu} />}
      {peopleOpen && <PeopleSheet peopleIds={peopleIds} onClose={() => setPeopleOpen(false)} />}
      {addMemberSheet && (
        <AddMemberSheet
          onClose={() => navigate("/trip/lisbon/plan")}
          onAdded={() => {
            dispatch({ type: "ADD_REN" });
            navigate("/trip/lisbon/plan");
          }}
        />
      )}
    </div>
  );
}
