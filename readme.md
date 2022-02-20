二维容器，在固定空间内的拖拽和缩放。

# 示例

[Demo]()

# 使用方法

安装：

```sh
npm install --save-dev @wings-j/two-dimensional-container
```

示例：

```js
import TwoDimensionContainer from '@wings-j/two-dimensional-container'

let container = new TwoDimensionContainer('100%', '100%', { animate: true })
container.translateTo(window.innerWidth / 2, window.innerHeight / 2)
document.body.appendChild(container.$container)

let div = document.createElement('div')
container.$content.appendChild(div)
```

# API

## 成员变量

### `$container`

容器

- 类型：HTMLElement

### `$content`

内容

- 类型：HTMLElement

## 成员方法

### `translateTo(ax: number, ay: number): void`

绝对平移

- 参数
  - ax：横坐标绝对量
  - ay：纵坐标绝对量

### `translateBy(dx: number, dy: number): void`

相对平移

- 参数

  - dx：横坐标相对量
  - dy：纵坐标相对量

### `scaleTo(as: number): void`

绝对缩放

- 参数
  - ax：系数绝对量

### `scaleBy(as: number): void`

相对缩放

- 参数
  - ax：系数相对量
