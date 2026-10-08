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
      colors: {
        ink: {
          DEFAULT: "#0D0404",
          900: "#0D0404",
          800: "#160808",
          700: "#1E0B0B",
        },
        burgundy: {
          DEFAULT: "#6B1A1A",
          700: "#561414",
          900: "#2A0A0A",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#DCC27A",
          dark: "#9E8236",
        },
        cream: {
          DEFAULT: "#F5ECD7",
          muted: "#CDBFA3",
          dim: "#8F826B",
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
