<script>
  import { onMount } from "svelte";
  import { mode, toggleMode, setModeTo } from "../theme.js";

  onMount(() => {
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
  .theme-toggle {
    cursor: pointer;
  }

  .theme-toggle input {
    display: none;
  }

  .theme-toggle input + div {
    border-radius: 50%;
    width: 26px;
    height: 26px;
    position: relative;
    box-shadow: inset 10px -10px 0 0 var(--auxtext);
    transform: scale(1) rotate(-2deg);
    transition: box-shadow 0.5s ease 0s, transform 0.4s ease 0.1s;
  }

  .theme-toggle input + div:before {
    content: "";
    width: inherit;
    height: inherit;
    border-radius: inherit;
    position: absolute;
    left: 0;
    top: 0;
    transition: background 0.3s ease;
  }

  .theme-toggle input + div:after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin: -3px 0 0 -3px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -14px 0 var(--auxtext), 0 14px 0 var(--auxtext),
      14px 0 0 var(--auxtext), -14px 0 0 var(--auxtext),
      10px 10px 0 var(--auxtext), -10px 10px 0 var(--auxtext),
      10px -10px 0 var(--auxtext), -10px -10px 0 var(--auxtext);
    transform: scale(0);
    transition: all 0.3s ease;
  }

  .theme-toggle input:checked + div {
    box-shadow: inset 32px -32px 0 0 var(--auxtext);
    transform: scale(0.5) rotate(0deg);
    transition: transform 0.3s ease 0.1s, box-shadow 0.2s ease 0s;
  }

  .theme-toggle input:checked + div:before {
    background: var(--auxtext);
    transition: background 0.3s ease 0.1s;
  }

  .theme-toggle input:checked + div:after {
    transform: scale(1.5);
    transition: transform 0.5s ease 0.15s;
  }

  .top-right {
    top: 1.4rem;
    right: 2rem;
  }

  @media screen and (min-width: 1024px) {
    .top-right {
      top: 2rem;
      right: 7rem;
    }
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

<div
  class="transition-colors duration-300 relative text-text min-h-screen bg-bg">
  <label class="absolute top-right theme-toggle">
    <input checked={$mode === 'dark'} type="checkbox" on:change={toggleMode} />
    <div />
  </label>
  <div class="container mx-auto px-4 md:px-12 lg:px-48 max-w-screen-lg">
    <slot />
  </div>
</div>
