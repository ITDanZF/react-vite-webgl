/**
 * Matrix2 类用于表示二维矩阵，并提供基本的矩阵操作方法。
 */
export class Matrix2 {

    /**
     * 用于标识对象是否为 Matrix2 实例。
     */
    public isMatrix2: boolean | undefined;

    /**
     * 存储矩阵元素的数组，以列优先顺序存储：
     * [ n11, n21, n12, n22 ]
     */
    public elements: number[];

    /**
     * 创建一个新的 Matrix2 实例。
     * @param n11 - 矩阵的第一行第一列元素，默认为 1。
     * @param n12 - 矩阵的第一行第二列元素，默认为 0。
     * @param n21 - 矩阵的第二行第一列元素，默认为 0。
     * @param n22 - 矩阵的第二行第二列元素，默认为 1。
     */
    constructor(n11?: number, n12?: number, n21?: number, n22?: number) {
        // 在原型链上设置标识属性
        Matrix2.prototype.isMatrix2 = true;

        // 初始化元素数组为单位矩阵
        this.elements = [
            1, 0,
            0, 1,
        ];

        // 如果提供了参数，则设置矩阵元素
        if (
            n11 !== undefined &&
            n12 !== undefined &&
            n21 !== undefined &&
            n22 !== undefined
        ) {
            this.set(n11, n12, n21, n22);
        }
    }

    /**
     * 将矩阵重置为单位矩阵。
     * @returns 当前 Matrix2 实例。
     */
    identity(): Matrix2 {
        this.set(
            1, 0,
            0, 1,
        );
        return this;
    }

    /**
     * 从数组中设置矩阵的元素。
     * @param array - 包含矩阵元素的数组。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 当前 Matrix2 实例。
     */
    fromArray(array: number[], offset: number = 0): Matrix2 {
        for (let i = 0; i < 4; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    }

    /**
     * 设置矩阵的元素。
     * @param n11 - 第一行第一列元素。
     * @param n12 - 第一行第二列元素。
     * @param n21 - 第二行第一列元素。
     * @param n22 - 第二行第二列元素。
     * @returns 当前 Matrix2 实例。
     */
    set(n11: number, n12: number, n21: number, n22: number): Matrix2 {
        const te = this.elements;

        te[0] = n11; // 第一行第一列
        te[1] = n21; // 第二行第一列
        te[2] = n12; // 第一行第二列
        te[3] = n22; // 第二行第二列

        return this;
    }

    /**
     * 克隆当前矩阵，返回一个新的 Matrix2 实例。
     * @returns 新的 Matrix2 实例。
     */
    clone(): Matrix2 {
        return new Matrix2().copy(this);
    }

    /**
     * 复制另一个矩阵的元素到当前矩阵。
     * @param m - 要复制的 Matrix2 实例。
     * @returns 当前 Matrix2 实例。
     */
    copy(m: Matrix2): Matrix2 {
        const te = this.elements;
        const me = m.elements;

        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];

        return this;
    }

    /**
     * 将当前矩阵与另一个矩阵相乘。
     * @param m - 要相乘的 Matrix2 实例。
     * @returns 当前 Matrix2 实例。
     */
    multiply(m: Matrix2): Matrix2 {
        const ae = this.elements;
        const be = m.elements;

        const a11 = ae[0], a12 = ae[2];
        const a21 = ae[1], a22 = ae[3];

        const b11 = be[0], b12 = be[2];
        const b21 = be[1], b22 = be[3];

        ae[0] = a11 * b11 + a12 * b21;
        ae[1] = a21 * b11 + a22 * b21;
        ae[2] = a11 * b12 + a12 * b22;
        ae[3] = a21 * b12 + a22 * b22;

        return this;
    }

    /**
     * 计算当前矩阵的行列式。
     * @returns 矩阵的行列式。
     */
    determinant(): number {
        const te = this.elements;

        return te[0] * te[3] - te[1] * te[2];
    }

    /**
     * 计算当前矩阵的逆矩阵。
     * @returns 当前 Matrix2 实例。
     */
    invert(): Matrix2 {
        const te = this.elements;
        const det = this.determinant();

        if (det === 0) {
            throw new Error("Matrix2: Cannot invert matrix, determinant is zero.");
        }

        const invDet = 1 / det;

        const a11 = te[0], a12 = te[2];
        const a21 = te[1], a22 = te[3];

        te[0] = a22 * invDet;
        te[1] = -a21 * invDet;
        te[2] = -a12 * invDet;
        te[3] = a11 * invDet;

        return this;
    }

    /**
     * 转置当前矩阵。
     * @returns 当前 Matrix2 实例。
     */
    transpose(): Matrix2 {
        const te = this.elements;

        const tmp = te[1];
        te[1] = te[2];
        te[2] = tmp;

        return this;
    }

    /**
     * 将矩阵转换为数组。
     * @param array - 目标数组，默认为空数组。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 包含矩阵元素的数组。
     */
    toArray(array: number[] = [], offset: number = 0): number[] {
        const te = this.elements;

        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];

        return array;
    }

    /**
     * 将矩阵转换为 Float32Array 格式，适用于 WebGL 缓冲区数据。
     * @returns 包含矩阵元素的 Float32Array。
     */
    toFloat32Array(): Float32Array {
        return new Float32Array(this.elements);
    }

    /**
     * 从 Float32Array 设置矩阵的元素。
     * @param array - 包含矩阵元素的 Float32Array。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 当前 Matrix2 实例。
     */
    fromFloat32Array(array: Float32Array, offset = 0): Matrix2 {
        for (let i = 0; i < 4; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    }

    /**
     * 将矩阵转换为 Float64Array 格式，适用于需要双精度的场景。
     * @returns 包含矩阵元素的 Float64Array。
     */
    toFloat64Array(): Float64Array {
        return new Float64Array(this.elements);
    }

    /**
     * 从 Float64Array 设置矩阵的元素。
     * @param array - 包含矩阵元素的 Float64Array。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 当前 Matrix2 实例。
     */
    fromFloat64Array(array: Float64Array, offset = 0): Matrix2 {
        for (let i = 0; i < 4; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    }

    /**
     * 将矩阵转换为字符串表示形式。
     * @returns 矩阵的字符串表示。
     */
    toString(): string {
        const te = this.elements;
        return `Matrix2( 
    [${te[0]}, ${te[2]}],
    [${te[1]}, ${te[3]}]
)`;
    }
}
