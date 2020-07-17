<script>
  import { onMount } from "svelte";

  const words = ["Welcome!", "What's up?", "Have a nice day!"];

  let interval;
  let prompt;
  let typed = words[0];
  let idx = 0;

  onMount(() => {
    console.log(prompt);
    interval = setInterval(() => {
      idx = (idx + 1) % 3;
      typed = words[idx];
      prompt.style.setProperty("--chwidth", typed.length + 1);
    }, 4000);
  });
</script>

<style>
  #frame {
    position: absolute;
    top: 20%;
    right: 0;
    left: 0;
    height: 15%;
    transform: skewY(-6.5deg) skewX(30deg);
    background: linear-gradient(
      to left,
      rgba(255, 224, 158, 0.212) 0%,
      rgba(249, 255, 196, 0.123) 10%,
      transparent 10%,
      transparent 14%,
      rgba(255, 224, 158, 0.267) 14%,
      rgba(249, 255, 196, 0.212) 30%,
      transparent 40%,
      transparent
    );
  }

  #parallax-child {
    background: 50% 50% / cover;
    background-image: url("/tree-night.jpg");
    position: relative;
    transform: translateZ(-2px) scale(3);
    transform-origin: 0% 0% 0px;
    transform-style: preserve-3d;
    height: 950px;
    width: 100%;
    filter: brightness(0.7);
    will-change: transform;
  }

  .magic-pixel {
    width: 100%;
    height: 1px;
    background-color: var(--bg);
  }

  #greet {
    position: absolute;
    top: 20%;
    left: 8%;
    font-size: 15px;
    font-family: monospace;
    transform: skewY(-8deg);
  }

  @media screen and (min-width: 768px) {
    #greet {
      font-size: 17px;
    }
  }

  .typing {
    --chwidth: 9;
    width: calc(var(--chwidth) * 1ch);
    animation: typing 2s steps(var(--chwidth)) infinite alternate both,
      blink 0.5s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;
    box-sizing: content-box;
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
</style>

<section id="parallax-wrap">
  <div id="frame" />
  <div id="pc">
    <div id="greet">
      <div>[me@home ~]$</div>
      <div bind:this={prompt} class="typing">{typed}</div>
    </div>
    <img src="pc3.svg" />
  </div>
  <div id="parallax-child" />
</section>
