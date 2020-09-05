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
  <div class="max-w-screen-lg mx-auto text-center">
    <div class="flex justify-between">
      <div>Kirill Vasiltsov</div>
      <nav class="hidden lg:block">
        <ul class="flex">
          <li>Home</li>
          <li>Writing</li>
          <li>OSS</li>
        </ul>
      </nav>
    </div>
  </div>
</header>
