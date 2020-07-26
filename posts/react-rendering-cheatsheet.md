---
title: "React rendering cheatsheet: Will it render?"
date: "2020-07-10"
spoiler: Find out when and why React re-renders components
language: en
tags:
  - react
  - programming
  - post
---

A few days ago I came across [this awesome article about React rendering behaviour](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/) by [Mark Erikson](https://twitter.com/acemarke). It's pretty deep and covers things that you won't find in the official docs and I think even on [Overreacted](https://overreacted.io/). I had problems with some rendering behaviours when building [react-easy-flip](https://github.com/jlkiri/react-easy-flip) and the article was very helpful.

For example, I didn't know that not everything re-renders when context value changes: under certain conditions (like when the child of the context provider is memoized with `React.memo`) only the providing component and the component that uses the context with `useContext` are re-rendered. Sometimes we really **want** a re-render even when props do not change, because we need to trigger some effect with `useEffect` or `useLayoutEffect`. If you notice that effect is not triggered for some reason, make sure the component is actually rendered by React.

## Cheatsheeted version

However, it is a BIG article so I decided to create a visual aid to it: with pictures and live Codesandbox examples that you can play with.

![rendering](https://will-it-render.vercel.app/meaningless-memo.png)

I thought that making it into an independent page is better so here's the link when you can see it:

https://will-it-render.vercel.app/
