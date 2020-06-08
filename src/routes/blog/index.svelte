<script context="module">
  export async function preload() {
    this.fetch("blog/rss.xml");
    const responses = await Promise.all([
      this.fetch("blog/allPosts.json"),
      this.fetch("blog/webmentions.json")
    ]);
    const [{ posts }, { webmentions }] = await Promise.all(
      responses.map(r => r.json())
    );
    return { posts };
  }
</script>

<script>
  import Header from "../../components/Header.svelte";
  import PostDescription from "../../components/PostDescription.svelte";
  import Bio from "../../components/Bio.svelte";
  export let posts;
</script>

<Header isRoot />
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
