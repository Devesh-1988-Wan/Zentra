import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--amla-primary-50)', 500: 'var(--amla-primary-500)'
        },
        accent: { 500: 'var(--amla-accent-500)' }
      },
      boxShadow: {
        md: 'var(--amla-shadow-md)'
      },
      borderRadius: {
        md: 'var(--amla-radius-md)'
      }
    }
  }
}