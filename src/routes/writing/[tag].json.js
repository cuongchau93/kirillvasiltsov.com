import { getPostsByTag, getCuratedListByField } from "../../posts"

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  })

  res.end(
    JSON.stringify({
      posts: getPostsByTag(req.params.tag),
      list: getCuratedListByField(req.params.tag)
    })
  )
}
