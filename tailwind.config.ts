import type { Config } from 'tailwindcss'
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))',
        },
        muted: 'hsl(var(--muted))',
      },
    },
  },
  plugins: [],
} satisfies Config
