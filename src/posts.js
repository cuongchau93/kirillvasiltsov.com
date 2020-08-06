import * as postImports from "./posts/*.md"
import * as curatedImports from "./curated/*.md"
import { generateImage } from "./twitter-card"

export const posts = {}
export const curatedLists = {}

for (const imp of Object.values(postImports)) {
  const { html, slug, frontmatter } = imp.default
  posts[slug] = { html, meta: { ...frontmatter, slug } }
}

for (const imp of Object.values(curatedImports)) {
  const { html, slug, frontmatter } = imp.default
  curatedLists[slug] = { html, meta: { ...frontmatter, slug } }
}

export const getPostDescriptions = () => {
  return Object.values(posts).map((p) => {
    return {
      meta: { ...p.meta }
    }
  })
}

export const getAllTags = () =>
  new Set(
    Object.values(posts)
      .map((p) => p.meta.tags)
      .reduce((acc, val) => acc.concat(val), [])
  )
export const getAllPosts = () => Object.values(posts)
export const getPostSlugs = () => Object.keys(posts)
export const getPostBySlug = (slug) => posts[slug]
export const getTitleBySlug = (slug) => posts[slug].meta.title
export const getPostsByTag = (tag) =>
  Object.values(posts).filter((post) => post.meta.tags.includes(tag))

export const getCuratedListByField = (field) =>
  Object.values(curatedLists).find((list) => list.meta.field === field)

export const compareDate = (date1, date2) => new Date(date1) - new Date(date2)

export const orderByRecent = (posts) =>
  posts.sort((p1, p2) => compareDate(p2.meta.date, p1.meta.date))

const generateAllImages = async () => {
  const postSlugs = getPostSlugs()
  const imagePromises = postSlugs.map((slug) => {
    return generateImage({ postTitle: getTitleBySlug(slug), slug })
  })
  await Promise.all(imagePromises)
}

const { NODE_ENV } = process.env
const dev = NODE_ENV === "development"

if (!dev) {
  generateAllImages()
}
