---
title: "Import files easier with these few tricks"
date: "2020-06-23"
spoiler: How to avoid writing long and confusing relative paths
language: en
tags:
  - programming
  - tips
---

Have you ever found yourself writing imports that look like this?

```javascript
const { log } = require("../../../utils/util");
```

This is too cumbersome. No one wants to resolve each path in their head! Luckily, there are a lot of ways to make this much easier. First, if you are using tools like `webpack` you can give each path alias, and just import stuff as if it is an external library. But here I will tell you how to Do It Yourself, which is especially important when you don't use bundlers like `webpack`.

Below are a few ways to solve this problem.

## Use `package.json`

Suppose your directory structure looks like this:

```sh
.
├── package-lock.json
├── package.json
├── src
│   └── components
│       └── sidebar
│           └── atoms
│               └── atom.js
└── utils
    └── util.js
```

and you're trying to import `util.js` from `src/components/sidebar/atoms/atom.js`.

You can use `package.json` to make your own app a dependency! Here's what it will look like:

```javascript
// src/components/sidebar/atoms/atom.js
const { log } = require("~/utils/util");

log("There is no favorable wind for the sailor who doesn't know where to go");
```

To achieve that, you need to use a file URL that resolves to the root of your project (`.`) in your `dependences`:

```javascript
{
  "dependencies": {
    "~": "file:."
  }
}
```

After that all you need is to `npm install` it, which will create a symlink in `node_modules` to your project. This is what the directory structure look like after:

```sh
.
├── node_modules
│   └── ~ -> ..
├── package-lock.json
├── package.json
├── src
│   └── components
│       └── sidebar
│           └── atoms
│               └── atom.js
└── utils
    └── util.js
```

I learned [this trick](https://twitter.com/mkldny/status/1253123287711985664) from [Moshe Kolodny](https://twitter.com/mkldny).

## `node_modules` "hack"

With this neat "hack" you can import the file like you import any other external library:

```javascript
// src/components/sidebar/atoms/atom.js
const { log } = require("utils/util");

log("There is no favorable wind for the sailor who doesn't know where to go");
```

To achieve this you can create a `node_modules` folder right inside your `src` folder. Then, simply put the `utils` folder inside it. Due to how module resolution in Node works, the path `utils/util` will be first resolved to what is inside the `node_modules` you created.

Directory structure:

```sh
├── package-lock.json
├── package.json
└── src
    ├── components
    │   └── sidebar
    │       └── atoms
    │           └── atom.js
    └── node_modules
        └── utils
            └── util.js
```

## Github packages

You can also do it with [Github packages](https://github.com/features/packages). This approach takes more time than the two above and I personally don't use it (yet). But unlike with NPM registry, it is possible to publish **private** packages for free! So you can just

a) Create a private repo with the code you want to reuse  
b) Issue a [personal access token](https://github.com/settings/tokens)  
c) Put this in your `.npmrc`:

```txt
//npm.pkg.github.com/:_authToken=YOUR_TOKEN

registry=https://npm.pkg.github.com/username
```

d) `npm login --registry=https://npm.pkg.github.com`

Note that when you are asked to enter a password this is **NOT your Github password**, but the personal token! Finally,

e) `npm publish`

Don't forget that Github accepts only scoped packages so it must be named like `@username/package` where `@username` is your scope.

Once you're done you can install your package by running:

```sh
npm install @username/package --registry=https://npm.pkg.github.com
```

And use it like this:

```javascript
// src/components/sidebar/atoms/atom.js
const { log } = require("@username/log");

log("There is no favorable wind for the sailor who doesn't know where to go");
```
