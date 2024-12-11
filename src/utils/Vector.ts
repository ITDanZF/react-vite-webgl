export class Vector {
    readonly components: Float32Array;

    constructor(...components: Array<number>) {
        this.components = new Float32Array(components);
    }

    // 获取向量的维度
    get dimension() {
        return this.components.length;
    }

    // 向量加法（静态方法）
    static add(vector1: Vector, vector2: Vector) {
        if (vector1.dimension !== vector2.dimension) {
            throw new Error(
                'Vectors must be of the same dimension for addition.'
            );
        }
        const result = new Float32Array(vector1.dimension);
        for (let i = 0; i < vector1.dimension; i++) {
            result[i] = vector1.components[i] + vector2.components[i];
        }
        return new Vector(...result);
    }

    // 向量减法（静态方法）
    static subtract(vector1: Vector, vector2: Vector) {
        if (vector1.dimension !== vector2.dimension) {
            throw new Error(
                'Vectors must be of the same dimension for subtraction.'
            );
        }
        const result = new Float32Array(vector1.dimension);
        for (let i = 0; i < vector1.dimension; i++) {
            result[i] = vector1.components[i] - vector2.components[i];
        }
        return new Vector(...result);
    }

    // 标量乘法（静态方法）
    static multiply(vector: Vector, scalar: number) {
        const result = new Float32Array(vector.dimension);
        for (let i = 0; i < vector.dimension; i++) {
            result[i] = vector.components[i] * scalar;
        }
        return new Vector(...result);
    }

    // 标量乘法（静态方法）
    static addValue(vector: Vector, scalar: number) {
        const result = new Float32Array(vector.dimension);
        for (let i = 0; i < vector.dimension; i++) {
            result[i] = vector.components[i] + scalar;
        }
        return new Vector(...result);
    }

    // 叉乘（仅适用于 3 维向量）（静态方法）
    static cross(vector1: Vector, vector2: Vector) {
        if (vector1.dimension !== 3 || vector2.dimension !== 3) {
            throw new Error(
                'Cross product is only defined for 3-dimensional vectors.'
            );
        }
        const result = new Float32Array(3);
        const [a1, a2, a3] = vector1.components;
        const [b1, b2, b3] = vector2.components;
        result[0] = a2 * b3 - a3 * b2;
        result[1] = a3 * b1 - a1 * b3;
        result[2] = a1 * b2 - a2 * b1;
        return new Vector(...result);
    }

    // 线性插值（静态方法）
    static lerp(vector1: Vector, vector2: Vector, t: number) {
        if (vector1.dimension !== vector2.dimension) {
            throw new Error(
                'Vectors must be of the same dimension for interpolation.'
            );
        }
        const result = new Float32Array(vector1.dimension);
        for (let i = 0; i < vector1.dimension; i++) {
            result[i] =
                (1 - t) * vector1.components[i] + t * vector2.components[i];
        }
        return new Vector(...result);
    }

    // 向量的内积（点积）（静态方法）
    static dot(vector1: Vector, vector2: Vector) {
        if (vector1.dimension !== vector2.dimension) {
            throw new Error(
                'Vectors must be of the same dimension for dot product.'
            );
        }
        let result = 0;
        for (let i = 0; i < vector1.dimension; i++) {
            result += vector1.components[i] * vector2.components[i];
        }
        return result;
    }

    // 向量长度（实例方法）
    magnitude() {
        let sum = 0;
        for (let i = 0; i < this.dimension; i++) {
            sum += this.components[i] * this.components[i];
        }
        return Math.sqrt(sum);
    }

    // 单位化（归一化）（实例方法）
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            throw new Error('Cannot normalize a zero vector.');
        }
        return Vector.multiply(this, 1 / mag);
    }

    // 获取向量的分量（实例方法）
    get(i: number) {
        return this.components[i];
    }

    // 转换为字符串格式便于查看（实例方法）
    toString() {
        return `[${Array.from(this.components).join(', ')}]`;
    }

    // 转换为 Float32Array（实例方法）
    toFloat32Array() {
        return this.components;
    }

    // 从 Float32Array 创建 Vector（静态方法）
    static fromFloat32Array(arr: Float32Array) {
        return new Vector(...arr);
    }
}
