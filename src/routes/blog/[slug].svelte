<script context="module">
  import { getPostBySlug } from "../../sourcePosts";

  export const preload = page => {
    const post = getPostBySlug(page.params.slug);
    return { post };
  };
</script>

<script>
  export let post;
</script>

<p>
  {@html post.html}
</p>
