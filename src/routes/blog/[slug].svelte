<script context="module">
  export async function preload({ params }) {
    const response = await this.fetch(`blog/${params.slug}.json`);

    const post = await response.json();

    // const pic = await this.fetch(`blog/${params.slug}.png`);
    return { post };
  }
</script>

<script>
  export let post;
</script>

<article>
  {@html post.html}
</article>
