<script context="module">
  export async function preload({ params }) {
    const response = await this.fetch(`writing/${params.slug}.json`);

    const content = await response.json();
    return { content };
  }
</script>

<script>
  export let content;
</script>

<style>
  .max-width {
    max-width: 1024px;
    margin: 0 auto;
  }

  .content {
    padding: 1em 1em;
  }

  main > * + * {
    margin-top: 1rem;
  }

  @media screen and (min-width: 768px) {
    .content {
      padding: 1em 7em;
    }
  }
</style>

<main>
  {@html content.html}
</main>
