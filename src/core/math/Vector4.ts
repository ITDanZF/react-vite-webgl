import { clamp } from './MathUtils';
class Vector4 {
    private x: number = 0;
    private y: number = 0;
    private z: number = 0;
    private w: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    /**
     * 在纹理坐标中表示宽度
     */
    get width(): number {
        return this.z;
    }


    /**
     * 在纹理坐标中表示宽度
     */
    set width(value: number) {
        this.z = value;
    }

    /**
     * 在纹理坐标中表示高度
     */
    get height(): number {
        return this.w;
    }

    /**
     * 在纹理坐标中表示高度
     * @param value
     */
    set height(value: number) {
        this.w = value;
    }

    set(x: number, y: number, z: number, w: number): Vector4 {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    setScalar(scalar: number): Vector4 {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        this.w = scalar;
        return this;
    }

    setX(x: number): Vector4 {
        this.x = x;
        return this;
    }

    setY(y: number): Vector4 {
        this.y = y;
        return this;
    }

    setZ(z: number): Vector4 {
        this.z = z;
        return this;
    }


    setW(w: number): Vector4 {
        this.w = w;
        return this;
    }

    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }

    get Z() {
        return this.z;
    }


    get W() {
        return this.w;
    }


    setComponent(index: number, value: number): Vector4 {
        switch (index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            case 2: this.z = value; break;
            case 3: this.w = value; break;
            default: throw new Error('index is out of range: ' + index);
        }
        return this;
    }


    getComponent(index: number): number {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            case 3: return this.w;
            default: throw new Error('index is out of range: ' + index);
        }
    }


    clone(): Vector4 {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    copy(v: Vector4): Vector4 {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w;
        return this;
    }

    add(v: Vector4): Vector4 {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    }

    addScalar(s: number): Vector4 {
        this.x += s;
        this.y += s;
        this.z += s;
        this.w += s;
        return this;
    }

    addVectors(a: Vector4, b: Vector4): Vector4 {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;
        return this;
    }

    addScaledVector(v: Vector4, s: number): Vector4 {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        this.w += v.w * s;
        return this;
    }

    sub(v: Vector4): Vector4 {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    }

    subScalar(s: number): Vector4 {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        this.w -= s;
        return this;
    }

    subVectors(a: Vector4, b: Vector4): Vector4 {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;
        return this;
    }

    multiplyScalar(scalar: number): Vector4 {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }

    multiply(v: Vector4): Vector4 {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;
        return this;
    }

    applyMatrix4(m: any): Vector4 {
        const x = this.x, y = this.y, z = this.z, w = this.w;
        const e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
        this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
        return this;
    }

    divideScalar(scalar: number): Vector4 {
        return this.multiplyScalar(1 / scalar);
    }

    setAxisAngleFromQuaternion(q: any): Vector4 {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
        // q is assumed to be normalized
        this.w = 2 * Math.acos(q.w);
        const s = Math.sqrt(1 - q.w * q.w);
        if (s < 0.0001) {
            this.x = 1;
            this.y = 0;
            this.z = 0;
        } else {
            this.x = q.x / s;
            this.y = q.y / s;
            this.z = q.z / s;
        }
        return this;
    }


    setFromMatrixPosition(m: any): Vector4 {
        const e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        return this;
    }

    min(v: Vector4): Vector4 {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        this.w = Math.min(this.w, v.w);
        return this;
    }

    max(v: Vector4): Vector4 {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        this.w = Math.max(this.w, v.w);
        return this;
    }

    clamp(min: Vector4, max: Vector4): Vector4 {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        this.z = clamp(this.z, min.z, max.z);
        this.w = clamp(this.w, min.w, max.w);
        return this;
    }

    clampScalar(minVal: number, maxVal: number): Vector4 {
        this.x = clamp(this.x, minVal, maxVal);
        this.y = clamp(this.y, minVal, maxVal);
        this.z = clamp(this.z, minVal, maxVal);
        this.w = clamp(this.w, minVal, maxVal);
        return this;
    }

    clampLength(min: number, max: number): Vector4 {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
    }

    floor(): Vector4 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        this.w = Math.floor(this.w);
        return this;
    }

    ceil(): Vector4 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        this.w = Math.ceil(this.w);
        return this;
    }

    round(): Vector4 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        this.w = Math.round(this.w);
        return this;
    }

    roundToZero(): Vector4 {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        this.z = Math.trunc(this.z);
        this.w = Math.trunc(this.w);
        return this;
    }

    negate(): Vector4 {
        this.x = - this.x;
        this.y = - this.y;
        this.z = - this.z;
        this.w = - this.w;
        return this;
    }

    dot(v: Vector4): number {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    lengthSq(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    manhattanLength(): number {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }

    normalize(): Vector4 {
        return this.divideScalar(this.length() || 1);
    }

    setLength(length: number): Vector4 {
        return this.normalize().multiplyScalar(length);
    }

    lerp(v: Vector4, alpha: number): Vector4 {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        this.w += (v.w - this.w) * alpha;
        return this;
    }

    lerpVectors(v1: Vector4, v2: Vector4, alpha: number): Vector4 {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        this.z = v1.z + (v2.z - v1.z) * alpha;
        this.w = v1.w + (v2.w - v1.w) * alpha;
        return this
    }

    equals(v: Vector4): boolean {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));
    }

    fromArray(array: number[], offset: number = 0): Vector4 {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;
    }

    toArray(array: number[] = [], offset: number = 0): number[] {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }

    fromBufferAttribute(attribute: any, index: number): Vector4 {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        this.w = attribute.getW(index);
        return this;
    }

    random(): Vector4 {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        this.w = Math.random();
        return this;
    }

    /**
     * 从字符串解析 Vector4。
     * @param text - 字符串，用括号包围的四个数字，用逗号分隔。
     * @returns Vector4。
     */
    fromString(text: string): Vector4 {
        const p = text.split(',');
        this.x = parseFloat(p[0]);
        this.y = parseFloat(p[1]);
        this.z = parseFloat(p[2]);
        this.w = parseFloat(p[3]);
        return this;
    }

    /**
     * 将向量转换为 Float32Array 格式，适用于 WebGL 缓冲区数据。
     * @returns 包含向量分量的 Float32Array。
     */
    toFloat32Array(): Float32Array {
        return new Float32Array([this.x, this.y, this.z, this.w]);
    }

    /**
     * 从 Float32Array 设置向量的分量。
     * @param array - 包含向量分量的 Float32Array。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 当前 Vector4 实例。
     */
    fromFloat32Array(array: Float32Array, offset = 0): Vector4 {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;
    }

    /**
     * 将向量转换为 Float64Array 格式，适用于需要双精度的场景。
     * @returns 包含向量分量的 Float64Array。
     */
    toFloat64Array(): Float64Array {
        return new Float64Array([this.x, this.y, this.z, this.w]);
    }

    /**
     * 从 Float64Array 设置向量的分量。
     * @param array - 包含向量分量的 Float64Array。
     * @param offset - 数组中的起始偏移量，默认为 0。
     * @returns 当前 Vector4 实例。
     */
    fromFloat64Array(array: Float64Array, offset = 0): Vector4 {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;
    }

    
    *[ Symbol.iterator ]() {

        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;

    }

}


export { Vector4 };