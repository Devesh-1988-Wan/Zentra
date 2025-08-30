
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export function createClient() {
  const cookieStore = cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      // Note: Server Components cannot set cookies. This is OK because our middleware refreshes tokens.
      setAll(_cookies: { name: string; value: string; options: CookieOptions }[]) {
        // no-op on the server; handled in middleware
      }
    }
  })
}
