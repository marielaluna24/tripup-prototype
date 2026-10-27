import { useEffect, useRef, useState, type RefObject } from "react";

/** Tracks whether a scroll container has scrolled past `threshold`, for the
 * trip header's collapse-to-compact-bar behavior (CLAUDE.md § Trip header). */
export function useScrollCollapse<T extends HTMLElement>(
  threshold = 90
): { ref: RefObject<T>; collapsed: boolean } {
  const ref = useRef<T>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Hysteresis, not a single threshold: collapsing the header hands the
    // scroll container ~180px of extra room, which can clamp scrollTop back
    // below `threshold` and immediately re-expand it — an infinite flicker
    // right at the boundary. Expanding again only once scrolled essentially
    // back to the top breaks that feedback loop.
    const onScroll = () => {
      if (el.scrollTop > threshold) setCollapsed(true);
      else if (el.scrollTop <= 4) setCollapsed(false);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { ref, collapsed };
}
