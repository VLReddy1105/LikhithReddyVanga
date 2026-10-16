import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import "./digital-twin.css";
import { useIsMobile } from "@/hooks/useMobile";

/** One procedural environment. No inference, telemetry or external model connection. */
export default function DigitalTwin() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const { theme } = useTheme();
  useEffect(() => {
    const element = host.current;
    if (!element || reduced) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      import("./digitalTwinScene")
        .then(({ mountDigitalTwin }) => {
          if (disposed) return;
          cleanup = mountDigitalTwin(element, theme, () => setReady(false));
          setReady(Boolean(cleanup));
        })
        .catch(() => setReady(false));
    }, 900);
    return () => {
      disposed = true;
      window.clearTimeout(timer);
      cleanup?.();
      setReady(false);
    };
  }, [reduced, theme, mobile]);
  return (
    <div
      className={`digital-twin ${ready ? "is-ready" : ""}`}
      aria-hidden="true"
      ref={host}
      data-renderer={ready ? "webgl" : "static"}
    >
      <div className="twin-static">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
