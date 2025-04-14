import {Matrix2} from "@/core/math/Matrix2.ts";
import {Matrix3} from "@/core/math/Matrix3.ts";
import {Matrix4} from "@/core/math/Matrix4.ts";
import {Vector} from "@/core/math/Vector.ts";


// 定义一个联合类型
export type Matrix = Matrix2 | Matrix3 | Matrix4;


/**
 * 转换成64位的数组
 * @param array 包含向量的数组或二维数字数组
 * @returns 包含所有数据的 Float64Array
 */
export function toFloat64Array(array: Array<Vector> | number[][]): Float64Array {

}


/**
 * 创建矩阵的工厂函数
 * @param dimension 矩阵维度(2,3,4)，表示nxn矩阵
 * @param values 矩阵元素值，按行主序排列。如果提供的值少于维度^2，将用单位矩阵的对应位置填充
 * @returns 对应维度的矩阵实例
 * @throws 如果维度不是2,3,4将抛出错误
 */
export function Matrix(dimension: 2 | 3 | 4, ...values: number[]): Matrix {
    // 计算矩阵所需的元素总数
    const totalElements = dimension * dimension;

    // 确保values长度等于totalElements，不足则用单位矩阵对应位置的值填充
    const paddedValues = [...values];
    while (paddedValues.length < totalElements) {
        // 计算当前位置对应的行列索引
        const currentIndex = paddedValues.length;
        const row = Math.floor(currentIndex / dimension);
        const col = currentIndex % dimension;

        // 如果是对角线位置，填充1，否则填充0（单位矩阵）
        paddedValues.push(row === col ? 1 : 0);
    }

    // 根据不同维度创建对应的矩阵
    switch (dimension) {
        case 2:
            return new Matrix2(
                paddedValues[0], paddedValues[1],
                paddedValues[2], paddedValues[3]
            );
        case 3:
            return new Matrix3(
                paddedValues[0], paddedValues[1], paddedValues[2],
                paddedValues[3], paddedValues[4], paddedValues[5],
                paddedValues[6], paddedValues[7], paddedValues[8]
            );
        case 4:
            return new Matrix4(
                paddedValues[0], paddedValues[1], paddedValues[2], paddedValues[3],
                paddedValues[4], paddedValues[5], paddedValues[6], paddedValues[7],
                paddedValues[8], paddedValues[9], paddedValues[10], paddedValues[11],
                paddedValues[12], paddedValues[13], paddedValues[14], paddedValues[15]
            );
        default:
            throw new Error(`不支持的矩阵维度: ${dimension}，只支持2,3,4维矩阵`);
    }
}

export {
    Matrix2,
    Matrix3,
    Matrix4
}