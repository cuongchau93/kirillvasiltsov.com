<script context="module">
  export async function preload() {
    const responses = await Promise.all([this.fetch("writing/allPosts.json")]);
    const [{ tags }] = await Promise.all(responses.map(r => r.json()));
    return { tags };
  }
</script>

<script>
  import TagCard from "../../components/TagCard.svelte";
  import Bio from "../../components/Bio.svelte";
  import PostLayout from "../_post.svelte";

  export let tags;
</script>

<style>

</style>

<svelte:head>
  <title>Writing | Kirill Vasiltsov</title>
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
  <meta name="twitter:creator" content="https://twitter.com/virtualkirill/" />
  <meta name="twitter:title" content="Kirill Vasiltsov | Writing" />
  <meta
    name="twitter:description"
    content="Kirill Vasiltsov's personal and work writing" />
  <meta
    name="twitter:image"
    content="https://www.kirillvasiltsov.com/writing/writing.jpg" />
</svelte:head>
<PostLayout>
  <main
    class="pt-10 pb-10 font-bold flex items-center justify-center flex-wrap">
    {#each tags as tag}
      <TagCard name={tag} />
    {/each}
  </main>
  <Bio />
</PostLayout>
