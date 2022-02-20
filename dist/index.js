import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _bindInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/bind";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";

/**
 * 二维容器
 */

/**
 * 矩阵
 */
var Matrix = /*#__PURE__*/function () {
  /**
   * 构造方法
   * @description 行向量表示。row * column
   * @param row 行数
   * @param column 列数
   * @param value 值
   */
  function Matrix(row, column, value) {
    _classCallCheck(this, Matrix);

    _defineProperty(this, "r", void 0);

    _defineProperty(this, "c", void 0);

    this.r = row;
    this.c = column;

    for (var i = 0; i < row; i++) {
      this[i] = [];
    }

    if (value) {
      for (var _i = 0; _i < this.r; _i++) {
        for (var j = 0; j < this.c; j++) {
          var _value$_i$j;

          this[_i][j] = (_value$_i$j = value[_i][j]) !== null && _value$_i$j !== void 0 ? _value$_i$j : this[_i][j];
        }
      }
    }
  }
  /**
   * 乘-点乘
   * @param other 矩阵
   * @return 结果
   */


  _createClass(Matrix, [{
    key: "multiplyD",
    value: function multiplyD(other) {
      var result = new Matrix(this.r, other.c);
      var n = this.c;

      for (var i = 0; i < result.r; i++) {
        for (var j = 0; j < result.c; j++) {
          var value = 0;

          for (var k = 0; k < n; k++) {
            value += this[i][k] * other[k][j];
          }

          result[i][j] = value;
        }
      }

      return result;
    }
  }]);

  return Matrix;
}();
/**
 * 地图
 */


var TwoDimensionContainer = /*#__PURE__*/function () {
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
  function TwoDimensionContainer(width, height, config) {
    var _context, _context2, _context3;

    _classCallCheck(this, TwoDimensionContainer);

    _defineProperty(this, "$container", void 0);

    _defineProperty(this, "$content", void 0);

    _defineProperty(this, "$translate", void 0);

    _defineProperty(this, "$scale", void 0);

    _defineProperty(this, "config", {
      translate: true,
      scale: true,
      translateSpeed: 2,
      scaleSpeed: 1,
      animate: false,
      animateDuration: 500
    });

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "s", 1);

    _defineProperty(this, "moveDelta", 0);

    _Object$assign(this.config, config);

    var $container = document.createElement('div');
    $container.style.overflow = 'hidden';
    $container.style.position = 'relative';
    $container.style.width = width !== null && width !== void 0 ? width : '';
    $container.style.height = height !== null && height !== void 0 ? height : '';
    $container.addEventListener('mousemove', _bindInstanceProperty(_context = this.handle_move).call(_context, this));
    $container.addEventListener('click', _bindInstanceProperty(_context2 = this.handle_click).call(_context2, this), true);
    $container.addEventListener('wheel', _bindInstanceProperty(_context3 = this.handle_wheel).call(_context3, this));
    var $translate = document.createElement('div');
    $translate.id = 'two-dimension-container_$translate';
    $translate.style.transformOrigin = '0 0';
    $translate.style.width = '0';
    $translate.style.height = '0';

    if (this.config.animate) {
      $translate.addEventListener('transitionend', function () {
        $translate.style.transition = 'none';
      });
    }

    var $scale = document.createElement('div');
    $scale.id = 'two-dimension-container_$scale';
    $scale.style.transformOrigin = '0 0';
    $scale.style.width = '0';
    $scale.style.height = '0';

    if (this.config.animate) {
      $scale.addEventListener('transitionend', function () {
        $scale.style.transition = 'none';
      });
    }

    var $content = document.createElement('div');
    $content.style.width = 'max-content';
    $content.style.height = 'max-content';
    $container.appendChild($translate);
    $translate.appendChild($scale);
    $scale.appendChild($content);
    this.$container = $container;
    this.$translate = $translate;
    this.$scale = $scale;
    this.$content = $content;
  }
  /**
   * 处理鼠标拖动
   * @param ev 事件对象
   */


  _createClass(TwoDimensionContainer, [{
    key: "state",
    get: function get() {
      return {
        x: this.x,
        y: this.y,
        s: this.s
      };
    }
  }, {
    key: "handle_move",
    value: function handle_move(ev) {
      if (this.config.translate) {
        if (ev.buttons === 1) {
          this.x += ev.movementX / this.s * this.config.translateSpeed;
          this.y += ev.movementY / this.s * this.config.translateSpeed;
          this.moveDelta += Math.abs(ev.movementX + ev.movementY);
          this.translate();
        }
      }
    }
    /**
     * 处理鼠标抬起
     * @description 阻止拖动时点击
     * @param ev 事件对象
     */

  }, {
    key: "handle_click",
    value: function handle_click(ev) {
      if (this.moveDelta > 10) {
        ev.preventDefault();
        ev.stopPropagation();
      }

      this.moveDelta = 0;
    }
    /**
     * 处理鼠标滚轮
     * @param ev 事件对象
     */

  }, {
    key: "handle_wheel",
    value: function handle_wheel(ev) {
      if (this.config.scale) {
        var delta = -(ev.deltaY / 2000) * this.config.scaleSpeed;
        this.s *= 1 + delta;
        this.origin(delta, ev.clientX, ev.clientY);
        this.scale();
      }
    }
    /**
     * 平移
     */

  }, {
    key: "translate",
    value: function translate() {
      var _context4;

      this.$translate.style.transform = _concatInstanceProperty(_context4 = "translate(".concat(this.x, "px, ")).call(_context4, this.y, "px)");
    }
    /**
     * 缩放原点
     * @param delta 缩放系数变化量
     * @param ox 缩放中心横坐标
     * @param oy 缩放中心纵坐标
     */

  }, {
    key: "origin",
    value: function origin(delta, ox, oy) {
      var v = new Matrix(1, 3, [[this.x, this.y, 1]]);
      var tf = new Matrix(3, 3, [[1, 0, 0], [0, 1, 0], [-ox, -oy, 1]]);
      var sc = new Matrix(3, 3, [[1 + delta, 0, 0], [0, 1 + delta, 0], [0, 0, 1]]);
      var tb = new Matrix(3, 3, [[1, 0, 0], [0, 1, 0], [ox, oy, 1]]);
      var r = v.multiplyD(tf).multiplyD(sc).multiplyD(tb);
      this.x = r[0][0];
      this.y = r[0][1];
      this.translate();
    }
    /**
     * 缩放
     */

  }, {
    key: "scale",
    value: function scale() {
      this.$scale.style.transform = "scale(".concat(this.s, ")");
    }
    /**
     * 移动
     * @param ax 横坐标绝对量
     * @param ay 纵坐标绝对量
     */

  }, {
    key: "translateTo",
    value: function translateTo(ax, ay) {
      this.x = ax !== null && ax !== void 0 ? ax : this.x;
      this.y = ay !== null && ay !== void 0 ? ay : this.y;

      if (this.config.animate) {
        this.$translate.style.transition = "transform ".concat(this.config.animateDuration / 1000, "s");
      }

      this.translate();
    }
    /**
     * 移动
     * @param dx 横坐标偏移量
     * @param dy 纵坐标偏移量
     */

  }, {
    key: "translateBy",
    value: function translateBy(dx, dy) {
      this.x += dx !== null && dx !== void 0 ? dx : 0;
      this.y += dy !== null && dy !== void 0 ? dy : 0;

      if (this.config.animate) {
        this.$translate.style.transition = "transform ".concat(this.config.animateDuration / 1000, "s");
      }

      this.translate();
    }
    /**
     * 缩放
     * @param as 系数绝对量
     */

  }, {
    key: "scaleTo",
    value: function scaleTo(as) {
      this.s = as !== null && as !== void 0 ? as : this.s;

      if (this.config.animate) {
        this.$scale.style.transition = "transform ".concat(this.config.animateDuration / 1000, "s");
      }

      this.scale();
    }
    /**
     * 缩放
     * @param ds 系数偏移量
     */

  }, {
    key: "scaleBy",
    value: function scaleBy(ds) {
      this.s += ds !== null && ds !== void 0 ? ds : 0;

      if (this.config.animate) {
        this.$scale.style.transition = "transform ".concat(this.config.animateDuration / 1000, "s");
      }

      this.scale();
    }
  }]);

  return TwoDimensionContainer;
}();

export { TwoDimensionContainer as default };
