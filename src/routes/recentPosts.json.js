import { getPostDescriptions, orderByRecent } from "../posts";

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  const threeRecent = orderByRecent(getPostDescriptions()).slice(0, 3);

  res.end(JSON.stringify({ posts: threeRecent }));
}
