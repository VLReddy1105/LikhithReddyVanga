import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, GitCommitHorizontal, LockKeyhole } from "lucide-react";
import { useGitHubContributions } from "@/hooks/useGitHubContributions";
import type { ContributionCalendar } from "@shared/contributions";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const formatDate = (date: string, short = false) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: short ? "short" : "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(new Date(date));
function CalendarGrid({ calendar }: { calendar: ContributionCalendar }) {
  const offset = new Date(`${calendar.year}-01-01T12:00:00Z`).getUTCDay();
  const last = calendar.days.findLastIndex(
    day => day.date <= calendar.asOfDate
  );
  const initial = Math.max(
    0,
    calendar.days.findLastIndex(
      day => day.date <= calendar.asOfDate && day.count > 0
    )
  );
  const [selected, setSelected] = useState(initial);
  const [hovered, setHovered] = useState<number | null>(null);
  const tooltipId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const weeks = Array.from(
    { length: Math.ceil((offset + calendar.days.length) / 7) },
    (_, week) =>
      Array.from({ length: 7 }, (_, weekday) => {
        const index = week * 7 + weekday - offset;
        return index >= 0 && index < calendar.days.length ? index : null;
      })
  );
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      element.scrollLeft = Math.max(
        0,
        (Math.floor((offset + initial) / 7) / weeks.length) *
          element.scrollWidth -
          element.clientWidth / 2
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [initial, offset, weeks.length]);
  const label = (index: number) =>
    `${formatDate(calendar.days[index].date)} · ${calendar.days[index].count} ${calendar.days[index].count === 1 ? "contribution" : "contributions"}`;
  const focus = (index: number) => {
    const next = Math.max(0, Math.min(last, index));
    setSelected(next);
    refs.current[next]?.focus();
  };
  return (
    <>
      <div
        className="contribution-scroll"
        ref={scrollRef}
        role="region"
        aria-label="2026 contribution calendar; scroll horizontally on small screens"
        tabIndex={0}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="contribution-months" aria-hidden="true">
          {months.map((name, index) => (
            <span
              key={name}
              style={{
                gridColumn: `${Math.floor((offset + calendar.days.findIndex(day => day.date === `${calendar.year}-${String(index + 1).padStart(2, "0")}-01`)) / 7) + 1} / span 3`,
              }}
            >
              {name}
            </span>
          ))}
        </div>
        <div
          className="contribution-grid"
          role="grid"
          aria-label="Verified GitHub contributions for 2026"
        >
          {weeks.map((week, index) => (
            <div className="contribution-week" role="row" key={index}>
              {week.map((dayIndex, weekday) =>
                dayIndex === null ? (
                  <span
                    role="gridcell"
                    className="contribution-blank"
                    key={weekday}
                  />
                ) : (
                  <button
                    type="button"
                    role="gridcell"
                    key={weekday}
                    className={`contribution-day level-${calendar.days[dayIndex].level}${dayIndex > last ? " is-future" : ""}`}
                    ref={node => {
                      refs.current[dayIndex] = node;
                    }}
                    tabIndex={dayIndex === selected ? 0 : -1}
                    disabled={dayIndex > last}
                    aria-label={
                      dayIndex > last
                        ? `${calendar.days[dayIndex].date} · after snapshot date`
                        : label(dayIndex)
                    }
                    aria-selected={dayIndex === selected}
                    aria-describedby={
                      hovered === dayIndex ? tooltipId : undefined
                    }
                    title={
                      dayIndex > last ? "After snapshot date" : label(dayIndex)
                    }
                    onMouseEnter={() => setHovered(dayIndex)}
                    onFocus={() => {
                      setSelected(dayIndex);
                      setHovered(dayIndex);
                    }}
                    onBlur={() => setHovered(null)}
                    onClick={() => setSelected(dayIndex)}
                    onKeyDown={event => {
                      const steps: Record<string, number> = {
                        ArrowLeft: -7,
                        ArrowRight: 7,
                        ArrowUp: -1,
                        ArrowDown: 1,
                      };
                      if (event.key in steps) {
                        event.preventDefault();
                        focus(dayIndex + steps[event.key]);
                      } else if (event.key === "Home" || event.key === "End") {
                        event.preventDefault();
                        focus(event.key === "Home" ? 0 : last);
                      } else if (event.key === "Escape") setHovered(null);
                    }}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="contribution-footer">
        <p aria-live="polite">{label(selected)}</p>
        <div className="contribution-legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <i className={`level-${level}`} key={level} />
          ))}
          <span>More</span>
        </div>
      </div>
      {hovered !== null && hovered <= last && (
        <div id={tooltipId} role="tooltip" className="contribution-tooltip">
          {label(hovered)}
        </div>
      )}
    </>
  );
}
export default function GitHubContributions() {
  const { ref, calendar, status } = useGitHubContributions();
  return (
    <div className="contribution-panel" ref={ref}>
      <div className="contribution-heading">
        <h4>
          <GitCommitHorizontal size={15} aria-hidden="true" />
          2026 contributions
        </h4>
        <span>
          <strong>{calendar.total}</strong> contributions
        </span>
      </div>
      <CalendarGrid calendar={calendar} key={calendar.fetchedAt} />
      {calendar.restrictedCount > 0 && (
        <p className="contribution-privacy">
          <LockKeyhole size={13} aria-hidden="true" />
          Includes {calendar.restrictedCount} anonymized private/internal
          contributions
        </p>
      )}
      <p className="social-note">
        {status === "fresh"
          ? "Updated GitHub calendar"
          : status === "cached"
            ? "Cached GitHub calendar"
            : status === "stale"
              ? "Last verified GitHub calendar"
              : "Verified GitHub snapshot"}{" "}
        · {formatDate(calendar.fetchedAt, true)}. Future dates are pending.
      </p>
      <p className="contribution-scope">
        {calendar.visibility === "authorized-calendar"
          ? "Public and authorized private activity · counts only, no repository details."
          : "Public-profile calendar. Private counts depend on GitHub permissions and contribution settings."}
      </p>
      <a
        className="text-link contribution-source"
        href="https://github.com/VLReddy1105"
        target="_blank"
        rel="noopener noreferrer"
      >
        View GitHub profile <ArrowUpRight size={13} aria-hidden="true" />
      </a>
    </div>
  );
}
