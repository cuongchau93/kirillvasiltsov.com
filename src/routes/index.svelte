<script context="module">
  export async function preload() {
    const responses = await Promise.all([
      this.fetch("github.json"),
      this.fetch("recentPosts.json")
    ]);
    const [repositories, { posts }] = await Promise.all(
      responses.map(r => r.json())
    );
    return { repositories, posts };
  }
</script>

<script>
  import MainLayout from "./_main.svelte";
  import RepositoryCard from "../components/RepositoryCard.svelte";
  import PostDescription from "../components/PostDescription.svelte";
  import RSSIcon from "../components/RSSIcon.svelte";
  import GithubIcon from "../components/GithubIcon.svelte";
  import TwitterIcon from "../components/TwitterIcon.svelte";
  import siteMetadata from "../siteMetadata.js";

  export let repositories = [];
  export let posts = [];

  const w = 16;
  const h = 16;
</script>

<svelte:head>
  <title>Kirill Vasiltsov's personal website</title>
</svelte:head>
<MainLayout>
  <main class="pt-10 md:pt-16">
    <section class="pb-16">
      <h1 class="font-sans pb-4">
        <span class="text-auxbg">Hey</span>
        , I'm Kirill!
      </h1>
      <p class="text-lg max-w-xl pb-2">
        I am a Javascript developer. Lately I've been focusing on frontend
        development with React. Currently I'm working on the user interface of a
        very popular website which is used worldwide by millions daily.
      </p>
      <p class="text-lg max-w-xl">
        When I'm not writing code, I'm reading (and writing) about ethics, human
        brain and language, or brewing favorite coffee.
      </p>
    </section>
    <section class="pb-12">
      <h1 class="font-sans pb-6">Featured Open Source Projects</h1>
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
    </section>
    <section class="pb-16">
      <h1 class="font-sans pb-4">Recent blog posts</h1>
      <div class="lg:pr-64 recent-posts">
        {#each posts as post}
          <PostDescription
            spoiler={post.meta.spoiler}
            link={post.meta.slug}
            tags={post.meta.tags}
            title={post.meta.title} />
        {/each}
        <a class="font-bold text-xl fancy-link" href="/blog">View more</a>
      </div>
    </section>
    <section class="pb-16">
      <h1 class="font-sans pb-4">Appearances</h1>
      <div class="lg:pr-64 recent-posts">
        <div class="p-2 md:p-6">
          <h2 class="text-3xl">2019</h2>
          <div class="h-1 bg-gray-300" />
          <div class="py-3">
            <a
              class="fancy-link font-bold text-xl"
              href="https://2019.kfug.jp/session/kirillvasiltsov">
              Frontend Conference 2019
            </a>
            <div class="text-gray-600">Osaka, Japan</div>
          </div>
        </div>
      </div>
    </section>
    <section class="pb-24">
      <h1 class="font-sans pb-4">Social stuff</h1>
      <p class="pb-4">
        This is my personal website. Here are some other places where you can
        find me.
      </p>
      <div>
        <div class="p-2 flex items-center">
          <GithubIcon {w} {h} />
          <a
            class="ml-4 fancy-link inline"
            href="https://github.com/jlkiri/kirillvasiltsov.com">
            View source on Github
          </a>
        </div>
        <div class="p-2 flex items-center">
          <TwitterIcon {w} {h} />
          <a class="ml-4 fancy-link inline" href={siteMetadata.twitter}>
            Follow me on Twitter
          </a>
        </div>
        <div class="p-2 flex items-center">
          <RSSIcon {w} {h} />
          <a class="ml-4 fancy-link inline" href={'/blog/rss.xml'}>
            Subscribe to the RSS feed
          </a>
        </div>
      </div>
    </section>
  </main>
</MainLayout>
