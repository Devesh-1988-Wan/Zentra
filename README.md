
# Zentra – Dashboards Fix (config column + working imports)

This update fixes the runtime error:

> `Error fetching dashboards: column dashboards.config does not exist`

by providing a SQL migration that ensures a `config JSONB` column exists on `public.dashboards`, and includes working React/Next.js files that query it (using **relative imports** so no path alias is required).

---
## What’s included

```
.env.example
lib/
  supabase.ts
components/
  DashboardList.tsx
app/
  page.tsx              # redirects / -> /dashboards (optional but recommended)
  dashboards/
    page.tsx
sql/
  2025-08-31_add_config_to_dashboards.sql
```

---
## How to apply

1) **Copy** these files into your project, preserving folder structure.

2) **Set env vars** from `.env.example` → `.env.local`:
   ```ini
   NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT-REF>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR-ANON-KEY>
   ```

3) **Run the SQL migration** in Supabase → SQL Editor:
   - Open the file `sql/2025-08-31_add_config_to_dashboards.sql`
   - Paste & run it. It is **idempotent** (safe to run multiple times).

   If your `dashboards` is actually a **VIEW**, this migration won't apply. Either:
   - Recreate the view to include a `config` column, *or*
   - Remove `config` from the client select temporarily.

4) Start the dev server:
   ```bash
   npm run dev
   ```

5) Visit `http://localhost:3000/dashboards` (or just `/` which redirects there).

---
## Notes
- All imports are **relative** → no need for `@/` alias.
- The component logs full Supabase error payloads (message/code/details/hint) if anything else blocks reads (e.g., RLS).
- The SQL enables RLS and includes permissive policies for org members or `super_admin` (adjust to your model).

