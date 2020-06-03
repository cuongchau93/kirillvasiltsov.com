import marked from "marked";
import { createFilter } from "rollup-pluginutils";
import * as matter from "gray-matter";

export function md(options = {}) {
  const filter = createFilter(options.include || ["**/*.md"], options.exclude);

  if (options.marked) {
    marked.setOptions(options.marked);
  }

  return {
    name: "md",

    transform(md, id) {
      if (!/\.md$/.test(id)) return null;
      if (!filter(id)) return null;

      const content = marked(md);
      const frontmatter = matter(mdContent);
      const data = { content, frontmatter };
      return {
        code: `export default ${JSON.stringify(data.toString())};`,
        map: { mappings: "" },
      };
    },
  };
}
