import { getPostBySlug } from "../_posts"

export async function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  })

  const post = await getPostBySlug(req.params.slug)
  res.end(JSON.stringify(post))
}
