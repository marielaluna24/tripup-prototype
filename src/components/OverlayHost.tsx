import { useNavigate } from "react-router-dom";
import { useDemo } from "../state/DemoContext";
import { InAppBanner } from "./InAppBanner";
import { PushNotification } from "./PushNotification";

export function OverlayHost() {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  const current = state.overlayQueue[0];

  if (!current) return null;

  function dequeue() {
    dispatch({ type: "DEQUEUE_OVERLAY" });
  }

  if (current.kind === "poll-push") {
    return (
      <PushNotification
        key={current.id}
        perspectiveLabel="Nic's phone (and everyone else's)"
        time="19:12"
        date="Sunday, October 12"
        title="Ari started a poll"
        body="Where should we eat tonight? Taberna da Rua, Park Rooftop or Cervejaria Ramiro · closes 19:30"
        primaryActionLabel="Vote"
        onPrimaryAction={() => {
          dequeue();
          navigate("/trip/lisbon/polls/dinner");
        }}
        secondaryActionLabel="Remind me in 10 min"
        onSecondaryAction={dequeue}
        onContinue={dequeue}
      />
    );
  }

  if (current.kind === "poll-banner") {
    return (
      <InAppBanner
        key={current.id}
        icon="vote"
        perspectiveLabel="Nic's phone"
        title="Ari started a poll"
        sub="Where should we eat tonight? · closes 19:30"
        actionLabel="Vote"
        onAction={() => {
          dequeue();
          navigate("/trip/lisbon/polls/dinner");
        }}
        onDismiss={dequeue}
      />
    );
  }

  if (current.kind === "squared-push") {
    return (
      <PushNotification
        key={current.id}
        perspectiveLabel="Every member's phone"
        time="23:41"
        date="Sunday, October 12"
        title="Everyone's squared up"
        body="All 5 payments are done, €153.75 settled. Ready for the next adventure?"
        secondaryLine="TripUp · Nic paid Ben €22.50 · 2m ago"
        primaryActionLabel="View"
        onPrimaryAction={() => {
          dequeue();
          navigate("/trip/lisbon/settle");
        }}
        onContinue={dequeue}
      />
    );
  }

  // squared-banner
  return (
    <InAppBanner
      key={current.id}
      icon="check"
      title="Everyone's squared up"
      sub="All 5 payments done · €153.75"
      actionLabel="View"
      onAction={() => {
        dequeue();
        navigate("/trip/lisbon/settle");
      }}
      onDismiss={dequeue}
    />
  );
}
