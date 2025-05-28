/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", 
          light: "#93C5FD", 
          dark: "#1D4ED8", 
        },
        accent: {
          DEFAULT: "#10B981", 
          light: "#34D399", 
        },
        background: {
          DEFAULT: "#F9FAFB", 
          dark: "#0D1117", 
        },
        surface: {
          light: "#FFFFFF",
          dark: "#161B22",
        },
        text: {
          light: "#1F2937", 
        },
        muted: {
          light: "#6B7280",
          dark: "#9CA3AF",
        },
        border: {
          light: "#E5E7EB",
          dark: "#2C2C2C",
        },
        success: "#22C55E",
        warning: "#FACC15",
        error: "#EF4444",
      },

      fontFamily: {
        sans: ["Inter", "System", "sans-serif"],
      },

      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      boxShadow: {
        soft: "0 2px 6px rgba(0, 0, 0, 0.06)",
        medium: "0 4px 10px rgba(0, 0, 0, 0.08)",
        strong: "0 6px 16px rgba(0, 0, 0, 0.1)",
      },

      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
