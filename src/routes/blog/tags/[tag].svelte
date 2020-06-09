<script context="module">
  export async function preload({ params }) {
    const response = await this.fetch(`blog/tags/${params.tag}.json`);
    const posts = await response.json();
    return { posts };
  }
</script>

<script>
  import PostDescription from "../../../components/PostDescription.svelte";
  import Bio from "../../../components/Bio.svelte";
  import PostLayout from "../../_post.svelte";
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
