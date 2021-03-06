react-mt-svg-lines
==================

### Bring your SVGs to life

![GIF Demo](showcase.gif)

[Live Demo](http://moarwick.github.io/react-mt-svg-lines)

A tiny React.js wrapper component that lets you trigger "animated lines" in your SVGs. Use it to add visual interest to icons, diagrams, loading spinners, or just any fun stuff!


### How it works
The component wraps your SVG and injects CSS required to animate the `stroke-dashoffset` property on every `path` element within. Since it utilizes CSS, it does not rely on any tweening libs. For a description of the technique, see [this article](https://css-tricks.com/svg-line-animation-works/).

> Sadly, this technique does not work in IE. I'm thinking of adding a JS-powered version soon...  


### Installation
```
npm install react-mt-svg-lines --save
```

### Usage
Require `MtSvgLines` into your component (you can import it under any name)...
```js
import MtSvgLines from 'react-mt-svg-lines';      // ES6+
// or...
var MtSvgLines = require('react-mt-svg-lines');
```

In your JSX, wrap it around any valid SVG...
```js
<MtSvgLines animate={ true } duration={ 500 }>
  <svg viewBox="0 0 100 100">
    <path stroke="green" strokeWidth="10" fill="none" d="M20.8,51c0,0,20.8,18.2,21.5,18.2c0.6,0,33.3-38.5,33.3-38.5"/>
  </svg>
</MtSvgLines>
```
> When you move up to React v15.0+, it appears that it no longer requires SVG attributes to be camel-cased in JSX. So, rather than `strokeWidth` or `strokeLinecap`, you should be good with the standard `stroke-width`, `stroke-linecap`, etc.


### Props

The component comes with a reasonable set of defaults. The only prop required to engage it is `animate`.

##### `className: string`
Any custom CSS class you'd like applied to the component's `span` wrapper. Default is `"mt-svg"`.

##### `animate: string || number || bool`
Your animation "trigger key":

* `false` render the SVG instantly (default)
* `true || string` trigger the animation immediately
* `number` trigger the animation after an initial delay of *number* (ms)  
* `"hide"` draw the SVG as invisible (rendered with `opacity: 0.01`)

If you need to re-trigger the animation, simply pass in a new `string` or `number` (different from the last value). You can generate it, e.g. `String( Date.now() )`. Have a look at the [DemoPage](https://github.com/moarwick/react-mt-svg-lines/blob/master/src/components/DemoPage.js) code.

##### `callback: function`
Callback function, executes when animation concludes.

##### `duration: number`
Desired duration of one full cycle of the entire animation, across all paths (ms). Default is `1000`.

##### `stagger: number (0-100)`
Delay between the start times of each path (when multiple paths are present within the SVG). Default is `0`. (The math there is simple, so if you have many staggered paths, you may need to tweak your `duration`.)

##### `timing: string`
Desired CSS "timing function" type: `"ease" || "ease-in" || "ease-out" || "ease-in-out" || "linear" || "step-start" || "step-end"`. Default is `"ease"`.

##### `playback: string`
Any additional valid CSS [`animation`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) shorthand props, specifically `iteration-count || direction || fill-mode || play-state`. Default is `"forwards"` (play once and stop), but feel free to experiment. For example, the spinner example is set to `"2 alternate-reverse both"`.

##### `fade: bool`
Apply a *fade-in* transition to each path. If a path has a `fill` color, the entire element will fade in while the line is drawn. Default is `false`.


> All other `props` are passed through to the wrapper `span`


### Extra Controls
What if you don't want the animation applied to *ALL* paths inside your SVG? Add a data attribute of `data-mt="skip"` to any path element and it will draw instantly. So will other SVG shapes (see below).


### Caveats
* The technique only applies to SVG `path` elements with a `stroke` defined. Other SVG primitives, e.g. circles, rectangles, polylines, will render instantly.
* The path elements should sit at the same nesting level within the SVG structure (otherwise, the generated CSS rules will not target correctly). Also, staggered timing is applied to the elements in the order they appear in the SVG. You can edit your SVGs manually, or try [svgo](https://github.com/svg/svgo).
* Remember to specify the `viewBox` on your SVGs, so they can be scaled to any size. By default, the SVG content will expand to fill its container, but you can give it a `width` attribute (either in finite units, or percentage).
