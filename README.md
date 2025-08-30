
# Zentra Admin Fix (Variant Pack)

This pack includes **both** root-based and `src/`-based layouts so you can drop the correct file no matter how your project is structured.

## You are seeing:
```
Module not found: Can't resolve '@/utils/auth/isSuperAdmin'
```

## Choose your layout

### A) If you have **app/** at the repo root (and **no** `src/` wrapping it)
- Use: `utils/auth/isSuperAdmin.ts`
- (Optional) Example page: `app/admin/page.example.tsx`
- Alias sample: `tsconfig.alias.root.sample.json`

### B) If your project uses **src/** (e.g., `src/app`, `src/utils`)
- Use: `src/utils/auth/isSuperAdmin.ts`
- (Optional) Example page: `src/app/admin/page.example.tsx`
- Alias sample: `tsconfig.alias.src.sample.json`

> Ensure your `@` alias matches your layout. If you use `src/`, map `@/*` to `src/*`. If you don’t, map `@/*` to `./*`.

## Steps
1. **Copy the matching `isSuperAdmin.ts`** into your repo at the same path.
2. **Confirm alias mapping** in your root `tsconfig.json`:

- Root layout:
```jsonc
{
  "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./*"] } }
}
```
- `src/` layout:
```jsonc
{
  "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["src/*"] } }
}
```

3. **Use in `app/admin/page.tsx`**:
```tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { isSuperAdmin } from '@/utils/auth/isSuperAdmin'

export default async function AdminPage() {
  const supabase = await createClient()
  const ok = await isSuperAdmin(supabase)
  if (!ok) redirect('/')
  return <div>Admin</div>
}
```

4. **Optional**: set env allowlist in `.env.local`:
```
NEXT_PUBLIC_SUPER_ADMINS=devesh.pillewan@amla.io
```

5. **If build still fails**, clear cache and restart:
```bash
rm -rf .next
pnpm dev   # or npm run dev / yarn dev
```

## Notes
- **Casing matters** on Linux/CI. Keep `utils/auth/isSuperAdmin.ts` exactly.
- If you prefer, a webpack alias fallback sample is included: `next.config.alias.sample.js`.
- Temporary unblock: change import to `../../utils/auth/isSuperAdmin` (from `app/admin`).

