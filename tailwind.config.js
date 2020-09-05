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
        text: `var(--text)`,
        tag: `var(--tag)`,
        auxbg: `var(--auxbg)`,
        auxtext: `var(--auxtext)`,
        codeBg: `var(--codeBg)`,
        shadow: `var(--shadow)`,
        cgradient: `var(--cgradient)`,
        cardText: `var(--card-text)`,
      },
    },
  },
  variants: {},
  plugins: [],
};
