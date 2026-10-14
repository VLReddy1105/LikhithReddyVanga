import type { IncomingMessage, ServerResponse } from "node:http";
import snapshot from "../client/src/data/github-contributions-2026.json";
import {
  isContributionCalendar,
  type ContributionCalendar,
} from "../shared/contributions";

export const CONTRIBUTION_QUERY = `query PortfolioCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
  viewer { login }
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;
const levels: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};
/** Allowlist only aggregate fields, even if upstream unexpectedly supplies confidential metadata. */
export function sanitizeCalendar(
  raw: any,
  fetchedAt = new Date().toISOString()
): ContributionCalendar {
  if (raw?.errors?.length || raw?.data?.viewer?.login !== "VLReddy1105")
    throw new Error("Unavailable authorized calendar");
  const collection = raw.data.user?.contributionsCollection;
  const calendar = collection?.contributionCalendar;
  if (!Array.isArray(calendar?.weeks)) throw new Error("Invalid calendar");
  const days = calendar.weeks
    .flatMap((week: any) => {
      if (!Array.isArray(week?.contributionDays))
        throw new Error("Invalid calendar");
      return week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level: levels[day.contributionLevel],
      }));
    })
    .filter(
      (day: any) => typeof day.date === "string" && day.date.startsWith("2026-")
    )
    .sort((a: any, b: any) => a.date.localeCompare(b.date));
  const asOfDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(fetchedAt));
  const result: ContributionCalendar = {
    year: 2026,
    fetchedAt,
    asOfDate: asOfDate > "2026-12-31" ? "2026-12-31" : asOfDate,
    source: "https://api.github.com/graphql",
    total: calendar.totalContributions,
    restrictedCount: collection.restrictedContributionsCount,
    visibility: "authorized-calendar",
    days,
  };
  if (!isContributionCalendar(result)) throw new Error("Invalid calendar");
  return result;
}
export function createContributionsService({
  getToken = () => process.env.GITHUB_CONTRIBUTIONS_TOKEN,
  request = fetch,
  now = Date.now,
} = {}) {
  let cache: { data: ContributionCalendar; expires: number } | undefined;
  let retryAfter = 0;
  let pending:
    | Promise<{ calendar: ContributionCalendar; status: string }>
    | undefined;
  return async function getCalendar() {
    if (cache && cache.expires > now())
      return { calendar: cache.data, status: "cached" };
    const fallback = () => ({
      calendar: cache?.data ?? (snapshot as ContributionCalendar),
      status: cache ? "stale" : "snapshot",
    });
    const token = getToken();
    if (!token || retryAfter > now()) return fallback();
    if (pending) return pending;
    pending = (async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      try {
        const response = await request("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github+json",
          },
          body: JSON.stringify({
            query: CONTRIBUTION_QUERY,
            variables: {
              login: "VLReddy1105",
              from: "2026-01-01T00:00:00Z",
              to: "2026-12-31T23:59:59Z",
            },
          }),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Unavailable calendar");
        const data = sanitizeCalendar(
          await response.json(),
          new Date(now()).toISOString()
        );
        cache = { data, expires: now() + 60 * 60 * 1000 };
        retryAfter = 0;
        return { calendar: data, status: "fresh" };
      } catch {
        retryAfter = now() + 60 * 1000;
        return fallback();
      } finally {
        clearTimeout(timeout);
        controller.abort();
        pending = undefined;
      }
    })();
    return pending;
  };
}
const getCalendar = createContributionsService();
export async function contributionsHandler(
  req: Pick<IncomingMessage, "method">,
  res: Pick<ServerResponse, "setHeader" | "end"> & { statusCode: number }
) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }
  const result = await getCalendar();
  res.setHeader(
    "Cache-Control",
    result.status === "fresh" || result.status === "cached"
      ? "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400"
      : "public, max-age=60, s-maxage=60"
  );
  res.statusCode = 200;
  res.end(JSON.stringify(result));
}
