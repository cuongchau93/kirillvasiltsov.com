import { getPostSlugs, posts } from "../../posts";

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify({ slugs: getPostSlugs() }));
}

export { posts };
