import {Matrix4} from "@/core/math/Matrix4.ts";
import {Vector3} from "@/core/math/Vector3.ts";

/**
 * 表示一个 3x3 矩阵，常用于二维和三维空间中的变换。
 */
class Matrix3 {
    /**
     * 矩阵的元素，按列优先顺序存储。
     *
     * | 0 | 3 | 6 |
     * |---|---|---|
     * | 1 | 4 | 7 |
     * | 2 | 5 | 8 |
     */
    public elements: number[];

    /**
     * 内部标志，用于识别 Matrix3 实例。
     */
    public isMatrix3: boolean | undefined;

    /**
     * 创建一个新的 Matrix3 实例。
     * 如果没有提供参数，则初始化为单位矩阵。
     *
     * @param n11 - 第 1 行第 1 列的元素。
     * @param n12 - 第 1 行第 2 列的元素。
     * @param n13 - 第 1 行第 3 列的元素。
     * @param n21 - 第 2 行第 1 列的元素。
     * @param n22 - 第 2 行第 2 列的元素。
     * @param n23 - 第 2 行第 3 列的元素。
     * @param n31 - 第 3 行第 1 列的元素。
     * @param n32 - 第 3 行第 2 列的元素。
     * @param n33 - 第 3 行第 3 列的元素。
     */
    constructor(
        n11?: number, n12?: number, n13?: number,
        n21?: number, n22?: number, n23?: number,
        n31?: number, n32?: number, n33?: number
    ) {
        Matrix3.prototype.isMatrix3 = true;

        this.elements = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];

        if (n11 !== undefined) {
            this.set(n11, n12!, n13!, n21!, n22!, n23!, n31!, n32!, n33!);
        }
    }

    /**
     * 设置矩阵的所有元素。
     *
     * @param n11 - 第 1 行第 1 列的元素。
     * @param n12 - 第 1 行第 2 列的元素。
     * @param n13 - 第 1 行第 3 列的元素。
     * @param n21 - 第 2 行第 1 列的元素。
     * @param n22 - 第 2 行第 2 列的元素。
     * @param n23 - 第 2 行第 3 列的元素。
     * @param n31 - 第 3 行第 1 列的元素。
     * @param n32 - 第 3 行第 2 列的元素。
     * @param n33 - 第 3 行第 3 列的元素。
     * @returns 当前 Matrix3 实例。
     */
    set(
        n11: number, n12: number, n13: number,
        n21: number, n22: number, n23: number,
        n31: number, n32: number, n33: number
    ): this {
        const te = this.elements;

        te[0] = n11; te[1] = n21; te[2] = n31;
        te[3] = n12; te[4] = n22; te[5] = n32;
        te[6] = n13; te[7] = n23; te[8] = n33;

        return this;
    }

    /**
     * 将矩阵重置为单位矩阵。
     * @returns 当前 Matrix3 实例。
     */
    identity(): this {
        this.set(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );

        return this;
    }

    /**
     * 复制另一个矩阵的元素到当前矩阵。
     * @param m - 要复制的 Matrix3 实例。
     * @returns 当前 Matrix3 实例。
     */
    copy(m: Matrix3): this {
        const te = this.elements;
        const me = m.elements;

        te[0] = me[0]; te[1] = me[1]; te[2] = me[2];
        te[3] = me[3]; te[4] = me[4]; te[5] = me[5];
        te[6] = me[6]; te[7] = me[7]; te[8] = me[8];

        return this;
    }

    /**
     * 从另一个矩阵中提取基底向量。
     *
     * @param xAxis - 用于存储第 1 列的 Vector3 实例。
     * @param yAxis - 用于存储第 2 列的 Vector3 实例。
     * @param zAxis - 用于存储第 3 列的 Vector3 实例。
     * @returns 当前 Matrix3 实例。
     */
    extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this {
        xAxis.setFromMatrix3Column(this, 0);
        yAxis.setFromMatrix3Column(this, 1);
        zAxis.setFromMatrix3Column(this, 2);

        return this;
    }

    /**
     * 从一个 4x4 矩阵中设置当前 3x3 矩阵。
     *
     * @param m - 一个 Matrix4 实例。
     * @returns 当前 Matrix3 实例。
     */
    setFromMatrix4(m: Matrix4): this {
        const me = m.elements;

        this.set(
            me[0], me[4], me[8],
            me[1], me[5], me[9],
            me[2], me[6], me[10]
        );

        return this;
    }

    /**
     * 将当前矩阵与另一个矩阵相乘。
     *
     * @param m - 要与之相乘的 Matrix3 实例。
     * @returns 当前 Matrix3 实例。
     */
    multiply(m: Matrix3): this {
        return this.multiplyMatrices(this, m);
    }

    /**
     * 先乘以另一个矩阵，再与当前矩阵相乘。
     *
     * @param m - 要先乘的 Matrix3 实例。
     * @returns 当前 Matrix3 实例。
     */
    premultiply(m: Matrix3): this {
        return this.multiplyMatrices(m, this);
    }

    /**
     * 将两个矩阵相乘，并将结果存储在当前矩阵中。
     *
     * @param a - 第一个 Matrix3 实例。
     * @param b - 第二个 Matrix3 实例。
     * @returns 当前 Matrix3 实例。
     */
    multiplyMatrices(a: Matrix3, b: Matrix3): this {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;

        const a11 = ae[0], a12 = ae[3], a13 = ae[6];
        const a21 = ae[1], a22 = ae[4], a23 = ae[7];
        const a31 = ae[2], a32 = ae[5], a33 = ae[8];

        const b11 = be[0], b12 = be[3], b13 = be[6];
        const b21 = be[1], b22 = be[4], b23 = be[7];
        const b31 = be[2], b32 = be[5], b33 = be[8];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a11 * b12 + a12 * b22 + a13 * b32;
        te[6] = a11 * b13 + a12 * b23 + a13 * b33;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a21 * b13 + a22 * b23 + a23 * b33;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31;
        te[5] = a31 * b12 + a32 * b22 + a33 * b32;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;

        return this;
    }

    /**
     * 将矩阵的所有元素乘以一个标量。
     *
     * @param s - 标量值。
     * @returns 当前 Matrix3 实例。
     */
    multiplyScalar(s: number): this {
        const te = this.elements;

        te[0] *= s; te[3] *= s; te[6] *= s;
        te[1] *= s; te[4] *= s; te[7] *= s;
        te[2] *= s; te[5] *= s; te[8] *= s;

        return this;
    }

    /**
     * 计算矩阵的行列式。
     *
     * @returns 矩阵的行列式值。
     */
    determinant(): number {
        const te = this.elements;

        const a = te[0], b = te[1], c = te[2],
            d = te[3], e = te[4], f = te[5],
            g = te[6], h = te[7], i = te[8];

        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    }

    /**
     * 计算矩阵的逆矩阵。如果矩阵不可逆，则将其设置为零矩阵。
     *
     * @returns 当前 Matrix3 实例。
     */
    invert(): this {
        const te = this.elements,

            n11 = te[0], n21 = te[1], n31 = te[2],
            n12 = te[3], n22 = te[4], n32 = te[5],
            n13 = te[6], n23 = te[7], n33 = te[8],

            t11 = n33 * n22 - n32 * n23,
            t12 = n32 * n13 - n33 * n12,
            t13 = n23 * n12 - n22 * n13,

            det = n11 * t11 + n21 * t12 + n31 * t13;

        if (det === 0) {
            return this.set(
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            );
        }

        const detInv = 1 / det;

        te[0] = t11 * detInv;
        te[1] = (n31 * n23 - n33 * n21) * detInv;
        te[2] = (n32 * n21 - n31 * n22) * detInv;

        te[3] = t12 * detInv;
        te[4] = (n33 * n11 - n31 * n13) * detInv;
        te[5] = (n31 * n12 - n32 * n11) * detInv;

        te[6] = t13 * detInv;
        te[7] = (n21 * n13 - n23 * n11) * detInv;
        te[8] = (n22 * n11 - n21 * n12) * detInv;

        return this;
    }

    /**
     * 转置矩阵。
     *
     * @returns 当前 Matrix3 实例。
     */
    transpose(): this {
        let tmp: number;
        const m = this.elements;

        tmp = m[1]; m[1] = m[3]; m[3] = tmp;
        tmp = m[2]; m[2] = m[6]; m[6] = tmp;
        tmp = m[5]; m[5] = m[7]; m[7] = tmp;

        return this;
    }

    /**
     * 获取法线矩阵，即当前矩阵的逆转置矩阵。
     * 通常用于将法线向量从世界空间转换到局部空间。
     *
     * @param matrix4 - 一个 Matrix4 实例，用于生成法线矩阵。
     * @returns 当前 Matrix3 实例。
     */
    getNormalMatrix(matrix4: Matrix4): this {
        return this.setFromMatrix4(matrix4).invert().transpose();
    }

    /**
     * 将矩阵转置并存储到一个数组中。
     *
     * @param r - 存储转置后矩阵元素的数组。
     * @returns 当前 Matrix3 实例。
     */
    transposeIntoArray(r: number[]): this {
        const m = this.elements;

        r[0] = m[0];
        r[1] = m[3];
        r[2] = m[6];
        r[3] = m[1];
        r[4] = m[4];
        r[5] = m[7];
        r[6] = m[2];
        r[7] = m[5];
        r[8] = m[8];

        return this;
    }

    /**
     * 设置 UV 变换矩阵。
     *
     * @param tx - 平移 X 轴。
     * @param ty - 平移 Y 轴。
     * @param sx - 缩放 X 轴。
     * @param sy - 缩放 Y 轴。
     * @param rotation - 旋转角度（弧度）。
     * @param cx - 旋转中心 X。
     * @param cy - 旋转中心 Y。
     * @returns 当前 Matrix3 实例。
     */
    setUvTransform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number): this {
        const c = Math.cos(rotation);
        const s = Math.sin(rotation);

        this.set(
            sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx,
            -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty,
            0, 0, 1
        );

        return this;
    }

    /**
     * 缩放矩阵。
     *
     * @param sx - X 轴缩放。
     * @param sy - Y 轴缩放。
     * @returns 当前 Matrix3 实例。
     */
    scale(sx: number, sy: number): this {
        const scaleMatrix = new Matrix3().makeScale(sx, sy);
        return this.premultiply(scaleMatrix);
    }

    /**
     * 旋转矩阵。
     *
     * @param theta - 旋转角度（弧度）。
     * @returns 当前 Matrix3 实例。
     */
    rotate(theta: number): this {
        const rotationMatrix = new Matrix3().makeRotation(theta);
        return this.premultiply(rotationMatrix);
    }

    /**
     * 平移矩阵。
     *
     * @param tx - X 轴平移。
     * @param ty - Y 轴平移。
     * @returns 当前 Matrix3 实例。
     */
    translate(tx: number, ty: number): this {
        const translationMatrix = new Matrix3().makeTranslation(tx, ty);
        return this.premultiply(translationMatrix);
    }

    /**
     * 创建一个平移矩阵。
     *
     * @param x - 平移量 X。
     * @param y - 平移量 Y。
     * @returns 当前 Matrix3 实例。
     */
    makeTranslation(x: number, y: number): this {
        this.set(
            1, 0, x,
            0, 1, y,
            0, 0, 1
        );

        return this;
    }

    /**
     * 创建一个旋转矩阵。
     *
     * @param theta - 旋转角度（弧度）。
     * @returns 当前 Matrix3 实例。
     */
    makeRotation(theta: number): this {
        const c = Math.cos(theta);
        const s = Math.sin(theta);

        this.set(
            c, -s, 0,
            s, c, 0,
            0, 0, 1
        );

        return this;
    }

    /**
     * 创建一个缩放矩阵。
     *
     * @param x - X 轴缩放。
     * @param y - Y 轴缩放。
     * @returns 当前 Matrix3 实例。
     */
    makeScale(x: number, y: number): this {
        this.set(
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        );

        return this;
    }

    /**
     * 检查两个矩阵是否相等。
     *
     * @param matrix - 要比较的 Matrix3 实例。
     * @returns 如果相等则为 true，否则为 false。
     */
    equals(matrix: Matrix3): boolean {
        const te = this.elements;
        const me = matrix.elements;

        for (let i = 0; i < 9; i++) {
            if (te[i] !== me[i]) return false;
        }

        return true;
    }

    /**
     * 从数组中设置矩阵元素。
     *
     * @param array - 包含矩阵元素的数组。
     * @param offset - 数组中的起始偏移量。
     * @returns 当前 Matrix3 实例。
     */
    fromArray(array: number[], offset: number = 0): this {
        for (let i = 0; i < 9; i++) {
            this.elements[i] = array[i + offset];
        }

        return this;
    }

    /**
     * 将矩阵元素写入数组中。
     *
     * @param array - 要写入的数组。
     * @param offset - 数组中的起始偏移量。
     * @returns 包含矩阵元素的数组。
     */
    toArray(array: number[] = [], offset: number = 0): number[] {
        const te = this.elements;

        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];

        return array;
    }

    /**
     * 克隆当前矩阵。
     *
     * @returns 一个新的 Matrix3 实例，其元素与当前矩阵相同。
     */
    public clone(): Matrix3 {
        return new Matrix3().fromArray(this.elements);
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
     * @returns 当前 Matrix3 实例。
     */
    fromFloat32Array(array: Float32Array, offset = 0): this {
        for (let i = 0; i < 9; i++) {
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
     * @returns 当前 Matrix3 实例。
     */
    fromFloat64Array(array: Float64Array, offset = 0): this {
        for (let i = 0; i < 9; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    }



    /**
     * 将矩阵转换为字符串表示。
     *
     * @returns 矩阵的字符串表示，格式为 "(a, b, c)\n(d, e, f)\n(g, h, i)"。
     */
    toString(): string {
        const te = this.elements;
        return `(${te[0]}, ${te[3]}, ${te[6]})\n(${te[1]}, ${te[4]}, ${te[7]})\n(${te[2]}, ${te[5]}, ${te[8]})`;
    }
}




export { Matrix3 };
