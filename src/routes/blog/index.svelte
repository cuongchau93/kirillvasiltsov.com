<script context="module">
  export async function preload() {
    const responses = await Promise.all([
      this.fetch("blog/allPosts.json"),
      this.fetch("blog/webmentions.json")
    ]);
    const [{ slugs }, { webmentions }] = await Promise.all(
      responses.map(r => r.json())
    );
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
