
# Import Fix (no path aliases)

This patch removes `@/` path aliases from two files so your project compiles even if `tsconfig.json/jsconfig.json` doesn't define aliases.

**Updated files**
- `app/dashboards/page.tsx` → uses `../../components/DashboardList`
- `components/DashboardList.tsx` → uses `../lib/supabase`

Apply these if you prefer not to add a path alias right now.

**Alternative (keep `@/` imports):**
Add this to your `tsconfig.json` (or `jsconfig.json` for JS):

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

If your code lives under `src/`, use:

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

