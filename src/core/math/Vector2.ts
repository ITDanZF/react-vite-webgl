import { clamp } from "@/core/math/MathUtils.ts";

/**
 * Vector2 类用于表示二维向量，并提供各种向量操作方法。
 */
class Vector2 {

    private x: number;
    private y: number;
    private _isVector2: boolean | undefined;

    /**
     * 创建一个新的 Vector2 实例。
     * @param x - 向量的 x 分量，默认为 0。
     * @param y - 向量的 y 分量，默认为 0。
     */
    constructor(x = 0, y = 0) {
        Vector2.prototype._isVector2 = true;
        this.x = x;
        this.y = y;
    }

    /**
     * 设置向量的 x 和 y 分量。
     * @param x - 新的 x 分量。
     * @param y - 新的 y 分量。
     * @returns 当前 Vector2 实例。
     */
    set(x: number, y: number): Vector2 {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * 设置向量的 x 分量。
     * @param x - 新的 x 分量。
     * @returns 当前 Vector2 实例。
     */
    setX(x: number): Vector2 {
        this.x = x;
        return this;
    }

    /**
     * 设置向量的 y 分量。
     * @param y - 新的 y 分量。
     * @returns 当前 Vector2 实例。
     */
    setY(y: number): Vector2 {
        this.y = y;
        return this;
    }

    /**
     * 将向量的所有分量设置为相同的标量值。
     * @param scalar - 标量值。
     * @returns 当前 Vector2 实例。
     */
    setScalar(scalar: number): Vector2 {
        this.x = scalar;
        this.y = scalar;
        return this;
    }

    /**
     * 获取是否为 Vector2 实例的标识。
     */
    get isVector2() {
        return this._isVector2;
    }

    /**
     * 获取向量的宽度（即 x 分量）。
     */
    get width() {
        return this.x;
    }

    /**
     * 设置向量的宽度（即 x 分量）。
     * @param value - 新的宽度值。
     */
    set width(value: number) {
        this.x = value;
    }

    /**
     * 获取向量的高度（即 y 分量）。
     */
    get height() {
        return this.y;
    }

    /**
     * 设置向量的高度（即 y 分量）。
     * @param value - 新的高度值。
     */
    set height(value: number) {
        this.y = value;
    }

    /**
     * 设置向量指定索引的分量。
     * @param index - 分量索引（0 表示 x，1 表示 y）。
     * @param value - 新的分量值。
     * @returns 当前 Vector2 实例。
     * @throws 如果索引超出范围则抛出错误。
     */
    setComponent(index: number, value: number) {
        switch (index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error('index is out of range: ' + index);
        }
        return this;
    }

    /**
     * 获取向量指定索引的分量。
     * @param index - 分量索引（0 表示 x，1 表示 y）。
     * @returns 指定的分量值。
     * @throws 如果索引超出范围则抛出错误。
     */
    getComponent(index: number) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('index is out of range: ' + index);
        }
    }

    /**
     * 克隆当前向量，返回一个新的 Vector2 实例。
     * @returns 新的 Vector2 实例。
     */
    clone(): Vector2 {
        return new (this.constructor as typeof Vector2)(this.x, this.y);
    }

    /**
     * 将另一个向量的值复制到当前向量。
     * @param v - 要复制的 Vector2 实例。
     * @returns 当前 Vector2 实例。
     */
    copy(v: Vector2): Vector2 {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    /**
     * 将另一个向量加到当前向量上。
     * @param v - 要相加的 Vector2 实例。
     * @returns 当前 Vector2 实例。
     */
    add(v: Vector2): Vector2 {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * 将标量值加到当前向量的每个分量上。
     * @param s - 标量值。
     * @returns 当前 Vector2 实例。
     */
    addScalar(s: number): Vector2 {
        this.x += s;
        this.y += s;
        return this;
    }

    /**
     * 将两个向量相加并设置为当前向量的值。
     * @param a - 第一个 Vector2 实例。
     * @param b - 第二个 Vector2 实例。
     * @returns 当前 Vector2 实例。
     */
    addVectors(a: Vector2, b: Vector2): Vector2 {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }

    /**
     * 将一个向量乘以标量并加到当前向量上。
     * @param v - 要乘以标量的 Vector2 实例。
     * @param s - 标量值。
     * @returns 当前 Vector2 实例。
     */
    addScaledVector(v: Vector2, s: number): Vector2 {
        this.x += v.x * s;
        this.y += v.y * s;
        return this;
    }

    /**
     * 从当前向量中减去另一个向量。
     * @param v - 要减去的 Vector2 实例。
     * @returns 当前 Vector2 实例。
     */
    sub(v: Vector2): Vector2 {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * 从当前向量的每个分量中减去标量值。
     * @param s - 标量值。
     * @returns 当前 Vector2 实例。
     */
    subScalar(s: number): Vector2 {
        this.x -= s;
        this.y -= s;
        return this;
    }

    /**
     * 将两个向量相减并设置为当前向量的值。
     * @param a - 被减的 Vector2 实例。
     * @param b - 减去的 Vector2 实例。
     * @returns 当前 Vector2 实例。
     */
    subVectors(a: Vector2, b: Vector2): Vector2 {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }

    /**
     * 将当前向量与另一个向量相乘（逐分量相乘）。
     * @param v - 要相乘的 Vector2 实例。
     * @returns 当前 Vector2 实例。
     */
    multiply(v: Vector2): Vector2 {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    /**
     * 将当前向量的每个分量乘以标量值。
     * @param scalar - 标量值。
     * @returns 当前 Vector2 实例。
     */
    multiplyScalar(scalar: number): Vector2 {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    applyMatrix3(m: any) {
        const x = this.x, y = this.y;
        const e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6];
        this.y = e[1] * x + e[4] * y + e[7];
        return this;
    }

    /**
     * 将当前向量与另一个向量相除（逐分量相除）。
     * @param v - 要相除的 Vector2 实例。
     * @returns 当前 Vector2 实例。
     */
    divide(v: Vector2): Vector2 {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    /**
     * 将当前向量的每个分量除以标量值。
     * @param scalar - 标量值。
     * @returns 当前 Vector2 实例。
     */
    divideScalar(scalar: number): Vector2 {
        return this.multiplyScalar(1 / scalar);
    }

    /**
     * 将当前向量的每个分量与另一个向量的对应分量取最小值。
     * @param v - 参考的 Vector2 实例。
     * @returns 当前 Vector2 实例。
     */
    min(v: Vector2): Vector2 {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        return this;
    }

    /**
     * 将当前向量的每个分量与另一个向量的对应分量取最大值。
     * @param v - 参考的 Vector2 实例。
     * @returns 当前 Vector2 实例。
     */
    max(v: Vector2): Vector2 {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }

    /**
     * 将当前向量的每个分量限制在指定的最小值和最大值之间。
     * @param min - 最小值 Vector2 实例。
     * @param max - 最大值 Vector2 实例。
     * @returns 当前 Vector2 实例。
     */
    clamp(min: Vector2, max: Vector2): Vector2 {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        return this;
    }

    /**
     * 将当前向量的每个分量限制在指定的标量最小值和最大值之间。
     * @param minVal - 最小标量值。
     * @param maxVal - 最大标量值。
     * @returns 当前 Vector2 实例。
     */
    clampScalar(minVal: number, maxVal: number): Vector2 {
        this.x = clamp(this.x, minVal, maxVal);
        this.y = clamp(this.y, minVal, maxVal);
        return this;
    }

    /**
     * 将当前向量的长度限制在指定的最小值和最大值之间。
     * @param min - 最小长度。
     * @param max - 最大长度。
     * @returns 当前 Vector2 实例。
     */
    clampLength(min: number, max: number): Vector2 {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
    }

    /**
     * 计算向量的长度（模）。
     * @returns 向量的长度。
     */
    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * 将向量的每个分量向下取整。
     * @returns 当前 Vector2 实例。
     */
    floor(): Vector2 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    /**
     * 将向量的每个分量向上取整。
     * @returns 当前 Vector2 实例。
     */
    ceil(): Vector2 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    /**
     * 将向量的每个分量四舍五入到最接近的整数。
     * @returns 当前 Vector2 实例。
     */
    round(): Vector2 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    /**
     * 将向量的每个分量四舍五入到零方向。
     * @returns 当前 Vector2 实例。
     */
    roundToZero(): Vector2 {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        return this;
    }

    /**
     * 将向量的每个分量取反。
     * @returns 当前 Vector2 实例。
     */
    negate(): Vector2 {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     * 计算当前向量与另一个向量的点积。
     * @param v - 另一个 Vector2 实例。
     * @returns 点积结果。
     */
    dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * 计算当前向量与另一个向量的叉积（仅二维）。
     * @param v - 另一个 Vector2 实例。
     * @returns 叉积结果。
     */
    cross(v: Vector2): number {
        return this.x * v.y - this.y * v.x;
    }

    /**
     * 计算向量长度的平方。
     * @returns 长度平方。
     */
    lengthSq(): number {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * 计算向量的曼哈顿长度。
     * @returns 曼哈顿长度。
     */
    manhattanLength(): number {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    /**
     * 将向量标准化为单位向量。
     * @returns 当前 Vector2 实例。
     */
    normalize(): Vector2 {
        return this.divideScalar(this.length() || 1);
    }

    /**
     * 计算向量的角度（弧度）。
     * @returns 向量的角度。
     */
    angle(): number {
        return Math.atan2(-this.y, -this.x) + Math.PI;
    }

    /**
     * 计算当前向量与另一个向量之间的角度。
     * @param v - 另一个 Vector2 实例。
     * @returns 两个向量之间的角度（弧度）。
     */
    angleTo(v: Vector2): number {
        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
        if (denominator === 0) return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        return Math.acos(Math.max(-1, Math.min(1, theta)));
    }

    /**
     * 计算当前向量与另一个向量之间距离的平方。
     * @param v - 另一个 Vector2 实例。
     * @returns 距离平方。
     */
    distanceToSquared(v: Vector2): number {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return dx * dx + dy * dy;
    }

    /**
     * 计算当前向量与另一个向量之间的距离。
     * @param v - 另一个 Vector2 实例。
     * @returns 距离。
     */
    distanceTo(v: Vector2): number {
        return Math.sqrt(this.distanceToSquared(v));
    }

    /**
     * 计算当前向量与另一个向量之间的曼哈顿距离。
     * @param v - 另一个 Vector2 实例。
     * @returns 曼哈顿距离。
     */
    manhattanDistanceTo(v: Vector2): number {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
    }

    /**
     * 设置向量的长度为指定值。
     * @param length - 新的长度。
     * @returns 当前 Vector2 实例。
     */
    setLength(length: number): Vector2 {
        return this.normalize().multiplyScalar(length);
    }

    /**
     * 线性插值当前向量与另一个向量。
     * @param v - 目标 Vector2 实例。
     * @param alpha - 插值因子（0 到 1 之间）。
     * @returns 当前 Vector2 实例。
     */
    lerp(v: Vector2, alpha: number): Vector2 {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }

    /**
     * 线性插值两个向量并设置为当前向量的值。
     * @param v1 - 起始 Vector2 实例。
     * @param v2 - 目标 Vector2 实例。
     * @param alpha - 插值因子（0 到 1 之间）。
     * @returns 当前 Vector2 实例。
     */
    lerpVectors(v1: Vector2, v2: Vector2, alpha: number): Vector2 {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    }

    /**
     * 判断当前向量是否等于另一个向量。
     * @param v - 另一个 Vector2 实例。
     * @returns 如果相等则返回 true，否则返回 false。
     */
    equals(v: Vector2): boolean {
        return (v.x === this.x) && (v.y === this.y);
    }

    /**
     * 从数组中设置向量的分量。
     * @param array - 包含向量分量的数组。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 当前 Vector2 实例。
     */
    fromArray(array: Array<number>, offset = 0): Vector2 {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }

    /**
     * 将向量的分量转换为数组。
     * @param array - 目标数组，默认为空数组。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 包含向量分量的数组。
     */
    toArray(array: Array<number> = [], offset = 0): Array<number> {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    }

    /**
     * 从缓冲属性中设置向量的分量。
     * @param attribute - 缓冲属性对象，需具有 getX 和 getY 方法。
     * @param index - 索引位置。
     * @returns 当前 Vector2 实例。
     */
    fromBufferAttribute(attribute: any, index: number): Vector2 {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        return this;
    }

    /**
     * 围绕指定中心点旋转向量。
     * @param center - 旋转中心点。
     * @param angle - 旋转角度（弧度）。
     * @returns 当前 Vector2 实例。
     */
    rotateAround(center: Vector2, angle: number): Vector2 {
        const c = Math.cos(angle), s = Math.sin(angle);
        const x = this.x - center.x;
        const y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }

    /**
     * 将向量的分量随机化为 [0, 1) 之间的值。
     * @returns 当前 Vector2 实例。
     */
    random(): Vector2 {
        this.x = Math.random();
        this.y = Math.random();
        return this;
    }

    /**
     * 将向量转换为 Float32Array 格式，适用于 WebGL 缓冲区数据。
     * @returns 包含向量分量的 Float32Array。
     */
    toFloat32Array(): Float32Array {
        return new Float32Array([this.x, this.y]);
    }

    /**
     * 从 Float32Array 设置向量的分量。
     * @param array - 包含向量分量的 Float32Array。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 当前 Vector2 实例。
     */
    fromFloat32Array(array: Float32Array, offset = 0): Vector2 {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }

    /**
     * 将向量转换为 Float64Array 格式，适用于需要双精度的场景。
     * @returns 包含向量分量的 Float64Array。
     */
    toFloat64Array(): Float64Array {
        return new Float64Array([this.x, this.y]);
    }

    /**
     * 从 Float64Array 设置向量的分量。
     * @param array - 包含向量分量的 Float64Array。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 当前 Vector2 实例。
     */
    fromFloat64Array(array: Float64Array, offset = 0): Vector2 {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }

    /**
     * 将向量转换为字符串表示。
     * @param precision - 小数点精度，默认为 2。
     * @returns 向量的字符串表示，例如 "(1.00, 2.00)"。
     */
    toString(precision = 2): string {
        return `(${this.x.toFixed(precision)}, ${this.y.toFixed(precision)})`;
    }

    /**
     * 使 Vector2 实例可迭代，按顺序迭代 x 和 y 分量。
     */
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }

}

export { Vector2 };
