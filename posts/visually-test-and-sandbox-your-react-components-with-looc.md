---
title: Visually test and sandbox your React components with Looc
date: "2020-04-17"
spoiler: How to sandbox your React component and manipulate its props in the browser
language: en
tags:
  - react
  - programming
---

If you've ever used Storybook in a big React project, you should know that builds can be really slow -- the more stories you write the more it takes to build the whole catalogue. This is fine when you actually use Storybook as a catalogue. The ability to deploy the whole component library so everyone on the team can instantly confirm it is one of the biggest advantages of Storybook. However if your component is not yet finished then rebuilding the whole bunch of stories on every single change is too much just to see how the look of the component changed. If only we could work with ONE component at a time!

And we can -- with [`looc`](https://github.com/jlkiri/looc).

## What is Looc?

Looc is a tool that allows you to quickly preview your React components in the browser independently from other existing components. With Looc you can "sandbox" the component and manipulate its props and immediately see how it reacts to updates. This is very useful for testing components without having to rebuild the whole project on every single change. You can think of it as a fast alternative to Storybook with the [knobs addon](https://github.com/storybookjs/storybook/tree/master/addons/knobs) enabled automatically but for single components.

This is what it looks like when you take one of your components, e.g. `IDCard.tsx`, and launch it with `looc`:

```sh
$ npx looc start src/IDCard.tsx
```

![ewf](https://raw.githubusercontent.com/jlkiri/looc/master/assets/looc.gif)

The UI you can see on the bottom of the GIF above is generated **automatically** for you, based on what props your component needs. No need to tune the knobs.

Looc relies on native support for ESM modules in the browser, so there is no need to transpile and bundle external libraries like [`emotion`](https://github.com/emotion-js/emotion) -- they are installed at first launch and can be simply imported from the browser on subsequent launches. This is exactly what allows for super fast builds.

But speed is not the main reason I decided to write this library.

I often found myself using Storybook only for its knobs addon. I needed to play with props and see how my component reacts to prop changes. I needed to see my component in all possible states -- something not possible without a tool like this.

Automatic UI generation for props manipulation almost sounds like magic, but how does it work?

## How it works

Suppose you have a file `IDCard.tsx` and inside it is a component that looks like this:

```ts
interface IDCardProps {
  firstName: string;
  lastName: string;
  title: string;
  id: number;
  picShape: "squared" | "round";
  telephone: string;
}

const IDCard: React.FC<IDCardProps> = ({
  firstName = "",
  lastName = "",
  title = "",
  id = 0,
  telephone = "",
  picShape = "round",
}) => {
  /* your components code */
};

export default IDCard;
```

Looc will parse the interface and wrap your component in a special component that knows the props and their types. This allows Looc to automatically generate input UI and pass values to your component accordingly.

Internally, Looc uses [tsx-ray](https://github.com/jlkiri/tsx-ray) to parse the `.tsx` file and extract interfaces from it. This information is used to decide which props can be passed to your component and what type they should be. This means that you can only use it for `.tsx` components.

Next, if you use libraries like [emotion](https://github.com/emotion-js/emotion) or [styled-components](https://github.com/styled-components/styled-components), Looc uses [snowpack](https://github.com/pikapkg/snowpack) to download ESM versions of those libraries so it can import them directly from browser.

This approach allows to reduce the build-rebuild time to almost **zero** (_almost_, because Looc still needs to resolve and bundle imports of other components and because Typescript needs to be compiled). Initial installation of required libraries can take some time: usually less than a minute. Subsequent starts will take only a **few seconds**. Looc uses [rollup](https://github.com/rollup/rollup) to do the compilation and bundling.

When your component is loaded, you can confirm it in the browser window. The UI is generated automatically based on prop types. Since there is no way to know which props are required and which aren't, default values are set for every single prop based on its type.

## 🚧 In development 🚧

While you can use it already, the library is still in development and any issues and contributions are very welcome!
