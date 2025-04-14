class Vector3 {

    // 私有属性 x, y, z 分别表示向量的三个坐标分量
    x: number;
    y: number;
    z: number;

    // 私有属性用于标识是否为 Vector3 实例
    private _isVector3: boolean | undefined;

    /**
     * 构造函数，初始化向量的坐标分量
     * @param x - x 坐标，默认为 0
     * @param y - y 坐标，默认为 0
     * @param z - z 坐标，默认为 0
     */
    constructor(x = 0, y = 0, z = 0) {
        Vector3.prototype._isVector3 = true;

        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * 获取是否为 Vector3 实例的标识
     */
    get isVector3() {
        return this._isVector3;
    }

    /**
     * 设置 x 坐标
     * @param x - 新的 x 值
     * @returns 当前向量实例
     */
    setX(x: number) {
        this.x = x;
        return this;
    }

    /**
     * 设置 y 坐标
     * @param y - 新的 y 值
     * @returns 当前向量实例
     */
    setY(y: number) {
        this.y = y;
        return this;
    }

    /**
     * 设置 z 坐标
     * @param z - 新的 z 值
     * @returns 当前向量实例
     */
    setZ(z: number) {
        this.z = z;
        return this;
    }

    /**
     * 将所有坐标分量设置为同一个标量值
     * @param scalar - 标量值
     * @returns 当前向量实例
     */
    setScalar(scalar: number) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        return this;
    }

    /**
     * 同时设置 x, y, z 坐标分量
     * @param x - 新的 x 值
     * @param y - 新的 y 值
     * @param z - 新的 z 值
     * @returns 当前向量实例
     */
    set(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * 根据索引设置对应的坐标分量
     * @param index - 坐标分量索引（0: x, 1: y, 2: z）
     * @param value - 新的值
     * @returns 当前向量实例
     * @throws 当索引超出范围时抛出错误
     */
    setComponent(index: number, value: number) {
        switch (index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            case 2: this.z = value; break;
            default: throw new Error('index is out of range: ' + index);
        }
        return this;
    }

    /**
     * 根据索引获取对应的坐标分量
     * @param index - 坐标分量索引（0: x, 1: y, 2: z）
     * @returns 对应的坐标值
     * @throws 当索引超出范围时抛出错误
     */
    getComponent(index: number) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            default: throw new Error('index is out of range: ' + index);
        }
    }

    /**
     * 复制另一个 Vector3 的坐标分量
     * @param v - 要复制的 Vector3 实例
     * @returns 当前向量实例
     */
    copy(v: Vector3) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }

    /**
     * 将另一个 Vector3 的坐标分量加到当前向量上
     * @param v - 要相加的 Vector3 实例
     * @returns 当前向量实例
     */
    add(v: Vector3) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    /**
     * 将标量值加到当前向量的每个坐标分量上
     * @param scalar - 要相加的标量值
     * @returns 当前向量实例
     */
    addScalar(scalar: number) {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        return this;
    }

    /**
     * 将两个 Vector3 相加后赋值给当前向量
     * @param a - 第一个 Vector3 实例
     * @param b - 第二个 Vector3 实例
     * @returns 当前向量实例
     */
    addVectors(a: Vector3, b: Vector3) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
    }

    /**
     * 将另一个 Vector3 按比例缩放后加到当前向量上
     * @param v - 要相加的 Vector3 实例
     * @param s - 缩放比例
     * @returns 当前向量实例
     */
    addScaledVector(v: Vector3, s: number) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        return this;
    }

    /**
     * 从当前向量中减去另一个 Vector3 的坐标分量
     * @param v - 要相减的 Vector3 实例
     * @returns 当前向量实例
     */
    sub(v: Vector3) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    /**
     * 从当前向量的每个坐标分量中减去一个标量值
     * @param scalar - 要减去的标量值
     * @returns 当前向量实例
     */
    subScalar(scalar: number) {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;
        return this;
    }

    /**
     * 将两个 Vector3 相减后赋值给当前向量
     * @param a - 被减的 Vector3 实例
     * @param b - 减数的 Vector3 实例
     * @returns 当前向量实例
     */
    subVectors(a: Vector3, b: Vector3) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    }

    /**
     * 将另一个 Vector3 的坐标分量逐个相乘
     * @param v - 要相乘的 Vector3 实例
     * @returns 当前向量实例
     */
    multiply(v: Vector3) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }

    /**
     * 将当前向量的每个坐标分量乘以一个标量值
     * @param scalar - 标量值
     * @returns 当前向量实例
     */
    multiplyScalar(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    /**
     * 将两个 Vector3 的坐标分量逐个相乘后赋值给当前向量
     * @param a - 第一个 Vector3 实例
     * @param b - 第二个 Vector3 实例
     * @returns 当前向量实例
     */
    multiplyVectors(a: Vector3, b: Vector3) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    }

    /**
     * 将当前向量应用于 3x3 矩阵
     * @param m - 3x3 矩阵，必须包含 elements 属性
     * @returns 当前向量实例
     */
    applyMatrix3(m: any) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;

        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;

        return this;
    }

    /**
     * 将当前向量应用于 4x4 矩阵
     * @param m - 4x4 矩阵，必须包含 elements 属性
     * @returns 当前向量实例
     */
    applyMatrix4(m: any) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;

        const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

        return this;
    }

    /**
     * 将当前向量的每个坐标分量除以另一个 Vector3 的对应分量
     * @param v - 要相除的 Vector3 实例
     * @returns 当前向量实例
     */
    divide(v: Vector3) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }

    /**
     * 将当前向量的每个坐标分量除以一个标量值
     * @param scalar - 标量值
     * @returns 当前向量实例
     */
    divideScalar(scalar: number) {
        return this.multiplyScalar(1 / scalar);
    }

    /**
     * 将当前向量的每个坐标分量与另一个 Vector3 的对应分量取最小值
     * @param v - 另一个 Vector3 实例
     * @returns 当前向量实例
     */
    min(v: Vector3) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
    }

    /**
     * 将当前向量的每个坐标分量与另一个 Vector3 的对应分量取最大值
     * @param v - 另一个 Vector3 实例
     * @returns 当前向量实例
     */
    max(v: Vector3) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
    }

    /**
     * 将当前向量的每个坐标分量限制在指定的最小值和最大值之间
     * @param min - 最小值 Vector3 实例
     * @param max - 最大值 Vector3 实例
     * @returns 当前向量实例
     */
    clamp(min: Vector3, max: Vector3) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        return this;
    }

    /**
     * 将当前向量的每个坐标分量限制在指定的标量最小值和最大值之间
     * @param minVal - 最小标量值
     * @param maxVal - 最大标量值
     * @returns 当前向量实例
     */
    clampScalar(minVal: number, maxVal: number) {
        const min = new Vector3();
        const max = new Vector3();

        min.set(minVal, minVal, minVal);
        max.set(maxVal, maxVal, maxVal);

        return this.clamp(min, max);
    }

    /**
     * 计算向量的长度（模）
     * @returns 向量的长度
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * 将向量的长度限制在指定的最小值和最大值之间
     * @param min - 最小长度
     * @param max - 最大长度
     * @returns 当前向量实例
     */
    clampLength(min: number, max: number) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }

    /**
     * 将向量的每个坐标分量向下取整
     * @returns 当前向量实例
     */
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }

    /**
     * 将向量的每个坐标分量向上取整
     * @returns 当前向量实例
     */
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }

    /**
     * 将向量的每个坐标分量四舍五入到最接近的整数
     * @returns 当前向量实例
     */
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }

    /**
     * 将向量的每个坐标分量向零取整
     * @returns 当前向量实例
     */
    roundToZero() {
        this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
        return this;
    }

    /**
     * 将向量的每个坐标分量取反
     * @returns 当前向量实例
     */
    negate() {
        this.x = - this.x;
        this.y = - this.y;
        this.z = - this.z;
        return this;
    }

    /**
     * 计算当前向量与另一个向量的点积
     * @param v - 另一个 Vector3 实例
     * @returns 点积结果
     */
    dot(v: Vector3) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    /**
     * 计算向量长度的平方
     * @returns 长度平方
     */
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * 计算向量的曼哈顿长度
     * @returns 曼哈顿长度
     */
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }

    /**
     * 归一化向量，使其长度为 1
     * @returns 当前向量实例
     */
    normalize() {
        return this.divideScalar(this.length() || 1);
    }

    /**
     * 设置向量的长度
     * @param length - 新的长度
     * @returns 当前向量实例
     */
    setLength(length: number) {
        return this.normalize().multiplyScalar(length);
    }

    /**
     * 线性插值当前向量与另一个向量
     * @param v - 目标 Vector3 实例
     * @param alpha - 插值因子（0 到 1 之间）
     * @returns 当前向量实例
     */
    lerp(v: Vector3, alpha: number) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
    }

    /**
     * 线性插值两个向量的结果赋值给当前向量
     * @param v1 - 起始 Vector3 实例
     * @param v2 - 结束 Vector3 实例
     * @param alpha - 插值因子（0 到 1 之间）
     * @returns 当前向量实例
     */
    lerpVectors(v1: Vector3, v2: Vector3, alpha: number) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    }

    /**
     * 计算当前向量与另一个向量的叉积，并赋值给当前向量
     * @param v - 另一个 Vector3 实例
     * @returns 当前向量实例
     */
    cross(v: Vector3) {
        const x = this.x, y = this.y, z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    }

    /**
     * 计算两个向量的叉积，并赋值给当前向量
     * @param a - 第一个 Vector3 实例
     * @param b - 第二个 Vector3 实例
     * @returns 当前向量实例
     */
    crossVectors(a: Vector3, b: Vector3) {
        const ax = a.x, ay = a.y, az = a.z;
        const bx = b.x, by = b.y, bz = b.z;

        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;

        return this;
    }

    /**
     * 将当前向量投影到另一个向量上
     * @param v - 投影的目标 Vector3 实例
     * @returns 当前向量实例
     */
    projectOnVector(v: Vector3) {
        const scalar = v.dot(this) / v.lengthSq();
        return this.copy(v).multiplyScalar(scalar);
    }

    /**
     * 将当前向量投影到一个平面上
     * @param planeNormal - 平面的法向量
     * @returns 当前向量实例
     */
    projectOnPlane(planeNormal: Vector3) {
        const v1 = new Vector3();
        v1.copy(this).projectOnVector(planeNormal);
        return this.sub(v1);
    }

    /**
     * 反射当前向量相对于给定法向量
     * @param normal - 法向量
     * @returns 当前向量实例
     */
    reflect(normal: Vector3) {
        const v1 = new Vector3();
        return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }

    /**
     * 计算当前向量与另一个向量之间的夹角（弧度）
     * @param v - 另一个 Vector3 实例
     * @returns 夹角（弧度）
     */
    angleTo(v: Vector3) {
        const theta = this.dot(v) / Math.sqrt(this.lengthSq() * v.lengthSq());
        return Math.acos(Math.min(Math.max(theta, -1), 1));
    }

    /**
     * 计算当前向量到另一个向量的距离
     * @param v - 目标 Vector3 实例
     * @returns 距离
     */
    distanceTo(v: Vector3) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    /**
     * 计算当前向量到另一个向量的距离平方
     * @param v - 目标 Vector3 实例
     * @returns 距离平方
     */
    distanceToSquared(v: Vector3) {
        const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }

    /**
     * 计算当前向量到另一个向量的曼哈顿距离
     * @param v - 目标 Vector3 实例
     * @returns 曼哈顿距离
     */
    manhattanDistanceTo(v: Vector3) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }

    /**
     * 根据球坐标设置向量的坐标分量
     * @param radius - 半径
     * @param phi - 极角
     * @param theta - 方位角
     * @returns 当前向量实例
     */
    setFromSphericalCoords(radius: number, phi: number, theta: number) {
        const sinPhiRadius = Math.sin(phi) * radius;
        this.x = sinPhiRadius * Math.sin(theta);
        this.y = Math.cos(phi) * radius;
        this.z = sinPhiRadius * Math.cos(theta);
        return this;
    }

    /**
     * 根据球坐标对象设置向量的坐标分量
     * @param s - 包含半径、极角和方位角的对象
     * @returns 当前向量实例
     */
    setFromSpherical(s: any) {
        return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
    }

    /**
     * 根据圆柱坐标设置向量的坐标分量
     * @param radius - 半径
     * @param theta - 方位角
     * @param y - y 坐标
     * @returns 当前向量实例
     */
    setFromCylindricalCoords(radius: number, theta: number, y: number) {
        this.x = radius * Math.sin(theta);
        this.y = y;
        this.z = radius * Math.cos(theta);
        return this;
    }

    /**
     * 根据圆柱坐标对象设置向量的坐标分量
     * @param c - 包含半径、方位角和 y 坐标的对象
     * @returns 当前向量实例
     */
    setFromCylindrical(c: any) {
        return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
    }

    /**
     * 从矩阵中设置向量的位置分量
     * @param m - 包含 elements 属性的矩阵
     * @returns 当前向量实例
     */
    setFromMatrixPosition(m: any) {
        const e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        return this;
    }

    /**
     * 从矩阵的某一列设置向量的坐标分量
     * @param m - 包含 elements 属性的矩阵
     * @param index - 列索引（从 0 开始）
     * @returns 当前向量实例
     */
    setFromMatrixColumn(m: any, index: number) {
        return this.fromArray(m.elements, index * 4);
    }

    /**
     * 从 3x3 矩阵的某一列设置向量的坐标分量
     * @param m - 包含 elements 属性的矩阵
     * @param index - 列索引（从 0 开始）
     * @returns 当前向量实例
     */
    setFromMatrix3Column(m: any, index: number) {
        return this.fromArray(m.elements, index * 3);
    }

    /**
     * 从颜色对象设置向量的坐标分量
     * @param c - 包含 r, g, b 属性的颜色对象
     * @returns 当前向量实例
     */
    setFromColor(c: any) {
        return this.set(c.r, c.g, c.b);
    }

    /**
     * 检查当前向量是否与另一个向量相等
     * @param v - 另一个 Vector3 实例
     * @returns 如果相等则返回 true，否则返回 false
     */
    equals(v: Vector3) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
    }

    /**
     * 从矩阵中提取缩放分量并设置到当前向量
     * @param m - 包含 elements 属性的矩阵
     * @returns 当前向量实例
     */
    setFromMatrixScale(m: any) {
        const sx = this.setFromMatrixColumn(m, 0).length();
        const sy = this.setFromMatrixColumn(m, 1).length();
        const sz = this.setFromMatrixColumn(m, 2).length();

        this.x = sx;
        this.y = sy;
        this.z = sz;

        return this;
    }

    /**
     * 从数组中设置向量的坐标分量
     * @param array - 数组，包含至少三个数字
     * @param offset - 起始索引，默认为 0
     * @returns 当前向量实例
     */
    fromArray(array = [], offset: number = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    }

    /**
     * 将向量的坐标分量转换为数组
     * @param array - 目标数组，默认为空数组
     * @param offset - 起始索引，默认为 0
     * @returns 包含坐标分量的数组
     */
    toArray(array: Array<number> = [], offset: number = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    }

    /**
     * 随机设置向量的坐标分量
     * @returns 当前向量实例
     */
    random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        return this;
    }


    /**
     * 将向量转换为 Float32Array 格式，适用于 WebGL 缓冲区数据。
     * @returns 包含向量分量的 Float32Array。
     */
    toFloat32Array(): Float32Array {
        return new Float32Array([this.x, this.y, this.z]);
    }

    /**
     * 从 Float32Array 设置向量的分量。
     * @param array - 包含向量分量的 Float32Array。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 当前 Vector3 实例。
     */
    fromFloat32Array(array: Float32Array, offset = 0): Vector3 {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    }

    /**
     * 将向量转换为 Float64Array 格式，适用于需要双精度的场景。
     * @returns 包含向量分量的 Float64Array。
     */
    toFloat64Array(): Float64Array {
        return new Float64Array([this.x, this.y, this.z]);
    }

    /**
     * 从 Float64Array 设置向量的分量。
     * @param array - 包含向量分量的 Float64Array。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 当前 Vector3 实例。
     */
    fromFloat64Array(array: Float64Array, offset = 0): Vector3 {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    }

    /**
     * 使向量可迭代，依次返回 x, y, z 分量
     */
    *[ Symbol.iterator ]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }

    /**
     * 将向量转换为字符串表示形式
     * @returns 向量的字符串表示，如 "(x, y, z)"
     */
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

}

export { Vector3 };
