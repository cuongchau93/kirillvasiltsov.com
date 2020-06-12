<script context="module">
  import { rssStatus } from "./_rss_store.js";

  let status;

  rssStatus.subscribe(s => {
    status = s;
  });

  export async function preload() {
    if (!status) {
      await this.fetch("writing/rss.xml");
      rssStatus.set("fetched");
    }

    const responses = await Promise.all([this.fetch("writing/allPosts.json")]);
    const [{ posts }] = await Promise.all(responses.map(r => r.json()));
    return { posts };
  }
</script>

<script>
  import PostDescription from "../../components/PostDescription.svelte";
  import Bio from "../../components/Bio.svelte";
  import PostLayout from "../_post.svelte";

  export let posts;
</script>

<svelte:head>
  <title>Kirill Vasiltsov | Writing</title>
  <meta property="og:url" content="https://www.kirillvasiltsov.com/writing/" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Kirill Vasiltsov | Writing" />
  <meta
    name="Description"
    content="Kirill Vasiltsov's personal and work writing" />
  <meta
    property="og:description"
    content="Kirill Vasiltsov's personal and work writing" />
  <meta
    property="og:image"
    content="https://www.kirillvasiltsov.com/writing/writing.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="https://twitter.com/maaiiya8/" />
  <meta name="twitter:title" content="Kirill Vasiltsov | Writing" />
  <meta
    name="twitter:description"
    content="Kirill Vasiltsov's personal and work writing" />
  <meta
    name="twitter:image"
    content="https://www.kirillvasiltsov.com/writing/writing.jpg" />
</svelte:head>

<PostLayout>
  <main class="pt-10">
    {#each posts as post}
      <PostDescription
        spoiler={post.meta.spoiler}
        link={post.meta.slug}
        tags={post.meta.tags}
        title={post.meta.title} />
    {/each}
  </main>
  <Bio />
</PostLayout>
