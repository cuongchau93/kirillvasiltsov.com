import queryString from "query-string";
import fetch from "node-fetch";
import { getPostBySlug } from "./allPosts.json";

const getMentions = ({ target, perPage = 500 }) => {
  return fetch(
    `https://webmention.io/api/mentions?${queryString.stringify({
      page: 0,
      target,
      "per-page": perPage,
    })}`
  )
    .then((response) => response.json())
    .then((mentions) => {
      if (!mentions || !mentions.links) {
        return [];
      }
      return mentions.links;
    })
    .catch(console.error);
};

const getLikes = (mentions) =>
  mentions.filter((m) => m.activity.type === "like");
const getReplies = (mentions) =>
  mentions.filter((m) => m.activity.type === "reply");

export async function get(req, res) {
  const { slug } = req.params;
  // const target = `${siteMetadata.url}/${slug}/`;
  const target = `https://phantasiai.dev/${slug}/`;

  const webmentions = await getMentions({
    target: target,
  });

  const likes = getLikes(webmentions);
  const replies = getReplies(webmentions);

  const postData = {
    post: getPostBySlug(slug),
    likes,
    replies,
  };

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(postData));
}
