const cssnano = require("cssnano");
const tailwindcss = require("tailwindcss");
const tailwindcssConfig = require("./tailwind.config");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
  plugins: [
    tailwindcss(tailwindcssConfig),

    !dev &&
      cssnano({
        preset: ["default", { discardComments: { removeAll: true } }],
      }),
  ].filter(Boolean),
};
