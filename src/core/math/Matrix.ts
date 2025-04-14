import {Matrix2} from "@/core/math/Matrix2.ts";
import {Matrix3} from "@/core/math/Matrix3.ts";
import {Matrix4} from "@/core/math/Matrix4.ts";
import {Vector} from "@/core/math/Vector.ts";


// 定义一个联合类型
export type Matrix = Matrix2 | Matrix3 | Matrix4;

// 辅助类型守卫函数
export function isMatrix2(m: Matrix): m is Matrix2 {
    return (m as Matrix2).isMatrix2 === true;
}

export function isMatrix3(m: Matrix): m is Matrix3 {
    return (m as Matrix3).isMatrix3 === true;
}

export function isMatrix4(m: Matrix): m is Matrix4 {
    return (m as Matrix4).isMatrix4 === true;
}

/**
 * 转换成64位的数组
 * @param array 包含向量的数组或二维数字数组
 * @returns 包含所有数据的 Float64Array
 */
export function toFloat64Array(array: Array<Vector> | number[][]): Float64Array {
    if (array.length === 0) {
        return new Float64Array(0);
    }

    if (typeof array[0] === 'object' && 'x' in array[0]) {
        // 处理向量数组
        const vectors = array as Array<Vector>;

        // 先确定所有向量类型，计算总长度
        let totalSize = 0;
        for (const vec of vectors) {
            // 使用向量的toFloat64Array方法获取数组，然后获取其长度
            totalSize += vec.toFloat64Array().length;
        }

        // 创建最终结果数组
        const result = new Float64Array(totalSize);

        // 填充数据
        let offset = 0;
        for (const vec of vectors) {
            const vecArray = vec.toFloat64Array();
            // 使用TypedArray.set方法进行高效复制
            result.set(vecArray, offset);
            offset += vecArray.length;
        }

        return result;
    } else {
        // 处理二维数字数组
        const numArrays = array as number[][];

        // 计算总长度
        let totalSize = 0;
        for (const row of numArrays) {
            totalSize += row.length;
        }

        // 创建结果数组
        const result = new Float64Array(totalSize);

        // 填充数据
        let offset = 0;
        for (const row of numArrays) {
            result.set(row, offset);
            offset += row.length;
        }

        return result;
    }
}

export {
    Matrix2,
    Matrix3,
    Matrix4
}