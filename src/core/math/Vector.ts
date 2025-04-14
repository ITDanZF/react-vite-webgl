import {Vector2} from "@/core/math/Vector2.ts";
import {Vector3} from "@/core/math/Vector3.ts";
import {Vector4} from "@/core/math/Vector4.ts";


// 定义联合类型Vector
export type Vector = Vector2 | Vector3 | Vector4

// 辅助类型守卫函数
export function isVector2(v: Vector): v is Vector2 {
    return (v as Vector2).isVector2 === true;
}

export function isVector3(v: Vector): v is Vector3 {
    return (v as Vector3).isVector3 === true;
}

export function isVector4(v: Vector): v is Vector4 {
    return (v as any).isVector4 === true || ((v as any).w !== undefined && (v as any).z !== undefined);
}

export {
    Vector2,
    Vector3,
    Vector4
}