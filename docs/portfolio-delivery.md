# Portfolio redesign V2 handoff

Historical V2 report. The subsequent section-order and contributions update is documented in `docs/section-order-contributions.md`; it supersedes the old ordering and 47-count calendar notes below.

Implemented locally on 14 October 2026. Existing uncommitted redesign changes were inspected and extended. No commit, push, PR, deployment or real contact submission was made.

## Result

- Original hero content/portrait and solid arrow cursors preserved, with electric blue/violet typography, a white/ice-blue palette, calmer section transitions and coordinated light/dark tokens.
- Six substantial alternating editorial project presentations, in the requested order: LLM visualization, voice agent, GenZnect, LeadRadar, MotionCB, genetic risk analysis. Case-study routes and related recommendations use the same curated data. Removed client/company-site showcases and the separate restaurant experience entry.
- Interactive React/CSS transformer, voice, role-aware platform and provenance workflows replace all large decorative SVGs. Actual lab screenshot remains available. No fabricated screenshots, metrics, detections, leads or deployments.
- One lazy-loaded Three.js scene: translucent computational modules, routed curved pathways, restrained packets, a layered central state structure and inexpensive atmosphere. Section positions drive interpolated geometry/camera changes. Hero is restrained, projects expand, research layers, experience simplifies, social/contact fade cleanly.
- Dated, genuinely sourced LinkedIn cards and GitHub profile, repositories, optional public activity and 2026 contributions. The requested repository order is Nebius Survivor → LLM-Interpretability → NextGen.

## Files changed in this V2 pass

Paths below are repository-relative. Files already changed by the first redesign remain uncommitted; this list identifies the V2 pass rather than claiming ownership of the entire existing Git diff.

| Area | Files |
| --- | --- |
| Home and global design | `client/src/pages/Home.tsx`, `client/src/index.css` |
| Hero/navigation/identity links | `client/src/components/HeroSection.tsx`, `Navbar.tsx`, `VisitorPaths.tsx`, `Footer.tsx`, `ContactSection.tsx` |
| Projects | `client/src/data/projects.ts`, `client/src/components/ProjectsSection.tsx`, `ProjectVisual.tsx`, `projects.css` |
| Research/experience/toolkit | `ResearchSection.tsx`, `ExperienceSection.tsx`, `SkillsSection.tsx`, `research-contact.css`; removed unused `BlogsSection.tsx` |
| Digital twin (new) | `DigitalTwin.tsx`, `digitalTwinScene.ts`, `digital-twin.css` |
| Social (new) | `SocialSection.tsx`, `GitHubContributions.tsx`, `social.css`, `client/src/hooks/useGitHubProfile.ts`, `client/src/data/social.ts`, `github-snapshot.json`, `github-contributions-2026.json` |
| Dependencies | `package.json`, `pnpm-lock.yaml` |
| Evidence/delivery | `docs/project-evidence.md`, `social-evidence.md`, `research-contact-evidence.md`, `profile-evidence.md` historical-audit notice, this report, `docs/previews/` |

Unqualified component filenames are under `client/src/components/`. Existing API, SQL, server, deployment and routing configuration are unchanged. The original portrait source remains available; rendered pages request its optimized WebPs. Only functional favicon and two filled-arrow SVG assets remain in `client/public`.

## Dependencies and rendering cost

Added `three ^0.186.1` for the single procedural WebGL environment and `@types/three ^0.186.0` as development types. React Three Fiber, Drei, extra animation packages, post-processing and external scene assets were unnecessary.

Heavy rendering code is a separate dynamic import, delayed until after the initial content. Desktop pixel ratio is capped at 1.5, mobile at 1; mobile also reduces module/plate/path detail. Rendering is scheduled only while scroll interpolation settles, capped below continuous 60 FPS, and stops when idle, hidden or faded. Resize/visibility/scroll observers, geometry, materials, textures and the renderer are disposed on teardown. Canvas and fallback have no pointer interaction. Reduced motion skips WebGL; unsupported/lost WebGL keeps the CSS structure.

Production sizes: initial JavaScript approximately 451 kB / 139 kB gzip; lazy 3D chunk approximately 542 kB / 136 kB gzip; case-study chunk 6.6 kB / 1.8 kB gzip. Vite reports a size warning for the lazy 3D chunk. It is not a build error and is not part of the initial JavaScript request.

## Working social features

- Two supplied genuine LinkedIn posts, exact dates, actual images and canonical new-tab links. The European Energy Collective post is explicitly a repost. Profile-only fallback and editable curation file remain available.
- Verified GitHub avatar/name/bio, selected public repositories, retrieved languages/stars and optional selected-repository activity. One-hour validated caching, timeout, cooldown and bundled public snapshot; no frontend credentials.
- Verified 2026 contribution calendar: 365 dates, 47 contributions at retrieval, exact counts reconciled with GitHub. Keyboard navigation, narrow-screen scrolling and clearly pending future dates. Calendar refresh is manual and its snapshot date is visible.

## Validation

- `pnpm run check`: passed.
- `pnpm run build`: passed, including the existing Express build; lazy Three.js chunk size warning noted above.
- `git diff --check`: passed.
- Browser review at desktop 1200/1440, tablet 834 and mobile 390/320 widths. Measured page width never exceeded the viewport; calendar overflow stays within its own scroll region. Light/dark modes and the original portrait reviewed.
- All six case-study routes loaded at mobile width, without overflow, client recommendations or WebGL canvases. Removed client slugs are absent from the project lookup.
- Transformer stages/tokens/prompt switch, voice TTS boundary, GenZnect roles, LeadRadar provider switch, research controls, mobile menu/Escape/focus return and contribution arrow-key navigation checked.
- Unsupported-WebGL fixture: static renderer, zero canvases, readable hero, no console errors. Reduced-motion fixture: reported preference true, zero draw calls/canvases. A local proxy delayed the scene module by six seconds: hero/navigation/static background remained usable, then the single scene appeared.
- Demand-rendering fixture: draw-call count stayed at 1054 across separate idle observations; scroll/resizing advanced the count and settled again. No continuous idle inference or render feed exists.
- GitHub 403 fixture: exactly three initial requests, verified snapshot fallback, no new calls on rerender. Cached revisit: zero API calls. Genuine images loaded successfully and normal public API reads returned selected-repository activity. No client repo was shown.
- Local contact mocks confirmed the original payload, error/draft retention and success state without writing a database message.
- Observed layout-shift metric was 0 in the isolated desktop fixtures. This is a bounded measurement, not a full Lighthouse/Core Web Vitals certification.
- Normal production browser review reported no console errors. Reduced-motion testing produced Framer Motion's expected development notice. Temporary fixtures/proxy were used for validation, then removed/stopped; they are not shipped.

## Remaining content and limitations

- Exact current LinkedIn headline is not accessible through the public profile request (HTTP 999); confirmed portfolio professional context is shown instead. The profile slug/name are corroborated by the public posts. No additional post URL is needed; a third is optional.
- Approved real screenshots for GenZnect/LeadRadar/voice, MotionCB artifacts, and a report/repository for independently validating genetic-risk work remain needed. The original genetic-risk completion record is retained and explicitly qualified.
- The public Traceform repository is distinct from the private Qwen3 lab. No public lab demo or voice demo was invented.
- LinkedIn media depends on its public CDN. GitHub profile data may be cached or rate-limited; the calendar is a manually refreshed official snapshot and event data can be delayed.
- Browser automation was available in the Codex in-app browser. Independent Chrome/Safari/device-hardware runs and a full performance audit were not available; the implementation uses standard browser APIs and responsive/reduced-motion fallbacks.
- The local static production preview does not execute Vercel's contact API. Real deployed database delivery was not tested; its configuration remains unchanged.

Preview: `http://127.0.0.1:3003/`. All changes remain local and uncommitted.
