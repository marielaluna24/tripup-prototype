import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PeopleSheet } from "../components/PeopleSheet";
import { TabRow } from "../components/TabRow";
import { TripHeader } from "../components/TripHeader";
import { PEOPLE } from "../data/people";
import { POLL_OPTIONS, POLL_QUESTION } from "../data/plan";
import { useScrollCollapse } from "../hooks/useScrollCollapse";
import { useEnsureRenAdded } from "../hooks/useEnsureRenAdded";
import { useDemo } from "../state/DemoContext";
import {
  getExpensesTabDot,
  getPeopleCount,
  getPeopleIds,
  getPollTallies,
  getPollsTabDot,
  getVotedCount,
  getWaitingOn,
  getYourVoteOptionId,
} from "../state/selectors";
import styles from "./PollsTabScreen.module.css";

const SEG_COLORS = ["#1A1A1A", "#D8D8D8", "#EDEDED"];

export function PollsTabScreen() {
  const { state } = useDemo();
  const navigate = useNavigate();
  useEnsureRenAdded();
  const { ref, collapsed } = useScrollCollapse<HTMLDivElement>();
  const [peopleOpen, setPeopleOpen] = useState(false);

  const peopleIds = getPeopleIds(state);
  const dinnerOpen = state.poll.status === "open";
  const dinnerClosed = state.poll.status === "closed";
  const tallies = getPollTallies(state);
  const total = Math.max(1, tallies.reduce((s, t) => s + t.count, 0));
  const voted = getYourVoteOptionId(state) !== null;
  const waiting = getWaitingOn(state);

  const openCount = (dinnerOpen ? 1 : 0) + 1; // + the static "Airport" mock poll
  const decidedCount = (dinnerClosed ? 1 : 0) + 2; // + the two static mock decided polls

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
          <TabRow active="polls" tripId="lisbon" pollsDot={getPollsTabDot(state)} expensesDot={getExpensesTabDot(state)} />
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Open · {openCount}</span>

          {dinnerOpen && (
            <button type="button" className={styles.pollCard} onClick={() => navigate("/trip/lisbon/polls/dinner")}>
              <span className={styles.pollEyebrow}>Fills Dinner 20:30</span>
              <span className={styles.pollQuestion}>{POLL_QUESTION}</span>
              <span className={styles.pollLeading}>
                {POLL_OPTIONS.find((o) => o.id === tallies.find((t) => t.leading)?.optionId)?.name ?? "No votes yet"} leading
                {" · "}
                {tallies.find((t) => t.leading)?.count ?? 0} votes
              </span>
              <div className={styles.miniBars} aria-hidden="true">
                {tallies.map((t, i) => (
                  <div
                    key={t.optionId}
                    className={styles.miniBarSeg}
                    style={{ width: `${Math.max(2, (t.count / total) * 100)}%`, background: SEG_COLORS[i] }}
                  />
                ))}
              </div>
              <div className={styles.pollFooter}>
                <span>
                  {getVotedCount(state)} of {getPeopleCount(state)} voted
                  {waiting.length > 0 ? ` · waiting on ${PEOPLE[waiting[0]].name}` : ""}
                </span>
                {voted && <span className={styles.votedTag}>✓ You voted</span>}
              </div>
            </button>
          )}

          <button
            type="button"
            className={styles.pollCard}
            onClick={() => navigate("/trip/lisbon/polls/dinner")}
            aria-label="Airport tomorrow: taxi or metro? Simple poll, you voted."
          >
            <span className={styles.pollEyebrow}>By Mia · Simple · closes 22:00</span>
            <span className={styles.pollQuestion}>Airport tomorrow: taxi or metro?</span>
            <div className={styles.miniBars} aria-hidden="true">
              <div className={styles.miniBarSeg} style={{ width: "75%", background: "#1A1A1A" }} />
              <div className={styles.miniBarSeg} style={{ width: "25%", background: "#D8D8D8" }} />
            </div>
            <div className={styles.pollFooter}>
              <span>Metro · 3 &nbsp;&nbsp; Taxi · 1</span>
              <span className={styles.votedTag}>✓ You voted</span>
            </div>
          </button>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Decided · {decidedCount}</span>

          {dinnerClosed && (
            <div className={styles.decidedCard}>
              <span className={styles.decidedQuestion}>{POLL_QUESTION}</span>
              <span className={styles.decidedResult}>
                {POLL_OPTIONS.find((o) => o.id === state.poll.winnerId)?.name} won · added to Sun
              </span>
            </div>
          )}
          <div className={styles.decidedCard}>
            <span className={styles.decidedQuestion}>Sintra: palace or castle?</span>
            <span className={styles.decidedResult}>Pena Palace won 4–1 · added to Sat</span>
          </div>
          <div className={styles.decidedCard}>
            <span className={styles.decidedQuestion}>Friday night out?</span>
            <span className={styles.decidedResult}>Bairro Alto won 3–2 · added to Fri</span>
          </div>
        </div>
      </div>

      <button type="button" className={styles.fabLink} aria-label="New poll" onClick={() => navigate("/trip/lisbon/polls/new")}>
        <Plus size={24} strokeWidth={2.5} aria-hidden="true" />
      </button>

      {peopleOpen && <PeopleSheet peopleIds={peopleIds} onClose={() => setPeopleOpen(false)} />}
    </div>
  );
}
