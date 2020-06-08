<script context="module">
  export async function preload({ params }) {
    const response = await this.fetch(`blog/${params.slug}.json`);
    const post = await response.json();
    return { post };
  }
</script>

<script>
  import Header from "../../components/Header.svelte";
  import Bio from "../../components/Bio.svelte";
  export let post;
</script>

<Header />
<main class="pb-4">
  <div class="pb-8">
    <h1 class="font-postHeader pb-4">{post.meta.title}</h1>
  </div>
  <article class="font-sans text-lg">
    {@html post.html}
  </article>
  <!-- <Mentions {mentions} /> -->
</main>
<Bio />
