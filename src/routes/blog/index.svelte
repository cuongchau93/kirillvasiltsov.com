<script>
  import { getAllPosts } from "../../sourcePosts";
  const posts = getAllPosts();
</script>

<ul>
  {#each posts as post}
    <li>{post.meta.slug}</li>
  {/each}
</ul>
