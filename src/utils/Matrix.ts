import {Vector} from "@/utils/Vector.ts";

export  class Matrix {

    public readonly matrix: Float32Array;
    public readonly rows: number;
    public readonly cols: number;
    public readonly isSquare: boolean;

    constructor(array: number[][]) {
        if (
            !Array.isArray(array) ||
            !array.length ||
            !Array.isArray(array[0])
        ) {
            throw new Error('Input must be a non-empty 2D array.');
        }

        this.rows = array.length; // 矩阵行数
        this.cols = array[0].length; // 矩阵列数

        // 使用 flat() 将二维数组转换为一维数组
        this.matrix = new Float32Array(array.flat());

        // 检查是否为方阵
        this.isSquare = this.rows === this.cols; // 是方阵
    }

    // 获取矩阵元素
    get(row: number, col: number) {
        return this.matrix[row * this.cols + col];
    }

    // 设置矩阵元素
    set(row: number, col: number, value: number) {
        this.matrix[row * this.cols + col] = value;
    }

    /**
     * 获取矩阵的 Float32Array 表示
     */
    get float32Array(): Float32Array {
        return this.matrix;
    }

    /**
     * 矩阵数组转换
     * @param array
     */
    static toFloat32Array(array: number[][] | Array<Vector>): Float32Array {
        if (array.length === 0) {
            return new Float32Array();
        }

        // 判断是否是向量数组
        if (array[0] instanceof Vector) {
            const vectorArray = array as Vector[];
            const dimension = vectorArray[0].dimension;
            const result = new Float32Array(vectorArray.length * dimension);

            // 使用 set 方法对每个向量组件进行批量拷贝
            for (let i = 0; i < vectorArray.length; i++) {
                result.set(vectorArray[i].components, i * dimension);
            }

            return result;
        } else {
            const arr = array as number[][];
            const rows = arr.length;
            const cols = arr[0].length;
            const result = new Float32Array(rows * cols);

            for (let i = 0, index = 0; i < rows; i++) {
                const row = arr[i];
                for (let j = 0; j < cols; j++) {
                    result[index++] = row[j];
                }
            }

            return result;
        }
    }



    /**
     * 获取矩阵的维度
     * @returns [rows, cols] - 返回一个包含行数和列数的数组
     */
    get size(): [number, number] {
        return [this.rows, this.cols];
    }

    /**
     * 打印矩阵信息
     */
    toString(): string {
        // 构建矩阵基本信息
        let info = `Matrix ${this.rows}×${this.cols}`;
        if (this.isSquare) {
            info += ' (Square Matrix)';
        }
        info += '\n';

        // 找出最长数字的长度，用于对齐
        const maxLength = Math.max(
            ...Array.from(this.matrix).map(num =>
                num.toFixed(2).toString().length
            )
        );

        // 构建矩阵内容
        for (let i = 0; i < this.rows; i++) {
            info += i === 0 ? '⎡' : i === this.rows - 1 ? '⎣' : '⎢';

            // 添加每一行的元素
            for (let j = 0; j < this.cols; j++) {
                const value = this.get(i, j).toFixed(2);
                // 右对齐数字
                info += value.padStart(maxLength) + (j < this.cols - 1 ? ' ' : '');
            }

            info += i === 0 ? '⎤' : i === this.rows - 1 ? '⎦' : '⎥';
            info += '\n';
        }

        return info;
    }

    /**
     * 对两个矩阵执行基本运算
     * @param a Matrix对象或二维数组
     * @param b Matrix对象或二维数组
     * @param operation 运算函数，接收两个操作数
     * @returns 返回一个新的矩阵
     */
    private static operate(
        a: Matrix | number[][],
        b: Matrix | number[][],
        operation: (a: number, b: number) => number
    ): Matrix {
        // 将输入转换为 Matrix 对象
        const matrixA = a instanceof Matrix ? a : new Matrix(a);
        const matrixB = b instanceof Matrix ? b : new Matrix(b);

        // 检查维度是否匹配
        if (matrixA.rows !== matrixB.rows || matrixA.cols !== matrixB.cols) {
            throw new Error(
                `Matrix dimensions do not match: ${matrixA.rows}×${matrixA.cols} and ${matrixB.rows}×${matrixB.cols}`
            );
        }

        // 直接创建结果的 Float32Array
        const result = new Float32Array(matrixA.matrix.length);

        // 执行运算
        for (let i = 0; i < result.length; i++) {
            result[i] = operation(matrixA.matrix[i], matrixB.matrix[i]);
        }

        // 将一维数组转换为二维数组
        const resultArray: number[][] = [];
        for (let i = 0; i < matrixA.rows; i++) {
            resultArray.push(Array.from(result.slice(i * matrixA.cols, (i + 1) * matrixA.cols)));
        }

        return new Matrix(resultArray);
    }

    /**
     * 矩阵加法
     */
    static add(a: Matrix | number[][], b: Matrix | number[][]): Matrix {
        return Matrix.operate(a, b, (x, y) => x + y);
    }

    /**
     * 矩阵减法
     */
    static subtract(a: Matrix | number[][], b: Matrix | number[][]): Matrix {
        return Matrix.operate(a, b, (x, y) => x - y);
    }

    /**
     * 矩阵标量乘法
     * @param matrix Matrix对象或二维数组
     * @param scalar 标量值
     * @returns 返回一个新的矩阵
     */
    static scalarMultiply(matrix: Matrix | number[][], scalar: number): Matrix {
        const matrixA = matrix instanceof Matrix ? matrix : new Matrix(matrix);

        // 直接创建结果的 Float32Array
        const result = new Float32Array(matrixA.matrix.length);

        // 执行标量乘法
        for (let i = 0; i < result.length; i++) {
            result[i] = matrixA.matrix[i] * scalar;
        }

        // 将一维数组转换为二维数组
        const resultArray: number[][] = [];
        for (let i = 0; i < matrixA.rows; i++) {
            resultArray.push(Array.from(result.slice(i * matrixA.cols, (i + 1) * matrixA.cols)));
        }

        return new Matrix(resultArray);
    }

    /**
     * 矩阵乘法
     * @param a Matrix对象或二维数组
     * @param b Matrix对象或二维数组
     * @returns 返回一个新的矩阵
     */
    static multiply(a: Matrix | number[][], b: Matrix | number[][]): Matrix {
        // 转换输入为Matrix对象
        const matrixA = a instanceof Matrix ? a : new Matrix(a);
        const matrixB = b instanceof Matrix ? b : new Matrix(b);

        // 检查维度
        if (matrixA.cols !== matrixB.rows) {
            throw new Error(
                `Matrix dimensions invalid for multiplication: ${matrixA.rows}×${matrixA.cols} and ${matrixB.rows}×${matrixB.cols}`
            );
        }

        // 确定最优分块大小 (基于经验值和缓存行大小)
        const blockSize = Math.min(32, Math.min(matrixA.rows, matrixB.cols, matrixA.cols));

        // 创建结果数组
        const result = new Float32Array(matrixA.rows * matrixB.cols);

        // 使用分块乘法
        for (let i = 0; i < matrixA.rows; i += blockSize) {
            const iLimit = Math.min(i + blockSize, matrixA.rows);

            for (let j = 0; j < matrixB.cols; j += blockSize) {
                const jLimit = Math.min(j + blockSize, matrixB.cols);

                // 初始化这个块的结果为0
                for (let ii = i; ii < iLimit; ii++) {
                    for (let jj = j; jj < jLimit; jj++) {
                        result[ii * matrixB.cols + jj] = 0;
                    }
                }

                // 对每个块进行计算
                for (let k = 0; k < matrixA.cols; k += blockSize) {
                    const kLimit = Math.min(k + blockSize, matrixA.cols);

                    for (let ii = i; ii < iLimit; ii++) {
                        for (let jj = j; jj < jLimit; jj++) {
                            let sum = result[ii * matrixB.cols + jj];

                            // 计算一个块内的点积
                            for (let kk = k; kk < kLimit; kk++) {
                                sum += matrixA.matrix[ii * matrixA.cols + kk] *
                                    matrixB.matrix[kk * matrixB.cols + jj];
                            }

                            result[ii * matrixB.cols + jj] = sum;
                        }
                    }
                }
            }
        }

        // 将结果转换为二维数组
        const resultArray: number[][] = [];
        for (let i = 0; i < matrixA.rows; i++) {
            resultArray.push(Array.from(result.slice(i * matrixB.cols, (i + 1) * matrixB.cols)));
        }

        return new Matrix(resultArray);
    }

    /**
     * 获取矩阵的指定行或列
     * @param index 索引
     * @param type 类型：'row' 或 'col'
     * @returns 返回指定行或列的数据
     */
    getRowCol(index: number, type: 'row' | 'col'): Float32Array {
        if (type === 'row') {
            if (index < 0 || index >= this.rows) {
                throw new Error(`Row index ${index} out of bounds`);
            }
            // 返回行数据的视图
            return new Float32Array(
                this.matrix.buffer,
                index * this.cols * 4,  // 偏移量 (4 bytes per float)
                this.cols  // 长度
            );
        } else {  // type === 'col'
            if (index < 0 || index >= this.cols) {
                throw new Error(`Column index ${index} out of bounds`);
            }
            // 创建并返回列数据
            const result = new Float32Array(this.rows);
            for (let i = 0; i < this.rows; i++) {
                result[i] = this.matrix[i * this.cols + index];
            }
            return result;
        }
    }

    /**
     * 设置矩阵的指定行或列
     * @param index 索引
     * @param values 新的值（Float32Array或普通数组）
     * @param type 类型：'row' 或 'col'
     * @returns 返回一个新的矩阵
     */
    setRowCol(index: number, values: number[] | Float32Array, type: 'row' | 'col'): Matrix {
        const newMatrix = new Float32Array(this.matrix);

        if (type === 'row') {
            if (index < 0 || index >= this.rows) {
                throw new Error(`Row index ${index} out of bounds`);
            }
            if (values.length !== this.cols) {
                throw new Error(`Values array length ${values.length} does not match matrix columns ${this.cols}`);
            }
            // 设置行数据
            newMatrix.set(values, index * this.cols);
        } else {  // type === 'col'
            if (index < 0 || index >= this.cols) {
                throw new Error(`Column index ${index} out of bounds`);
            }
            if (values.length !== this.rows) {
                throw new Error(`Values array length ${values.length} does not match matrix rows ${this.rows}`);
            }
            // 设置列数据
            for (let i = 0; i < this.rows; i++) {
                newMatrix[i * this.cols + index] = values[i];
            }
        }

        // 创建新矩阵
        const resultArray = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            resultArray[i] = Array.from(
                newMatrix.subarray(i * this.cols, (i + 1) * this.cols)
            );
        }
        return new Matrix(resultArray);
    }
}