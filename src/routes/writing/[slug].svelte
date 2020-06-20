<script context="module">
  export async function preload({ params }) {
    const response = await this.fetch(`writing/${params.slug}.json`);
    const { post, likes, replies, reposts } = await response.json();

    return { post, likes, replies, reposts };
  }
</script>

<script>
  import Bio from "../../components/Bio.svelte";
  import Webmentions from "../../components/Webmentions.svelte";
  import PostLayout from "../_post.svelte";
  export let post;
  export let likes;
  export let replies;
  export let reposts;
</script>

<svelte:head>
  <title>{`Kirill Vasiltsov | Writing | ${post.meta.title}`}</title>
  <script src="_prism.js">

  </script>
  <meta
    property="og:url"
    content={`https://www.kirillvasiltsov.com/writing/${post.meta.slug}`} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.meta.title} />
  <meta name="Description" content={post.meta.title} />
  <meta property="og:description" content={post.meta.title} />
  <meta
    property="og:image"
    content={`https://www.kirillvasiltsov.com/writing/${post.meta.slug}/twitter-card.jpg`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:domain" value="kirillvasiltsov.com" />
  <meta name="twitter:creator" value="https://twitter.com/virtualkirill/" />
  <meta name="twitter:title" value={post.meta.title} />
  <meta name="twitter:description" value={post.meta.spoiler} />
  <meta
    name="twitter:image"
    content={`https://www.kirillvasiltsov.com/writing/${post.meta.slug}/twitter-card.jpg`} />
</svelte:head>

<PostLayout>
  <main class="pb-4 pt-8">
    <div class="pb-8">
      <h1 class="font-postHeader">{post.meta.title}</h1>
    </div>
    <article class="font-sans text-lg">
      {@html post.html}
    </article>
    <Webmentions {likes} {replies} {reposts} />
  </main>
  <Bio />
</PostLayout>
