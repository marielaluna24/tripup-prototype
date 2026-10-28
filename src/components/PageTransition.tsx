import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type Direction = 1 | -1 | 0;
type Variant = "push" | "scalePop";

// direction > 0: drilling in (e.g. Expenses -> Settle up) — new screen
// pushes in from the right, on top, while the old screen drifts left and
// dims slightly
// (parallax) underneath, like an iOS push. direction < 0: the reverse
// (popping back) — the old screen stays on top and slides fully away to the
// right, revealing the dimmed previous screen from underneath on the left.
// direction === 0: lateral move between sibling screens at the same depth
// (e.g. switching trip tabs by URL) — a plain cross-fade, no horizontal
// motion or stacking, since neither screen is spatially behind the other.
// zIndex is part of each variant (not a static style) because which screen
// belongs on top flips with direction.
const pushVariants = {
  initial: (direction: Direction) => ({
    x: direction === 0 ? 0 : direction > 0 ? "100%" : "-30%",
    opacity: direction === 0 ? 0 : direction > 0 ? 1 : 0.6,
    zIndex: direction < 0 ? 0 : 1,
  }),
  animate: (direction: Direction) => ({
    x: "0%",
    opacity: 1,
    zIndex: direction < 0 ? 0 : 1,
  }),
  exit: (direction: Direction) => ({
    x: direction === 0 ? 0 : direction > 0 ? "-30%" : "100%",
    opacity: direction === 0 ? 0 : direction > 0 ? 0.6 : 1,
    zIndex: direction < 0 ? 1 : 0,
  }),
};

// scalePop: for a screen that feels like it grows open from the center
// rather than sliding in spatially — e.g. Home -> Trip (tapping the Lisbon
// card), or New poll from the Dinner card's "Start a poll". No horizontal
// motion or parallax, just a bouncy scale+fade in (scale's transform-origin
// defaults to center, so it grows from the middle of the screen, not a
// corner). Dismissing (back to Home/Plan, or forward past this screen)
// shrinks back out with a quick, non-bouncy fade instead of bouncing, same
// rule as the bottom sheet: entering responds to the tap that opened it,
// leaving shouldn't bounce back.
const scalePopVariants = {
  initial: { opacity: 0, scale: 0.85, zIndex: 1 },
  animate: { opacity: 1, scale: 1, zIndex: 1 },
  exit: { opacity: 0, scale: 0.92, zIndex: 1 },
};

const baseStyle = { position: "absolute", inset: 0, display: "flex", flexDirection: "column" } as const;

export function PageTransition({
  children,
  direction,
  variant = "push",
}: {
  children: ReactNode;
  direction: Direction;
  variant?: Variant;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div style={baseStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
        {children}
      </motion.div>
    );
  }

  if (variant === "scalePop") {
    return (
      <motion.div
        style={baseStyle}
        initial={scalePopVariants.initial}
        animate={{ ...scalePopVariants.animate, transition: { type: "spring", bounce: 0.4, duration: 0.5 } }}
        exit={{ ...scalePopVariants.exit, transition: { type: "spring", bounce: 0, duration: 0.22 } }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      style={baseStyle}
      custom={direction}
      variants={pushVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", bounce: 0, duration: 0.38 }}
    >
      {children}
    </motion.div>
  );
}
