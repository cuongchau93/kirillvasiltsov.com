import { posts } from "./allPosts";

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  console.log(posts[req.params.slug]);

  res.end(JSON.stringify(posts[req.params.slug]));
}
