import { writable } from "svelte/store";

export const language = writable("en");

export const text = {
  en: {
    sec1: `How many times have you picked up a pine cone 
    and wondered why it has the shape it has? I never did. That was until I read 
    an awesome book <a href="https://mitpress.mit.edu/books/rhyme-and-reason">"Rhyme and Reason"</a> by 
    Juan Uriagereka while doing my Master's in linguistics. The book is not about pine cones, 
    but it lists them as a peculiar example of how mathematical laws can govern the structure of 
    living things. Look at this pine cone.`,
    sec2: `Do you notice something? If you look close enough you can see 
    that seeds grow in spirals! 
    In fact, there are <strong>two</strong> distinct sets of spirals in here. I highlighted them 
    for you. Here's the first one:`,
    sec3: `And here's the second one:`,
    sec4: `What if I told you there's more to see here? Try counting the arms in both 
    sets of spirals. There are 13 arms in the first image and 8 in the second one.`,
    sec5: `This is an example of what scientists 
    call <a href="https://en.wikipedia.org/wiki/Phyllotaxis"><em>phyllotaxis.</em></a> What makes these numbers special is that they are both part of Fibonacci sequence
     and are neighbors in it. In case you forgot 
    what it looks like, here are the first numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55... 
    Basically, phyllotaxis is a special arrangement of seeds or leaves in plants. Although not always,
     the amounts of arms in phyllotactic spirals are often neighbours in Fibonacci sequence: 1 and 2, 2 and 3, 3 and 5, 5 and 8, 
     8 and 13 and so on. You can find the same pattern in sunflowers!`,
    sec6: `Why did nature "choose" this particular arrangement? Why don't you try to guess? Imagine that YOU can decide how pine cone seeds grow. How
     would you place them? The algorithm is 
    something like this: place a seed, then rotate yourself by some degrees, then 
    place another seed and repeat. For example, if you always rotate 360 degress (1 full turn) or don't
      turn at all the seeds will form a line. This is very far from a real pine cone.`,
    sec7: `Below, I created a playground where you can experiment with different degrees of rotation! Just input a number
     of <strong>turns</strong> that you think will get you the closest to the spirals in the pine cone. Remember, 1 turn = 360 degrees, so
      180 degress is 0.5 turns etc.`,
    sec8: `The right answer is 0.618 (or 0.382 which is 1 - 0.618). Go back and try it. The value 1.618 is known as
     the <a href="https://en.wikipedia.org/wiki/Golden_ratio">Golden Ratio</a>. It looks like the most
      space-efficient way to pack seeds (or leaves) is by turning golden ratio times each time before
        growing. In the context of turning, 0.618 turns is the same as 1.618 turns. How is it related to Fibonacci sequence? If you take two Fibonacci neighbours, like 8 and 13, and
         divide them such that the dividend is the larger one, you get a value that is very close to the Golden Ratio.`,
    sec9: `Note that the Golden Ratio is irrational. You can only get so close by using Fibonacci members. 
    While the ratio is irrational it is amazing how the most physically space-efficient way to grow that the nature 
    "chose" is describable with the language of mathematics.`,
  },
  ru: {
    sec1: `Как часто вы поднимаете сосновую шишку и задумываетесь о том, почему она имеет такую форму? Я никогда не задумывался. 
    Так было пока я не прочел замечательную книгу <a href="https://mitpress.mit.edu/books/rhyme-and-reason">"Rhyme and Reason"</a>
     Хуана Уриагерека во время написания магистерской по лингвистике. Книга не про сосновые шишки,
      но она приводит их как пример того, как математические законы могут оказывать влияние на структуру
       живых объектов. Посмотрите на эту шишку.`,
    sec2: `Замечаете что-нибудь? Если внимательно посмотреть, можно увидеть что семена растут по спирали! 
    На самом деле здесь целых два набора спиралей. Я обвел эти спирали для вас. Вот первый набор:`,
    sec3: `А вот второй:`,
    sec4: `Что если я скажу, что это не всё? Попробуйте посчитать спирали в первом и втором наборе. В 
    первом их 13, а во втором - 8.`,
    sec5: `Это пример того, что учёные называют <a href="https://en.wikipedia.org/wiki/Phyllotaxis"><em>филлотаксис.</em></a> 
    Эти числа особенны тем что являются соседями в последовательности чисел Фибоначчи. На случай если вы забыли, вот
    несколько первых чисел последовательности:  0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55... По сути филлотаксис это 
    особенный порядок роста семён или листьев в растениях. Хоть и не всегда, количества филлотаксических спиралей (в двух наборах)
     часто являются соседями в последовательности Фибоначчи: 1 и 2, 2 и 3, 3 и 5, 5 и 8, 8 и 13 и т.д.
      Вы можете встретить такую же последовательность в семенах подсолнуха! `,
    sec6: `Почему природа "выбрала" именно такой способ организации? Почему бы вам самим не попробовать угадать? Представьте, 
    что вы можете решать как семена в шишке должны расти. Алгоритм прост: разместите семя, развернитесь на некоторое 
    кол-во градусов, разместите еще одно и повторите много раз. Например, если вы каждый раз будете 
    вращаться на 360 градусов или не вращаться вообще, ваши семена выстроятся в одну линию, что 
    совсем не похоже на то, как они растут в шишке.`,
    sec7: `Внизу вы можете увидеть интерактивный пример, где вы можете поэкспериментировать с разными 
    значениями вращения. Вам нужно просто ввести число <strong>поворотов</strong>, которое вы считаете 
    даст результат наиболее близкий к организации семен в шишке. Помните, что 360 градусов это 1 поворот,
     180 градусов это 0.5 поворота и т.д.`,
    sec8: `"Правильный" ответ: 0.618`,
  },
};

export const translator = (lang) => (key) => text[lang][key];
