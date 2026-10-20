import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // Sharp edges everywhere — no rounded cards.
    borderRadius: {
      none: "0",
      full: "9999px",
    },
    extend: {
      // Colours are CSS variables (see app/globals.css) so the dashboard can switch to a plain
      // black-and-grey scheme with the `.admin` class while the shop keeps its brand colours.
      colors: {
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          900: "rgb(var(--c-ink) / <alpha-value>)",
          800: "rgb(var(--c-ink-800) / <alpha-value>)",
          700: "rgb(var(--c-ink-700) / <alpha-value>)",
        },
        burgundy: {
          DEFAULT: "rgb(var(--c-burgundy) / <alpha-value>)",
          700: "rgb(var(--c-burgundy-700) / <alpha-value>)",
          900: "rgb(var(--c-burgundy-900) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--c-gold) / <alpha-value>)",
          light: "rgb(var(--c-gold-light) / <alpha-value>)",
          dark: "rgb(var(--c-gold-dark) / <alpha-value>)",
        },
        // stock badges in the dashboard
        stock: {
          low: "rgb(var(--c-stock-low) / <alpha-value>)",
          medium: "rgb(var(--c-stock-medium) / <alpha-value>)",
          healthy: "rgb(var(--c-stock-healthy) / <alpha-value>)",
        },
        cream: {
          DEFAULT: "rgb(var(--c-cream) / <alpha-value>)",
          muted: "rgb(var(--c-cream-muted) / <alpha-value>)",
          dim: "rgb(var(--c-cream-dim) / <alpha-value>)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.3em",
        wider2: "0.18em",
      },
      maxWidth: {
        site: "1320px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        scrollcue: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        progress: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slow-zoom": "slow-zoom 9s ease-out both",
        shimmer: "shimmer 4s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        progress: "progress 7s linear both",
        scrollcue: "scrollcue 2s cubic-bezier(0.22, 1, 0.36, 1) infinite",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
