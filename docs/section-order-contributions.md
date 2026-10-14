# Section order and GitHub contributions update

Implemented locally on 14 October 2026. Existing uncommitted redesign work was preserved. No commit, push or deployment was performed.

## Result

The rendered homepage is Hero → About → Experience → Updates → Work → Research → Contact → Footer. Both navigation menus use About → Experience → Updates → Work → Research → Contact. Each section occurs once, with the canonical ID; older `projects`, `social` and `skills` hashes resolve to Work, Updates and Experience. The former separate visitor-path/toolkit sections are no longer rendered in Home.

Navigation uses smooth scrolling (instant for reduced motion), sticky-header scroll margins, one active-section state, click history and manual-scroll hash synchronization. Back/forward navigation resolves the same state. The hero UI, theme toggle, cursor and shared digital twin were preserved; the hero's project button now targets `work`.

The shared 3D stage order matches the new document order. About retains the restrained hero state; Experience simplifies; Updates fades; Work expands; Research layers; Contact fades. Updates stays calm through most of its height. One canvas remains shared across all sections.

The heatmap shows genuine GraphQL calendar data: **140 contributions in 2026, including 93 anonymized private/internal contributions**, verified on 14 October 2026. Its 365 unique real dates sum to 140. Private counts are already part of the total, never added twice. Future dates remain pending. Five shades become darker with higher activity, with month labels, accessible date/count tooltips, keyboard navigation and contained horizontal scrolling on narrow screens.

Updates preserves the two supplied genuine LinkedIn post/repost cards and GitHub showcase. Header/profile/CTA links open `https://github.com/VLReddy1105`. The selected repository order remains Nebius Survivor → LLM Interpretability → NextGen. No private repository metadata is exposed.

## Changed files in this follow-up

Paths are relative to the repository. This list describes this follow-up, not the entire pre-existing Git diff.

| Area | Files |
| --- | --- |
| Composition and section navigation | `client/src/pages/Home.tsx`, `client/src/data/sections.ts` (new), `client/src/hooks/useSectionNavigation.ts` (new), `client/src/components/Navbar.tsx`, `client/src/index.css` |
| Canonical IDs and project links | `client/src/components/ProjectsSection.tsx`, `SocialSection.tsx`, `HeroSection.tsx` (target only), `ExperienceSection.tsx`, `client/src/pages/ProjectDetail.tsx`, `NotFound.tsx` |
| Shared 3D stage ordering | `client/src/components/digitalTwinScene.ts` |
| Heatmap and aggregate data | `client/src/components/GitHubContributions.tsx`, `social.css`, `client/src/hooks/useGitHubContributions.ts` (new), `client/src/data/github-contributions-2026.json`, `shared/contributions.ts` (new) |
| Server integration | `server/githubContributions.ts` (new), `server/githubContributions.test.ts` (new), `server/index.ts`, `api/github-contributions.ts` (new), `vite.config.ts` |
| Setup and evidence | `README.md`, `docs/social-evidence.md`, `docs/portfolio-delivery.md` (historical notice), this report, `docs/previews/contributions-2026-light.jpg`, `contributions-2026-dark.jpg`, `contributions-2026-mobile-dark.jpg` |

Unqualified component filenames are under `client/src/components/`; unqualified page filenames are under `client/src/pages/`; preview images are under `docs/previews/`.

## Validation

- `pnpm run check`: passed.
- `pnpm run build`: passed. Vite retains the warning for the separate lazy Three.js chunk (~542 kB); it is not a build failure.
- `pnpm exec vitest run --root . server/githubContributions.test.ts`: six tests passed, including aggregate sanitization, incorrect-owner/corrupt-calendar rejection, missing-token fallback, one-hour caching, concurrent-request deduplication and 403 last-good/cooldown behavior. Test-only fixtures are never used by the website.
- `git diff --check`: passed.
- Browser: actual DOM order, single section instances, desktop sequence, every navbar destination and ~104px sticky offset verified. Clicked back/forward, old hash aliases, manual Research → Contact scrolling, footer and active/hash synchronization verified.
- Mobile: 390px menu sequence, Work selection/menu closing, Escape focus return and offset verified. Page width stayed within viewport at 1200, 834, 390 and 320px; contribution overflow remains inside the panel.
- Light/dark: reviewed the panel, confirmed five actual CSS colors get darker with greater activity, and tested real-count keyboard tooltips and pending future dates.
- Scene: one canvas; observed About/Experience/Updates/Work/Research/Contact stage metadata. Updates and Contact opacity 0; Work and Research resume visible geometry after smooth navigation. No browser console errors.
- Links: two canonical LinkedIn post/repost URLs and profile, GitHub profile header/name/CTAs, and all three repository links verified in rendered DOM.
- Accuracy/privacy: authenticated GitHub response sanitized and validated; 365 dates sum to 140 with 93 restricted contributions. Local API fallback exactly equals this verified snapshot. Client production assets contain neither the server token variable nor the GraphQL query/restricted upstream field names or test token.

## Runtime setup and limits

Automatic future refresh requires an owner-authorized `GITHUB_CONTRIBUTIONS_TOKEN` in the server environment, plus the permissions/settings GitHub requires. No token was copied from the existing GitHub CLI keyring into the runtime or source. Without that environment variable, the genuine combined snapshot remains readable and clearly dated. The endpoint requests aggregate fields only, verifies the authenticated owner, uses one-hour caching/timeout/failure cooldown and returns only sanitized counts/dates/intensity.

Read the README for secure setup and official GitHub documentation links. Plain static hosting without the API retains the verified snapshot. Restricted activity can change with GitHub authorization/profile visibility; the implementation reports only what GitHub returns and never fills gaps with invented activity.

The exact current LinkedIn headline remains unavailable through its public profile (HTTP 999); established portfolio context is shown. In-app browser review was completed; independent Chrome/Safari/hardware testing was not available. Existing contact delivery configuration was preserved and no real contact message was submitted.

Local preview: `http://127.0.0.1:3004/`.
