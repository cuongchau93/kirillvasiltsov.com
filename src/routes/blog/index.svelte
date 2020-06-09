<script context="module">
  export async function preload() {
    this.fetch("blog/rss.xml");
    const responses = await Promise.all([this.fetch("blog/allPosts.json")]);
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
