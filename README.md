
# Zentra Dashboards – Fetch Fix Pack

This pack contains the **minimal, drop-in files** to resolve the generic “Error fetching dashboards” issue by ensuring:

1. Correct **Supabase client initialization** on the client.
2. A robust **dashboards list component** with detailed error logging.
3. Optional **SQL migration** to create `dashboards` table and **RLS policies** so authenticated users (or super admins) can read.

> Works with Next.js App Router. If you use Pages Router, place the component and imports accordingly.

---

## What’s inside

```
lib/
  supabase.ts              # Browser client init (anon key)
components/
  DashboardList.tsx       # Client component that fetches dashboards safely
app/
  dashboards/
    page.tsx              # Example page rendering the list
sql/
  2025-08-31_dashboards.sql
.env.example               # Copy to .env.local and fill values
```

---

## Quick start

1. **Copy files** into your repo, preserving the folder structure.
2. **Install dependency** (if not already):

   ```bash
   npm i @supabase/supabase-js
   # or
   pnpm add @supabase/supabase-js
   # or
   yarn add @supabase/supabase-js
   ```

3. **Set environment variables** (create `.env.local` from `.env.example`):

   ```ini
   NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT-REF>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR-ANON-KEY>
   # (Optional for server routes only) SUPABASE_SERVICE_ROLE_KEY=<YOUR-SERVICE-ROLE>
   ```

4. **(Optional) Apply SQL migration** in Supabase SQL editor:

   - Open **Supabase → SQL → New Query**
   - Paste contents of `sql/2025-08-31_dashboards.sql`
   - Run the script (you can run parts if the table already exists)

5. **Run app**:

   ```bash
   npm run dev
   ```

6. Open **DevTools → Network** and verify calls to `/rest/v1/dashboards` succeed (200) and return rows.

---

## Notes

- The component logs the full Supabase error object to the console so we can diagnose `code`, `details`, and `hint` if any further issues occur.
- If your app filters by `org_id`, pass it to `<DashboardList orgId={...} />`.
- If you already have RLS policies, keep them; use the included SQL as a reference. Ensure your authenticated users satisfy the policy conditions.

## References
- Supabase JS client usage and auth: https://supabase.com/docs/reference/javascript/initializing
- Row Level Security and Policies: https://supabase.com/docs/guides/database/postgres/row-level-security
- Next.js + Supabase patterns: https://supabase.com/docs/guides/auth/auth-helpers/nextjs

