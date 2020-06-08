import { getPostBySlug } from "../../posts.js";

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(getPostBySlug(req.params.slug)));
}
