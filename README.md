# Zentra (Leadership Dashboard Starter)

> Production-ready starter with AMLA theme tokens, exec-ready cards/charts, Supabase RLS, and Vercel CI/CD.

## Quick Start
```bash
npm i
cp .env.example .env.local
# add Supabase envs
npm run dev
```

## Build & Run
```bash
npm run build && npm start
```

## Environment
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE` (server only)

## Supabase
Apply `supabase/schema.sql` then `supabase/policies.sql` in the SQL editor. Set your user row in `profiles` to `super_admin` for elevated rights.

## CI/CD (Vercel)
Workflows provided under `.github/workflows`. Add GitHub repo secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## Theming
AMLA tokens live in `styles/tokens.css`. Tailwind consumes these via custom color names (e.g., `bg-surface`, `text-muted`).

## Presentation Mode
Open `/present` for full-screen leadership walkthrough with PDF export.

```
References:
- Next.js production build & deploy: https://nextjs.org/docs/13/app/building-your-application/deploying
- Vercel GitHub Actions (prebuilt deploy): https://vercel.com/guides/how-can-i-use-github-actions-with-vercel
- Supabase GitHub OAuth: https://supabase.com/docs/guides/auth/social-login/auth-github
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Recharts docs: https://recharts.org/
```
