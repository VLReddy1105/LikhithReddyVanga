# Social evidence

Verified 14 October 2026 using public LinkedIn/GitHub pages and official GitHub APIs. The contribution calendar was additionally verified with the existing authenticated GitHub CLI account. No credential was extracted, copied into source, or sent to the browser.

## LinkedIn

The requested profile is [Likhith Reddy Vanga](https://www.linkedin.com/in/likhithreddyvanga/). Its identity and slug are corroborated by the public author links and metadata of both supplied posts. Direct profile requests return LinkedIn HTTP 999; the exact current profile headline could not be read. The UI uses confirmed portfolio professional context instead, with `headline: null` in the editable `client/src/data/social.ts`.

1. User link `https://lnkd.in/p/dxjeRijc` resolves to the author's public ClawBio/Nebius hackathon post. Guest-readable text and JSON-LD verify authorship, a team third-place account, the cancer-target evaluation workflow, and the photo. Canonical [post](https://www.linkedin.com/posts/likhithreddyvanga_clawbio-nebius-hackathon-activity-7495802058248380416-DWAN); published **19 August 2026**, from `datePublished`.
2. User link `https://lnkd.in/p/dqkByYNz` resolves to the user's repost of a European Energy Collective Berlin Battery Hackathon recap. The guest page explicitly says “reposted this”. Canonical [repost](https://www.linkedin.com/posts/likhithreddyvanga_activity-7460262481165295616-ih28); JSON-LD records **13 May 2026** for this share. The UI explicitly labels it a repost and credits the original organization in the paraphrase. It does not attribute the organizer's results to the portfolio owner.

Images are the actual public post media URLs; no replacement imagery was generated. A failed image keeps its reserved space. Cards have independent `_blank` links to their specific canonical posts and display no reaction, comment or follower counts. “Selected public posts · manually curated” is explicit. An empty `linkedinPosts` array activates the profile-only fallback. No additional post URLs are required for the requested two-post showcase; a third is optional.

## GitHub profile and repositories

Official API sources: `api.github.com/users/VLReddy1105`, `/users/VLReddy1105/repos?per_page=100&sort=updated`, `/users/VLReddy1105/events/public?per_page=30`.

- Name, bio, avatar, languages and star counts were retrieved from these public responses.
- Requested order: [nebius-survivor](https://github.com/VLReddy1105/nebius-survivor), [LLM-Interpretability](https://github.com/VLReddy1105/LLM-Interpretability), [nextgen](https://github.com/VLReddy1105/nextgen).
- Retrieved primary languages: Python, TypeScript, TypeScript. Snapshot stars: 0, 1, 0. These are dated snapshots; successful runtime API reads refresh them.
- Repository API descriptions were null. Additional project context is curated from verified README/portfolio/post evidence and is not represented as a literal GitHub description. `nebius-survivor` includes the upstream ClawBio README; no claim of sole authorship of that library is made. Traceform is distinguished from the private Qwen3 visualization lab.
- Recent public activity is restricted to the selected repository allowlist, so removed client projects cannot reappear through events. Only retrieved events are shown; GitHub's event-delay limitation is stated.
- Public requests start when the social section approaches the viewport, have an eight-second timeout, share an in-flight promise, and cache results/checks for one hour. Rate-limited/failed checks also receive a cooldown. Validated cached data or the verified bundled snapshot remains usable if the API fails. No token is present in frontend code.

## 2026 contributions

The previous unauthenticated calendar contained 47 public contributions. A genuine authenticated GraphQL `contributionsCollection` / `contributionCalendar` read for the existing `VLReddy1105` account returned **140 contributions**, including **93 restricted/private/internal contributions**, on 14 October 2026 (Berlin time). The saved `client/src/data/github-contributions-2026.json` contains 365 unique sequential dates; their exact counts sum to 140. Restricted contributions are already included in the calendar total and are not added twice. Density levels are GitHub's supplied five levels, recolored with the portfolio palette.

Only viewer identity, restricted aggregate, calendar total, dates, counts and intensity were requested. No private repository names, code or commit messages were requested or stored. The public profile and selected repository previews remain public REST data. The contribution panel explicitly identifies combined authorized activity and anonymized counts.

`server/githubContributions.ts` supports a server-only `GITHUB_CONTRIBUTIONS_TOKEN`, validates the owner and allowlists aggregates. One-hour caching, shared requests, an eight-second timeout, one-minute failure cooldown and last-good/bundled fallback are implemented. No runtime token has been configured locally: the verified combined snapshot remains visible and dated. Vite dev/preview, Express and Vercel expose the same GET endpoint; the client caches validated aggregates for one hour.

Future dates are pending and disabled. Arrow keys move between days/weeks; Home/End move to the available range. Narrow screens scroll within the calendar near the latest active period. Tooltips display the exact date/count. The header, profile name and CTA link directly to the actual GitHub profile.

Official references: [ContributionsCollection and ContributionCalendar](https://docs.github.com/en/graphql/reference/users), [GraphQL authentication](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql), [private contribution visibility](https://docs.github.com/en/account-and-profile/how-tos/contribution-settings/manage-visibility-settings-for-private-contributions-and-achievements).
