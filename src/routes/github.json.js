import fetch from "node-fetch";

require("dotenv").config();

export async function get(req, res) {
  const selectedRepositoryNames = [
    "react-easy-flip",
    "looc",
    "tsx-ray",
    "umca",
  ];

  const githubResponses = await Promise.all(
    selectedRepositoryNames.map((repo) =>
      fetch(`https://api.github.com/repos/jlkiri/${repo}`, {
        headers: { Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}` },
      })
    )
  );

  const repositories = await Promise.all(githubResponses.map((r) => r.json()));
  const filteredRepos = repositories.map((repo) => {
    return {
      name: repo.name,
      description: repo.description,
      url: repo["html_url"],
      stars: repo["stargazers_count"],
      fullName: repo["full_name"],
    };
  });

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(filteredRepos));
}
