const { fontFamily } = require("tailwindcss/defaultTheme");

const { createPlugin } = require("windy-radix-palette");
const {
  slate,
  slateDark,
  blackA,
  whiteA,
  blue,
  blueDark,
  yellow,
  yellowDark,
  red,
  redDark,
  green,
  greenDark,
  orange,
  orangeDark,
  pink,
  pinkDark,
  violet,
  violetDark,
} = require("@radix-ui/colors");

const colors = createPlugin({
  slate,
  slateDark,
  blackA,
  whiteA,
  blue,
  blueDark,
  yellow,
  yellowDark,
  red,
  redDark,
  green,
  greenDark,
  orange,
  orangeDark,
  pink,
  pinkDark,
  violet,
  violetDark,
});

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
    colors.plugin,
  ],
};
