Zentra Patch: Fix globals.css import path

This patch updates app/layout.tsx to import the global stylesheet from
`../styles/globals.css` (matching the project structure from Zentra-starter.zip).

How to apply:
1) Extract the zip at the root of your project (so it overwrites app/layout.tsx).
2) Restart the dev server: npm run dev
