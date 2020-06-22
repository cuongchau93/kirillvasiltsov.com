---
title: "Path hacks"
date: "2020-06-99"
spoiler: Pack hacks
language: en
tags:
  - programming
---

Directory structure (~ hack):

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

Directory structure (node_modules hack):

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

Without hack:

```javascript
const { log } = require("../../../utils/util");

log("There is no favorable wind for the sailor who doesn't know where to go");
```

With node_modules hack:

```javascript
const { log } = require("utils/util");

log("There is no favorable wind for the sailor who doesn't know where to go");
```

With file URL hack:

```javascript
const { log } = require("~/utils/util");

log("There is no favorable wind for the sailor who doesn't know where to go");
```
