import { useEffect } from "react";
import { useDemo } from "../state/DemoContext";

/**
 * Deep-link safety net: every screen from step 3 onward (poll, expenses,
 * settle up, pay) assumes Ren has already joined, per the scenario. A PM
 * opening one of those routes directly — skipping the Add Ren step — still
 * sees the canonical 6-person trip rather than a silently incomplete one.
 * No toast fires; this is a silent correction, not a scenario event.
 */
export function useEnsureRenAdded() {
  const { dispatch } = useDemo();
  useEffect(() => {
    dispatch({ type: "ENSURE_REN_ADDED" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
