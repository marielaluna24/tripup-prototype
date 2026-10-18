import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import { createInitialState } from "./initialState";
import { reducer, type Action } from "./reducer";
import type { DemoState } from "./types";

interface DemoContextValue {
  state: DemoState;
  dispatch: React.Dispatch<Action>;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
