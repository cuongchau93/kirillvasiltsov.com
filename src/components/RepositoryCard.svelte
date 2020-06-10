<script>
  export let name;
  export let description;
  export let fullName;
  export let url;
  export let stars;
</script>

<style>
  .zoom {
    transition: transform 150ms;
  }

  .zoom:hover {
    transform: scale(1.03);
  }

  .card-gradient {
    background: var(--cgradient);
    color: var(--card-text);
  }
</style>

<div
  class="flex flex-col zoom justify-between card-gradient shadow-lg max-w-full
  md:max-w-xs lg:max-w-md p-4 mb-4 md:mr-4 rounded-lg">
  <h2 class="font-mono pb-2">
    <a class="text-text fancy-link" href={url}>{name}</a>
  </h2>
  <p class="pb-4">{description}</p>
  <div class="flex justify-between">
    <span>{fullName}</span>
    <div>
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
      <span class="align-middle">{stars}</span>
    </div>
  </div>
</div>
