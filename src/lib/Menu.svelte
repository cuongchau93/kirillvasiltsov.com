<script>
  import { fly } from "svelte/transition"
  import { onMount } from "svelte"

  export let toggleMenu = () => {}
  export let links

  const KEYCODE_TAB = 9
  const paths = Object.keys(links)

  let menuCloseBtn
  let topmostFocusable
  let bottomFocusable

  let refs = []

  $: topmostFocusable = menuCloseBtn

  $: {
    if (refs.length === paths.length) {
      bottomFocusable = refs[paths.length - 1]
    }
  }

  const handleFocus = (e) => {
    if (e.key === "Tab" || e.keyCode === KEYCODE_TAB) {
      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === topmostFocusable) {
          bottomFocusable.focus()
          e.preventDefault()
        }
      } /* tab */ else {
        if (document.activeElement === bottomFocusable) {
          topmostFocusable.focus()
          e.preventDefault()
        }
      }
    }
  }

  onMount(() => {
    menuCloseBtn.focus()
  })
</script>

<aside class="menu" on:keydown={handleFocus}>
  <nav
    class="mobile-navigation"
    in:fly={{ y: -1000, opacity: 0.6, duration: 400 }}
    out:fly={{ y: -1000, opacity: 0.6, duration: 400 }}
  >
    <button
      bind:this={menuCloseBtn}
      class="mobile-navigation__close"
      on:click={toggleMenu}
    >
      Close
    </button>
    <ul>
      {#each paths as path, i}
        <li class="mobile-navigation__link">
          <a on:click={toggleMenu} bind:this={refs[i]} href={path}>
            {links[path]}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>

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
    color: var(--bg);
    text-align: center;
    text-transform: uppercase;
  }

  .mobile-navigation__link > a {
    display: block;
    text-decoration: none;
    border-radius: 0.3em;
    padding: 0.8em;
  }

  .mobile-navigation__link > a:link,
  .mobile-navigation__link > a:visited {
    color: var(--bg);
    background: none;
  }

  .mobile-navigation__link > a:hover,
  .mobile-navigation__link > a:active {
    color: var(--secondary);
  }

  .mobile-navigation__link > a:focus {
    color: var(--secondary);
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
