import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const res = NextResponse.next();
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, { cookies: { get: () => null, set: () => {}, remove: () => {} }});
  const { data: { session } } = await supabase.auth.getSession();
  const url = new URL(req.url);
  if (url.pathname.startsWith('/admin')) {
    if (!session) return NextResponse.redirect(new URL('/login', url.origin));
    const email = (session as any)?.user?.email;
    if (email !== 'devesh.pillewan@amla.io') return NextResponse.redirect(new URL('/', url.origin));
  }
  return res;
}

export const config = { matcher: ['/admin/:path*'] };
