<script context="module">
  export async function preload({ params }) {
    const response = await this.fetch(`writing/${params.tag}.json`);
    const { posts, list } = await response.json();
    console.log("posts", posts);
    return { posts, list, tag: params.tag };
  }
</script>

<script>
  import PostDescription from "../../components/PostDescription.svelte";
  import Bio from "../../components/Bio.svelte";
  import PostLayout from "../_post.svelte";
  export let posts;
  export let list;
  export let tag;
</script>

<svelte:head>
  <script src="_prism.js">

  </script>
</svelte:head>

<PostLayout>
  <main class="pt-10">
    {#if list}
      <h2 class="text-4xl">
        Curated list of {list.meta.field} resources and memos
      </h2>

      <article class="font-sans text-lg pb-10 pt-5">
        {@html list.html}
      </article>
    {/if}
    <section>
      <h2 class="pb-2">Posts</h2>
      {#each posts as post}
        <PostDescription
          spoiler={post.meta.spoiler}
          link={post.slug}
          tags={post.meta.tags}
          {tag}
          title={post.meta.title} />
      {/each}
    </section>
  </main>
  <Bio />
</PostLayout>
