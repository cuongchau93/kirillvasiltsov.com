---
title: "Thinking in React Hooks: why and when"
date: "2020-07-02"
spoiler: How to avoid using React hooks wihout thinking in them
language: en
tags:
  - programming
---

React Hooks API [was released more than a year ago](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html). A great deal has been said and written about it, including articles by React team. I am using hooks every day on my job and in my personal projects. However, I noticed that quite often we disagree about when to use them - and this can hurt productivity.

I think disagreements exist because we tend to use React hooks without really "thinking" in them.

In this article, I will omit the "how", because there already are a plenty of good introductions. Instead I will focus on **why** and **when** you should use React hooks.

## Why hooks

[This article by Tyler McGinnis](https://dev.to/tylermcginnis/why-react-hooks-51lj) is a very good explainer. It compares hooks to the older API and approaches. The main idea is that **hooks enable sharing of non-visual logic**. Sharing **visual** logic has always been easy - that is the whole point of components. Just create a `<Button>` and then use it in every part of your website. Make it customizable with some props if you need to.

![button](/assets/button.png)

On the other hand, if you need to fetch external data and then show it in different components, you have a problem.

![houston](/assets/houston.jpg)

You cannot use the same lifecycle method (like `componentDidMount`) in two or more components, whether it is a class component or function component. The same is true for `this.setState`: class components conceptually **OWN** the state and you cannot easily share it.

The simplest sharing mechanism that has existed in React from day one is... `props`. If you need to use the same state in two or more components, you ["lift"](https://reactjs.org/docs/lifting-state-up.html) it to the closest common parent component in the React tree. This is not always convenient and other approaches emerged.

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

export default function App() {
  return (
    <main>
      <Page1 />
      <Page2 />
    </main>
  );
}
```

You can play with it here:

[![Edit sharing-data-fetching-react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/recursing-rgb-7f0nf?fontsize=14&hidenavigation=1&theme=dark)

If you are an attentive reader, you probably noticed that although logic is shared, **the state is not**! We actually `fetch` data twice and it exists in two different places now. This is bad and may lead to very nasty bugs. Of course, it is possible to rely on libraries like `react-redux` to completely separate fetching logic from React and maintain an external object, which is then "connected" to your components. But at the end of the day, what `connect` does is basically the same thing as HOCs (although [`react-redux` hooks are now a thing](https://react-redux.js.org/api/hooks)!).

![state-not-shared](/assets/datafetcher.png)
