/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          300: "var(--color-brand-300)",
          400: "var(--color-brand-400)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
          900: "var(--color-brand-900)",
        },
        accent: {
          500: "var(--color-accent-500)",
          600: "var(--color-accent-600)",
          700: "var(--color-accent-700)",
        },
        warning: {
          500: "var(--color-warning-500)",
          600: "var(--color-warning-600)",
          700: "var(--color-warning-700)",
        },
        danger: {
          500: "var(--color-danger-500)",
          600: "var(--color-danger-600)",
          700: "var(--color-danger-700)",
        },
        success: {
          500: "var(--color-success-500)",
          600: "var(--color-success-600)",
          700: "var(--color-success-700)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          muted: "var(--color-surface-muted)",
          elevated: "var(--color-surface-elevated)",
          border: "var(--color-border)",
        },
        soft: "var(--soft)",
        line: "var(--line)",
        sky: "var(--sky)",
        yellow: "var(--yellow)",
        orange: {
          DEFAULT: "var(--orange)",
          500: "var(--color-orange-500)",
          600: "var(--color-orange-600)",
          700: "var(--color-orange-700)",
        },
        green: "var(--green)",
        primary: {
          DEFAULT: "var(--primary)",
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          muted: "var(--color-ink-muted)",
          inverse: "var(--color-ink-inverse)",
        },
        muted: {
          foreground: "var(--muted-foreground)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        panel: "var(--shadow-panel)",
      },
      borderRadius: {
        panel: "var(--radius-panel)",
        control: "var(--radius-control)",
      },
    },
  },
  plugins: [],
};
