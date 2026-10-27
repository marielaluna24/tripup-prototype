import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { OverlayHost } from "./components/OverlayHost";
import { PageTransition } from "./components/PageTransition";
import { PhoneFrame } from "./components/PhoneFrame";
import { Toast } from "./components/Toast";
import { AddExpenseScreen } from "./screens/AddExpenseScreen";
import { ExpensesScreen } from "./screens/ExpensesScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LiveVotesScreen } from "./screens/LiveVotesScreen";
import { NewPollScreen } from "./screens/NewPollScreen";
import { NewTripScreen } from "./screens/NewTripScreen";
import { PayScreen } from "./screens/PayScreen";
import { PlanScreen } from "./screens/PlanScreen";
import { PollsTabScreen } from "./screens/PollsTabScreen";
import { SettleUpScreen } from "./screens/SettleUpScreen";

// Routes that just toggle a sheet over the same underlying screen
// (Plan <-> Add member, Expenses <-> Balances) share a transition key with
// their base route, so opening/closing the sheet updates props in place
// instead of remounting (and re-sliding) the whole page — BottomSheet's own
// motion already covers that interaction; the page itself hasn't changed.
function pageKeyFor(pathname: string): string {
  if (pathname === "/trip/lisbon/add-member") return "/trip/lisbon/plan";
  if (pathname === "/trip/lisbon/balances") return "/trip/lisbon/expenses";
  return pathname;
}

function depthOf(pathname: string): number {
  return pathname.split("/").filter(Boolean).length;
}

// Direction is derived from how the URL's depth changes: deeper = drilling
// in (push), shallower = backing out (pop), same depth = a lateral move
// between siblings (plain cross-fade). This needs no per-route bookkeeping
// and matches this app's hub-and-spoke structure (see PageTransition.tsx).
function usePageTransition(pathname: string) {
  const key = pageKeyFor(pathname);
  const prevDepth = useRef(depthOf(pathname));
  const prevKey = useRef(key);

  let direction: 1 | -1 | 0 = 1;
  if (key !== prevKey.current) {
    const depth = depthOf(pathname);
    direction = depth === prevDepth.current ? 0 : depth > prevDepth.current ? 1 : -1;
  }

  useEffect(() => {
    prevDepth.current = depthOf(pathname);
    prevKey.current = key;
  }, [pathname, key]);

  return { key, direction };
}

export default function App() {
  const location = useLocation();
  const { key, direction } = usePageTransition(location.pathname);

  return (
    <PhoneFrame>
      <AnimatePresence initial={false}>
        <Routes location={location} key={key}>
          <Route path="/" element={<PageTransition direction={direction}><HomeScreen /></PageTransition>} />
          <Route path="/trip/lisbon/plan" element={<PageTransition direction={direction}><PlanScreen /></PageTransition>} />
          <Route path="/trip/lisbon/add-member" element={<PageTransition direction={direction}><PlanScreen addMemberSheet /></PageTransition>} />
          <Route path="/trip/lisbon/polls" element={<PageTransition direction={direction}><PollsTabScreen /></PageTransition>} />
          <Route path="/trip/lisbon/polls/new" element={<PageTransition direction={direction}><NewPollScreen /></PageTransition>} />
          <Route path="/trip/lisbon/polls/dinner" element={<PageTransition direction={direction}><LiveVotesScreen /></PageTransition>} />
          <Route path="/trip/lisbon/expenses" element={<PageTransition direction={direction}><ExpensesScreen /></PageTransition>} />
          <Route path="/trip/lisbon/expenses/new" element={<PageTransition direction={direction}><AddExpenseScreen /></PageTransition>} />
          <Route path="/trip/lisbon/balances" element={<PageTransition direction={direction}><ExpensesScreen balancesSheet /></PageTransition>} />
          <Route path="/trip/lisbon/settle" element={<PageTransition direction={direction}><SettleUpScreen /></PageTransition>} />
          <Route path="/trip/lisbon/pay" element={<PageTransition direction={direction}><PayScreen /></PageTransition>} />
          <Route path="/trips/new" element={<PageTransition direction={direction}><NewTripScreen /></PageTransition>} />
          <Route path="*" element={<PageTransition direction={direction}><HomeScreen /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <OverlayHost />
      <Toast />
    </PhoneFrame>
  );
}
