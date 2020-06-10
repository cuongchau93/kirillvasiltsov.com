<script>
  import siteMetadata from "../siteMetadata";
  import MediaQuery from "./MediaQuery.svelte";
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

  const links = ["/", "/blog", "/OSS"];

  const isRoot = p => p === "/";
  const isCurrentPath = p => !isRoot(p) && path.startsWith(p);

  export let isMobile = false;
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

<header class="px-4 md:px-8 pt-8 flex justify-between items-baseline">
  <h1
    class="text-xl md:text-2xl lg:text-3xl font-extrabold inline-block font-sans
    bg-gradient mb-0">
    <a href="/">Kirill Vasiltsov</a>
  </h1>
  {#if !isMobile}
    <nav class="flex items-center justify-end">
      {#each links as link}
        <div class="w-24 h-12 box-border flex flex-col">
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
  {:else}
    <slot />
  {/if}
</header>
{#if isMobile}
  <footer class="fixed bg-bg border-t bottom-0 left-0 z-50 w-full">
    <nav class="flex text-xl justify-between">
      <div class="font-bold p-6">
        <a class="fancy-link" href="/">Home</a>
      </div>
      <div class="font-bold p-6">
        <a class="fancy-link" href="/blog">Blog</a>
      </div>
      <div class="font-bold p-6">
        <a class="fancy-link" href="/oss">OSS</a>
      </div>
    </nav>
  </footer>
{/if}
