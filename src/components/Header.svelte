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
  $: console.log(path);

  const links = ["/", "/blog", "/about"];

  const isRoot = p => p === "/";
  const isCurrentPath = p => !isRoot(p) && path.startsWith(p);
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

  .nav-item:first-child,
  .nav-item + .nav-item {
    margin-right: 2rem;
  }
</style>

<header class="pt-8 flex justify-between items-baseline">
  <h1 class="font-extrabold inline-block font-sans bg-gradient mb-0 pt-4 pb-4">
    <a href="/">Kirill Vasiltsov</a>
  </h1>
  <nav class="flex justify-end">
    {#each links as link}
      <div class="nav-item p-2 w-20 box-border flex flex-col">
        <a class="flex-1 text-center font-bold text-xl pb-2" href={link}>
          {link === '/' ? 'home' : link.slice(1)}
        </a>
        {#if (link === '/' && path === '/') || isCurrentPath(link)}
          <div in:send out:recieve class="h-2 bg-auxbg" />
        {/if}
      </div>
    {/each}
    <slot />
  </nav>
</header>
