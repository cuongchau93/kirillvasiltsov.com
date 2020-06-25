---
title: "Contributing to Gatsby - Issue #20699"
date: "2020-06-26"
spoiler: Do you know how long can your directory name be?
language: en
tags:
  - OSS
  - programming
---

[Last time](https://www.kirillvasiltsov.com/writing/contributing-to-gatsby-issue-21311/) I wrote about fixing `gatsby-transformer-remark`, which failed to properly count words (and time-to-read) problem in Chinese and Japanese languages.

Today I'm going to tell you about another contribution to [Gatsby](https://www.gatsbyjs.org/) that I made earlier this year.

## Background

First of all, here's [the issue](https://github.com/gatsbyjs/gatsby/issues/20699) that is the topic of this post. It describes a possible build error when directories/filenames built by Gatsby are **too long**. Additionally, there isn't a good error message and all a user would see is `ENAMETOOLONG`.

Apart from being a crash, this is bad for two reasons:

a) This can happen by using Gatsby the right, documented way  
b) This is caused by files/directories that are not supposed to be seen/touched by a user and no obvious workaround is possible

Why does this happen?

Gatsby allows you to [create pages programmatically](https://www.gatsbyjs.org/docs/creating-slugs-for-pages/). This means that based on your local or fetched data, you can choose the **slug** for your page: `example/of/programmatically-created-slug`. However, there are no rules about what slugs should look like. When you run `gatsby build`, Gatsby actually creates folders with names that correspond to segments of the slug you created (and puts associated data and other interesting stuff inside). This implies that if you have a slug with a segment that is 1000 characters long, **a directory with a name 1000 characters long will be created**.

The problem is, on most operating systems you cannot create directories that long!

So, the possible solution is to either crash with a meaningful message, or automatically truncate paths that are too long and warn about the length. This is what I did in [the pull request](https://github.com/gatsbyjs/gatsby/pull/21518).

## Fixing the bug

Under the hood, Gatsby uses [Redux](https://redux.js.org/) to manage state during build. Most of Gatsby's API are [**actions**](https://www.gatsbyjs.org/docs/actions/) like `createNodeField` which you can call by hooking into different stages of build, e.g. `onCreateNode`. The code that handles public actions is inside `/src/redux/actions/public.js`. Inside of this file, there is a `createPage` action that you call when you want to programmatically create a page. And here is how a page is represented internally:

```javascript
const internalPage: Page = {
  internalComponentName,
  path: page.path,
  matchPath: page.matchPath,
  component: page.component,
  componentChunkName: generateComponentChunkName(page.component),
  isCreatedByStatefulCreatePages:
    actionOptions && actionOptions.traceId === `initial-createPagesStatefully`,
  context: page.context || {},
  updatedAt: Date.now(),
};
```

Of these properties, we are concerted with `path`. We can check it for segments that are too long. So, before creating the object above, let us do something like this:

```javascript
const invalidPathSegments = tooLongSegmentsInPath(page.path);

if (invalidPathSegments.length > 0) {
  const truncatedPath = truncatePath(page.path);
  page.path = truncatedPath;
}
```

`tooLongSegmentsInPath` is where it gets interesting. First of all, we simply split the path by `/`. Then we need to check whether each segment is too long. But what is too long? It [seems that most OS have a filename limit of 255 bytes](https://serverfault.com/questions/9546/filename-length-limits-on-linux/9548#9548).

```javascript
export const tooLongSegmentsInPath = (path: string): Array<string> => {
  const invalidFilenames: Array<string> = [];
  for (const segment of path.split(`/`)) {
    if (isNameTooLong(segment)) {
      invalidFilenames.push(segment);
    }
  }
  return invalidFilenames;
};
```

and choose to crash if this is a `production` build. After all, we don't want to truncate paths because this is not what the user may want. But in `development` mode this is fine with a simple warning.
