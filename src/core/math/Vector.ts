import {Vector2} from "@/core/math/Vector2.ts";
import {Vector3} from "@/core/math/Vector3.ts";
import {Vector4} from "@/core/math/Vector4.ts";


// 定义联合类型Vector
export type Vector = Vector2 | Vector3 | Vector4


/**
 * 创建向量的工厂函数 - 实现
 * @param values 向量分量值
 * @returns 对应维度的向量实例
 * @throws 如果维度不是2,3,4将抛出错误
 */
export function Vector(...values: number[]): Vector {
    // 根据传入参数数量判断维度
    const dimension = values.length;

    switch (dimension) {
        case 2:
            return new Vector2(values[0], values[1]);
        case 3:
            return new Vector3(values[0], values[1], values[2]);
        case 4:
            return new Vector4(values[0], values[1], values[2], values[3]);
        default:
            throw new Error(`不支持的向量维度: ${dimension}，只支持2,3,4维向量`);
    }
}

/**
 * 向量加法函数
 * @param a 第一个向量
 * @param b 第二个向量
 * @returns 两个向量相加的结果
 * @throws 如果向量维度不匹配将抛出错误
 */
export function Add(a: Vector, b: Vector): Vector {
    // 检查两个向量的维度是否匹配
    if (a instanceof Vector2 && b instanceof Vector2) {
        return new Vector2(a.X + b.X, a.Y + b.Y);
    } else if (a instanceof Vector3 && b instanceof Vector3) {
        return new Vector3(a.X + b.X, a.Y + b.Y, a.Z + b.Z);
    } else if (a instanceof Vector4 && b instanceof Vector4) {
        return new Vector4(a.X + b.X, a.Y + b.Y, a.Z + b.Z, a.W + b.W);
    } else {
        throw new Error('向量维度不匹配，无法相加');
    }
}


/**
 * 向量与标量乘法函数 - 实现
 * @param a 第一个参数（向量或标量）
 * @param b 第二个参数（向量或标量）
 * @returns 向量与标量相乘的结果
 */
export function Multiply(a: number | Vector, b: number | Vector): Vector {
    let scalar: number;
    let vector: Vector;

    // 确定哪个参数是标量，哪个是向量
    if (typeof a === 'number' && (b instanceof Vector2 || b instanceof Vector3 || b instanceof Vector4)) {
        scalar = a;
        vector = b;
    } else if ((a instanceof Vector2 || a instanceof Vector3 || a instanceof Vector4) && typeof b === 'number') {
        vector = a;
        scalar = b;
    } else {
        throw new Error('Multiply 函数参数错误，需要一个标量和一个向量');
    }

    // 根据向量类型进行乘法运算
    if (vector instanceof Vector2) {
        return new Vector2(vector.X * scalar, vector.Y * scalar);
    } else if (vector instanceof Vector3) {
        return new Vector3(vector.X * scalar, vector.Y * scalar, vector.Z * scalar);
    } else if (vector instanceof Vector4) {
        return new Vector4(vector.X * scalar, vector.Y * scalar, vector.Z * scalar, vector.W * scalar);
    } else {
        // 这行代码不应该被执行，因为我们已经在前面做了类型检查
        throw new Error('未知的向量类型');
    }
}


export {
    Vector2,
    Vector3,
    Vector4
}