
# Zentra Admin Fix (Super Admin Guard)

This ZIP adds a reusable `isSuperAdmin` helper and an example Admin page implementation to resolve the build error:

```
Module not found: Can't resolve '@/utils/auth/isSuperAdmin'
```

## What’s inside

```
utils/
  auth/
    isSuperAdmin.ts          # New util
app/
  admin/
    page.example.tsx        # Example usage (do not overwrite your page.tsx blindly)
tsconfig.alias.sample.json  # Safe alias config sample (merge into your tsconfig.json)
.env.example                # Env variable for admin allowlist
```

## How to apply

1. **Copy the util**
   - Place `utils/auth/isSuperAdmin.ts` into your repo keeping the same path & casing.

2. **Alias check** (using `@/` imports)
   - Open your root `tsconfig.json`. Ensure it contains:

   ```jsonc
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

   - If you don’t have a `tsconfig.json`, create one and paste the above. If you already have one, **merge** these options. (A `jsconfig.json` works similarly, but `tsconfig.json` takes precedence.)

3. **Use the util in your Admin page**
   - In `app/admin/page.tsx`:

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

4. **Optional: configure super admins in env**
   - Add to `.env.local` (create if missing):

   ```
   NEXT_PUBLIC_SUPER_ADMINS=devesh.pillewan@amla.io
   ```

   - Comma‑separate multiple emails.

5. **Clear cache & restart** (only needed if build still complains)

   ```bash
   rm -rf .next
   pnpm dev   # or npm run dev / yarn dev
   ```

## Notes
- Keep the folder names’ **casing** exact (`utils/auth/isSuperAdmin.ts`). Linux builds are case‑sensitive.
- If you prefer **relative imports**, change your import to `../../utils/auth/isSuperAdmin` from `app/admin/page.tsx` and you can skip the alias step.

## Troubleshooting
- If you just added `tsconfig.json`, restart the dev server so Next.js picks up the alias changes.
- If you also use Jest or tooling, mirror the alias there as needed.

