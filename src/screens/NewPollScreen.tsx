import { ChevronDown, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { SheetHeader } from "../components/SheetHeader";
import { POLL_OPTIONS, POLL_CLOSES_LABEL, POLL_QUESTION } from "../data/plan";
import { useEnsureRenAdded } from "../hooks/useEnsureRenAdded";
import { useDemo } from "../state/DemoContext";
import styles from "./NewPollScreen.module.css";

const ART_BG: Record<string, string> = {
  taberna: "var(--illus-terracotta)",
  rooftop: "var(--illus-pink)",
  ramiro: "var(--illus-blue-soft)",
};

export function NewPollScreen() {
  const navigate = useNavigate();
  const { dispatch } = useDemo();
  useEnsureRenAdded();
  const [pollType, setPollType] = useState<"places" | "simple">("places");
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [hideNames, setHideNames] = useState(false);

  function notAvailable() {
    dispatch({ type: "SHOW_TOAST", toast: { message: "Not part of this demo" } });
  }

  function handleCreate() {
    dispatch({ type: "CREATE_POLL" });
    navigate("/trip/lisbon/polls/dinner");
  }

  return (
    <div className={styles.screen}>
      <SheetHeader title="New poll" cancelTo="/trip/lisbon/plan" closeIcon />
      <div className={`${styles.scroll} scroll-area`}>
        <div className={styles.typeToggle} role="tablist" aria-label="Poll type">
          <button
            type="button"
            role="tab"
            aria-selected={pollType === "places"}
            className={`${styles.typeOpt} ${pollType === "places" ? styles.active : ""}`}
            onClick={() => setPollType("places")}
          >
            Places
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={pollType === "simple"}
            className={`${styles.typeOpt} ${pollType === "simple" ? styles.active : ""}`}
            onClick={() => setPollType("simple")}
          >
            Simple
          </button>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="poll-question">Question</label>
          <input id="poll-question" className={styles.input} defaultValue={POLL_QUESTION} />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Options · {POLL_OPTIONS.length} of 5</span>
          <div className={styles.searchRow}>
            <input
              className={styles.input}
              placeholder="Search restaurant, beach, bar…"
              aria-label="Search a place to add"
            />
            <button type="button" className={styles.suggestBtn} onClick={notAvailable}>
              <Sparkles size={14} style={{ marginRight: 4, verticalAlign: -2 }} aria-hidden="true" />
              Suggest
            </button>
          </div>

          {POLL_OPTIONS.map((opt) => (
            <div className={styles.optionCard} key={opt.id}>
              <div className={styles.optionArt} style={{ background: ART_BG[opt.id] }} aria-hidden="true">
                {opt.price}
              </div>
              <div className={styles.optionBody}>
                <div className={styles.optionTop}>
                  <span className={styles.optionName}>{opt.name}</span>
                </div>
                <div className={styles.optionMeta}>{opt.tagline}</div>
                <div className={styles.optionMeta}>{opt.walk} · {opt.hours}</div>
              </div>
              <button
                type="button"
                className={styles.removeBtn}
                aria-label={`Remove ${opt.name}`}
                onClick={notAvailable}
              >
                <X size={15} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        <section className={styles.settingsSection} aria-label="Poll settings">
          <div className={styles.settingsTitle}>Settings</div>
          <div className={styles.settingRow}>
            <span className={styles.settingLabel}>Winner is linked to</span>
            <button type="button" className={styles.settingValue} onClick={notAvailable}>
              Dinner · Sun 20:30 <ChevronDown size={14} aria-hidden="true" />
            </button>
          </div>
          <div className={styles.settingRow}>
            <span className={styles.settingLabel}>Poll closes</span>
            <button type="button" className={styles.settingValue} onClick={notAvailable}>
              Today {POLL_CLOSES_LABEL} <ChevronDown size={14} aria-hidden="true" />
            </button>
          </div>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Allow multiple answers</span>
            <button
              type="button"
              className={`${styles.switch} ${allowMultiple ? styles.on : ""}`}
              role="switch"
              aria-checked={allowMultiple}
              aria-label="Allow multiple answers"
              onClick={() => setAllowMultiple((v) => !v)}
            >
              <span className={styles.knob} />
            </button>
          </div>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Hide voter names</span>
            <button
              type="button"
              className={`${styles.switch} ${hideNames ? styles.on : ""}`}
              role="switch"
              aria-checked={hideNames}
              aria-label="Hide voter names"
              onClick={() => setHideNames((v) => !v)}
            >
              <span className={styles.knob} />
            </button>
          </div>
        </section>
      </div>

      <div className={styles.footer}>
        <span className={styles.footerSummary}>Fills Dinner · Sun 20:30 · closes {POLL_CLOSES_LABEL} · Edit</span>
        <Button variant="main-cta" onClick={handleCreate}>
          Create poll
        </Button>
      </div>
    </div>
  );
}
