# Zentra — Leadership Dashboard (Starter)

This is a Next.js + Supabase starter aligned with AMLA theme and your RBAC/Widget requirements.

## Stack
- Next.js (App Router) + React + TypeScript
- TailwindCSS
- Supabase (Postgres + Auth + Storage)

## Quick Start
1. `cp .env.example .env.local` and fill:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (only for icon import script)
2. Install deps: `pnpm install` (or `npm i`)
3. Run dev: `pnpm dev`

## Database
- Apply SQL migration via Supabase CLI or Studio.
- RLS and roles are configured; super admin is `devesh.pillewan@amla.io`.

## Icons
- Place SVGs in `assets/icons/` and run `pnpm icons:import`.

## CI
- See `.github/workflows/ci.yml`. Set repo secrets `SUPABASE_PROJECT_REF`, `SUPABASE_DB_PASSWORD`, keys as needed.
