
import { createClient } from '@supabase/supabase-js';

// Public browser client using anon key. RLS must allow reads accordingly.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: { persistSession: true, autoRefreshToken: true },
    db: { schema: 'public' },
  }
);
