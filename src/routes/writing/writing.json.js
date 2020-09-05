import { getAllTags } from "../_posts";

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(Array.from(getAllTags())));
}
