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
    --bg: hsl(210, 20%, 99%);
    --primary: hsl(74, 32%, 8%);
    --secondary: hsl(206, 100%, 44%);
    --tertiary: hsl(206, 54%, 32%);
  }

  :global([data-theme="dark"]) {
    --bg: hsl(74, 32%, 8%);
    --primary: hsl(210, 20%, 99%);
    --secondary: hsl(206, 80%, 71%);
    --tertiary: hsl(206, 89%, 82%);
  }

  :global(body) {
    color: var(--primary);
    background-color: var(--bg);
    font-family: Inter, serif;
    transition: color, background-color 300ms ease-out;
  }

  :global(body > div > * + *) {
    margin-top: 1rem;
  }

  :global(a) {
    --link: linear-gradient(to bottom, transparent 70%, var(--secondary) 70.1%);
    --active: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 50%,
      var(--secondary) 50.1%
    );
    color: var(--primary);
  }

  :global(a:link) {
    background-image: var(--link);
    background-position: 0 70%;
    background-size: 100% 200%;
    word-break: break-word;
    transition: background-position 100ms;
  }

  :global(a:visited) {
    background-image: var(--link);
    background-position: 0 70%;
    background-size: 100% 200%;
    word-break: break-word;
    transition: background-position 100ms;
  }

  :global(a:hover) {
    background-image: var(--active);
    background-position: 0 100%;
  }

  :global(a:active) {
    background-image: var(--active);
    background-position: 0 100%;
  }

  .max-width {
    max-width: 1024px;
    margin: 0 auto;
  }

  .header-container {
    padding: 1em 1em 0 1em;
  }

  .page-pointers {
    display: none;
    margin-top: 0;
  }

  .page-pointers__pointer-oss {
    width: 105px;
  }

  .page-pointers__pointer-writing {
    width: 130px;
  }

  .page-pointers__pointer-home {
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
      70deg,
      var(--secondary),
      var(--secondary) 45%,
      var(--primary) 45.1%,
      var(--primary)
    );
  }

  .bar + .bar {
    margin-top: 0.4em;
    background-image: linear-gradient(
      110deg,
      var(--secondary),
      var(--secondary) 50%,
      var(--primary) 50.1%,
      var(--primary)
    );
  }

  .page-pointers__pointer {
    border-radius: 50%;
    background-color: var(--secondary);
    width: 0.5em;
    height: 0.5em;
    margin: 0 auto;
  }

  .menu-button {
    display: block;
  }

  .gradient {
    background: linear-gradient(
      138deg,
      var(--primary) 20%,
      var(--tertiary) 20.1%,
      var(--tertiary) 85%,
      var(--primary) 85.1%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .mode-toggle {
    margin-top: 0;
    position: relative;
  }

  nav {
    display: flex;
    font-size: 1.25rem;
    margin-right: 3em;
  }

  nav > ul {
    display: none;
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

  ul > li > a:link,
  ul > li > a:visited {
    color: var(--primary);
    background: none;
  }

  ul > li > a:hover,
  ul > li > a:active {
    color: var(--secondary);
  }

  @media screen and (min-width: 1024px) {
    nav > ul {
      display: flex;
      list-style: none;
    }

    .menu-button {
      display: none;
    }

    .page-pointers {
      display: block;
    }
  }

  .mode-toggle__toggle--dark {
    transition: transform 300ms ease-out;
    transform: rotate(0deg);
  }

  .mode-toggle__toggle--light {
    transition: transform 300ms ease-out;
    transform: rotate(360deg);
  }

  .mode-toggle__toggle {
    cursor: pointer;
    position: absolute;
    right: 1.5em;
    top: -1.95em;
  }

  .mode-toggle__toggle > input {
    display: none;
  }

  .mode-toggle__toggle > div {
    border-radius: 50%;
    display: grid;
    place-items: center;
  }

  .mode-toggle__toggle > div > div {
    width: 30px;
    height: 30px;
    border: 2px solid var(--primary);
    background: linear-gradient(
      to right,
      var(--bg),
      var(--bg) 50%,
      var(--primary) 50%
    );
    border-radius: 50%;
    display: grid;
    place-items: center;
    transition: background-position 500ms;
  }

  .mode-toggle__toggle > div > div > div {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: linear-gradient(
      to left,
      var(--bg),
      var(--bg) 50%,
      var(--primary) 50%
    );
  }

  .page-pointers__offset {
    font-size: 1.25rem;
    padding: 0.2em 0;
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin-right: 3em;
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
  <div class="max-width header-container flex-between">
    <div class="gradient author">Kirill Vasiltsov</div>
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
<aside class="mode-toggle">
  <label
    class={`mode-toggle__toggle mode-toggle__toggle--${$mode === 'dark' ? 'dark' : 'light'}`}>
    <input checked={$mode === 'dark'} type="checkbox" on:change={toggleMode} />
    <div>
      <div>
        <div />
      </div>
    </div>
  </label>
</aside>
<aside class="page-pointers">
  <div class="max-width">
    <div class="page-pointers__offset">
      {#each Object.keys(links) as link}
        <div class={`page-pointers__pointer-${links[link]}`}>
          {#if (link === '/' && isRoot(path)) || isCurrentPath(link)}
            <div in:send out:recieve class="page-pointers__pointer" />
          {/if}
        </div>
      {/each}
    </div>
  </div>
</aside>
<aside class="divider">
  <div class="bar" />
  <div class="bar" />
</aside>
