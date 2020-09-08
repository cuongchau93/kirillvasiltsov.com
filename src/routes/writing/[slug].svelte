<script context="module">
  export async function preload({ slug }) {
    const response = await this.fetch(`writing/${slug}.json`);
    const { content } = await response.json();
  }
</script>

<script>

</script>
