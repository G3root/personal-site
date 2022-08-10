const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,ts,tsx}"],
  darkMode: ["class", ".dark-theme"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
        mono: ["JetBrainsMono", ...fontFamily.mono],
      },
      colors: {
        "lo-contrast": "var(--loContrast)",
        "hi-contrast": "var(--hiContrast)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
  presets: [require("windy-radix-palette")],
};
