import { ChevronLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { PEOPLE, type PersonId } from "../data/people";
import { POLL_OPTIONS, POLL_QUESTION } from "../data/plan";
import { useEnsureRenAdded } from "../hooks/useEnsureRenAdded";
import { useDemo } from "../state/DemoContext";
import {
  getPeopleCount,
  getPollTallies,
  getVotedCount,
  getWaitingOn,
  getYourVoteOptionId,
} from "../state/selectors";
import styles from "./LiveVotesScreen.module.css";

const VOTE_SCRIPT: { person: PersonId; optionId: string; label: string; delay: number }[] = [
  { person: "ana", optionId: "rooftop", label: "Ana just voted Park Rooftop", delay: 2200 },
  { person: "mia", optionId: "rooftop", label: "Mia just voted Park Rooftop", delay: 4400 },
  { person: "ben", optionId: "taberna", label: "Ben just voted Taberna da Rua", delay: 6800 },
  { person: "ren", optionId: "taberna", label: "Ren just voted Taberna da Rua", delay: 9200 },
];

export function LiveVotesScreen() {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  const firedRef = useRef<Set<string>>(new Set());
  useEnsureRenAdded();

  useEffect(() => {
    dispatch({ type: "ENSURE_POLL_OPEN" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.poll.status !== "open") return;
    const timers = VOTE_SCRIPT.filter((v) => !hasVoted(state.poll.votes, v.person)).map((v) =>
      setTimeout(() => {
        if (firedRef.current.has(v.person)) return;
        firedRef.current.add(v.person);
        dispatch({ type: "RECEIVE_VOTE", optionId: v.optionId, voter: v.person, label: v.label });
      }, v.delay)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tallies = getPollTallies(state);
  const maxCount = Math.max(1, ...tallies.map((t) => t.count));
  const yourVote = getYourVoteOptionId(state);
  const waiting = getWaitingOn(state);
  const votedCount = getVotedCount(state);
  const totalCount = getPeopleCount(state);

  function closePoll() {
    const top = [...tallies].sort((a, b) => b.count - a.count)[0];
    dispatch({ type: "CLOSE_POLL", winnerId: top.optionId });
    navigate("/trip/lisbon/plan");
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button type="button" className={styles.backBtn} onClick={() => navigate("/trip/lisbon/polls/new")} aria-label="Back to edit poll">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span className={styles.topTitle}>Poll</span>
        <span className={styles.liveBadge}>
          <span className={styles.liveDot} aria-hidden="true" />
          {state.poll.status === "closed" ? "Closed" : "Live"}
        </span>
      </div>

      <div className={`${styles.scroll} scroll-area`}>
        <div>
          <h1 className={styles.question}>{POLL_QUESTION}</h1>
          <div className={styles.questionMeta}>By Ari · for Dinner, Sun 20:30 · closes at 19:30 (in 18 min)</div>
        </div>

        <div className="visually-hidden" aria-live="polite">
          {state.poll.lastVoteLabel}
        </div>

        {POLL_OPTIONS.map((opt) => {
          const tally = tallies.find((t) => t.optionId === opt.id)!;
          const voters = state.poll.votes[opt.id] ?? [];
          const isMine = yourVote === opt.id;
          const pct = (tally.count / maxCount) * 100;
          return (
            <div className={`${styles.optionCard} ${isMine ? styles.mine : ""}`} key={opt.id}>
              <div className={styles.optionTop}>
                <span className={`${styles.radio} ${isMine ? styles.filled : ""}`} aria-hidden="true">
                  {isMine && <span className={styles.radioDot} />}
                </span>
                <div className={styles.optionBody}>
                  <div className={styles.optionNameRow}>
                    <span className={styles.optionName}>{opt.name}</span>
                    {tally.leading && <span className={styles.leadingTag}>LEADING</span>}
                  </div>
                  <div className={styles.optionTagline}>
                    {opt.tagline} · {opt.price} · {opt.walk.replace(" walk", "")}
                  </div>
                </div>
                <span className={`${styles.count} tnum`}>{tally.count}</span>
              </div>
              <div className={styles.track} role="img" aria-label={`${opt.name}, ${tally.count} of ${totalCount} votes`}>
                <div className={styles.fill} style={{ width: `${pct}%` }} />
              </div>
              <div className={styles.voterRow}>
                <div className={styles.voterAvatars}>
                  {voters.map((v) => (
                    <Avatar key={v} person={PEOPLE[v]} size="sm" bordered borderOn="light" />
                  ))}
                </div>
                {isMine && state.poll.status === "open" && (
                  <button
                    type="button"
                    className={styles.changeVote}
                    onClick={() => {
                      const next = POLL_OPTIONS.find((o) => o.id !== opt.id)!.id;
                      dispatch({ type: "CHANGE_VOTE", optionId: next });
                    }}
                  >
                    Change vote
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div className={styles.waitingRow}>
          <span className={styles.waitingLeft}>
            {waiting.length === 0 ? (
              <>{votedCount} of {totalCount} voted · everyone's in</>
            ) : (
              <>
                <Avatar person={PEOPLE[waiting[0]]} size="sm" excluded style={{ background: "transparent" }} />
                {votedCount} of {totalCount} voted · waiting on <strong>{PEOPLE[waiting[0]].name}</strong>
              </>
            )}
          </span>
          {waiting.length > 0 && state.poll.status === "open" && (
            <Button
              variant="card-secondary"
              onClick={() => dispatch({ type: "SHOW_TOAST", toast: { message: `Reminder sent to ${PEOPLE[waiting[0]].name}` } })}
            >
              Remind
            </Button>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <Button variant="dark-secondary" onClick={closePoll} disabled={state.poll.status === "closed"}>
          Close poll
        </Button>
        <Button variant="dark-primary" onClick={() => navigate("/trip/lisbon/plan")}>
          Go to trip
        </Button>
      </div>
    </div>
  );
}

function hasVoted(votes: Record<string, PersonId[]>, person: PersonId) {
  return Object.values(votes).some((list) => list.includes(person));
}
