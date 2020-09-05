<script>
  import GithubIcon from "./GithubIcon.svelte";
  import TwitterIcon from "./TwitterIcon.svelte";
  import siteMetadata from "../routes/_meta.js";

  const w = 16;
  const h = 16;

  export let isHomepage = false;
</script>

<h1 class="font-sans pb-4">Social stuff</h1>
{#if isHomepage}
  <p class="pb-4">
    This is my personal website. Here are some other places where you can find
    and contact me.
  </p>
{/if}
<div>
  <div class="p-2 flex items-center">
    <GithubIcon {w} {h} />
    <a
      class="ml-4 fancy-link inline"
      href="https://github.com/jlkiri/kirillvasiltsov.com">
      View source on Github
    </a>
  </div>
  <div class="p-2 flex items-center">
    <TwitterIcon {w} {h} />
    <a class="ml-4 fancy-link inline" href={siteMetadata.twitter}>
      Follow me on Twitter
    </a>
  </div>
</div>
