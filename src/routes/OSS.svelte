<script context="module">
  export async function preload() {
    const responses = await Promise.all([this.fetch("github.json")]);
    const [repositories] = await Promise.all(responses.map(r => r.json()));
    return { repositories };
  }
</script>

<script>
  import MainLayout from "./_main.svelte";
  import RepositoryCard from "../components/RepositoryCard.svelte";

  export let repositories = [];
</script>

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
    <p class="text-lg max-w-xl">
      I also like to experiment and build things myself. This includes projects
      written in other languages like Rust or Haskell. Here are some of the
      projects I am currently working on.
    </p>
    <div class="xl:-ml-6 flex flex-wrap">
      {#each repositories as repo}
        <RepositoryCard
          name={repo.name}
          stars={repo.stars}
          url={repo.url}
          fullName={repo.fullName}
          description={repo.description} />
      {/each}
    </div>
  </main>
</MainLayout>
