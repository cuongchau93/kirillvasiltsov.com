<script>
  export let name;
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
  class="brief-background shadow-lg rounded-lg ml-6 mt-6 border-transparent p-10">
  <a href={`/writing/${name}`}>{name}</a>
</div>
