<script context="module">
  export async function preload() {
    const responses = await Promise.all([this.fetch("github.json")]);
    const [{ allRepos }] = await Promise.all(responses.map(r => r.json()));
    return { repositories: allRepos };
  }
</script>

<script>
  import MainLayout from "./_main.svelte";
  import SimpleRepositoryCard from "../components/SimpleRepositoryCard.svelte";
  import Social from "../components/Social.svelte";
  import siteMetadata from "../siteMetadata.js";

  export let repositories = [];
</script>

<svelte:head>
  <title>Kirill Vasiltsov | OSS</title>
  <meta property="og:url" content="https://www.kirillvasiltsov.com/oss/" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Kirill Vasiltsov | OSS" />
  <meta name="Description" content="Kirill Vasiltsov's open source projects" />
  <meta
    property="og:description"
    content="Kirill Vasiltsov's open source projects" />
  <meta
    property="og:image"
    content="https://www.kirillvasiltsov.com/oss/oss.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="https://twitter.com/maaiiya8/" />
  <meta name="twitter:title" content="Kirill Vasiltsov | OSS" />
  <meta
    name="twitter:description"
    content="Kirill Vasiltsov's open source projects" />
  <meta
    name="twitter:image"
    content="https://www.kirillvasiltsov.com/oss/oss.jpg" />
</svelte:head>

<MainLayout>
  <main class="pt-10 md:pt-16">
    <h1 class="font-sans pb-4">OSS</h1>
    <p class="text-lg max-w-xl pb-2">
      Whenever possible, I contribute to the open source projects that I use and
      that I like. Currently I am exploring
      <a class="fancy-link" href="https://github.com/gatsbyjs/gatsby">Gatsby</a>
      codebase and contributing to it. I also occasionally commit to
      <br />
      <a
        class="fancy-link"
        href="https://github.com/dotansimha/graphql-code-generator">
        GraphQL Code Generator
      </a>
      .
    </p>
    <p class="text-lg max-w-xl pb-16">
      I also like to experiment and build things myself. This includes projects
      written in other languages like Rust or Haskell. Below are some of the
      projects I am currently working on. You can see all of them on
      <a class="fancy-link" href={siteMetadata.github}>my Github profile</a>
      .
    </p>
    <div class="flex flex-col divide-y-2 pb-16">
      {#each repositories as repo}
        <SimpleRepositoryCard
          name={repo.name}
          stars={repo.stars}
          url={repo.url}
          description={repo.description} />
      {/each}
    </div>
    <section class="pb-24">
      <Social />
    </section>
  </main>

</MainLayout>
