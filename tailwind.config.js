const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        primaryBackground:
          "linear-gradient(to bottom, var(--primary-gradient-start), var(--primary-gradient-end))",
        invertedPrimaryBackground:
          "linear-gradient(to top, var(--primary-gradient-start), var(--primary-gradient-end))",
      },
      colors: {
        primaryGradientStart: "var(--primary-gradient-start)",
        primaryGradientEnd: "var(--primary-gradient-end)",
        bg: "var(--bg-color)",
        text: "var(--text-color)",
        card: "var(--card-bg)",
        primary: "var(--primary)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--bg-color": "#ffffff",
          "--text-color": "#1f2937",
          "--card-bg": "#f9fafb",
          "--primary": "#3b82f6",
          "--primary-gradient-start": "#000000",
          "--primary-gradient-end": "#08203E",
        },
        "[data-theme='dark']": {
          "--bg-color": "#1f2937",
          "--text-color": "#f3f4f6",
          "--card-bg": "#374151",
          "--primary": "#2563eb",
          "--primary-gradient-start": "#000000",
          "--primary-gradient-end": "#08203E",
        },
      });
    }),
  ],
};
