<script>
  import MainLayout from "./_main.svelte";
</script>

<style>

</style>

<svelte:head>
  <title>Kirill Vasiltsov's personal website</title>
</svelte:head>

<MainLayout>
  <main class="pt-10 md:pt-16">
    <section>
      <h1 class="font-sans pb-2">
        <span class="text-auxbg">Hey</span>
        , I'm Kirill!
      </h1>
      <p class="text-lg max-w-xl pb-2">
        I am a Javascript developer. Lately I've been focusing on frontend
        development with React. Currently I'm working on the user interface of a
        very popular website which is used worldwide by millions daily.
      </p>
      <p class="text-lg max-w-xl pb-16">
        When I'm not writing code, I'm reading (and writing) about ethics, human
        brain and language, or brewing favorite coffee.
      </p>
    </section>
    <section>
      <h1 class="font-sans pb-4">Featured Open Source Projects</h1>
      <div class="lg:-mx-12 flex flex-wrap">
        <div
          class="max-w-md p-4 mb-4 lg:mr-4 rounded-lg border-gray-300
          border-solid border">
          <h2 class="font-mono pb-2">react-easy-flip</h2>
          <p class="">
            ⚛ A React library for smooth FLIP animations. Easily animate
            originally unanimatable properties like DOM positions with one hook.
          </p>
        </div>
        <div
          class="max-w-md p-4 mb-4 lg:mr-4 rounded-lg border-gray-300
          border-solid border">
          <h2 class="font-mono pb-2">react-easy-flip</h2>
          <p class="">
            ⚛ A React library for smooth FLIP animations. Easily animate
            originally unanimatable properties like DOM positions with one hook.
          </p>
        </div>
        <div
          class="max-w-md p-4 mb-4 lg:mr-4 rounded-lg border-gray-300
          border-solid border">
          <h2 class="font-mono pb-2">react-easy-flip</h2>
          <p class="">
            ⚛ A React library for smooth FLIP animations. Easily animate
            originally unanimatable properties like DOM positions with one hook.
          </p>
        </div>
      </div>
    </section>
  </main>
</MainLayout>
