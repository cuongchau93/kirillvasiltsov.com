import marked from "marked";
import { createFilter } from "rollup-pluginutils";
import matter from "gray-matter";
import path from "path";
import shiki from "shiki";

export default function md(
  options = { include: ["**/*.md"], marked: { smartypants: true } }
) {
  const filter = createFilter(options.include, options.exclude);

  let theme = options.theme || "nord";
  let shikiTheme;

  try {
    shikiTheme = shiki.getTheme(theme);
  } catch (_) {
    try {
      shikiTheme = shiki.loadTheme(theme);
    } catch (_) {
      throw new Error("Unable to load theme: " + theme);
    }
  }

  return {
    name: "md",

    async transform(md, id) {
      if (!filter(id)) return null;

      const shikiHightlighter = await shiki.getHighlighter({
        theme: shikiTheme,
      });

      const highlighter = (code, lang, callback) => {
        const result = shikiHightlighter.codeToHtml(code, lang);
        callback(null, result);
      };

      const markedOptions = { ...options.marked, highlight: highlighter };

      const slug = path.basename(id, ".md");
      const { data: frontmatter, content } = matter(md);

      const returnValue = await new Promise((resolve, reject) => {
        marked(content, markedOptions, (_, result) => {
          const data = { html: result, frontmatter, slug };
          resolve({
            code: `export default ${JSON.stringify(data)};`,
            map: { mappings: "" },
          });
        });
      });

      return returnValue;
    },
  };
}
