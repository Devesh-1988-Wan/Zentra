// src/lib/supabase/server.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export function createClient() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          try { cookieStore.set({ name, value, ...options }) } catch {}
        },
        remove(name, options) {
          try { cookieStore.set({ name, value: '', ...options, maxAge: 0 }) } catch {}
        },
      },
    }
  )

  return supabase
}