# Zentra — Complete (Widgets + Supabase)

This project packages a BI-grade widget catalog and a Supabase backend starter.

## Run
```bash
cp .env.example .env.local  # fill Supabase keys if using persistence
pnpm install
pnpm dev
```
- Open http://localhost:3000
- Visual catalog: /gallery
- Demo dashboard: /dashboard/demo
- Admin (super admin only): /admin

## Path Aliases
Uses `@/components/*` and `@/lib/*` via `tsconfig.json`. Restart dev server after changes.

## Database
Apply `supabase/migrations/2025-08-30_init_zentra.sql` in Supabase Studio or via CLI.
