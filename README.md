
# Zentra 404 Fix Pack

This pack resolves the `GET / 404` you see in the Next.js dev server by ensuring your app has a root route.

## What's included

- `app/page.tsx` — App Router root that redirects `/` to `/dashboards`.
- `public/.well-known/appspecific/com.chrome.devtools.json` — Optional stub to stop repeated Chrome DevTools 404s.
- `next.config.js` — A redirect from `/` to `/dashboards` (works regardless of router). If you already have redirects, merge accordingly.

## How to apply

1. Copy these files into your project root (merge `app/`, `public/`).
2. If you already have `next.config.js`, merge the `redirects()` array instead of overwriting.
3. Restart the dev server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Why you saw the 404
- In Next.js, `/` maps to `app/page.tsx` (App Router) or `pages/index.tsx` (Pages Router). If neither exists, the framework serves the built-in **Not Found** route.
- You already have `app/dashboards/page.tsx`, so visiting `/dashboards` works; `/` had no page, hence the 404.
- The `/.well-known/appspecific/com.chrome.devtools.json` 404s are harmless; Chrome probes for this file. Adding a small JSON file silences the noise.

## Alternative (Pages Router)
If you are on Pages Router instead, create `pages/index.tsx`:

```tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  useEffect(() => { router.replace('/dashboards'); }, [router]);
  return null;
}
```

