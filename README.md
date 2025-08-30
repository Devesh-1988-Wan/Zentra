# Zentra Auth Pack (Supabase + Next.js App Router)

This pack adds **Sign Up, Sign In, Reset Password, Update Password, Profile**, and **Super Admin Profile Management** pages to your Next.js (App Router) app using Supabase.

## What's included

- Supabase SSR setup (browser + server clients) and token-refreshing middleware
- Auth routes under `src/app/(auth)/...`
- Self-service Profile page
- Super Admin pages to view/update all profiles (restricted to `SUPER_ADMIN_EMAIL`)
- SQL migration: profiles table, RLS policies, triggers, and super admin seed
- AMLA-style minimal CSS tokens in `globals.css`

## Quick start

1. **Copy files** from this pack into your repo root, preserving the `src/` structure.
2. Install deps:
   ```bash
   npm i @supabase/supabase-js @supabase/ssr @supabase/auth-ui-react @supabase/auth-ui-shared
   ```
3. Set env vars by copying `.env.example` to `.env.local` and fill values from Supabase **Settings → API**.
4. In **Supabase → Authentication → URL Configuration**, add redirect URLs you will use, e.g.:
   - `http://localhost:3000/(auth)/update-password`
   - production equivalents
5. Run the SQL migration in **Supabase SQL Editor**: `supabase/migrations/20250830_profiles_roles.sql`.
6. Start your app: `npm run dev`.

### Pages
- `/ (auth)/sign-in` – email/password sign in
- `/ (auth)/sign-up` – registration
- `/ (auth)/reset-password` – send reset email
- `/ (auth)/update-password` – set new password after email link
- `/profile` – update your display name & avatar
- `/admin/profile-management` – list all profiles (super admin only)

### Notes
- Super admin is controlled via `profiles.role = 'super_admin'`. The migration auto-promotes `SUPER_ADMIN_EMAIL` (from `.env.local`) after you set it then run the last SQL `update` manually (or edit the SQL file before running).
- RLS ensures regular users can only read/update their own profile; super admin can manage all.
- If your project already has a `tsconfig.json`, merge the `paths` alias rather than overwrite.
