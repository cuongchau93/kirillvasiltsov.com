<script>
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  export let toggleMenu = () => {};
  export let links;

  let menuCloseBtn;

  onMount(() => {
    menuCloseBtn.focus();
  });
</script>

<style>
  .menu {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .mobile-navigation {
    height: 100%;
    background-color: var(--primary);
    display: grid;
    place-items: center;
  }

  .mobile-navigation > ul {
    list-style: none;
  }

  .mobile-navigation__link {
    font-size: 1.8rem;
    padding: 1em;
    color: var(--bg);
    text-align: center;
    text-transform: uppercase;
  }

  .mobile-navigation__link > a:link,
  .mobile-navigation__link > a:visited {
    color: var(--bg);
    background: none;
  }

  .mobile-navigation__link > a:hover,
  .mobile-navigation__link > a:active {
    color: var(--bg);
  }

  .mobile-navigation__close {
    cursor: pointer;
    position: absolute;
    top: 0.3em;
    right: 0.3em;
    padding: 0.6em;
    font-size: 2.7em;
    height: 1em;
    width: 1em;
    text-indent: 10em;
    overflow: hidden;
    color: var(--bg);
    border: 0;
  }

  .mobile-navigation__close::after {
    position: absolute;
    line-height: 0.5;
    top: 0.25em;
    left: 0.25em;
    text-indent: 0;
    content: "\00D7";
  }
</style>

<aside class="menu">
  <nav
    class="mobile-navigation"
    in:fly={{ y: -1000, opacity: 0.6, duration: 400 }}
    out:fly={{ y: -1000, opacity: 0.6, duration: 400 }}>
    <button
      bind:this={menuCloseBtn}
      class="mobile-navigation__close"
      on:click={toggleMenu}>
      Close
    </button>
    <ul>
      {#each Object.keys(links) as link}
        <li class="mobile-navigation__link">
          <a on:click={toggleMenu} href={link}>{links[link]}</a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>
