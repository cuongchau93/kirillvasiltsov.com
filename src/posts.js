import * as postImports from "./posts/*.md";

export const posts = {};

for (const imp of Object.values(postImports)) {
  const { html, slug, frontmatter } = imp.default;
  posts[slug] = { html, meta: { ...frontmatter, slug } };
}

export const getAllPosts = () => Object.values(posts);
export const getPostSlugs = () => Object.keys(posts);
export const getPostBySlug = (slug) => posts[slug];
export const getTitleBySlug = (slug) => posts[slug].meta.title;
export const getPostsByTag = (tag) =>
  Object.values(posts).filter((post) => post.meta.tags.includes(tag));
