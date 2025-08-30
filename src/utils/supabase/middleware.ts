// utils/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Create a mutable NextResponse we can update with refreshed cookies
  let response = NextResponse.next({ request })

  // Supabase server client wired to read/write cookies from the Edge request/response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookies) {
          // reflect new cookies on the inbound request for downstream code
          cookies.forEach(({ name, value }) => request.cookies.set(name, value))
          // create a new response and write cookies to it
          response = NextResponse.next({ request })
          cookies.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Force token refresh to keep session valid (recommended in middleware)
  // Never trust getSession() in middleware; use getUser() which revalidates on the Auth server
  await supabase.auth.getUser()

  return response
}