# likhithreddyvanga

Portfolio website for Vanga Likhith Reddy.

## Framework

This project is a Vite + React single-page app. The Vite app lives in `client/`, builds static assets into `dist/public`, and includes a Vercel serverless contact endpoint at `api/contact.js`.

## Local Development

Install dependencies:

```bash
corepack enable
pnpm install
```

Run the frontend locally:

```bash
pnpm run dev
```

Build for production:

```bash
pnpm run build
```

Preview the production build (including the contribution-calendar middleware):

```bash
pnpm run preview
```

The contact API runs as a Vercel serverless function in deployment. To test the frontend and `/api/contact` together locally, use Vercel's local dev server:

```bash
pnpm dlx vercel dev
```

## Contact Form Database

The contact form posts to `/api/contact` and stores submissions in PostgreSQL. Set one of these environment variables in Vercel:

```bash
POSTGRES_URL=postgres://USER:PASSWORD@HOST:PORT/DATABASE
```

or:

```bash
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DATABASE
```

Create the table before deploying, or let the API create it automatically on the first successful request:

```sql
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

The same SQL is saved in `sql/contact_messages.sql`.

## Vercel Deployment

Recommended Vercel settings:

- Project name: `likhithreddyvanga`
- Framework preset: Vite
- Install command: `pnpm install`
- Build command: `pnpm run build`
- Output directory: `dist/public`
- Environment variable: `POSTGRES_URL` or `DATABASE_URL`

Deploy from this folder:

```bash
corepack enable
pnpm install
pnpm run build
pnpm dlx vercel link
pnpm dlx vercel env add POSTGRES_URL production
pnpm dlx vercel env add POSTGRES_URL preview
pnpm dlx vercel deploy
pnpm dlx vercel deploy --prod
```

When `vercel link` asks for the project name, enter `likhithreddyvanga`. When `vercel env add` prompts for a value, paste your PostgreSQL connection string. If the project name is available, Vercel will assign `https://likhithreddyvanga.vercel.app`. If it is already taken, Vercel will choose another generated URL and you can add a custom domain in the Vercel dashboard.

`vercel.json` sets the production build command, output directory, and SPA rewrites so client routes load correctly after deployment while `/api/contact` remains a serverless function.

## GitHub contribution calendar

The homepage uses a verified 2026 GitHub calendar, including authorized anonymized private/internal counts. The bundled snapshot was retrieved on 14 October 2026: 140 contributions, including 93 restricted contributions. Dates and counts are genuine; future dates are pending.

Automatic refresh uses `GET /api/github-contributions`, implemented in `server/githubContributions.ts` and exposed through Vite dev/preview, Express and the Vercel function `api/github-contributions.ts`. Configure `GITHUB_CONTRIBUTIONS_TOKEN` as a **server process environment variable** or hosting secret belonging to `VLReddy1105`. Never prefix it with `VITE_`, put it in client code, commit it, or paste it into chat. Vite middleware reads the process environment; it does not automatically load a token from a dotenv file.

Use the least permission needed for GitHub's contribution collection. GitHub documents optional `read:user` authorization for private/internal activity, with private contribution visibility enabled in profile settings. The service verifies the authenticated owner and requests only calendar dates/counts/intensity and the restricted aggregate. It never requests private repository names, source or commit messages. See [GitHub's ContributionsCollection reference](https://docs.github.com/en/graphql/reference/users) and [private contribution visibility settings](https://docs.github.com/en/account-and-profile/how-tos/contribution-settings/manage-visibility-settings-for-private-contributions-and-achievements).

Without a token, or during authorization/rate-limit/network failures, the last verified calendar or bundled snapshot remains visible with its retrieval date. Successful server responses cache for one hour; concurrent reads share one request, failures receive a one-minute retry cooldown, and browser storage caches validated aggregates for one hour. Credentials and upstream error bodies are never sent to the browser.

Validate the integration with:

```bash
pnpm run check
pnpm run build
pnpm exec vitest run --root . server/githubContributions.test.ts
```
