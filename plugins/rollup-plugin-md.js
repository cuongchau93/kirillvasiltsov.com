import marked from "marked";
import { createFilter } from "rollup-pluginutils";
import matter from "gray-matter";
import path from "path";

export default function md(
  options = { include: ["**/*.md"], marked: { smartypants: true } }
) {
  const filter = createFilter(options.include, options.exclude);

  if (options.marked) {
    marked.setOptions(options.marked);
  }

  return {
    name: "md",

    transform(md, id) {
      if (!filter(id)) return null;

      const slug = path.basename(id, ".md");
      const { data: frontmatter, content } = matter(md);
      const html = marked(content);
      const data = { html, frontmatter, slug };

      return {
        code: `export default ${JSON.stringify(data)};`,
        map: { mappings: "" },
      };
    },
  };
}
