Zentra Middleware Patch
=======================

This patch resolves `Module not found: Can't resolve '@/utils/supabase/middleware'` by:
1) Adding `utils/supabase/middleware.ts` with `updateSession` implementation.
2) Providing a root `middleware.ts` that imports from `@/utils/supabase/middleware`.
3) (Optional) Ensure your `tsconfig.json` defines a path alias for `@/*` or change the import to a relative path.

Steps:
1. Install dependency:
   npm i @supabase/ssr

2. Copy these files into your project root (merging folders):
   - utils/supabase/middleware.ts
   - middleware.ts

3. If your project uses the `@/` alias, ensure tsconfig has:
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": { "@/*": ["./*"] }
     }
   }
   Restart `npm run dev` after editing tsconfig.

4. Restart dev server:
   npm run dev

Notes:
- The middleware follows Supabase's official Next.js SSR guide for refreshing sessions.
- Adjust the `config.matcher` if you want to limit which routes run middleware.
