<script>
  import siteMetadata from "../siteMetadata";
  export let isRoot = false;
</script>

<style>
  .bg-gradient {
    background: rgb(255, 174, 15);
    background: linear-gradient(
      138deg,
      rgba(255, 174, 15, 1) 0%,
      rgba(157, 12, 168, 1) 48%,
      rgba(255, 36, 0, 1) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>

<header>
  <h1
    class="lg:text-5xl font-extrabold inline-block font-mono bg-gradient mb-0
    pt-4 pb-4">
    <a href="/blog">writing</a>
  </h1>
  {#if isRoot}
    <h2 class="lg:text-3xl pt-2 pb-2 font-serif text-auxtext font-bold">
      By
      <a href={siteMetadata.twitter} class="fancy-link">Kirill Vasiltsov</a>
    </h2>
  {/if}
</header>
