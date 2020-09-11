---
title: Smooth animations with React Hooks, again
date: "2020-02-05"
spoiler: Keeping it at 60fps with a simple trick
language: en
tags:
  - react
  - animation
  - programming
  - post
---

UPDATE: [This article](https://css-tricks.com/everything-you-need-to-know-about-flip-animations-in-react/) has newer and better information about FLIP animations in React.

A few months ago I wrote [about using the FLIP technique to animate things in React](https://dev.to/jlkiri/flip-animation-but-with-react-hooks-5g9d). Since then, I've found that some decisions were rather redundant and realized that the way React works can be leveraged significantly.

## The simplest solution

Let us try to do something like this:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/u7lvay669u0p1p0xqk7k.gif)

First of all, we must make sure that initial position / size of the element we want to animate is properly cached (saved) in something like a `ref` instance. This need not be done within a hook callback and can be done like this:

```jsx
function Square() {
  const squareId = "flipSquare"
  const cachedPosition = useRef()

  const elm = document.getElementById(squareId)

  if (elm && cachedPosition.current == null) {
    cachedPosition.current = elm.getBoundingClientRect()
  }

  return <div id={squareId} />
}
```

Next, assume that something triggered a style change of our `div`. We want to invert that change inside `useLayoutEffect`.

```javascript
useLayoutEffect(() => {
  const el = document.getElementById(squareId)
  if (!el || cachedPosition.current == null) return

  const rect = el.getBoundingClientRect()
  const scaleX = cachedPosition.current.width / rect.width
  const scaleY = cachedPosition.current.height / rect.height

  cachedPosition.current = rect

  el.style.transform = `scale(${scaleX}px, ${scaleY}px)`
}, [someToggle])
```

The logic is simple: we use `getBoundingClientRect` to find the new position / size of the element (but which has not been painted yet). Then we use it to calculate how much exactly we need to `scale` or `translate` the element. Finally, we cache this new position and set style directly.

Note that `someToggle`, which changes when we trigger style changes, must be used as a dependency. This tells the hook that styles changed and that the callback must be run.

Next, we replay that change in `useEffect`. This is even easier than inverting. Again, we query the element and revert the transform by setting it to `""` and set transition duration.

```javascript
useEffect(() => {
  const el = document.getElementById(squareId)
  if (!el) return

  el.style.transition = `1s`
  el.style.transform = ``
}, [someToggle])
```

And that's it! How you handle triggers that cause style changes and what part of state changes and can be used as a dependency - is completely up to you.

Here's full code:
https://codesandbox.io/s/modest-franklin-0wtji

## (Almost) no need for `requestAnimationFrame`

Previous examples used `requestAnimationFrame` because we cannot trigger a transition if a property we want to animate is set with Javascript twice synchronously. However, my previous solution basically ignored the fact that `useLayoutEffect` callback is run synchronously, but `useEffect` callback is run _after_ paint. This means that the **Invert** step in FLIP can be done with `useLayoutEffect` and the **Play** step can be done with `useEffect`. Unlike with vanilla, with React we are guaranteed that hooks will run exactly this way, so there is no need for a `requestAnimationFrame` workaround.

I'm saying _almost_ because despite the guarantees React gives us, FLIP still does not work properly in Firefox if we do not use `requestAnimationFrame` inside `useEffect`.

## Libraries

There is honestly no point in doing this if a simple CSS equivalent is enough. When CSS is NOT enough, though, this is the ONLY way to properly animate your elements. CSS is not enough when we want to animate DOM mounting/unmounting or DOM position change when we shuffle items, for example. Native-like shared element transitions are also impossible with CSS.

The problem is, doing it without CSS is **hard**.

Animations implement in the way above should not only work - they should be smooth, cancellable, reliable and fit many use cases. This is where libraries come in. One of the most amazing libraries is [`react-flip-toolkit`](https://github.com/aholachek/react-flip-toolkit). However, it is slightly too big and does not provide a hook API. The library I wrote, [`react-easy-flip`](https://github.com/jlkiri/react-easy-flip), only provides hook API and is almost three times smaller than `react-flip-toolkit`.

P.S. I'm looking for contributors - there are still a plenty of things to improve!
