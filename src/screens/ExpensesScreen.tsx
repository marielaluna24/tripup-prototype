import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BalancesSheet } from "../components/BalancesSheet";
import { BudgetBar } from "../components/BudgetBar";
import { Button } from "../components/Button";
import { Fab } from "../components/Fab";
import { FabMenu, type FabMenuAction } from "../components/FabMenu";
import { PEOPLE } from "../data/people";
import { PeopleSheet } from "../components/PeopleSheet";
import { TabRow } from "../components/TabRow";
import { TripHeader } from "../components/TripHeader";
import { DAY_TOTALS_BEFORE, EARLIER_EXPENSES, SATURDAY_ACTIVITY } from "../data/expenses";
import { DINNER_PLACE } from "../data/plan";
import { useEnsureRenAdded } from "../hooks/useEnsureRenAdded";
import { useDemo } from "../state/DemoContext";
import {
  formatEUR,
  getAllSquaredUp,
  getBudget,
  getExpensesTabDot,
  getItemsTotal,
  getPeopleCount,
  getPeopleIds,
  getPollsTabDot,
  getTonightDelta,
  getYourBalance,
  YOUR_TRIP_SHARE,
} from "../state/selectors";
import styles from "./ExpensesScreen.module.css";

export function ExpensesScreen({ balancesSheet = false }: { balancesSheet?: boolean }) {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  useEnsureRenAdded();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [peopleOpen, setPeopleOpen] = useState(false);
  const fabOpen = searchParams.get("menu") === "open";

  const peopleIds = getPeopleIds(state);
  const balance = getYourBalance(state);
  const budget = getBudget(state);
  const tonight = getTonightDelta(state);
  const dinnerLogged = state.dinner.logged;
  const allSquared = dinnerLogged && getAllSquaredUp(state);
  const sundayTotal = DAY_TOTALS_BEFORE["Sunday Oct 12"] + (dinnerLogged ? getItemsTotal(state) : 0);

  function openMenu() {
    navigate(`${location.pathname}?menu=open`);
  }
  function closeMenu() {
    navigate(location.pathname, { replace: true });
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
        <div className={styles.tabsWrap}>
          <TabRow active="expenses" tripId="lisbon" pollsDot={getPollsTabDot(state)} expensesDot={getExpensesTabDot(state)} />
        </div>

        <div className={styles.content}>
        <div className={styles.balanceSection}>
          <span className={styles.sectionLabel}>Trip balance</span>
          {allSquared ? (
            <>
              <div className={styles.balanceValue}>All settled</div>
              <div className={styles.updatedNote}>5 of 5 payments · nobody owes anything</div>
              <div className={styles.updatedNote}>
                Lisbon cost {formatEUR(budget.spent)} · your share {formatEUR(YOUR_TRIP_SHARE)}
              </div>
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => dispatch({ type: "SHOW_TOAST", toast: { message: "Not part of this demo" } })}
              >
                Trip recap
              </button>
            </>
          ) : (
            <>
              <div className={`${styles.balanceValue} ${balance < 0 ? styles.owe : balance > 0 ? styles.owed : ""}`}>
                {balance === 0 ? "All settled" : balance < 0 ? `You owe ${formatEUR(balance)}` : `You're owed ${formatEUR(balance)}`}
              </div>
              {dinnerLogged && <div className={styles.updatedNote}>Updated just now</div>}
              <div className={styles.linksRow}>
                <button type="button" className={styles.linkBtn} onClick={() => navigate("/trip/lisbon/balances")}>
                  See everyone's balance
                </button>
              </div>
              <Button variant="main-cta-dark" onClick={() => navigate("/trip/lisbon/settle")}>
                Settle up
              </Button>
            </>
          )}
        </div>

        <div className={styles.budgetSection}>
          <BudgetBar spent={budget.spent} total={budget.total} left={budget.left} />
          {!dinnerLogged && (
            <button
              type="button"
              className={styles.editBudget}
              onClick={() => dispatch({ type: "SHOW_TOAST", toast: { message: "Not part of this demo" } })}
            >
              Edit budget
            </button>
          )}
        </div>

        <div className={styles.daySection}>
          <div className={styles.dayHeader}>
            <span className={styles.dayLabel}>Sunday Oct 12</span>
            <span className={styles.dayTotal}>{formatEUR(sundayTotal)}</span>
          </div>
          {dinnerLogged && (
            <div className={styles.expenseRow}>
              {state.justAddedExpense && <span className={styles.newTag}>NEW</span>}
              <div className={styles.expenseLeft}>
                <div className={styles.expenseTitle}>Dinner · {DINNER_PLACE.name}</div>
                <div className={styles.expenseMeta}>You paid · split by item · {getPeopleCount(state)} people</div>
              </div>
              <div className={styles.expenseRight}>
                <div className={styles.expenseAmount}>{formatEUR(getItemsTotal(state))}</div>
                <div className={`${styles.expenseShare} ${styles.owed}`}>you're owed {formatEUR(tonight.ari)}</div>
              </div>
            </div>
          )}
          {EARLIER_EXPENSES.filter((e) => e.dayLabel === "Sunday Oct 12").map((exp) => (
            <div className={styles.expenseRow} key={exp.id}>
              <div className={styles.expenseLeft}>
                <div className={styles.expenseTitle}>{exp.title}</div>
                <div className={styles.expenseMeta}>
                  {PEOPLE[exp.paidBy].name} paid · {exp.context} · {exp.splitWith.length} people
                </div>
              </div>
              <div className={styles.expenseRight}>
                <div className={styles.expenseAmount}>{formatEUR(exp.amount)}</div>
                <div className={`${styles.expenseShare} ${styles.owe}`}>you owe {formatEUR(exp.yourShare)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.daySection}>
          <div className={styles.dayHeader}>
            <span className={styles.dayLabel}>Saturday Oct 11</span>
            <span className={styles.dayTotal}>{formatEUR(DAY_TOTALS_BEFORE["Saturday Oct 11"])}</span>
          </div>
          {EARLIER_EXPENSES.filter((e) => e.dayLabel === "Saturday Oct 11").map((exp) => (
            <div className={styles.expenseRow} key={exp.id}>
              <div className={styles.expenseLeft}>
                <div className={styles.expenseTitle}>{exp.title}</div>
                <div className={styles.expenseMeta}>
                  {PEOPLE[exp.paidBy].name} paid · {exp.context} · {exp.splitWith.length} people
                </div>
              </div>
              <div className={styles.expenseRight}>
                <div className={styles.expenseAmount}>{formatEUR(exp.amount)}</div>
                <div className={`${styles.expenseShare} ${styles.owe}`}>you owe {formatEUR(exp.yourShare)}</div>
              </div>
            </div>
          ))}
          <div className={styles.activityRow}>
            <span>{SATURDAY_ACTIVITY.label}</span>
            <span>{SATURDAY_ACTIVITY.sub}</span>
          </div>
        </div>
        </div>
      </div>

      <Fab open={fabOpen} onClick={fabOpen ? closeMenu : openMenu} />
      <AnimatePresence>
        {fabOpen && <FabMenu onSelect={handleMenuSelect} onClose={closeMenu} />}
      </AnimatePresence>
      <AnimatePresence>
        {peopleOpen && <PeopleSheet peopleIds={peopleIds} onClose={() => setPeopleOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {balancesSheet && <BalancesSheet onClose={() => navigate("/trip/lisbon/expenses")} />}
      </AnimatePresence>
    </div>
  );
}

