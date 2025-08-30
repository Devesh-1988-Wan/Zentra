import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const res = NextResponse.next();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!url || !anon) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[supabase] Missing env in middleware; skipping auth check');
    }
    return res;
  }

  const supabase = createServerClient(url, anon, {
    cookies: { get: () => null, set: () => {}, remove: () => {} },
  });

  const { data: { session } } = await supabase.auth.getSession();
  const urlObj = new URL(req.url);
  if (urlObj.pathname.startsWith('/admin')) {
    if (!session) return NextResponse.redirect(new URL('/login', urlObj.origin));
  }
  return res;
}

export const config = { matcher: ['/admin/:path*'] };
