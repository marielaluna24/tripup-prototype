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
    const onScroll = () => setCollapsed(el.scrollTop > threshold);
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { ref, collapsed };
}
