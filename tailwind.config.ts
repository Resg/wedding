import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f5f7f4",
          100: "#e7ece5",
          200: "#cfdacb",
          300: "#a7bda0",
          400: "#7a9771",
          500: "#5c6a50",
          600: "#495740",
          700: "#3a4533",
          800: "#2e3728",
          900: "#232a1f",
        },
        gold: {
          50: "#fbf7ea",
          100: "#f6ecc8",
          200: "#eedc8f",
          300: "#e2c65a",
          400: "#d3ad2f",
          500: "#b89120",
          600: "#92711a",
          700: "#6f5516",
          800: "#594414",
          900: "#463611",
        },
      },
      boxShadow: {
        soft: "0 10px 35px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        fadeUp: "fadeUp 700ms ease-out both",
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(58,69,51,0.25)",
          },
          "50%": {
            transform: "scale(1.03)",
            boxShadow: "0 0 0 12px rgba(58,69,51,0)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
