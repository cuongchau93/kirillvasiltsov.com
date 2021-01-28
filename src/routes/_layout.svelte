<script>
  import { beforeUpdate } from "svelte"
  import { stores } from "@sapper/app"
  import { crossfade, slide } from "svelte/transition"
  import { cubicInOut } from "svelte/easing"

  import { mode, toggleMode, setModeTo } from "../theme.js"
  import Menu from "../components/Menu.svelte"
  import Footer from "../components/Footer.svelte"

  let isMenuOpen = false

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen
  }

  const [send, recieve] = crossfade({
    delay: 0,
    duration: 200,
    fallback: slide,
    easing: cubicInOut,
  })

  const { page } = stores()

  $: path = $page.path

  const links = {
    "/": "home",
    "/writing": "writing",
  }

  const isRoot = (p) => p === "/"
  const isCurrentPath = (p) => !isRoot(p) && path.startsWith(p)

  beforeUpdate(() => {
    let storedTheme

    try {
      storedTheme = localStorage.getItem("theme")
    } catch (e) {}

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

    document.documentElement.setAttribute(
      "data-theme",
      storedTheme || (darkQuery.matches ? "dark" : "light")
    )

    setModeTo(storedTheme)

    darkQuery.addListener((e) => {
      setModeTo(e.matches ? "dark" : "light")
    })

    const setPreferredTheme = () => {
      document.documentElement.setAttribute("data-theme", $mode)
      try {
        localStorage.setItem("theme", $mode)
      } catch (e) {}
    }

    mode.subscribe(setPreferredTheme)
  })
</script>

<svelte:head
  ><script>
    ;(() => {
      try {
        const storedTheme = localStorage.getItem("theme")
        const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
        document.documentElement.setAttribute(
          "data-theme",
          storedTheme || (darkQuery.matches ? "dark" : "light")
        )
      } catch (e) {}
    })()
  </script><script async src="https://cdn.splitbee.io/sb.js">
  </script></svelte:head
>

<div class="grid">
  <header>
    <div class="max-width header flex-between">
      <h1 class="gradient header__author">
        <a class="home-link" href="https://www.kirillvasiltsov.com/">
          Kirill Vasiltsov
        </a>
      </h1>
      <div class="header__controls">
        <nav class="pc-navigation">
          <ul>
            {#each Object.keys(links) as link}
              <li class="pc-navigation__link">
                <a href={link}>{links[link]}</a>
                {#if (link === "/" && isRoot(path)) || isCurrentPath(link)}
                  <div in:send out:recieve class={`pc-navigation__pointer`} />
                {/if}
              </li>
            {/each}
          </ul>
        </nav>
        <button class="menu-button" on:click={toggleMenu}>MENU</button>
        <a class="ko-fi" href="https://ko-fi.com/A0A23GQT8" target="_blank"
          ><img
            height="36"
            style="border:0px;height:36px;"
            src="https://cdn.ko-fi.com/cdn/kofi3.png?v=2"
            border="0"
            alt="Buy Me a Coffee at ko-fi.com"
          /></a
        >
        <aside class="mode-toggle">
          <label
            class={`mode-toggle__toggle mode-toggle__toggle--${
              $mode === "dark" ? "dark" : "light"
            }`}
          >
            <input
              checked={$mode === "dark"}
              type="checkbox"
              on:change={toggleMode}
            />
            <div>
              <div>
                <div />
              </div>
            </div>
          </label>
        </aside>
      </div>
    </div>
    <aside class="divider">
      <div class="bar" />
      <div class="bar" />
      <div class="bar" />
    </aside>
  </header>
  <slot />
  <Footer />
</div>
{#if isMenuOpen}
  <Menu {links} {toggleMenu} />
{/if}

<style>
  .ko-fi {
    margin-right: 1.5em;
  }

  :global(:root) {
    --bg: hsl(210, 20%, 99%);
    --primary: hsl(74, 32%, 8%);
    --secondary: hsl(206, 100%, 44%);
    --tertiary: hsl(206, 54%, 32%);
    --tint: hsl(0, 4%, 95%);
    --shade: hsl(73, 4%, 48%);
    font-size: min(18px, calc(1vw + 0.8em));
  }

  :global([data-theme="dark"]) {
    --bg: hsl(74, 32%, 8%);
    --primary: hsl(240, 4%, 82%);
    --secondary: hsl(206, 80%, 71%);
    --tertiary: hsl(206, 89%, 82%);
    --tint: hsl(96, 4%, 25%);
    --shade: hsl(240, 1%, 61%);
  }

  :global(*:focus) {
    outline: none;
    box-shadow: 0 0 0 3px var(--tertiary);
  }

  :global(body) {
    color: var(--primary);
    background-color: var(--bg);
    font-family: Inter, serif;
    transition: color, background-color 300ms ease-out;
  }

  :global(h1) {
    margin: 0;
  }

  :global(h2) {
    margin: 0;
  }

  :global(h3) {
    margin: 0;
  }

  :global(pre) {
    overflow-y: hidden;
    font-family: "Source Code Pro", "Courier New", Courier, monospace;
    padding: 1em;
    margin: 0 -1em;
  }

  @media screen and (min-width: 640px) {
    :global(pre) {
      border-radius: 1em;
    }
  }

  :global(a) {
    --link: var(--secondary);
    --hover: var(--tertiary);
    text-decoration: none;
    transition: 200ms;
    border-radius: 0.5em;
  }

  :global(a:link) {
    color: var(--link);
  }

  :global(img) {
    max-width: 100%;
  }

  :global(iframe) {
    max-width: 100%;
  }

  /*  :global(*) {
    border: 1px solid red;
  } */

  :global(a:visited) {
    color: var(--link);
  }

  :global(a:hover) {
    color: var(--hover);
    text-decoration: underline;
  }

  :global(a:active) {
    color: var(--hover);
    text-decoration: underline;
    box-shadow: none;
  }

  .fix-scroll {
    padding-left: calc(100vw - 100%);
  }

  .max-width {
    max-width: 1024px;
    margin: 0 auto;
  }

  .header {
    padding: 0.5em 1em;
    padding-top: 1.5em;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__author {
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: -0.02em;
    color: var(--primary-shade);
  }

  .header__controls {
    display: flex;
    align-items: center;
  }

  .bar {
    padding: 0.7em;
    background-image: linear-gradient(
      70deg,
      var(--secondary),
      var(--secondary) 45%,
      var(--primary) 45.1%,
      var(--primary)
    );
    background-size: 150% 150%;
    animation: gradient-left 40s ease infinite -1000ms;
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
    animation: gradient-right 40s ease infinite -500ms;
  }

  .bar + .bar + .bar {
    margin-top: 0.4em;
    background-image: linear-gradient(
      70deg,
      var(--secondary),
      var(--secondary) 45%,
      var(--primary) 45.1%,
      var(--primary)
    );
    animation: gradient-left 40s ease infinite 0ms;
  }

  .menu-button {
    display: block;
    position: relative;
    font-size: 3.2rem;
    width: 0.7em;
    height: 0.7em;
    margin-right: 0.5em;
    line-height: 0.4;
    text-indent: 5em;
    white-space: nowrap;
    overflow: hidden;
  }

  .menu-button::after {
    position: absolute;
    top: 0.1em;
    left: 0.1em;
    display: block;
    content: "\2261";
    text-indent: 0;
  }

  .mode-toggle {
    margin-top: 0;
    position: relative;
  }

  .pc-navigation__pointer {
    position: absolute;
    border-radius: 50%;
    background-color: var(--secondary);
    height: 0.5em;
    width: 0.5em;
    top: 1.8em;
    left: 2em;
  }

  .pc-navigation {
    display: none;
  }

  .pc-navigation > ul {
    display: flex;
    list-style: none;
  }

  .pc-navigation > ul > * + * {
    margin-left: 1.5em;
  }

  .pc-navigation__link {
    position: relative;
  }

  .pc-navigation__link > a {
    display: block;
    padding: 0 0.8em;
    font-weight: bold;
    text-decoration: none;
    letter-spacing: -0.01em;
  }

  .pc-navigation__link > a:link,
  .pc-navigation__link > a:visited {
    color: var(--primary);
    background: none;
  }

  .pc-navigation__link > a:hover,
  .pc-navigation__link > a:active {
    color: var(--secondary);
  }

  @media screen and (min-width: 1024px) {
    .pc-navigation {
      display: flex;
      font-size: 1.1rem;
      margin-right: 3em;
    }

    .menu-button {
      display: none;
    }

    .divider {
      margin-top: 1.3em;
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
    display: block;
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

  .grid {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: minmax(0, 1fr);
    grid-row-gap: 1rem;
    height: 100vh;
  }

  .home-link {
    color: var(--primary);
    text-decoration: none;
  }

  @keyframes gradient-right {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes gradient-left {
    0% {
      background-position: 100% 50%;
    }
    50% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
</style>
