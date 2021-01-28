<script>
  import GithubIcon from "./GithubIcon.svelte"
  import TwitterIcon from "./TwitterIcon.svelte"
  import siteMetadata from "../routes/_meta.js"
</script>

<footer>
  <div class="max-width footer">
    <h2>Social stuff</h2>
    <p>
      This is my personal website. You can look at its
      <a href="https://github.com/jlkiri/kirillvasiltsov.com">
        source code here.
      </a>
    </p>
    <div class="social">
      <GithubIcon h={25} w={25} />
      <a href={siteMetadata.github}>Contact me on Github</a>
    </div>
    <div class="social">
      <TwitterIcon h={25} w={25} />
      <a href={siteMetadata.twitter}>Contact me on Twitter</a>
    </div>
  </div>
</footer>

<style>
  .max-width {
    max-width: 1024px;
    margin: 0 auto;
  }

  footer {
    padding: 2em;
    position: relative;
    background-color: var(--tint);
  }

  .footer {
    padding: 1em;
  }

  .footer > * + * {
    margin-top: 1rem;
  }

  .social {
    display: flex;
  }

  .social > a {
    display: block;
    margin-left: 1rem;
  }
</style>
