<script context="module">
  export async function preload({ params }) {
    const response = await this.fetch(`writing/${params.tag}.json`);
    const posts = await response.json();
    return { posts, tag: params.tag };
  }
</script>

<script>
  import PostDescription from "../../components/PostDescription.svelte";
  import Bio from "../../components/Bio.svelte";
  import PostLayout from "../_post.svelte";
  export let posts;
  export let tag;
</script>

<PostLayout>
  <main class="pt-10">
    {#each posts as post}
      <PostDescription
        spoiler={post.meta.spoiler}
        link={post.meta.slug}
        tags={post.meta.tags}
        {tag}
        title={post.meta.title} />
    {/each}
  </main>
  <Bio />
</PostLayout>
