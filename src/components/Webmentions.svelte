<script>
  export let replies;
  export let likes;
</script>

<div class="border-dotted border-t-2 border-b-2 border-text-auxbg pt-4 pb-4">
  <div class="ml-2 p-2">
    <div class="heart inline-block" />
    <span class="ml-2">{likes.length}</span>
  </div>
  <ul>
    {#each replies as reply}
      <li class="flex p-2">
        <img
          class="w-8 h-8 inline-block rounded-full"
          alt="avatar"
          src={reply.data.author.photo} />
        <div class="ml-4 inline-block">
          <a class="author" href={reply.data.author.url}>
            {reply.data.author.name}
          </a>
          <span>
            <a class="fancy-link" href={reply.data.url}>replied</a>
          </span>
          <div class="italic">{reply.data.content.split('\n')[0]}</div>
        </div>
      </li>
    {/each}
  </ul>
</div>
