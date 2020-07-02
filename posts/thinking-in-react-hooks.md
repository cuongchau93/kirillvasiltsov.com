---
title: "Thinking in React Hooks: why and when"
date: "2020-07-02"
spoiler: The conceptual difference between owning and sharing state
language: en
tags:
  - react
  - programming
---

React Hooks API [was released more than a year ago](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html). A great deal has been said and written about it, including articles by React team. I am using hooks every day on my job and in my personal projects. However, I noticed that quite often we disagree about when to use them - and this can hurt productivity.

I think disagreements exist because we tend to use React hooks without really "thinking" in them.

In this article, I will omit the "what" and "how", because there already are a plenty of good introductions. Instead I will focus on **why** and **when** you should use React hooks.

## The old way

[This article by Tyler McGinnis](https://dev.to/tylermcginnis/why-react-hooks-51lj) is a very good explainer. It compares hooks to the older API and approaches. The main idea is that **hooks enable sharing of non-visual logic**. Sharing **visual** logic has always been easy - that is the whole point of components. Just create a `<Button>` and then use it in every part of your website. Make it customizable with some props if you need to.

![button](/assets/button.png)

On the other hand, if you need to fetch external data and then show it in different components, you have a problem.

![houston](/assets/houston.jpg)

You cannot use the same lifecycle method (like `componentDidMount`) in two or more components, whether it is a class component or function component. The same is true for `this.setState`: class components conceptually **OWN** the state and you cannot easily share it.

The simplest sharing mechanism that has existed in React from day one is... `props`. If you need to use the same state in two or more components, you ["lift"](https://reactjs.org/docs/lifting-state-up.html) it to the closest common parent component in the React tree. Then you can simply pass the value down as props. But this is not always convenient and other approaches emerged.

Traditionally, to share logic like data fetching in React (or other non-visual logic) people would use [higher order components](https://reactjs.org/docs/higher-order-components.html) (HOCs) or [render functions as children](https://reactjs.org/docs/render-props.html). These patterns emerged because everyone needs to share logic eventually. For example, here's how you would use a render function as children to "reuse" data fetching logic:

```jsx
class Fetcher extends React.Component {
  state = null;

  async componentDidMount() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    this.setState(data);
  }

  render() {
    if (!this.state) return null; // Loading or no data

    return this.props.children(this.state); // Pass state to the rendering function
  }
}

function Page1() {
  return <Fetcher>{(data) => <div>{data.title}</div>}</Fetcher>;
}

function Page2() {
  return <Fetcher>{(data) => <div>{data.title}</div>}</Fetcher>;
}
```

You can play with it here:

[![Edit sharing-data-fetching-react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/recursing-rgb-7f0nf?fontsize=14&hidenavigation=1&theme=dark)

If you are an attentive reader, you probably noticed that although logic is shared, **the state is not**! We actually `fetch` data twice and it exists in two different places now. This is bad and may lead to very nasty bugs. Here's a picture that shows what actually happens:

![state-not-shared](/assets/datafetcher.png)

Of course, it is possible to rely on libraries like `react-redux` to completely separate fetching logic from React and maintain an external object/store, which is then "connected" to your components. But at the end of the day, what `connect` means is basically the same thing as HOCs (although [`react-redux` hooks are now a thing](https://react-redux.js.org/api/hooks)!).

In all of these approaches, something **owns** the state.

## Owning state versus sharing it

Hooks solve exactly this problem of sharing logic. When you use `useState`, your component does not **own** state anymore. Instead, state is "shared" with your component. Conceptually, with React Hooks none of your components **have** state. Hence the natural choice of words "hooks" and "use". They could have chosen `borrow` but I think `use` is simpler. For the same reason, `this.setState` also should have been named `haveState` or `ownState` because it better reflects the reality.

You can think of `useState` as dynamic `import`. The difference is that you can only `import` state from inside the function component, not at the top level. The good thing is that you can import whatever you want. Sharing then becomes trivial: reusing state is not harder than importing some object from two different files where you need it. Because the very "thing" (value) that you want to import is dynamic, you cannot "import" it in two different functions before the program runs. Naturally, then, you have to create another function that does the importing. You CAN import that function statically wherever you need it. This is the idea behind custom hooks.

Without custom hook:

![before custom hook](/assets/no-custom-hook.png)

With custom hook:

![with custom hook](/assets/with-custom-hook.png)

The analogy with import is completely justified. A lot of `react` libraries that people import in their code today are basically a hook. Some of the most popular data fetching libraries like [swr](https://github.com/vercel/swr) and [react-query](https://github.com/tannerlinsley/react-query) are hooks (`useSwr` and `useQuery` respectively). Even animations in libraries like [react-easy-flip](https://github.com/jlkiri/react-easy-flip) can be done with a `useFlip` hook.

Not understanding the (conceptual) difference between owning and sharing is one big reason disagreements may occur. No one would argue whether using `import` is a good approach or not. It is essential. In fact, before Hooks were released, there was a proposal to use the `use` keyword. But I guess a function is better than having to maintain a non-standard syntax addition to Javascript.

## When to use React Hooks

The answer to this question is "almost always". Some people think that there are cases where you CAN use a hook but, even though it is natural, it would not be very scalable/maintainable to use it. For example, it may be tempting to try to separate the pure view component from logic and avoid using hooks in it, especially when you do not need to share that logic (e.g. data fetching specifically for that component). The fear of using hooks in that component comes from thinking that the otherwise pure component would **own** the state and hence be coupled to logic that may potentially change.

There is no 100% right or wrong answer, but there are two reasons to still use hooks there:

a) There are no better alternatives. One of them is to have a "container" component whose only purpose is to fetch data for the pure component. The problem is that if logic changes in the future, the very same changes would have to be made to the container. It is even worse because some components higher in the tree might want to pass props to the pure view component and the container will have to take and pass the props down.

b) A custom hook which may change a lot is not a very good hook. For example instead of having `useFetchUser` and `useFetchProfile` hooks, it may be better to have a `useFetch` hook that only does the fetching. The fetching function may change from the external API to the local database, so you can also make it an argument to `useFetch`. Then you can create hooks like `useUser` which use `useFetch` under the hood. Ultimately, this is not a problem of React, but a problem of abstraction.

## What you can't do with React Hooks

I am aware of only one case where you cannot use React hooks. This is when you need to capture the DOM properties like width or (x,y) position right before the rendered update is commited / laid out. In class components this is possible with the [getSnapshotBeforeUpdate](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate) lifecycle method. At the moment of writing there is not hook counterpart of that method. This is a pretty rare usecase, but it is very important in some animation libraries.

## What about many other hooks?

I didn't say anything about other very useful hooks like `useEffect`, but the same logic applies to them. You can share not only state but side effects as well! The detailed analysis of them is out of the scope of this article. But if you are interested you can read more about some [interesting use cases for `useLayoutEffect` in this article](https://css-tricks.com/everything-you-need-to-know-about-flip-animations-in-react/) I wrote earlier.
