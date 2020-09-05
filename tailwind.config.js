const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [process.env.NODE_ENV === "production" && "./src/**/*.svelte"],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.serif],
        mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        bg: `var(--bg)`,
        primary: `var(--primary)`,
        secondary: `var(--secondary)`,
      },
    },
  },
  variants: {},
  plugins: [],
};
