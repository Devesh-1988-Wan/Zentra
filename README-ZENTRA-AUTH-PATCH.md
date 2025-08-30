
# Zentra Auth Patch (Supabase + Next.js App Router)

This drop-in patch adds fully wired **Sign in / Sign up / Reset password** flows, an **Admin** page (super admin only), and a **Super Admin Profile** page.

## Env
Copy `.env.example` to `.env.local` and fill values:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SHOW_ADMIN_ON_AUTH=true
NEXT_PUBLIC_SUPER_ADMINS=devesh.pillewan@amla.io
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## What this adds
- `app/(auth)/sign-in`, `app/(auth)/sign-up`, `app/(auth)/reset-password` with redirects to `/admin` after success.
- `app/update-password` (landing for email password reset) – updates password then navigates to `/sign-in`.
- `app/admin` – server-protected, **super admin only**.
- `app/profile` – super admin profile management (display name + change password).
- `components/AdminLink` – renders **Go to Admin** on auth pages only if
  - `NEXT_PUBLIC_SHOW_ADMIN_ON_AUTH` is `true`, **and**
  - the logged-in user is in `NEXT_PUBLIC_SUPER_ADMINS`.
- `middleware.ts` + `utils/supabase/*` to correctly refresh Supabase auth tokens.

## Wire-up notes
- Ensure Supabase **Auth > URL Configuration** includes `http(s)://<your-site>/update-password` as an authorized redirect.
- If **Email Confirmations** are enabled, users must confirm before they can sign in.
- To add more super admins, append to `NEXT_PUBLIC_SUPER_ADMINS` as a comma-separated list.

## File map (relative to repo root)
```
app/(auth)/layout.tsx
app/(auth)/page.tsx
app/(auth)/sign-in/page.tsx
app/(auth)/sign-up/page.tsx
app/(auth)/reset-password/page.tsx
app/update-password/page.tsx
app/admin/page.tsx
app/profile/page.tsx
app/profile/profile-form.tsx
components/AdminLink.tsx
utils/supabase/client.ts
utils/supabase/server.ts
utils/supabase/middleware.ts
utils/auth/isSuperAdmin.ts
middleware.ts
```

## Usage
1. Merge these files into your repo root (Next.js 13/14 App Router).
2. `npm i @supabase/supabase-js @supabase/ssr`
3. `npm run dev` and visit `/sign-in`, `/sign-up`, `/reset-password`.

## Security
- Admin pages use server-side `supabase.auth.getUser()` and `isSuperAdmin()` checks.
- Client exposure of `NEXT_PUBLIC_SUPER_ADMINS` is acceptable for **UI gating**; server routes still enforce access.

