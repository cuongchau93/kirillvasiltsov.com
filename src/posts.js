import * as postImports from "./posts/*.md";

export const posts = {};

for (const imp of Object.values(postImports)) {
  const { html, slug, frontmatter } = imp.default;
  posts[slug] = { html, meta: { ...frontmatter, slug } };
}

export const getPostDescriptions = () => {
  return Object.values(posts).map((p) => {
    return {
      meta: { ...p.meta },
    };
  });
};

export const getAllPosts = () => Object.values(posts);
export const getPostSlugs = () => Object.keys(posts);
export const getPostBySlug = (slug) => posts[slug];
export const getTitleBySlug = (slug) => posts[slug].meta.title;
export const getPostsByTag = (tag) =>
  Object.values(posts).filter((post) => post.meta.tags.includes(tag));

export const compareDate = (date1, date2) => new Date(date1) - new Date(date2);

export const orderByRecent = (posts) =>
  posts.sort((p1, p2) => compareDate(p2.meta.date, p1.meta.date));
