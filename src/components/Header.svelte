<script>
  import siteMetadata from "../siteMetadata";
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import { crossfade, slide } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import { writable } from "svelte/store";

  const [send, recieve] = crossfade({
    delay: 0,
    duration: 200,
    fallback: slide,
    easing: cubicInOut
  });

  const { page } = stores();

  $: path = $page.path;

  const links = ["/", "/blog", "/about"];
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

<header class="flex justify-between">
  <div>
    <h1
      class="font-extrabold inline-block font-sans bg-gradient mb-0 pt-4 pb-4">
      <a href="/">kirillvasiltsov.com</a>
    </h1>
  </div>
  <div class="flex justify-center items-center">
    {#each links as link}
      <div class="ml-2 h-3">
        <a href={link}>{link === '/' ? 'home' : link.slice(1)}</a>
        {#if path === link}
          <div in:send out:recieve class="h-2 bg-auxbg" />
        {/if}
      </div>
    {/each}
    <slot />
  </div>
</header>
