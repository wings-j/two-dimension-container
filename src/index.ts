/**
 * 二维容器
 */

/**
 * 矩阵
 */
class Matrix {
  r: number
  c: number;
  [index: number]: number[]

  /**
   * 构造方法
   * @description 行向量表示。row * column
   * @param row 行数
   * @param column 列数
   * @param value 值
   */
  constructor(row: number, column: number, value?: number[][]) {
    this.r = row
    this.c = column

    for (let i = 0; i < row; i++) {
      this[i] = []
    }

    if (value) {
      for (let i = 0; i < this.r; i++) {
        for (let j = 0; j < this.c; j++) {
          this[i][j] = value[i][j] ?? this[i][j]
        }
      }
    }
  }

  /**
   * 乘-点乘
   * @param other 矩阵
   * @return 结果
   */
  multiplyD(other: Matrix) {
    let result = new Matrix(this.r, other.c)
    let n = this.c
    for (let i = 0; i < result.r; i++) {
      for (let j = 0; j < result.c; j++) {
        let value = 0
        for (let k = 0; k < n; k++) {
          value += this[i][k] * other[k][j]
        }
        result[i][j] = value
      }
    }

    return result
  }
}

/**
 * 配置
 */
interface Config {
  translate: boolean
  scale: boolean
  translateSpeed: number
  scaleSpeed: number
  animate: boolean
  animateDuration: number
}

/**
 * 地图
 */
class TwoDimensionContainer {
  $container: HTMLElement
  $content: HTMLElement
  private $translate: HTMLElement
  private $scale: HTMLElement
  private config = {
    translate: true,
    scale: true,
    translateSpeed: 2,
    scaleSpeed: 1,
    animate: false,
    animateDuration: 500
  } as Config
  private x = 0
  private y = 0
  private s = 1
  private moveDelta = 0

  get state() {
    return {
      x: this.x,
      y: this.y,
      s: this.s
    }
  }

  /**
   * 构造方法
   * @param width 宽度。CSS
   * @param height 高度。CSS
   * @param translate 可移动
   * @param scale 可缩放
   * @param translateSpeed 平移速度
   * @param scaleSpeed 缩放速度
   * @param scale 可缩放
   * @param animate 动画
   * @param animateDuration 动画周期
   */
  constructor(width?: string, height?: string, config?: Partial<Config>) {
    Object.assign(this.config, config)

    let $container = document.createElement('div')
    $container.style.overflow = 'hidden'
    $container.style.position = 'relative'
    $container.style.width = width ?? ''
    $container.style.height = height ?? ''
    $container.addEventListener('mousemove', this.handle_move.bind(this))
    $container.addEventListener('click', this.handle_click.bind(this), true)
    $container.addEventListener('wheel', this.handle_wheel.bind(this))

    let $translate = document.createElement('div')
    $translate.id = 'two-dimension-container_$translate'
    $translate.style.transformOrigin = '0 0'
    $translate.style.width = '0'
    $translate.style.height = '0'
    if (this.config.animate) {
      $translate.addEventListener('transitionend', () => {
        $translate.style.transition = 'none'
      })
    }

    let $scale = document.createElement('div')
    $scale.id = 'two-dimension-container_$scale'
    $scale.style.transformOrigin = '0 0'
    $scale.style.width = '0'
    $scale.style.height = '0'
    if (this.config.animate) {
      $scale.addEventListener('transitionend', () => {
        $scale.style.transition = 'none'
      })
    }

    let $content = document.createElement('div')
    $content.style.width = 'max-content'
    $content.style.height = 'max-content'

    $container.appendChild($translate)
    $translate.appendChild($scale)
    $scale.appendChild($content)

    this.$container = $container
    this.$translate = $translate
    this.$scale = $scale
    this.$content = $content
  }

  /**
   * 处理鼠标拖动
   * @param ev 事件对象
   */
  private handle_move(ev: MouseEvent) {
    if (this.config.translate) {
      if (ev.buttons === 1) {
        this.x += (ev.movementX / this.s) * this.config.translateSpeed
        this.y += (ev.movementY / this.s) * this.config.translateSpeed

        this.moveDelta += Math.abs(ev.movementX + ev.movementY)

        this.translate()
      }
    }
  }
  /**
   * 处理鼠标抬起
   * @description 阻止拖动时点击
   * @param ev 事件对象
   */
  private handle_click(ev: MouseEvent) {
    if (this.moveDelta > 10) {
      ev.preventDefault()
      ev.stopPropagation()
    }

    this.moveDelta = 0
  }
  /**
   * 处理鼠标滚轮
   * @param ev 事件对象
   */
  private handle_wheel(ev: WheelEvent) {
    if (this.config.scale) {
      let delta = -(ev.deltaY / 2000) * this.config.scaleSpeed

      this.s *= 1 + delta

      this.origin(delta, ev.clientX, ev.clientY)
      this.scale()
    }
  }

  /**
   * 平移
   */
  private translate() {
    this.$translate.style.transform = `translate(${this.x}px, ${this.y}px)`
  }
  /**
   * 缩放原点
   * @param delta 缩放系数变化量
   * @param ox 缩放中心横坐标
   * @param oy 缩放中心纵坐标
   */
  private origin(delta: number, ox: number, oy: number) {
    let v = new Matrix(1, 3, [[this.x, this.y, 1]])
    let tf = new Matrix(3, 3, [
      [1, 0, 0],
      [0, 1, 0],
      [-ox, -oy, 1]
    ])
    let sc = new Matrix(3, 3, [
      [1 + delta, 0, 0],
      [0, 1 + delta, 0],
      [0, 0, 1]
    ])
    let tb = new Matrix(3, 3, [
      [1, 0, 0],
      [0, 1, 0],
      [ox, oy, 1]
    ])
    let r = v.multiplyD(tf).multiplyD(sc).multiplyD(tb)

    this.x = r[0][0]
    this.y = r[0][1]
    this.translate()
  }
  /**
   * 缩放
   */
  private scale() {
    this.$scale.style.transform = `scale(${this.s})`
  }

  /**
   * 移动
   * @param ax 横坐标绝对量
   * @param ay 纵坐标绝对量
   */
  translateTo(ax: number, ay: number) {
    this.x = ax ?? this.x
    this.y = ay ?? this.y

    if (this.config.animate) {
      this.$translate.style.transition = `transform ${this.config.animateDuration / 1000}s`
    }

    this.translate()
  }
  /**
   * 移动
   * @param dx 横坐标偏移量
   * @param dy 纵坐标偏移量
   */
  translateBy(dx: number, dy: number) {
    this.x += dx ?? 0
    this.y += dy ?? 0

    if (this.config.animate) {
      this.$translate.style.transition = `transform ${this.config.animateDuration / 1000}s`
    }

    this.translate()
  }
  /**
   * 缩放
   * @param as 系数绝对量
   */
  scaleTo(as: number) {
    this.s = as ?? this.s

    if (this.config.animate) {
      this.$scale.style.transition = `transform ${this.config.animateDuration / 1000}s`
    }

    this.scale()
  }
  /**
   * 缩放
   * @param ds 系数偏移量
   */
  scaleBy(ds: number) {
    this.s += ds ?? 0

    if (this.config.animate) {
      this.$scale.style.transition = `transform ${this.config.animateDuration / 1000}s`
    }

    this.scale()
  }
}

export default TwoDimensionContainer
