import { getAllPosts, posts } from "../../posts";

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify({ posts: getAllPosts() }));
}

export { posts };
