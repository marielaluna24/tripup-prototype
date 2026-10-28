import { Bell, Calendar, Music, Mountain, Plus, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { InboxSheet } from "../components/InboxSheet";
import { TripCoverLisbon } from "../art/TripCover";
import { AvatarStack } from "../components/AvatarStack";
import { OTHER_TRIPS } from "../data/trips";
import { NEEDS_YOU_COUNT } from "../data/inbox";
import { useDemo } from "../state/DemoContext";
import {
  getAllSquaredUp,
  getDinnerCardStatus,
  getPeopleCount,
  getPeopleIds,
  getYourBalance,
  formatEUR,
} from "../state/selectors";
import styles from "./HomeScreen.module.css";

export function HomeScreen() {
  const { state } = useDemo();
  const navigate = useNavigate();
  const [inboxOpen, setInboxOpen] = useState(false);

  const peopleIds = getPeopleIds(state);
  const peopleCount = getPeopleCount(state);
  const balance = getYourBalance(state);
  const squared = getAllSquaredUp(state) && state.dinner.logged;
  const dinnerStatus = getDinnerCardStatus(state);

  const nextUp =
    dinnerStatus === "not-decided"
      ? "Dinner · not decided"
      : dinnerStatus === "poll-open"
        ? "Dinner · poll open"
        : "Dinner · Taberna da Rua";

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.greeting}>Hi Ari</div>
          <h1 className={styles.h1}>Your trips</h1>
        </div>
        <div className={styles.topRight}>
          <button
            type="button"
            className={styles.bellBtn}
            onClick={() => setInboxOpen(true)}
            aria-label={`Notifications, ${NEEDS_YOU_COUNT} need you`}
          >
            <Bell size={19} aria-hidden="true" />
            <span className={styles.badge} aria-hidden="true">{NEEDS_YOU_COUNT}</span>
          </button>
          <button type="button" className={styles.profileBtn} aria-label="Profile">
            AR
          </button>
        </div>
      </div>

      <div className={`${styles.scroll} scroll-area`}>
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Happening now</span>
          <div
            className={styles.heroCard}
            role="link"
            tabIndex={0}
            onClick={() => navigate("/trip/lisbon/plan")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/trip/lisbon/plan");
              }
            }}
            aria-label="Open Lisbon trip"
          >
            <div className={styles.heroCover}>
              <TripCoverLisbon />
              <span className={`${styles.heroBadge} ${squared ? styles.settled : ""}`}>
                {squared ? "All settled" : "Day 4 of 4 · Today"}
              </span>
            </div>
            <div className={styles.heroBody}>
              <div className={styles.heroTitleRow}>
                <div>
                  <div className={styles.heroTitle}>Lisbon</div>
                  <div className={styles.heroSub}>
                    <span className={styles.heroSubItem}>
                      <Calendar size={13} aria-hidden="true" />
                      Oct 9 – 12
                    </span>
                    <span className={styles.heroSubItem}>
                      <Users size={13} aria-hidden="true" />
                      {peopleCount} people
                    </span>
                  </div>
                </div>
                <AvatarStack ids={peopleIds} max={3} borderOn="light" />
              </div>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statLabel}>Next up</div>
                  <div className={styles.statValue}>{nextUp}</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statLabel}>Your balance</div>
                  <div className={`${styles.statValue} ${!squared && balance < 0 ? styles.owe : !squared && balance > 0 ? styles.owed : ""}`}>
                    {squared || balance === 0 ? "All settled" : balance < 0 ? `You owe ${formatEUR(balance)}` : `You're owed ${formatEUR(balance)}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Upcoming</span>
          {OTHER_TRIPS.filter((t) => t.status === "upcoming").map((trip) => (
            <div className={styles.tripRow} key={trip.id}>
              <div className={styles.tripArt} style={{ background: "var(--illus-blue-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {trip.id === "innsbruck" ? (
                  <Mountain size={22} color="var(--illus-green)" aria-hidden="true" />
                ) : (
                  <Music size={22} color="var(--illus-pink-deep)" aria-hidden="true" />
                )}
              </div>
              <div className={styles.tripInfo}>
                <div className={styles.tripName}>
                  {trip.name}
                  {trip.destination ? ` · ${trip.destination}` : ""}
                </div>
                <div className={styles.tripMeta}>
                  {trip.dateRange} · {trip.peopleLabel}
                  {trip.note ? ` · ${trip.note}` : ""}
                </div>
              </div>
              <div className={styles.tripWhen}>{trip.whenLabel}</div>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Past</span>
          {OTHER_TRIPS.filter((t) => t.status === "past").map((trip) => (
            <div className={styles.tripRow} key={trip.id}>
              <div className={styles.tripArt} style={{ background: "var(--illus-cream-deep)" }} />
              <div className={styles.tripInfo}>
                <div className={styles.tripName}>{trip.name}</div>
                <div className={styles.tripMeta}>
                  {trip.dateRange} · {trip.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className={styles.newTripFloat} onClick={() => navigate("/trips/new")}>
        <Plus size={18} aria-hidden="true" />
        New trip
      </button>

      <AnimatePresence>
        {inboxOpen && <InboxSheet onClose={() => setInboxOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
