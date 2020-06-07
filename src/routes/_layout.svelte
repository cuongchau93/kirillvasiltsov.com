<script>
  import { onMount } from "svelte";
  import { mode, setModeTo } from "../theme.js";

  onMount(() => {
    let storedTheme;

    try {
      storedTheme = localStorage.getItem("theme");
    } catch (e) {}

    console.log("onMount storedTheme", storedTheme);
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    document.documentElement.setAttribute(
      "data-theme",
      storedTheme || (darkQuery.matches ? "dark" : "light")
    );

    mode.set(storedTheme);

    darkQuery.addListener(e => {
      mode.set(e.matches ? "dark" : "light");
    });

    const setPreferredTheme = () => {
      document.documentElement.setAttribute("data-theme", $mode);
      try {
        localStorage.setItem("theme", $mode);
        console.log("setting to", $mode);
      } catch {}
    };

    mode.subscribe(setPreferredTheme);
  });

  function toggleTheme() {
    mode.update(v => (v === "dark" ? "light" : "dark"));
  }
</script>

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

<div class="relative text-text min-h-screen bg-auxbg">
  <button on:click={toggleTheme}>Toggle theme</button>
  <slot />
</div>
