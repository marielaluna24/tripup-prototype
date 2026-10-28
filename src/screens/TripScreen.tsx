import { Plus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AddMemberSheet } from "../components/AddMemberSheet";
import { BalancesSheet } from "../components/BalancesSheet";
import { DayStrip } from "../components/DayStrip";
import { Fab } from "../components/Fab";
import { FabMenu, type FabMenuAction } from "../components/FabMenu";
import { PeopleSheet } from "../components/PeopleSheet";
import { TabRow, type TabKey } from "../components/TabRow";
import { TripHeader } from "../components/TripHeader";
import { TRIP_DAYS } from "../data/trip";
import { useDemo } from "../state/DemoContext";
import { getExpensesTabDot, getPeopleIds, getPollsTabDot } from "../state/selectors";
import { ExpensesBody } from "./ExpensesScreen";
import { PlanBody } from "./PlanScreen";
import { PollsBody } from "./PollsTabScreen";
import styles from "./TripScreen.module.css";

const TAB_BASE_PATH: Record<TabKey, string> = {
  plan: "/trip/lisbon/plan",
  polls: "/trip/lisbon/polls",
  expenses: "/trip/lisbon/expenses",
};

function tabFor(pathname: string): TabKey {
  if (pathname === "/trip/lisbon/polls") return "polls";
  if (pathname === "/trip/lisbon/expenses" || pathname === "/trip/lisbon/balances") return "expenses";
  return "plan";
}

// Shared shell for the Plan / Polls / Expenses tabs: header, tab row (+ day
// strip on Plan), FAB and sheets all live here, once, so they never remount
// or transition when switching tabs. The body below swaps instantly (no
// fade) — it's most of the 844pt screen, so even a quick cross-fade there
// still reads as "the whole screen is transitioning"; tab switches should
// feel like flipping a native tab bar, not navigating to a new screen.
export function TripScreen() {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [peopleOpen, setPeopleOpen] = useState(false);

  const peopleIds = getPeopleIds(state);
  const tab = tabFor(location.pathname);
  const tabBasePath = TAB_BASE_PATH[tab];
  const fabOpen = searchParams.get("menu") === "open";

  function openMenu() {
    navigate(`${tabBasePath}?menu=open`);
  }
  function closeMenu() {
    navigate(tabBasePath, { replace: true });
  }
  function handleMenuSelect(key: FabMenuAction["key"]) {
    closeMenu();
    if (key === "add-expense") navigate("/trip/lisbon/expenses/new");
    if (key === "create-poll") navigate("/trip/lisbon/polls/new");
  }

  return (
    <div className={styles.screen}>
      <div className={`${styles.scroll} scroll-area`}>
        <TripHeader
          title="Lisbon"
          onBack={() => navigate("/")}
          peopleIds={peopleIds}
          onOpenPeople={() => setPeopleOpen(true)}
          onAdd={() => navigate("/trip/lisbon/add-member")}
        />

        <div className={styles.chrome}>
          <TabRow active={tab} tripId="lisbon" pollsDot={getPollsTabDot(state)} expensesDot={getExpensesTabDot(state)} />
          {tab === "plan" && <DayStrip days={TRIP_DAYS} selectedKey="sun" />}
        </div>

        <div className={styles.body} key={tab}>
          {tab === "plan" && <PlanBody />}
          {tab === "polls" && <PollsBody />}
          {tab === "expenses" && <ExpensesBody />}
        </div>
      </div>

      {tab === "polls" ? (
        <button type="button" className={styles.fabLink} aria-label="New poll" onClick={() => navigate("/trip/lisbon/polls/new")}>
          <Plus size={24} strokeWidth={2.5} aria-hidden="true" />
        </button>
      ) : (
        <>
          <Fab open={fabOpen} onClick={fabOpen ? closeMenu : openMenu} />
          <AnimatePresence>
            {fabOpen && <FabMenu onSelect={handleMenuSelect} onClose={closeMenu} />}
          </AnimatePresence>
        </>
      )}

      <AnimatePresence>
        {peopleOpen && <PeopleSheet peopleIds={peopleIds} onClose={() => setPeopleOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {location.pathname === "/trip/lisbon/add-member" && (
          <AddMemberSheet
            onClose={() => navigate("/trip/lisbon/plan")}
            onAdded={() => {
              dispatch({ type: "ADD_REN" });
              navigate("/trip/lisbon/plan");
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {location.pathname === "/trip/lisbon/balances" && <BalancesSheet onClose={() => navigate("/trip/lisbon/expenses")} />}
      </AnimatePresence>
    </div>
  );
}
