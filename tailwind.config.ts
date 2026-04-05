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
        background: "#f8fafc",
        foreground: "#0f172a",
        primary: {
          DEFAULT: "#047857",
          dark: "#064e3b",
          light: "#10B981",
          lighter: "#6ee7b7",
          bg: "#ecfdf5",
        },
        accent: {
          DEFAULT: "#F59E0B",
          dark: "#92400e",
          bg: "#fffbeb",
        },
        blue: {
          DEFAULT: "#3B82F6",
          dark: "#1e40af",
          bg: "#eff6ff",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#3B82F6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        violet: {
          DEFAULT: "#8B5CF6",
          dark: "#5b21b6",
          bg: "#f5f3ff",
          50: "#f5f3ff",
          200: "#ddd6fe",
          500: "#8B5CF6",
          700: "#6d28d9",
        },
        red: {
          DEFAULT: "#EF4444",
          dark: "#991b1b",
          bg: "#fef2f2",
          50: "#fef2f2",
          200: "#fecaca",
          500: "#EF4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        pink: {
          DEFAULT: "#EC4899",
        },
        card: "#ffffff",
        border: "#e5e7eb",
        muted: {
          DEFAULT: "#6b7280",
          light: "#9ca3af",
        },
        surface: "#f9fafb",
      },
      fontFamily: {
        sans: ["DM Sans", "Segoe UI", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-12px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.3)" },
          "50%": { boxShadow: "0 0 0 8px rgba(16, 185, 129, 0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-in": "slideIn 0.4s ease forwards",
        "pulse-glow": "pulse-glow 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
