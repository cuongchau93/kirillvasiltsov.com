<script context="module">
  export async function preload({ params }) {
    const response = await this.fetch(`blog/${params.slug}.json`);
    const { post, likes, replies } = await response.json();
    return { post, likes, replies };
  }
</script>

<script>
  import Header from "../../components/Header.svelte";
  import Bio from "../../components/Bio.svelte";
  import Webmentions from "../../components/Webmentions.svelte";
  export let post;
  export let likes;
  export let replies;
</script>

<Header />
<main class="pb-4">
  <div class="pb-8">
    <h1 class="font-postHeader">{post.meta.title}</h1>
  </div>
  <article class="font-sans text-lg">
    {@html post.html}
  </article>
  <Webmentions {likes} {replies} />
</main>
<Bio />
