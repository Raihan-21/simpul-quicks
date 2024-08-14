import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#2F80ED",
        secondary: "#F8B76B",
        tertiary: "#8785FF",
        "main-red": "#EB5757",
        "dark-gray": "#4F4F4F",
        gray: "#828282",
        "light-gray": "#E0E0E0",
        "dark-orange": "#E5A443",
        "main-orange": "#F8B76B",
        "light-orange": "#FCEED3",
        "main-purple": "#8785FF",
        "second-purple": "#9B51E0",
        "light-purple": "#EEDCFF",
        "second-white": "#F2F2F2",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
