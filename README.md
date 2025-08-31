
# Zentra – Minimal Patch to fix `Can't resolve '@/lib/supabase/client'`

This patch adds the missing Supabase client utilities and (optionally) the path alias.

## What’s included

- `lib/supabase/client.ts` — Browser client for use in Client Components (`'use client'`).
- `lib/supabase/server.ts` — Server client for Server Components/Actions (optional to use now).
- `tsconfig.add.json` — A small snippet to merge into your `tsconfig.json` if `@/*` alias isn't set.

## How to apply

1. **Unzip at your project root** (same folder that contains `package.json`). This will create the `lib/supabase/` folder.
2. **If you still see the module-not-found error**, open your `tsconfig.json` and merge the snippet from `tsconfig.add.json` under `compilerOptions`:

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

> If your code lives in `src/`, change it to: `"@/*": ["src/*"]`.

3. **Add env vars** in `.env.local` (create if it doesn't exist):

```ini
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. Restart the dev server: `npm run dev`.

## Notes
- Keep your existing `import { createClient } from '@/lib/supabase/client'` usage.
- The setup follows Supabase’s Next.js guide for separate browser/server clients.

