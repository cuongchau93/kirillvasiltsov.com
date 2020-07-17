<script context="module">
  export async function preload() {
    const responses = await Promise.all([
      this.fetch("github.json"),
      this.fetch("recentPosts.json")
    ]);
    const [{ featured }, { posts }] = await Promise.all(
      responses.map(r => r.json())
    );
    return { repositories: featured, posts };
  }
</script>

<script>
  import Padded from "./_padded.svelte";
  import RepositoryCard from "../components/RepositoryCard.svelte";
  import PostDescription from "../components/PostDescription.svelte";
  import Social from "../components/Social.svelte";

  import { onMount } from "svelte";

  const words = ["Welcome!", "What's up?", "Have a nice day!"];

  let interval;
  let prompt;
  let typed = words[0];
  let idx = 0;

  onMount(() => {
    console.log(prompt);
    interval = setInterval(() => {
      idx = (idx + 1) % 3;
      typed = words[idx];
      prompt.style.setProperty("--chwidth", typed.length + 1);
    }, 4000);
  });

  export let repositories = [];
  export let posts = [];
</script>

<style>
  #content-up {
    position: relative;
  }

  #content-down {
    position: relative;
  }

  #content-up::after {
    content: "";
    display: block;
    background: inherit;
    position: absolute;
    bottom: -5%;
    right: 0;
    left: 0;
    height: 80%;
    transform-origin: 100%;
    transform: skewY(-6.5deg);
    z-index: -1;
    border-bottom: 12px solid black;
  }

  #content-down::before {
    content: "";
    display: block;
    position: absolute;
    border-top: 12px solid black;
    top: -5%;
    right: 0;
    left: 0;
    height: 50%;
    transform-origin: 0 100%;
    transform: skewY(-6.5deg);
    background-color: var(--bg);
    z-index: -1;
  }

  #frame {
    position: absolute;
    top: 20%;
    right: 0;
    left: 0;
    height: 15%;
    transform: skewY(-6.5deg) skewX(30deg);
    background: linear-gradient(
      to left,
      rgba(255, 224, 158, 0.212) 0%,
      rgba(249, 255, 196, 0.123) 10%,
      transparent 10%,
      transparent 14%,
      rgba(255, 224, 158, 0.267) 14%,
      rgba(249, 255, 196, 0.212) 30%,
      transparent 40%,
      transparent
    );
  }

  #parallax-child {
    background: 50% 50% / cover;
    background-image: url("/tree-night.jpg");
    position: relative;
    transform: translateZ(-2px) scale(3);
    transform-origin: 0% 0% 0px;
    transform-style: preserve-3d;
    height: 950px;
    width: 100%;
    filter: brightness(0.7);
    will-change: transform;
  }

  .magic-pixel {
    width: 100%;
    height: 1px;
    background-color: var(--bg);
  }

  :global(#sapper) {
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    perspective: 1px;
    perspective-origin: 0% 0%;
    height: 100%;
  }

  :global(body, html) {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  :global(body) {
    transform: translateZ(0);
  }

  .fix-scroll {
    padding-left: calc(100vw - 100%);
  }

  #greet {
    position: absolute;
    top: 20%;
    left: 8%;
    font-size: 15px;
    font-family: monospace;
    transform: skewY(-8deg);
  }

  @media screen and (min-width: 768px) {
    #greet {
      font-size: 17px;
    }
  }

  .typing {
    --chwidth: 9;
    width: calc(var(--chwidth) * 1ch);
    animation: typing 2s steps(var(--chwidth)) infinite alternate both,
      blink 0.5s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;
    box-sizing: content-box;
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
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

<main class="preserve-3d-transform">
  <div class="magic-pixel" />
  <section id="content-up" class="w-full bg-bg pt-16 pb-16 fix-scroll">
    <div class="px-4 md:px-24 lg:px-48">
      <h1 class="font-sans pb-4">
        <span class="text-auxbg">Hey,</span>
        I'm Kirill!
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
    </div>
  </section>
  <section id="parallax-wrap">
    <div id="frame" />
    <div id="pc">
      <div id="greet">
        <div>[me@home ~]$</div>
        <div bind:this={prompt} class="typing">{typed}</div>
      </div>
      <img src="pc3.svg" />
    </div>
    <div id="parallax-child" />
  </section>
  <section id="content-down" class="w-full bg-bg pb-16 pt-16 fix-scroll">
    <div class="px-4 md:px-24 lg:px-48">
      <h1 class="font-sans pb-6">Featured Open Source Projects</h1>
      <div class="xl:-ml-6 pb-2 flex flex-wrap">
        {#each repositories as repo}
          <RepositoryCard
            name={repo.name}
            stars={repo.stars}
            url={repo.url}
            fullName={repo.fullName}
            description={repo.description} />
        {/each}
      </div>
      <a class="font-bold text-xl fancy-link" href="/oss">View more</a>
    </div>
  </section>

  <section class="w-full bg-bg pb-16 pt-16 fix-scroll">
    <div class="px-4 md:px-24 lg:px-48">
      <h1 class="font-sans pb-4">Recent blog posts</h1>
      <div class="lg:pr-64 recent-posts">
        {#each posts as post}
          <PostDescription
            spoiler={post.meta.spoiler}
            link={post.meta.slug}
            tags={post.meta.tags}
            title={post.meta.title} />
        {/each}
        <a class="font-bold text-xl fancy-link" href="/writing">View more</a>
      </div>
    </div>
  </section>
  <section class="w-full bg-bg pb-16 pt-16 fix-scroll">
    <div class="px-4 md:px-24 lg:px-48">
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
    </div>
  </section>
  <section class="w-full bg-bg pb-16 pt-16 fix-scroll">
    <div class="px-4 md:px-24 lg:px-48">
      <h1 class="font-sans pb-4">Guest Writing</h1>
      <ul class="pl-4 list-disc">
        <li class="pl-2">
          <a
            class="fancy-link text-xl font-bold"
            href="https://css-tricks.com/everything-you-need-to-know-about-flip-animations-in-react/">
            Everything You Need to Know About FLIP Animations in React
          </a>
          <p class="text-sm text-gray-500">css-tricks.com</p>
        </li>
      </ul>
    </div>
  </section>
  <section class="w-full bg-bg pb-24 pt-16 fix-scroll">
    <div class="px-4 md:px-24 lg:px-48">
      <Social isHomepage />
    </div>
  </section>
</main>
