<script context="module">
  /* import { getPostBySlug } from "../../sourcePosts";
  
  export const preload = page => {
    const post = getPostBySlug(page.params.slug);
    return { post };
  }; */
  export async function preload({ params }) {
    const response = await this.fetch(`blog/${params.slug}.json`);
    const post = await response.json();
    console.log("POST", post);
    return { post };
  }
</script>

<script>
  export let post;
</script>

<p>
  {@html post.html}
</p>
