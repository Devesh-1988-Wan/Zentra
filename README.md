
# Zentra – AMLA Themed (Next.js + Supabase)

AMLA-themed UI + Supabase Auth (Sign in/Sign up/Reset/Update) + Profile + Super Admin management.

## Quick start
1) `npm i`
2) copy `.env.example` to `.env.local`, fill in SUPABASE values
3) Supabase → Authentication → add `http://localhost:3000/(auth)/update-password` to Redirect URLs
4) Run the SQL in `supabase/migrations/20250830_profiles_roles.sql`
5) `npm run dev`
