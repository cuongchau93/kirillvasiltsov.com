<script>
  export let link;
  export let text;
</script>

<div class="flex items-center flex-col">
  <a href={link}>
    <span class="font-bold font-mono inline-block pb-2">{text}</span>
  </a>
  <slot />
</div>
