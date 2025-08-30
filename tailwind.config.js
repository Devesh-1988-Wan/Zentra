/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 500: 'var(--amla-primary-500)' },
        accent: { 500: 'var(--amla-accent-500)' },
      },
      boxShadow: { md: 'var(--amla-shadow-md)' },
      borderRadius: { md: 'var(--amla-radius-md)' }
    }
  },
  plugins: []
}
