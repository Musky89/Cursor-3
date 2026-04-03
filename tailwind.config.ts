import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          900: "#080706",
          800: "#11100E",
          700: "#1A1815",
        },
        line: "#2A2621",
        ink: {
          1: "#F2EBDD",
          2: "#CFC4B2",
          3: "#9A8F80",
        },
        gold: {
          1: "#D6B06A",
          2: "#E8CCA0",
        },
      },
      fontFamily: {
        display: [
          "Cormorant Garamond",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.8rem, 5vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2rem, 3.5vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        "display-md": [
          "clamp(1.5rem, 2.5vw, 2rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em" },
        ],
        "display-sm": [
          "clamp(1.15rem, 1.8vw, 1.4rem)",
          { lineHeight: "1.2", letterSpacing: "-0.005em" },
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "slide-in": "slideIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
