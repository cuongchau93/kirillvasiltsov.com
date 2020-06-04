<script context="module">
  /* import { getAllPosts } from "../../sourcePosts";
  const posts = getAllPosts(); */
  export async function preload() {
    const response = await this.fetch("blog/allPosts");
    const posts = await response.json();
    // console.log(posts);
    return { posts: Object.values(posts) };
  }
</script>

<script>
  export let posts;
</script>

<ul>
  {#each posts as post}
    <li>
      <a href={`/blog/${post.meta.slug}`}>{post.meta.slug}</a>
    </li>
  {/each}
</ul>
