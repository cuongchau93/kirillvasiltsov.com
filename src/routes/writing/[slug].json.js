import { getPostBySlug } from "../_posts";

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  const post = getPostBySlug(req.params.slug);
  res.end(JSON.stringify(getPostBySlug(req.params.slug)));
}
