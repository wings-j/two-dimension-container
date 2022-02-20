/**
 * 二维容器
 */
/**
 * 配置
 */
interface Config {
    translate: boolean;
    scale: boolean;
    translateSpeed: number;
    scaleSpeed: number;
    animate: boolean;
    animateDuration: number;
}
/**
 * 地图
 */
declare class TwoDimensionContainer {
    $container: HTMLElement;
    $content: HTMLElement;
    private $translate;
    private $scale;
    private config;
    private x;
    private y;
    private s;
    private moveDelta;
    get state(): {
        x: number;
        y: number;
        s: number;
    };
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
    constructor(width?: string, height?: string, config?: Partial<Config>);
    /**
     * 处理鼠标拖动
     * @param ev 事件对象
     */
    private handle_move;
    /**
     * 处理鼠标抬起
     * @description 阻止拖动时点击
     * @param ev 事件对象
     */
    private handle_click;
    /**
     * 处理鼠标滚轮
     * @param ev 事件对象
     */
    private handle_wheel;
    /**
     * 平移
     */
    private translate;
    /**
     * 缩放原点
     * @param delta 缩放系数变化量
     * @param ox 缩放中心横坐标
     * @param oy 缩放中心纵坐标
     */
    private origin;
    /**
     * 缩放
     */
    private scale;
    /**
     * 移动
     * @param ax 横坐标绝对量
     * @param ay 纵坐标绝对量
     */
    translateTo(ax: number, ay: number): void;
    /**
     * 移动
     * @param dx 横坐标偏移量
     * @param dy 纵坐标偏移量
     */
    translateBy(dx: number, dy: number): void;
    /**
     * 缩放
     * @param as 系数绝对量
     */
    scaleTo(as: number): void;
    /**
     * 缩放
     * @param ds 系数偏移量
     */
    scaleBy(ds: number): void;
}
export default TwoDimensionContainer;
