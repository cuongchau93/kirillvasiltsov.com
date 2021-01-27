---
title: Visitor pattern in TypeScript
spoiler: "Utilize TypeScript's static type-checking to make Visitor pattern possible in a dynamic language"
date: "2021-01-27"
tags:
  - typescript
  - design patterns
language: en
---

Imagine that you are writing a program which can draw different shapes: circles, triangles, squares, etc. You represent them by corresponding data types. Depending on a language you use, these shapes become distinct classes, structs, members of an enum or parts of some algebraic data type. Because you also want to be able to do something with these shapes, you describe behavior somewhere. For example, if you chose to represent shapes as classes, behavior can be described as methods on these classes. Suppose you decide to support one basic operation: `draw`.

The goal of this article is not to show you some quick way to make your shapes drawable and call it a day. Instead, before we implement an outline of such a program, let's think about how we could structure our code. Let's start with a simple table of our shapes and their behavior.

![shapes-table](/images/shapestable.png)

Somewhere in our code we just want to call `draw()` and watch it magically draw a correct shape depending on which option is currently selected. We definitely don't want to concern ourselves with the details of drawing. But each shape is drawn differently so we need to describe the behavior three times -- once for each shape. If we had _four_ shapes, we would need to describe the behavior _four_ times.

Like I said, where _exactly_ we have to describe this behavior depends on the language we choose. Some languages allow for more than one way to do this and deciding which is _better_ is no easy task. It was even called the "The Expression Problem" and Bob Nystrom has [a very short and good explanation in his book Crafting Interpreters](https://craftinginterpreters.com/representing-code.html#the-expression-problem). The "problem" refers to the fact that when we have a lot of shapes AND a lot of behaviors, some languages require us to do a lot of work just to add a new shape and some languages require us to do a lot of work just to add a new behavior. There is no easy compromise. However (as you probably already have guessed) there is a design pattern that makes our lives easier in such situations -- the Visitor pattern.

JavaScript and TypeScript are those languages which give us a little bit more freedom than others. Today I want to talk specifically about TypeScript because it makes some type-safe patterns like the Visitor pattern possible and useful in an otherwise dynamic language.

So, in TypeScript we have a bunch of ways to achieve what we want, but not all of them are good. Assume we have three classes that represent our shapes.

```ts
class Square {}
class Circle {}
class Triangle {}

type Shape = Square | Circle | Triangle
```

The bad way would be to just have a single `draw()` function and use conditions to find out how to draw a particular shape:

```ts
function draw(shapes: Array<Shape>) {
  for (const shape of shapes) {
    if (shape instanceof Square) {
      // draw Square
    } else if (shape instanceof Circle) {
      // draw Circle
    }
  }
}
```

The problem with this approach is that it is **not** type-safe. The compiler does not tell us that we forgot to handle the `Triangle` case. This will cause a runtime error when we try to draw a `Triangle`. Note that in languages with pattern matching like Haskell or Rust, the compiler would warn us about unhandled cases.

One type-safe alternative is to define a `Drawable` interface.

```ts
interface Drawable {
  draw: () => void
}
```

Now if we slightly modify our `draw` function to expect an array of `Drawable` things, we will get a compile-time error if we try to give it an array that contains something that does not implement `draw()`.

```ts
function draw(shapes: Array<Drawable>) {
  for (const shape of shapes) {
    shape.draw()
  }
}
```

Good. Even better if we force every shape to `implement` it!

```ts
class Square implements Drawable {
  draw() {}
}
```

Now back to the "expression" problem and to the main goal of this article.
Imagine we decide to support one more behavior -- area calculation with `area()`. This means, again, describing it three times, once for each shape.

have three data types: `Square`, `Triangle` and a `Circle`. You want
