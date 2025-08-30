import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const res = NextResponse.next();

  // ✅ Use the NEXT_PUBLIC_* pair consistently
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Optional safety: avoid hard crash if env not present
  if (!url || !anon) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[supabase] Missing URL or ANON KEY in env; skipping auth check in middleware');
    }
    return res; // don't block the app during local setup
  }

  const supabase = createServerClient(url, anon, {
    cookies: { get: () => null, set: () => {}, remove: () => {} },
  });

  const { data: { session } } = await supabase.auth.getSession(); // note: see doc caveat below
  const urlObj = new URL(req.url);

  if (urlObj.pathname.startsWith('/admin')) {
    if (!session) return NextResponse.redirect(new URL('/login', urlObj.origin));
  }
  return res;
}

export const config = { matcher: ['/admin/:path*'] };