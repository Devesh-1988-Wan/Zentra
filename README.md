
# Supabase server client (fix for `createClient is not a function`)

You are seeing this runtime error:

```
TypeError: (0 , _utils_supabase_server__WEBPACK_IMPORTED_MODULE_2__.createClient) is not a function
```

That happens when your `utils/supabase/server` file does **not** export a named function called `createClient` but your code imports it like:

```ts
import { createClient } from '@/utils/supabase/server'
```

## What this pack provides
- `utils/supabase/server.ts` that **exports a named** `createClient` consistent with your import.
- An `app/admin/page.example.tsx` showing usage.

## How to use
1) Copy `utils/supabase/server.ts` into your repo *replacing* the existing file.
2) Ensure you have the deps:

```bash
pnpm add @supabase/ssr @supabase/supabase-js
# or: npm i @supabase/ssr @supabase/supabase-js
```

3) Ensure you have env vars set (e.g., `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=...your url...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...your anon key...
```

4) Restart dev server after replacing files:
```bash
rm -rf .next
pnpm dev   # or npm run dev / yarn dev
```

## If you prefer a **default** export
If your code imports it as default:

```ts
import createClient from '@/utils/supabase/server'
```
then change the export in `utils/supabase/server.ts` to:

```ts
export default function createClient() { /* same body */ }
```

…but keep **one** style consistently across your project.

## Note about `await createClient()`
`createClient()` returns a client synchronously; awaiting it is harmless (it returns immediately) but optional. You can write either:

```ts
const supabase = createClient()
```
or
```ts
const supabase = await createClient()
```

