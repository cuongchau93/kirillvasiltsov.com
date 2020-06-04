import * as postImports from "./posts/*.md";

export const posts = {};

for (const imp of Object.values(postImports)) {
  const { html, slug, frontmatter } = imp.default;
  posts[slug] = { html, meta: { ...frontmatter, slug } };
}

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify({ slugs: Object.keys(posts) }));
}
