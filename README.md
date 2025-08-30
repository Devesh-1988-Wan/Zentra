# Zentra Dashboard (Supabase + Next.js)

A leadership dashboard builder with editable widgets, publish flow, and role-based access. Uses Supabase Auth, Postgres, RLS, and Edge Functions.

## Quick start

1. **Clone** and install deps
```bash
pnpm i # or npm i / yarn
cp .env.example .env.local
```
2. **Set env** from Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_APP_URL`.
3. **Run SQL** files in Supabase SQL editor in order:
   - `supabase/sql/01_schema.sql`
   - `supabase/sql/02_triggers.sql`
   - `supabase/sql/03_rls.sql`
4. **Deploy Edge Function** `publish-dashboard` using Supabase CLI:
```bash
supabase functions deploy publish-dashboard --project-ref <your-ref>
```
5. **Run**
```bash
npm run dev
```

**Default roles**: All new signups are `admin`. The email `devesh.pillewan@amla.io` is `super_admin` via trigger. Adjust in `02_triggers.sql` if needed.
