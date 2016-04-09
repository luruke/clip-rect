# clip-rect
`clip-rect` is an helper to create clip rect animation with Greensock.

Clip animations are nice, but sometimes they are hard to manage; `clip-path: inset()` is not supported everywhere, and `clip: rect()` is painful to handle and it doesn't supports percentage values.

This little helper aims to make rect animations easier w/Greensock GSAP.


# Usage
```
npm install clip-rect
```

```javascript
new ClipRect(HTMLElement[, options]);
```
It returns a GSAP `TweenLite.to` call which can be used in GSAP timelines.

`options` is an optional argument which can contain an object with different options:

| Value        | Default           | Description  |
| :------------- |:-------------| :-----|
| duration      | 0.4 | Duration of the tween (in seconds) |
| ease      | TweenLite.defaultEase      |   GSAP easing function |
| from | ClipRect.RIGHT      |    Direction of the start of the tweening |
| to | ClipRect.LEFT      |    Direction of the start of the tweening |
| clearProps | true      |    Whether remove the inline style after the animation |
| reverse | false      |    Reverse the animation (for animateOut) |

# Example
```javascript
var el = document.getElementById('box');

new ClipRect(el, {
    from: ClipRect.RIGHT,
    to: ClipRect.LEFT,
    duration: 1,
    reverse: true,
    clearProps: false
 });
```

# Example with timeline
```javascript
var el = document.getElementById('box');
var tl = new TimelineLite();

tl.to(el, 1, { backgroundColor: 'blue' });

tl.add(new ClipRect(el, {
  from: ClipRect.TOP,
  to: ClipRect.BOTTOM,
  duration: 1,
  reverse: true,
  clearProps: false
}));

tl.add(new ClipRect(el, {
  from: ClipRect.LEFT,
  to: ClipRect.RIGHT,
  duration: 1
}));

tl.add(new ClipRect(el, {
  from: ClipRect.TOP,
  to: ClipRect.BOTTOM,
  reverse: true,
  clearProps: false
}));
```
