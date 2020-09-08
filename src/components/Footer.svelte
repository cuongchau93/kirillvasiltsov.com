<script>
  import GithubIcon from "./GithubIcon.svelte";
  import TwitterIcon from "./TwitterIcon.svelte";
  import siteMetadata from "../routes/_meta.js";
</script>

<style>
  .max-width {
    max-width: 1024px;
    margin: 0 auto;
  }

  footer {
    padding: 2em;
    background-color: var(--tint);
  }

  .footer {
    padding: 1em;
  }

  .footer > * + * {
    margin-top: 1em;
  }

  .social {
    display: flex;
    padding: 0.5em;
  }

  .social > a {
    display: block;
    margin-left: 1em;
  }
</style>

<footer>
  <div class="max-width footer">
    <h2>Social stuff</h2>
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
