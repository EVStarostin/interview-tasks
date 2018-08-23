/* 
4. Тэг picture и атрибут srcSet.
    <picture>
    <source srcset="mdn-logo-wide.png" media="(min-width: 600px)">
    <img src="mdn-logo-narrow.png" alt="MDN">
    </picture>

    ​<picture>
    <source srcset="mdn-logo.svg" type="image/svg+xml">
    <img src="mdn-logo.png" alt="MDN">
    </picture>

    <img srcset="elva-fairy-320w.jpg 320w,</img>
                elva-fairy-480w.jpg 480w,
                elva-fairy-800w.jpg 800w"
        sizes="(max-width: 320px) 280px,
                (max-width: 480px) 440px,
                800px"
        src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
*/

/* 
5. Специфичность селекторов
    — 0. селекторы типов элементов (например, h1) и псевдоэлементов (например, ::before).
    — 1. селекторы классов (например, .example), селекторы аттрибутов (например, [type="radio"]) и псевдокласов (например, :hover).
    — 2. селекторы идентификаторов (например, #example).

    Специфичность селектора разбивается на 4 группы — a, b, c, d:

    — если стиль встроенный, т.е. определен как style="...", то а=1, иначе a=0;
    — значение b равно количеству идентификаторов (тех, которые начинаются с #) в селекторе;
    — значение c равно количеству классов, псевдоклассов и селекторов атрибутов;
    — значение d равно количеству селекторов типов элементов и псевдо-элементов.

    <div class="one two">
    div {background-color: 'red';} - 0 0 0 1
    .one.two {background-color: 'green';} - 0 0 2 0
    .one {background-color: 'blue';} - 1 - 0 0 1 0 
    div.one{background-color: 'yellow';} - 0 0 1 1
*/

/* 
9. Стилизовать данную верстку так, чтобы текст и кнопка расположились в ряд, текст занимал все оставшееся от кнопки пространство, отображался в одну строку, а лишняя часть отобразилась точечками.
<div>
Очень-очень длинный текст
<button>Надпись</button>
</div>

div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 80px;
  position: relative;
  padding-bottom: 10px;
}
button {
  position: absolute;
  right: 0;
}
*/