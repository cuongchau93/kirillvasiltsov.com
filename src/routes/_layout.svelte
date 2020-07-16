<script>
  import { beforeUpdate } from "svelte";
  import { mode, toggleMode, setModeTo } from "../theme.js";
  import Navigation from "../components/Navigation.svelte";
  import MediaQuery from "../components/MediaQuery.svelte";

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

  .fix-scroll {
    padding-left: calc(100vw - 100%);
  }

  #pc {
    position: absolute;
    bottom: 0;
    right: 15%;
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

  #parallax-wrap {
    transform-style: preserve-3d;
    position: relative;
    height: 600px;
  }

  #parallax-child {
    background: 50% 50% / cover;
    background-image: url("/tree-night.jpg");
    position: relative;
    transform: translateZ(-2px) scale(3);
    transform-origin: 0% 0% 0px;
    height: 850px;
    width: 100%;
    filter: blur(2px) brightness(0.4);
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
  class="preserve-3d-transform fix-scroll transition-colors duration-300
  relative text-text min-h-screen bg-bg">
  <div class="preserve-3d-transform container mx-auto xl:px-24">
    <MediaQuery query="(min-width: 768px)" let:matches>
      <Navigation isMobile={!matches}>
        <label class="theme-toggle md:h-12 pl-10">
          <input
            checked={$mode === 'dark'}
            type="checkbox"
            on:change={toggleMode} />
          <div />
        </label>
      </Navigation>
    </MediaQuery>
    <div id="parallax-wrap">
      <div id="frame" />
      <img id="pc" src="pc.svg" width="320" height="320" />
      <div id="parallax-child" />
    </div>
    <slot />

  </div>

</div>
