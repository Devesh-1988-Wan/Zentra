/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--amla-primary-50)',
          100: 'var(--amla-primary-100)',
          200: 'var(--amla-primary-200)',
          300: 'var(--amla-primary-300)',
          400: 'var(--amla-primary-400)',
          500: 'var(--amla-primary-500)',
          600: 'var(--amla-primary-600)',
          700: 'var(--amla-primary-700)',
          800: 'var(--amla-primary-800)',
          900: 'var(--amla-primary-900)'
        },
        accent: { 500: 'var(--amla-accent-500)' },
        neutralA: { 900: 'var(--amla-neutral-900)' }
      },
      boxShadow: { md: 'var(--amla-shadow-md)' },
      borderRadius: { md: 'var(--amla-radius-md)' }
    }
  },
  plugins: []
}
