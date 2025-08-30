
// utils/auth/isSuperAdmin.ts
// Utility to check whether the currently signed-in user is a super admin.
// Works with Supabase server client in Next.js App Router.

import type { SupabaseClient } from '@supabase/supabase-js'

// Comma-separated allowlist, e.g., "admin@acme.com,owner@acme.com"
const SUPER_ADMINS = (process.env.NEXT_PUBLIC_SUPER_ADMINS ?? 'devesh.pillewan@amla.io')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean)

/**
 * Server-safe admin check using the provided Supabase server client.
 *
 * Usage in a server component / route:
 *   const supabase = await createClient()
 *   const ok = await isSuperAdmin(supabase)
 */
export async function isSuperAdmin(supabase: SupabaseClient): Promise<boolean> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return false

  const email = user.email?.toLowerCase()
  if (email && SUPER_ADMINS.includes(email)) return true

  // Optional: Fallback to roles present in app_metadata or user_metadata
  const roles: string[] =
    (Array.isArray((user as any).app_metadata?.roles) && (user as any).app_metadata.roles) ||
    ((user as any).user_metadata?.role ? [(user as any).user_metadata.role] : [])

  return roles?.includes('super_admin') ?? false
}
