const fs = require("fs")
const path = require("path")
const graymatter = require("gray-matter")
const snarkdown = require("snarkdown")

const contentDir = path.resolve(process.cwd(), "posts")

const postCache = new Map()

const loadEntry = (filename) => {
  const file = fs.readFileSync(path.join(contentDir, filename))
  const { data: frontmatter, content: md } = graymatter(file)
  const html = snarkdown(md)

  const slug = path.basename(filename, ".md")

  postCache.set(slug, { html, slug, meta: frontmatter })

  return { html, slug, meta: frontmatter }
}

const loadAllEntries = () => {
  const dir = fs.readdirSync(contentDir)

  for (const file of dir) {
    const filename = path.basename(file, ".md")

    if (!postCache.get(filename)) {
      loadEntry(file)
    }
  }

  return postCache
}

const getFromCache = (key) => {
  const entry = postCache.get(key)

  if (!entry) {
    return loadEntry(`${key}.md`)
  }

  return entry
}

const withCache = (fn) => () => fn(loadAllEntries())

exports.getAllPosts = withCache((cache) => cache.values())
exports.getPostSlugs = withCache((cache) => Array.from(cache.keys()))
exports.getPostBySlug = (slug) => getFromCache(slug)
exports.getPostsByTag = (tag) =>
  withCache((cache) =>
    Array.from(cache.values()).filter((entry) => {
      // console.log("entry", entry.meta.tags);
      return entry.meta.tags.includes(tag)
    })
  )
exports.getTitleBySlug = (slug) => {
  const entry = getFromCache(slug)
  return entry.meta.title
}
exports.getAllTags = withCache(
  (cache) =>
    new Set(
      Array.from(cache.values())
        .map((p) => p.meta.tags)
        .reduce((acc, val) => acc.concat(val), [])
    )
)

const compareDate = (date1, date2) => new Date(date1) - new Date(date2)

exports.orderByRecent = (posts) =>
  posts.sort((p1, p2) => compareDate(p2.meta.date, p1.meta.date))
