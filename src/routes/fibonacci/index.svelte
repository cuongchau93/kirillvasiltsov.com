<script context="module">
  export async function preload({ params }) {
    const response = await this.fetch(
      "https://www.kirillvasiltsov.com/.netlify/functions/counter?name=fibonacci"
    );
    const hits = await response.json();
    return { hits };
  }
</script>

<script>
  import { translator, language } from "./text";
  import SpiralCanvas from "./SpiralCanvas.svelte";
  import { onMount } from "svelte";

  export let hits;

  const fetchHits = async () => {
    const r = await fetch(
      "https://www.kirillvasiltsov.com/.netlify/functions/counter?name=fibonacci"
    );
    const hits = await r.json();
    return hits;
  };

  onMount(() => {
    hits = fetchHits();
  });

  const t = translator($language);
</script>

<style>
  h1 {
    margin: 0;
  }

  header {
    padding: 1em;
    text-align: center;
  }

  main {
    padding: 1em;
    line-height: 1.5;
  }

  main > * + * {
    margin-top: 2em;
  }

  img {
    max-width: 100%;
    border-radius: 1em;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr min(65ch, 100%) 1fr;
  }

  .grid > * {
    grid-column: 2;
  }

  .full-bleed {
    width: 100%;
    grid-column: 1 / 4;
  }

  .centered {
    display: flex;
    justify-content: center;
  }

  .relative {
    position: relative;
  }

  .canvas {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .hits {
    font-size: 0.5rem;
    color: gray;
  }

  aside {
    padding: 1em;
  }
</style>

<svelte:head>
  <title>Fibonacci in nature | Kirill Vasiltsov</title>
  <meta
    property="og:url"
    content="https://www.kirillvasiltsov.com/fibonacci/" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Kirill Vasiltsov | Fibonacci in nature" />
  <meta name="Description" content="Fibonacci patterns in nature" />
  <meta property="og:description" content="Fibonacci patterns in nature" />
  <meta
    property="og:image"
    content="https://www.kirillvasiltsov.com/thumbnail.png" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content="https://twitter.com/virtualkirill/" />
  <meta name="twitter:title" content="Kirill Vasiltsov | Fibonacci in nature" />
  <meta name="twitter:description" content="Fibonacci patterns in nature" />
  <meta
    name="twitter:image"
    content="https://www.kirillvasiltsov.com/thumbnail.png" />
</svelte:head>

<main class="grid">
  <header>
    <h1>Fibonacci In Nature</h1>
  </header>
  <section>
    {@html t('sec1')}
  </section>
  <div class="centered"><img src="/images/pinecone.jpg" alt="pine cone" /></div>
  <section>
    {@html t('sec2')}
  </section>
  <div class="centered">
    <img src="/images/leftspiral.jpg" alt="pine cone left spiral" />
  </div>
  <section>
    {@html t('sec3')}
  </section>
  <div class="centered">
    <img src="/images/rightspiral.jpg" alt="pine cone right spiral" />
  </div>
  <section>
    {@html t('sec4')}
  </section>
  <section>
    {@html t('sec5')}
  </section>
  <div class="centered">
    <img src="/images/sunflower.jpg" alt="sunflower" />
  </div>
  <section>
    {@html t('sec6')}
  </section>
  <section>
    {@html t('sec7')}
  </section>
  <div class="canvas full-bleed centered relative">
    <SpiralCanvas />
  </div>
  <section>
    {@html t('sec8')}
  </section>
  <section>
    {@html t('sec9')}
  </section>
</main>
<aside class="grid">
  {#await hits then hits}
    <div class="hits">{hits}</div>
  {/await}
</aside>
