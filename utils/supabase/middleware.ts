import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Refreshes Supabase auth session on every request that matches the middleware config.
 * Follows Supabase's Next.js server-side auth guidance.
 */
export async function updateSession(request: NextRequest) {
  // Prepare a response we can mutate if cookies change
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // reflect new cookies on the request (so downstream server components see them)
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          // also write cookies on the response back to the browser
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        }
      }
    }
  )

  // This call will refresh the session if needed and set cookies via the adapter above
  await supabase.auth.getUser()

  return response
}
