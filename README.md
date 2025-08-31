
# Zentra – Code-only fix (remove `config` from query)

This patch addresses the runtime error:

    Error fetching dashboards: column dashboards.config does not exist

by removing `config` from the client `select(...)` and making the `config` field optional in the type. Use this if you cannot (or do not want to) add the `config` column in the database right now.

If/when you add a `config` JSONB column on `public.dashboards`, you can revert to selecting it again.

## Files changed
- `components/DashboardList.tsx` — `select('id, title, org_id, updated_at')`
- `app/dashboards/page.tsx` — unchanged except relative import

## Optional: Add `config` later
Run this in Supabase SQL editor to add the column later:

```sql
alter table if exists public.dashboards
  add column if not exists config jsonb not null default '{}'::jsonb;
```

