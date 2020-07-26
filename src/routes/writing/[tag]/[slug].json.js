import queryString from "query-string";
import fetch from "node-fetch";
import { getPostBySlug } from "../allPosts.json";

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
const getReposts = (mentions) =>
  mentions.filter(
    (m) => m.activity.type === "repost" || m.activity.type === "link"
  );

export async function get(req, res) {
  const { slug } = req.params;
  // const target = `${siteMetadata.url}/${slug}/`;
  const target = `https://phantasiai.dev/${slug}/`;
  const target2 = `https://www.kirillvasiltsov.com/writing/${slug}/`;

  const [oldWebmentions, currentWebmentions] = await Promise.all([
    getMentions({
      target: target,
    }),
    getMentions({
      target: target2,
    }),
  ]);

  const likes = getLikes(oldWebmentions).concat(getLikes(currentWebmentions));
  const replies = getReplies(oldWebmentions).concat(
    getReplies(currentWebmentions)
  );
  const reposts = getReposts(oldWebmentions).concat(
    getReposts(currentWebmentions)
  );

  const postData = {
    post: getPostBySlug(slug),
    likes,
    replies,
    reposts,
  };

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(postData));
}
