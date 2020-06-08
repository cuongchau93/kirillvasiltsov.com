import queryString from "query-string";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({
  path: `.env`,
});

const getMentions = ({ domain, token, perPage = 10000 }) => {
  return fetch(
    `https://webmention.io/api/mentions.jf2?${queryString.stringify({
      domain,
      token,
      "per-page": perPage,
    })}`
  )
    .then((response) => response.json())
    .then((mentions) => {
      if (!mentions || !mentions.children) {
        return [];
      }
      return mentions.children;
    })
    .catch(console.error);
};

export async function get(req, res) {
  const webmentions = await getMentions({
    domain: "phantasiai.dev",
    token: process.env.WEBMENTIONS_TOKEN,
  });

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify({ webmentions }));
}
