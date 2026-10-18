import { Route, Routes } from "react-router-dom";
import { OverlayHost } from "./components/OverlayHost";
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

export default function App() {
  return (
    <PhoneFrame>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/trip/lisbon/plan" element={<PlanScreen />} />
        <Route path="/trip/lisbon/add-member" element={<PlanScreen addMemberSheet />} />
        <Route path="/trip/lisbon/polls" element={<PollsTabScreen />} />
        <Route path="/trip/lisbon/polls/new" element={<NewPollScreen />} />
        <Route path="/trip/lisbon/polls/dinner" element={<LiveVotesScreen />} />
        <Route path="/trip/lisbon/expenses" element={<ExpensesScreen />} />
        <Route path="/trip/lisbon/expenses/new" element={<AddExpenseScreen />} />
        <Route path="/trip/lisbon/balances" element={<ExpensesScreen balancesSheet />} />
        <Route path="/trip/lisbon/settle" element={<SettleUpScreen />} />
        <Route path="/trip/lisbon/pay" element={<PayScreen />} />
        <Route path="/trips/new" element={<NewTripScreen />} />
        <Route path="*" element={<HomeScreen />} />
      </Routes>
      <OverlayHost />
      <Toast />
    </PhoneFrame>
  );
}
