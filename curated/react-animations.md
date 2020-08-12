---
title: "React animations curated"
language: en
field: react
---

# Animating mounts and unmounts

# Synchronize animation and render lifecycles

Any solution to the problem of animating mounts and mounts can be summarized with one phrase: _synchronize animation and render lifecycles_. This is something you can do very easily without any help, as I show below, but also something that probably requires a library in anything more complex than toy examples.

## Start simple

Animating mounts and unmounts in React has never been easy. There is a reason why libraries like [react-transition-group](https://github.com/reactjs/react-transition-group) exist. While a simple mounting animation (e.g. fade-in) does not even require React and can be done with CSS naturally, unmounting is very different.

And the main reason is because React provides no lifecycle methods that are called right before unmounting (as in some other popular libraries like Svelte or Riot).

For example, we usually have a boolean value that decides whether some element is rendered or not. Once we set it to `false`, the element is immediately removed from React tree and then from the DOM and we just don't have time to do anything with it. That could be accessing it by `ref` or selecting by `id` and modifying its styles etc.

If we want to delay its removal from the React tree, we need tricks.

The simplest trick is to have another boolean value that lets us attach a CSS class with animations to the element when `true`. We also need to attach an `onAnimationEnd` listener to the element we want to animate. In the handler, we know that the animation has finished so we finally can set the other boolean responsible for rendering to `false`.

```jsx
export default function App() {
  const [animateBeforeUnmount, setAnimateBeforeUnmount] = React.useState(false);
  const [isRendered, setIsRendered] = React.useState(true);
  const divRef = React.useRef();

  const handleAnimationEnd = () => {
    setIsRendered(false);
    setAnimateBeforeUnmount(false);
  };

  return (
    <>
      <button onClick={() => setAnimateBeforeUnmount(true)}>Toggle</button>
      {isRendered && (
        <div
          onAnimationEnd={handleAnimationEnd}
          ref={divRef}
          className={`bg-square ${animateBeforeUnmount && "fade-out"}`}
        />
      )}
    </>
  );
```

Codesandbox:

<iframe src="https://codesandbox.io/embed/animate-unmount-example-phtgr?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="animate-unmount-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## `use-animate-presence`

The simple approach is, well, simple. Almost nothing we do in real life is that simple. Logic will need to be reused, fancier animations will need to be played, multiple elements will need to be animated. I've built a hook that solves most of these problems with slightly more than 1KB of code. Meet `use-animate-presence`:

https://github.com/jlkiri/use-animate-presence

It:

a) Runs smoothly off main thread  
b) Uses springs  
c) Can chain (un)mounts (synchronizes animation and render lifecycle)

and more.

Here's the demo of what you can do with it. Try pressing the button during animations as well to see how smoothly everything's reversed.

<iframe src="https://codesandbox.io/embed/use-animate-presence-logo-vxdqc?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="use-animate-presence-logo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Note that it uses springs - something impossible to do with CSS animations alone. But since it uses Web Animations API, it is, like CSS animations, not blocked by other running Javascript, which allows for smooth 60fps animations.
