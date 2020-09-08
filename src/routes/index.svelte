<script context="module">
  export async function preload() {
    const response = await this.fetch("github.json");
    const { built, contributed } = await response.json();
    return { built, contributed };
  }
</script>

<script>
  import RepositoryCard from "../components/RepositoryCard.svelte";
  import Social from "../components/Social.svelte";
  import Star from "../components/Star.svelte";

  export let built = [];
  export let contributed = [];

  built.sort((a, b) => a.stars < b.stars);
  contributed.sort((a, b) => a.stars > b.stars);
</script>

<style>
  .max-width {
    max-width: 1024px;
    margin: 0 auto;
  }

  .content {
    padding: 2em 1em 1em;
  }

  .content > * + * {
    margin-top: 3rem;
  }

  .greeting {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .greeting > span {
    color: var(--secondary);
  }

  .greeting-introduce {
    max-width: 400px;
    line-height: 1.5;
  }

  section > * + * {
    margin-top: 1rem;
  }

  .repositories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 0.5em;
  }

  .repositories__item {
    display: flex;
    justify-content: space-between;
    padding: 0.8em;
    background-color: var(--tint);
    border-radius: 1em;
    transition: 200ms;
  }

  .repositories__item:hover {
    transform: scale(1.02);
  }

  .appearances > ul,
  .guest-writing > ul {
    margin-top: 1em;
    list-style: none;
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

<main>
  <div class="max-width content">
    <section>
      <p class="greeting">
        <span>Hi,</span>
        I'm Kirill!
      </p>
      <p class="greeting-introduce">
        I am a software developer. I love building user interfaces and creating
        performant tools that everyone needs in their everyday hacking.
      </p>
    </section>
    <section>
      <h2>Things I've contributed to:</h2>
      <ul class="repositories">
        {#each contributed as repo}
          <li class="repositories__item">
            <a href={repo.url}>{repo.name}</a>
            <div>
              <Star />
              {repo.stars}
            </div>
          </li>
        {/each}
      </ul>
    </section>
    <section>
      <h2>Things I've built:</h2>
      <ul class="repositories">
        {#each built as repo}
          <li class="repositories__item">
            <a href={repo.url}>{repo.name}</a>
            <div>
              <Star />
              {repo.stars}
            </div>
          </li>
        {/each}
      </ul>
    </section>
    <section class="appearances">
      <h2>Appearances:</h2>
      <ul>
        <li>
          <a href="https://2019.kfug.jp/session/kirillvasiltsov/">
            Frontend Conference (Osaka, Japan)
          </a>
        </li>
      </ul>
    </section>
    <section class="guest-writing">
      <h2>Guest writing:</h2>
      <ul>
        <li>
          <a
            href="https://css-tricks.com/everything-you-need-to-know-about-flip-animations-in-react/">
            Everything You Need to Know About FLIP Animations in React
          </a>
        </li>
      </ul>
    </section>
  </div>
</main>
