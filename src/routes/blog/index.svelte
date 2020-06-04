<script context="module">
  /* import { getAllPosts } from "../../sourcePosts";
  const posts = getAllPosts(); */
  export async function preload() {
    const response = await this.fetch("blog/allPosts.json");
    const { slugs } = await response.json();
    return { slugs };
  }
</script>

<script>
  export let slugs;
</script>

<ul>
  {#each slugs as slug}
    <li>
      <a href={`/blog/${slug}`}>{slug}</a>
    </li>
  {/each}
</ul>
