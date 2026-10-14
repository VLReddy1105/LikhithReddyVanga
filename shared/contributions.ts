export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}
export interface ContributionCalendar {
  year: number;
  fetchedAt: string;
  asOfDate: string;
  source: string;
  total: number;
  restrictedCount: number;
  visibility: "public-profile" | "authorized-calendar";
  days: ContributionDay[];
}
export function isContributionCalendar(
  value: unknown
): value is ContributionCalendar {
  const d = value as ContributionCalendar;
  if (
    !d ||
    d.year !== 2026 ||
    !Number.isFinite(Date.parse(d.fetchedAt)) ||
    !/^2026-\d{2}-\d{2}$/.test(d.asOfDate) ||
    ![
      "https://api.github.com/graphql",
      "https://github.com/users/VLReddy1105/contributions?from=2026-01-01&to=2026-12-31",
    ].includes(d.source) ||
    !["public-profile", "authorized-calendar"].includes(d.visibility) ||
    !Number.isSafeInteger(d.total) ||
    d.total < 0 ||
    !Number.isSafeInteger(d.restrictedCount) ||
    d.restrictedCount < 0 ||
    d.restrictedCount > d.total ||
    !Array.isArray(d.days) ||
    d.days.length !== 365
  )
    return false;
  return (
    d.days.every(
      (day, i) =>
        day?.date ===
          new Date(Date.UTC(2026, 0, i + 1)).toISOString().slice(0, 10) &&
        Number.isSafeInteger(day.count) &&
        day.count >= 0 &&
        Number.isInteger(day.level) &&
        day.level >= 0 &&
        day.level <= 4 &&
        (day.date <= d.asOfDate || day.count === 0)
    ) && d.days.reduce((sum, day) => sum + day.count, 0) === d.total
  );
}
