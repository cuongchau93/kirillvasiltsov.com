import {
  getPostDescriptions,
  getPostBySlug,
  orderByRecent,
  getAllTags,
} from "../../posts";

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  const tags = getAllTags();

  res.end(JSON.stringify({ tags: Array.from(tags) }));
}

export { getPostBySlug };
