<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  .centered {
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="centered">
  <h1>{status}</h1>
</div>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
