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

Preview the static production build:

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
