# twe-dimension-container

2D container. Drag and scale in a fixed space.

## Demo

[https://wings-j.github.io/two-dimension-container](https://wings-j.github.io/two-dimension-container/)

## Usage

Install：

```sh
npm install --save-dev @wings-j/two-dimensional-container
```

Example：

```js
import TwoDimensionContainer from '@wings-j/two-dimensional-container'

let container = new TwoDimensionContainer('100%', '100%', { animate: true })
container.translateTo(window.innerWidth / 2, window.innerHeight / 2)
document.body.appendChild(container.$container)

let div = document.createElement('div')
container.$content.appendChild(div)
```

# API

## Constructor

`constructor(width?: string, height?: string, config?: Partial<Config>)`

- width: width of the container
- height: height of the container
- config：
  - translate: draggable
  - scale: scalable
  - translateSpeed: speed of translating
  - scaleSpeed: speed of scaling
  - animate: zoom with animations
  - animateDuration: animation duration

## Members

### `$container: HTMLElement`

Container element.

### `$content: HTMLElement`

Content element.

### `state: {x: number, y: number, s: number}`

Current position and scale factor

### `translateTo(ax: number, ay: number): void`

Absolute translate.

Parameters:

- ax：absolute value of x
- ay：absolute value of y

### `translateBy(dx: number, dy: number): void`

Relative translate.

Parameters:

- ax：relative value of x
- ay：relative value of y

### `scaleTo(as: number): void`

Absolute scale.

Parameters:

- ax：absolute factor

### `scaleBy(as: number): void`

Relative scale

Parameters:

- ax：relative factor
