import { getPostsByTag } from "../_posts";

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      posts: getPostsByTag(req.params.tag)(),
      list: null,
    })
  );
}
