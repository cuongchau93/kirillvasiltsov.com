<script context="module">
  export async function preload() {
    this.fetch("blog/rss.xml");
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
  import Header from "../../components/Header.svelte";
  export let slugs;
</script>

<Header isRoot />
<ul>
  {#each slugs as slug}
    <li>
      <a class="text-auxbg" href={`/blog/${slug}`}>{slug}</a>
    </li>
  {/each}
</ul>
<a href={`/blog/rss.xml`}>RSS</a>
