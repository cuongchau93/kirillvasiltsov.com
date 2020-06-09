const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [process.env.NODE_ENV === "production" && "./src/**/*.svelte"],
  theme: {
    extend: {
      fontFamily: {
        header: ["Georgia", ...defaultTheme.fontFamily.serif],
        mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
        postHeader: ["Georgia", ...defaultTheme.fontFamily.serif],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        bg: `var(--bg)`,
        text: `var(--text)`,
        tag: `var(--tag)`,
        auxbg: `var(--auxbg)`,
        auxtext: `var(--auxtext)`,
        codeBg: `var(--codeBg)`,
      },
    },
  },
  variants: {},
  plugins: [],
};
