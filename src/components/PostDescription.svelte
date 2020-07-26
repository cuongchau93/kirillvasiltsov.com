<script>
  export let title;
  export let spoiler;
  export let link;
  export let tags;
  export let tag;
</script>

<style>
  .brief-background {
    background: var(--gradient);
    transition: transform 150ms;
  }

  .brief-background:hover {
    transform: scale(1.1);
  }
</style>

<div
  class="brief-background shadow-lg rounded-md border-transparent pl-5 pb-5
  pt-10 pr-5 mb-10">
  <div class="pb-2">
    <a href={`/writing/${tag}/${link}`}>
      <h2 class="pb-2 font-header font-black leading-tight">{title}</h2>
    </a>
  </div>
  <p class="pb-4 font-sans">{spoiler}</p>
  <div class="flex justify-end">
    {#each tags as tag}
      <div
        class="py-1 px-2 ml-2 first:m-0 text-white bg-tag rounded-lg text-xs
        inline-block">
        <a href={`/writing/${tag}`}>{tag}</a>
      </div>
    {/each}
  </div>
</div>
