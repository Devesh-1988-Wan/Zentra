/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--amla-bg)",
        surface: "var(--amla-surface)",
        text: "var(--amla-text)",
        muted: "var(--amla-muted)",
        brand: "var(--amla-brand)",
        accent: "var(--amla-accent)",
        danger: "var(--amla-danger)",
        warning: "var(--amla-warning)",
        success: "var(--amla-success)",
        border: "var(--amla-border)",
      },
      boxShadow: {
        sm: "var(--amla-shadow-sm)",
        md: "var(--amla-shadow-md)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      }
    },
  },
  plugins: [],
}
