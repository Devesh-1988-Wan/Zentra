
// src/utils/auth/isSuperAdmin.ts
import type { SupabaseClient } from '@supabase/supabase-js'

const SUPER_ADMINS = (process.env.NEXT_PUBLIC_SUPER_ADMINS ?? 'devesh.pillewan@amla.io')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean)

export async function isSuperAdmin(supabase: SupabaseClient): Promise<boolean> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return false

  const email = user.email?.toLowerCase()
  if (email && SUPER_ADMINS.includes(email)) return true

  const roles: string[] =
    (Array.isArray((user as any).app_metadata?.roles) && (user as any).app_metadata.roles) ||
    ((user as any).user_metadata?.role ? [(user as any).user_metadata.role] : [])

  return roles?.includes('super_admin') ?? false
}
