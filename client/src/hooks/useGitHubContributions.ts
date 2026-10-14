import { useEffect, useRef, useState } from "react";
import snapshot from "@/data/github-contributions-2026.json";
import {
  isContributionCalendar,
  type ContributionCalendar,
} from "@shared/contributions";
const KEY = "vlr:contribution-calendar:v1";
const TTL = 60 * 60 * 1000;
function stored() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (
      saved &&
      Number.isFinite(saved.checkedAt) &&
      saved.checkedAt <= Date.now() &&
      isContributionCalendar(saved.calendar)
    )
      return saved;
  } catch {
    /* Storage is optional. */
  }
  return null;
}
export function useGitHubContributions() {
  const ref = useRef<HTMLDivElement>(null);
  const [calendar, setCalendar] = useState<ContributionCalendar>(
    () => stored()?.calendar ?? (snapshot as ContributionCalendar)
  );
  const [status, setStatus] = useState("snapshot");
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let active = true;
    const controller = new AbortController();
    let timer = 0;
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        const saved = stored();
        if (saved && Date.now() - saved.checkedAt < TTL) {
          setCalendar(saved.calendar);
          setStatus("cached");
          return;
        }
        timer = window.setTimeout(() => controller.abort(), 9000);
        fetch("/api/github-contributions", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })
          .then(async response => {
            if (
              !response.ok ||
              !response.headers
                .get("content-type")
                ?.includes("application/json")
            )
              throw new Error("Unavailable calendar");
            const data = await response.json();
            if (
              !isContributionCalendar(data.calendar) ||
              !["fresh", "cached", "stale", "snapshot"].includes(data.status)
            )
              throw new Error("Invalid calendar");
            if (!active) return;
            setCalendar(data.calendar);
            setStatus(data.status);
            try {
              localStorage.setItem(
                KEY,
                JSON.stringify({
                  calendar: data.calendar,
                  checkedAt: Date.now(),
                })
              );
            } catch {
              /* Bundled snapshot remains available. */
            }
          })
          .catch(() => {
            if (active) setStatus("snapshot");
          })
          .finally(() => clearTimeout(timer));
      },
      { rootMargin: "250px" }
    );
    observer.observe(element);
    return () => {
      active = false;
      observer.disconnect();
      clearTimeout(timer);
      controller.abort();
    };
  }, []);
  return { ref, calendar, status };
}
