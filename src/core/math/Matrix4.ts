import { Vector3 } from "@/core/math/Vector3.ts";
import { Matrix3 } from "@/core/math/Matrix3.ts";
class Matrix4 {

    public elements: number[];

    /**
     * 内部标志，用于识别 Matrix4 实例。
     * 这个标志用于区分 Matrix4 和其他矩阵类型。
     */
    public isMatrix4: boolean | undefined;

    /**
     * 构造函数，创建一个 4x4 矩阵，可以通过传入具体的数值来设置矩阵的内容。
     * 如果没有传入数值，则默认为单位矩阵。
     * @param n11 矩阵第一行的第一个元素。
     * @param n12 矩阵第一行的第二个元素。
     * @param n13 矩阵第一行的第三个元素。
     * @param n14 矩阵第一行的第四个元素。
     * @param n21 矩阵第二行的第一个元素。
     * @param n22 矩阵第二行的第二个元素。
     * @param n23 矩阵第二行的第三个元素。
     * @param n24 矩阵第二行的第四个元素。
     * @param n31 矩阵第三行的第一个元素。
     * @param n32 矩阵第三行的第二个元素。
     * @param n33 矩阵第三行的第三个元素。
     * @param n34 矩阵第三行的第四个元素。
     * @param n41 矩阵第四行的第一个元素。
     * @param n42 矩阵第四行的第二个元素。
     * @param n43 矩阵第四行的第三个元素。
     * @param n44 矩阵第四行的第四个元素。
     */
    constructor(n11: number, n12: number, n13: number, n14: number,
                n21: number, n22: number, n23: number, n24: number,
                n31: number, n32: number, n33: number, n34: number,
                n41: number, n42: number, n43: number, n44: number) {
        Matrix4.prototype.isMatrix4 = true;
        this.elements = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
    }

    /**
     * 设置矩阵的 16 个值。
     * @param n11 矩阵第一行的第一个元素。
     * @param n12 矩阵第一行的第二个元素。
     * @param n13 矩阵第一行的第三个元素。
     * @param n14 矩阵第一行的第四个元素。
     * @param n21 矩阵第二行的第一个元素。
     * @param n22 矩阵第二行的第二个元素。
     * @param n23 矩阵第二行的第三个元素。
     * @param n24 矩阵第二行的第四个元素。
     * @param n31 矩阵第三行的第一个元素。
     * @param n32 矩阵第三行的第二个元素。
     * @param n33 矩阵第三行的第三个元素。
     * @param n34 矩阵第三行的第四个元素。
     * @param n41 矩阵第四行的第一个元素。
     * @param n42 矩阵第四行的第二个元素。
     * @param n43 矩阵第四行的第三个元素。
     * @param n44 矩阵第四行的第四个元素。
     * @returns 当前的 Matrix4 实例。
     */
    set(n11: number, n12: number, n13: number, n14: number,
        n21: number, n22: number, n23: number, n24: number,
        n31: number, n32: number, n33: number, n34: number,
        n41: number, n42: number, n43: number, n44: number): this {
        const te = this.elements;
        te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
        te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
        te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
        te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;
        return this;
    }

    /**
     * 将矩阵设置为单位矩阵（对角线为 1，其它位置为 0）。
     * @returns 当前的 Matrix4 实例。
     */
    identity(): this {
        this.set(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        return this;
    }

    /**
     * 克隆当前矩阵，返回一个新的 Matrix4 实例。
     * @returns 一个新的 Matrix4 实例，内容与当前矩阵相同。
     */
    clone(): Matrix4 {
        return new Matrix4(
            this.elements[0], this.elements[4], this.elements[8], this.elements[12],
            this.elements[1], this.elements[5], this.elements[9], this.elements[13],
            this.elements[2], this.elements[6], this.elements[10], this.elements[14],
            this.elements[3], this.elements[7], this.elements[11], this.elements[15]
        );
    }

    /**
     * 将另一个 Matrix4 实例的值复制到当前矩阵。
     * @param m 要复制的矩阵。
     * @returns 当前的 Matrix4 实例。
     */
    copy(m: Matrix4): this {
        const te = this.elements;
        const me = m.elements;
        te[0] = me[0]; te[4] = me[4]; te[8] = me[8]; te[12] = me[12];
        te[1] = me[1]; te[5] = me[5]; te[9] = me[9]; te[13] = me[13];
        te[2] = me[2]; te[6] = me[6]; te[10] = me[10]; te[14] = me[14];
        te[3] = me[3]; te[7] = me[7]; te[11] = me[11]; te[15] = me[15];
        return this;
    }

    /**
     * 仅复制另一个 Matrix4 实例的平移部分（位置）。
     * @param m 要复制位置的矩阵。
     * @returns 当前的 Matrix4 实例。
     */
    copyPosition(m: Matrix4): this {
        const te = this.elements, me = m.elements;
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        return this;
    }

    /**
     * 根据一个 3x3 矩阵来设置当前矩阵，扩展为 4x4 矩阵。
     * @param m 要提取的 3x3 矩阵。
     * @returns 当前的 Matrix4 实例。
     */
    setFromMatrix3(m: Matrix3): this {
        const me = m.elements;
        this.set(
            me[0], me[3], me[6], 0,
            me[1], me[4], me[7], 0,
            me[2], me[5], me[8], 0,
            0, 0, 0, 1
        );
        return this;
    }

    // /**
    //  * 提取矩阵的 x、y 和 z 轴（基向量），并赋值给提供的向量。
    //  * @param xAxis 用来接收 x 轴向量。
    //  * @param yAxis 用来接收 y 轴向量。
    //  * @param zAxis 用来接收 z 轴向量。
    //  * @returns 当前的 Matrix4 实例。
    //  */
    // extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this {
    //     xAxis.setFromMatrix4Column(this, 0);
    //     yAxis.setFromMatrix4Column(this, 1);
    //     zAxis.setFromMatrix4Column(this, 2);
    //     return this;
    // }

    /**
     * 通过提供的三个基向量（x、y、z）创建一个新的矩阵。
     * @param xAxis x 轴基向量。
     * @param yAxis y 轴基向量。
     * @param zAxis z 轴基向量。
     * @returns 当前的 Matrix4 实例。
     */
    makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this {
        this.set(
            xAxis.x, yAxis.x, zAxis.x, 0,
            xAxis.y, yAxis.y, zAxis.y, 0,
            xAxis.z, yAxis.z, zAxis.z, 0,
            0, 0, 0, 1
        );
        return this;
    }

    /**
     * 将当前矩阵与另一个矩阵相乘，并返回结果。
     * @param m 要与当前矩阵相乘的矩阵。
     * @returns 当前的 Matrix4 实例。
     */
    multiply(m: Matrix4): this {
        return this.multiplyMatrices(this, m);
    }

    /**
     * 将另一个矩阵与当前矩阵相乘（前乘），并返回结果。
     * @param m 要前乘的矩阵。
     * @returns 当前的 Matrix4 实例。
     */
    premultiply(m: Matrix4): this {
        return this.multiplyMatrices(m, this);
    }

    /**
     * 将两个矩阵（a 和 b）相乘并将结果存储在当前矩阵中。
     * @param a 第一个矩阵。
     * @param b 第二个矩阵。
     * @returns 当前的 Matrix4 实例。
     */
    multiplyMatrices(a: Matrix4, b: Matrix4): this {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;
        const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
        const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
        const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
        const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        return this;
    }

    /**
     * 转置矩阵（沿对角线翻转矩阵）。
     * @returns 当前的 Matrix4 实例。
     */
    transpose(): this {
        let tmp;
        const m = this.elements;
        tmp = m[1]; m[1] = m[4]; m[4] = tmp;
        tmp = m[2]; m[2] = m[8]; m[8] = tmp;
        tmp = m[6]; m[6] = m[9]; m[9] = tmp;
        tmp = m[3]; m[3] = m[12]; m[12] = tmp;
        tmp = m[7]; m[7] = m[13]; m[13] = tmp;
        tmp = m[11]; m[11] = m[14]; m[14] = tmp;
        return this;
    }

    /**
     * 检查当前矩阵与另一个矩阵是否相等。
     * @param matrix 要比较的矩阵。
     * @returns 如果矩阵相等，返回 true；否则返回 false。
     */
    equals(matrix: Matrix4): boolean {
        const te = this.elements;
        const me = matrix.elements;
        for (let i = 0; i < 16; i++) {
            if (te[i] !== me[i]) return false;
        }
        return true;
    }

    /**
     * 将矩阵转换为一个包含 16 个数值的数组。
     * @param array 要存储矩阵值的数组。
     * @param offset 数组中的起始位置。
     * @returns 包含矩阵值的数组。
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
        array[offset + 9] = te[9];
        array[offset + 10] = te[10];
        array[offset + 11] = te[11];
        array[offset + 12] = te[12];
        array[offset + 13] = te[13];
        array[offset + 14] = te[14];
        array[offset + 15] = te[15];
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
     * @returns 当前 Matrix4 实例。
     */
    fromFloat32Array(array: Float32Array, offset = 0): this {
        for (let i = 0; i < 16; i++) {
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
     * @returns 当前 Matrix4 实例。
     */
    fromFloat64Array(array: Float64Array, offset = 0): this {
        for (let i = 0; i < 16; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    }

    /**
     * 从包含 16 个数值的数组中设置矩阵的值。
     * @param array 包含矩阵值的数组。
     * @param offset 数组中的起始位置。
     * @returns 当前的 Matrix4 实例。
     */
    fromArray(array: number[], offset: number = 0): this {
        for (let i = 0; i < 16; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    }
}

export { Matrix4 };
