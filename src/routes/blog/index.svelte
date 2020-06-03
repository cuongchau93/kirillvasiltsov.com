<script context="module">
  export async function preload() {
    try {
      const response = await this.fetch(`blog/posts.json`);
      const posts = await response.json();
      return { posts };
    } catch (e) {
      console.log("ERROR", e);
    }
  }
</script>

<script>
  export let posts;
</script>

<ul>
  {#each posts as post}
    <li>{post}</li>
  {/each}
</ul>
