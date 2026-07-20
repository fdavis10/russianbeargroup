import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** True on mobile / coarse pointer / prefers-reduced-motion — skip heavy GPU animations. */
export function useLiteMotion(): boolean {
  const reduced = useReducedMotion();
  const [coarseOrNarrow, setCoarseOrNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const sync = () => setCoarseOrNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return Boolean(reduced || coarseOrNarrow);
}
