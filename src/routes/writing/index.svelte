<script context="module">
  export async function preload() {
    const response = await this.fetch("writing/writing.json")
    const posts = await response.json()
    return { posts }
  }
</script>

<script>
  import meta from "../_meta.js"
  export let posts = []
  let empty = []
</script>

<svelte:head>
  <title>Writing | Kirill Vasiltsov</title>
  <meta property="og:url" content="https://www.kirillvasiltsov.com/writing/" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Kirill Vasiltsov | Writing" />
  <meta
    name="Description"
    content="Kirill Vasiltsov's personal and work writing"
  />
  <meta
    property="og:description"
    content="Kirill Vasiltsov's personal and work writing"
  />
  <meta
    property="og:image"
    content="https://www.kirillvasiltsov.com/thumbnail.png"
  />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content="https://twitter.com/virtualkirill/" />
  <meta name="twitter:title" content="Kirill Vasiltsov | Writing" />
  <meta
    name="twitter:description"
    content="Kirill Vasiltsov's personal and work writing"
  />
  <meta
    name="twitter:image"
    content="https://www.kirillvasiltsov.com/thumbnail.png"
  /></svelte:head
>

<main>
  <div class="max-width">
    <h2>Things I wrote:</h2>
    <ul class="posts">
      {#each posts as post}
        <li>
          <a href={`/writing/${post.slug}/`}>{post.meta.title}</a>
        </li>
      {/each}
    </ul>
  </div>
</main>

<style>
  main {
    padding: 1em;
  }
  .max-width {
    max-width: 1024px;
    margin: 0 auto;
  }

  .posts {
    list-style: none;
    margin-top: 1rem;
  }

  .posts > li {
    padding: 0.8em;
    background-color: var(--tint);
    border-radius: 1em;
  }

  .posts > * + * {
    display: block;
    margin-top: 1rem;
  }
</style>
