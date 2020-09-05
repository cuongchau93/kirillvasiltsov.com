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
  :global(:root) {
    --bg: hsl(257, 33%, 96%);
    --primary: hsl(330, 40%, 2%);
    --secondary: hsl(359, 87%, 60%);
  }

  :global([data-theme="dark"]) {
    --bg: hsl(330, 40%, 2%);
    --primary: hsl(257, 33%, 96%);
    --secondary: hsl(359, 87%, 60%);
  }

  :global(body) {
    color: var(--primary);
    background-color: var(--bg);
  }

  :global(a) {
    color: var(--secondary);
  }

  .container {
    max-width: 1024px;
    margin: 0 auto;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
  }

  nav {
    display: none;
  }

  nav > ul {
    display: flex;
    list-style: none;
  }

  @media screen and (min-width: 1024px) {
    nav {
      display: block;
    }
  }

  ul > li > a {
    display: block;
    padding: 0.8em;
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
  <div class="container flex-between">
    <div>Kirill Vasiltsov</div>
    <nav>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Writing</a>
        </li>
        <li>
          <a href="#">OSS</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
