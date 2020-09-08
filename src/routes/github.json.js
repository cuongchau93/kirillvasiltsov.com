import fetch from "node-fetch"

require("dotenv").config()

export async function get(req, res) {
  const _contributed = [
    "gatsbyjs/gatsby",
    "dotansimha/graphql-code-generator",
    "pikapkg/snowpack",
    "orogene/orogene"
  ]

  const _built = [
    "react-easy-flip",
    "use-animate-presence",
    "springframes",
    "will-it-render",
    "looc",
    "tsx-ray",
    "umca",
    "useFetch",
    "wasm-game-of-life",
    "gatsby-remark-shiki",
    "rollup-plugin-web-imports"
  ]

  const builtResponses = await Promise.all(
    _built.map((repo) =>
      fetch(`https://api.github.com/repos/jlkiri/${repo}`, {
        headers: { Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}` }
      })
    )
  )

  const contributedResponses = await Promise.all(
    _contributed.map((repo) =>
      fetch(`https://api.github.com/repos/${repo}`, {
        headers: { Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}` }
      })
    )
  )

  const responses = await Promise.all(
    [...contributedResponses, ...builtResponses].map((r) => r.json())
  )
  const repositories = responses.map((repo) => {
    return {
      name: repo.name,
      description: repo.description,
      url: repo["html_url"],
      stars: repo["stargazers_count"],
      fullName: repo["full_name"]
    }
  })

  const built = repositories.filter((r) => _built.includes(r.name))

  const contributed = repositories.filter((r) =>
    _contributed.includes(r.fullName)
  )

  res.writeHead(200, {
    "Content-Type": "application/json"
  })

  res.end(JSON.stringify({ contributed, built }))
}
