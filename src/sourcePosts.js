import * as postImports from "./posts/*.md";

const posts = new Map();

for (const imp of Object.values(postImports)) {
  const { html, slug, frontmatter } = imp.default;
  posts.set(slug, { html, meta: { ...frontmatter, slug } });
}

export const getAllPosts = () => Array.from(posts.values());
export const getPostBySlug = (slug) => posts.get(slug);
