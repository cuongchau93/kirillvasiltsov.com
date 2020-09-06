<script context="module">
  export async function preload() {
    const response = await this.fetch("github.json");
    const { featured } = response.json();
    return { repositories: featured };
  }
</script>

<script>
  import RepositoryCard from "../components/RepositoryCard.svelte";
  import Social from "../components/Social.svelte";

  export let repositories = [];
</script>

<style>
  .hero-grid {
    display: grid;
  }
</style>

<svelte:head>
  <title>Kirill Vasiltsov | Personal website</title>
  <meta property="og:url" content="https://www.kirillvasiltsov.com/" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Kirill Vasiltsov | Personal website" />
  <meta name="Description" content="Kirill Vasiltsov's personal website" />
  <meta
    property="og:description"
    content="Kirill Vasiltsov's personal website" />
  <meta
    property="og:image"
    content="https://www.kirillvasiltsov.com/home.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="https://twitter.com/virtualkirill/" />
  <meta name="twitter:title" content="Kirill Vasiltsov | Personal website" />
  <meta
    name="twitter:description"
    content="Kirill Vasiltsov's personal website" />
  <meta
    name="twitter:image"
    content="https://www.kirillvasiltsov.com/home.jpg" />
</svelte:head>

<div class="hero-grid" />
