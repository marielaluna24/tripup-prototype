import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { OverlayHost } from "./components/OverlayHost";
import { PageTransition } from "./components/PageTransition";
import { PhoneFrame } from "./components/PhoneFrame";
import { Toast } from "./components/Toast";
import { TripSheets } from "./components/TripSheets";
import { AddExpenseScreen } from "./screens/AddExpenseScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LiveVotesScreen } from "./screens/LiveVotesScreen";
import { NewPollScreen } from "./screens/NewPollScreen";
import { NewTripScreen } from "./screens/NewTripScreen";
import { PayScreen } from "./screens/PayScreen";
import { SettleUpScreen } from "./screens/SettleUpScreen";
import { TripScreen } from "./screens/TripScreen";

// Plan / Polls / Expenses (and the sheet routes layered over them, Add
// member and Balances) all render the same <TripScreen>, which owns the
// trip header and tab row once and keeps them static while only its body
// cross-fades per tab. Grouping them under one key here means switching
// between them re-renders TripScreen in place instead of having this outer
// AnimatePresence unmount/remount (and slide/fade) the whole screen —
// header included — on every tab tap.
const TRIP_TAB_ROUTES = new Set([
  "/trip/lisbon/plan",
  "/trip/lisbon/add-member",
  "/trip/lisbon/polls",
  "/trip/lisbon/expenses",
  "/trip/lisbon/balances",
]);

function pageKeyFor(pathname: string): string {
  if (TRIP_TAB_ROUTES.has(pathname)) return "/trip/lisbon/tabs";
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
          <Route path="/trip/lisbon/plan" element={<PageTransition direction={direction} variant="scalePop"><TripScreen /></PageTransition>} />
          <Route path="/trip/lisbon/add-member" element={<PageTransition direction={direction} variant="scalePop"><TripScreen /></PageTransition>} />
          <Route path="/trip/lisbon/polls" element={<PageTransition direction={direction} variant="scalePop"><TripScreen /></PageTransition>} />
          <Route path="/trip/lisbon/polls/new" element={<PageTransition direction={direction} variant="scalePop"><NewPollScreen /></PageTransition>} />
          <Route path="/trip/lisbon/polls/dinner" element={<PageTransition direction={direction}><LiveVotesScreen /></PageTransition>} />
          <Route path="/trip/lisbon/expenses" element={<PageTransition direction={direction} variant="scalePop"><TripScreen /></PageTransition>} />
          <Route path="/trip/lisbon/expenses/new" element={<PageTransition direction={direction} variant="scalePop"><AddExpenseScreen /></PageTransition>} />
          <Route path="/trip/lisbon/balances" element={<PageTransition direction={direction} variant="scalePop"><TripScreen /></PageTransition>} />
          <Route path="/trip/lisbon/settle" element={<PageTransition direction={direction}><SettleUpScreen /></PageTransition>} />
          <Route path="/trip/lisbon/pay" element={<PageTransition direction={direction}><PayScreen /></PageTransition>} />
          <Route path="/trips/new" element={<PageTransition direction={direction}><NewTripScreen /></PageTransition>} />
          <Route path="*" element={<PageTransition direction={direction}><HomeScreen /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <TripSheets />
      <OverlayHost />
      <Toast />
    </PhoneFrame>
  );
}
