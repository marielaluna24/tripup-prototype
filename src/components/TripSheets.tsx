import { AnimatePresence } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDemo } from "../state/DemoContext";
import { AddMemberSheet } from "./AddMemberSheet";
import { BalancesSheet } from "./BalancesSheet";

// Rendered as a sibling of the routed page tree (see App.tsx), not nested
// inside TripScreen/PageTransition: a sheet opening while a route's own
// scalePop/push entrance is still settling would otherwise inherit that
// still-animating transform and visibly warp/overlap with it (reproduced by
// tapping "+" to add a member right after the Home -> Trip pop-in). Same
// reason OverlayHost and Toast live at this level instead of inside a
// screen.
export function TripSheets() {
  const { dispatch } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
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
    </>
  );
}
