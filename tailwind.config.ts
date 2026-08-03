import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mda: {
          red: "#E2231A",
          dark: "#B71C15",
          ink: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["Assistant", "Rubik", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
