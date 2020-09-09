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

  .writing-content {
    padding: 1em;
    line-height: 1.4;
  }

  :global(p > code) {
    background-color: hsl(0, 0%, 13%);
    color: hsl(180, 100%, 97%);
    padding: 0.2em;
    border-radius: 0.5em;
  }

  :global(.writing-content > iframe, img) {
    display: block;
    border-radius: 1em;
  }

  :global(.writing-content > ul) {
    padding: 1em;
  }

  :global(.writing-content > * + *) {
    margin-top: 1rem;
  }

  :global(.writing-content > * + h2) {
    margin-top: 1.7rem;
  }
  :global(.writing-content > * + h3) {
    margin-top: 1.5rem;
  }

  :global(.writing-content > h1) {
    font-size: 2rem;
  }

  @media screen and (min-width: 640px) {
    .writing-content {
      padding: 1em 4em;
    }
  }

  @media screen and (min-width: 1024px) {
    .writing-content {
      padding: 1em 8em;
    }
  }
</style>

<main>
  <article class="max-width writing-content">
    <h1>{content.meta.title}</h1>
    {@html content.html}
  </article>
</main>
