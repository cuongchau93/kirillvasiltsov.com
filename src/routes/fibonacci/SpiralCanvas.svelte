<script>
  import { onMount } from "svelte";
  import { mode } from "../../theme.js";

  const GOLDEN_RATIO = 0.618;

  let canvas;
  let ctx;
  let isAnimationRunning = false;

  $: canvasBg = $mode === "dark" ? "hsl(74, 32%, 8%)" : "hsl(210, 20%, 99%)";

  let DOTS = 1110;
  let turns = 0.0123456;

  $: valid = /^[0-9]+(\.[0-9]+)?$/.test(turns);

  const drawCircle = (x = 0, y = 0) => {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2, true);
    ctx.fill();
  };

  const turnToRad = (turn) => turn * Math.PI * 2;

  const drawPattern = () => {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    let num = 0;
    let factor = 0;

    const frame = (timestamp) => {
      ctx.fillStyle = `hsl(${(num / DOTS) * 130 + 180} , ${
        (num / DOTS) * 95 + 50
      }%, 50%)`;

      for (let i = 0; i < 4; i++) {
        ctx.rotate(turnToRad(turns));
        ctx.save();
        ctx.translate(factor, 0);
        drawCircle();
        ctx.restore();

        num++;
        factor += 0.3;

        if (num >= DOTS) {
          cancelAnimationFrame(frame);
          isAnimationRunning = false;
          return;
        }
      }

      requestAnimationFrame(frame);
    };

    isAnimationRunning = true;

    requestAnimationFrame(frame);
  };

  const redrawPattern = () => {
    ctx.restore();
    ctx.fillStyle = canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPattern();
  };

  onMount(() => {
    DOTS = Math.min(window.innerWidth + 180, 1000);
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 700;
    ctx.fillStyle = canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    redrawPattern();
  });
</script>

<style>
  canvas {
    display: block;
    transform: translateY(-5%);
  }

  @media screen and (max-width: 768px) {
    canvas {
      transform: translateY(-12%);
    }
  }

  .controls {
    display: flex;
    align-items: stretch;
    justify-content: center;
    padding: 0.4em;
    z-index: 1;
  }

  button {
    border-radius: 0.5em;
    border: none;
    background: hsl(226, 100%, 68%);
    padding: 0.6em 1em;
    margin-right: 0.5em;
    cursor: pointer;
    filter: brightness(0.7);
    font-size: 1rem;
    font-weight: bold;
  }

  button:hover {
    filter: brightness(1);
  }

  input {
    border-radius: 0.5em;
    padding: 0em 1.1em;
    border: none;
    background: hsl(226, 100%, 87%);
    text-align: center;
    font-size: 1rem;
  }

  input.invalid {
    box-shadow: 0 0 0px 5px red;
  }
</style>

<svelte:window on:resize={redrawPattern} />

<div class="controls">
  <button disabled={isAnimationRunning || !valid} on:click={redrawPattern}>
    Play
  </button>
  <input class:invalid={!valid} bind:value={turns} type="text" />
</div>
<canvas bind:this={canvas} />
