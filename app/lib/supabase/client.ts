// src/lib/supabase/client.ts
import { createClient as _createClient } from '@/utils/supabase/client'

// Back-compat shim so existing imports `@/lib/supabase/client` keep working
export const supabase = _createClient()
export const createClient = _createClient