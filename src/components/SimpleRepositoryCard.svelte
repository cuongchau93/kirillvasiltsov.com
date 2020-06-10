<script>
  export let name;
  export let description;
  export let url;
  export let stars;
</script>

<div class="pt-10">
  <h2 class="font-mono pb-1">
    <a class="font-bold fancy-link" href={url}>{name}</a>
  </h2>
  <h3 class="pb-2 align-middle">
    <svg
      class="inline align-middle"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="currentColor"
      viewBox="0 0 24 24">
      <path
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48
        8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
    </svg>
    {stars}
  </h3>
  <p class="pb-4">{description}</p>
</div>
