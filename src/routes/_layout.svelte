<script>
  import { beforeUpdate } from "svelte";
  import { mode, toggleMode, setModeTo } from "../theme.js";
  import { stores } from "@sapper/app";
  import { crossfade, slide } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import { writable } from "svelte/store";

  const [send, recieve] = crossfade({
    delay: 0,
    duration: 200,
    fallback: slide,
    easing: cubicInOut
  });

  const { page } = stores();

  $: path = $page.path;

  $: console.log(path);

  const links = {
    "/": "home",
    "/writing": "writing",
    "/oss": "oss"
  };

  const isRoot = p => p === "/";
  const isCurrentPath = p => !isRoot(p) && path.startsWith(p);

  beforeUpdate(() => {
    let storedTheme;

    try {
      storedTheme = localStorage.getItem("theme");
    } catch (e) {}

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    document.documentElement.setAttribute(
      "data-theme",
      storedTheme || (darkQuery.matches ? "dark" : "light")
    );

    setModeTo(storedTheme);

    darkQuery.addListener(e => {
      setModeTo(e.matches ? "dark" : "light");
    });

    const setPreferredTheme = () => {
      document.documentElement.setAttribute("data-theme", $mode);
      try {
        localStorage.setItem("theme", $mode);
      } catch (e) {}
    };

    mode.subscribe(setPreferredTheme);
  });
</script>

<style>
  :global(:root) {
    --bg: hsl(266, 33%, 96%);
    --primary: hsl(0, 33%, 2%);
    --secondary: hsl(346, 100%, 50%);
  }

  :global([data-theme="dark"]) {
    --bg: hsl(0, 33%, 2%);
    --primary: hsl(266, 33%, 96%);
    --secondary: hsl(346, 100%, 50%);
  }

  :global(body) {
    color: var(--primary);
    background-color: var(--bg);
    font-family: Inter, serif;
  }

  :global(body > div > * + *) {
    margin-top: 1rem;
  }

  :global(a) {
    color: var(--primary);
  }

  .header-container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 1em 1em 0 1em;
  }

  .page-pointers {
    margin-top: 0;
  }

  .pointer-container {
    max-width: 1024px;
    padding: 0.2em 0;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: flex-end;
  }

  .pointer-oss {
    width: 105px;
  }

  .pointer-writing {
    width: 130px;
  }

  .pointer-home {
    width: 117px;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
  }

  .author {
    font-size: max(1.5rem, calc(1rem + 1vw));
    font-weight: bold;
    letter-spacing: 0.04em;
  }

  .bar {
    padding: 0.2em;
    background-image: linear-gradient(
      110deg,
      var(--secondary),
      var(--secondary) 45%,
      var(--primary) 45.1%,
      var(--primary)
    );
  }

  .bar + .bar {
    margin-top: 0.4em;
  }

  .pointer {
    border-radius: 50%;
    background-color: var(--secondary);
    width: 0.5em;
    height: 0.5em;
    margin: 0 auto;
  }

  .menu-button {
    display: block;
  }

  nav {
    font-size: 1.25rem;
  }

  nav > ul {
    display: none;
  }

  @media screen and (min-width: 1024px) {
    nav > ul {
      display: flex;
      list-style: none;
    }

    .menu-button {
      display: none;
    }
  }

  ul > * + * {
    margin-left: 1.5em;
  }

  ul > li > a {
    display: block;
    padding: 0.3em 0.8em;
    font-weight: bold;
    text-decoration: none;
    letter-spacing: 0.03em;
  }
</style>

<svelte:head>
  <script>
    (() => {
      try {
        const storedTheme = localStorage.getItem("theme");
        const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
        document.documentElement.setAttribute(
          "data-theme",
          storedTheme || (darkQuery.matches ? "dark" : "light")
        );
      } catch (e) {}
    })();
  </script>
</svelte:head>

<header>
  <div class="header-container flex-between">
    <div class="author">Kirill Vasiltsov</div>
    <nav>
      <ul>
        {#each Object.keys(links) as link}
          <li>
            <a href={link}>{links[link]}</a>
          </li>
        {/each}
      </ul>
      <button class="menu-button">MENU</button>
    </nav>
  </div>
</header>
<aside class="page-pointers">
  <div class="pointer-container">
    {#each Object.keys(links) as link}
      <div class={`pointer-${links[link]}`}>
        {#if (link === '/' && isRoot(path)) || isCurrentPath(link)}
          <div in:send out:recieve class="pointer" />
        {/if}
      </div>
    {/each}
  </div>
</aside>
<aside class="divider">
  <div class="bar" />
  <div class="bar" />
</aside>
