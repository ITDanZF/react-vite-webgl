import {Matrix} from "@/utils/Matrix.ts";
import {Vector} from "@/utils/Vector.ts";

export type WebGL = WebGL2RenderingContext
export type Shader = string

/**
 * 对webgl整个编译连接进行封装，待完善！！！
 */
class ShaderWebGL {
    public GL: WebGL
    constructor(gl: WebGL) {
        this.GL = gl;
    }

    /**
     * 创建着色器对象
     * @param shaderSource
     * @param shaderType
     */
    createShader(shaderSource: Shader, shaderType: number) {
        const ShaderObject = this.GL.createShader(shaderType) as WebGLShader
        this.GL.shaderSource(ShaderObject, shaderSource)
        this.GL.compileShader(ShaderObject)
        if (!this.GL.getShaderParameter(ShaderObject, this.GL.COMPILE_STATUS)) {
            console.error(
                'Shader compile failed:',
                this.GL.getShaderInfoLog(ShaderObject)
            );
            this.GL.deleteShader(ShaderObject)
            return null;
        }
        return ShaderObject;
    }

    /**
     * 创建程序对象容器
     * @param vertexShaderObject 顶点着色器程序对象
     * @param fragmentShaderObject 片段着色器程序对象
     * @param type
     */
    createProgram(vertexShaderObject: WebGLShader, fragmentShaderObject: WebGLShader, type: number = this.GL.LINK_STATUS) {
        const program = this.GL.createProgram() as WebGLProgram
        this.GL.attachShader(program, vertexShaderObject)
        this.GL.attachShader(program, fragmentShaderObject)
        this.GL.linkProgram(program)
        if (
            !this.GL.getProgramParameter(program, type)
        ) {
            console.error(
                'Program link failed:',
                this.GL.getProgramInfoLog(program)
            );
            this.GL.deleteProgram(program);
            return null
        }
        this.GL.useProgram(program);
        return program
    }

    /**
     * 创建，并写入数据缓冲区
     * @param positions
     * @param BufferType 缓冲区数据类型
     * @param usage
     */
    createBuffer(positions: Array<Vector> | Float32Array, BufferType: number = this.GL.ARRAY_BUFFER, usage: number = this.GL.STATIC_DRAW) {
        let BufferData = null;
        if (positions instanceof Float32Array) {
            BufferData = positions
        } else {
            BufferData = Matrix.toFloat32Array(positions)
        }
        const bufferId = this.GL.createBuffer()
        this.GL.bindBuffer(BufferType, bufferId)
        this.GL.bufferData(
            this.GL.ARRAY_BUFFER,
            BufferData,
            usage
        )

        return bufferId;
    }


    /**
     * 把数据传入GPU缓冲区
     *
     * @param program - 已编译并链接的 WebGL 程序
     * @param attributeName - 顶点着色器中的属性名称
     * @param data - 要上传到 GPU 的数据（Float32Array）
     * @param size - 每个顶点属性的分量数量
     * @param type - 数据的类型，默认为 gl.FLOAT
     * @param usage - 数据的使用模式，默认为 gl.STATIC_DRAW
     * @returns 创建的缓冲区对象
     */
    setupAttribute(
        program: WebGLProgram,
        attributeName: string,
        data: Float32Array | Array<Vector>,
        size: number,
        type: number = this.GL.FLOAT,
        usage: number = this.GL.STATIC_DRAW
    ): WebGLBuffer | null {
        // 创建缓冲区
        const buffer = this.createBuffer(data, this.GL.ARRAY_BUFFER, usage);
        if (!buffer) {
            console.error(`Failed to create buffer for attribute: ${attributeName}`);
            return null;
        }

        // 获取属性位置
        const attribLocation = this.GL.getAttribLocation(program, attributeName);
        if (attribLocation === -1) {
            console.error(`Attribute not found: ${attributeName}`);
            return null;
        }

        // 设置顶点属性指针
        this.GL.vertexAttribPointer(attribLocation, size, type, false, 0, 0);
        this.GL.enableVertexAttribArray(attribLocation);

        return buffer;
    }

    /**
     * 更新缓冲区数据
     * @param buffer - 需要更新的缓冲区对象
     * @param data - 新的数据，支持 Vector 数组或 Float32Array
     * @param bufferType - 缓冲区类型，默认为 GL.ARRAY_BUFFER
     */
    updateBuffer(
        buffer: WebGLBuffer,
        data: Array<Vector> | Float32Array,
        bufferType: number = this.GL.ARRAY_BUFFER
    ): void {
        let bufferData: Float32Array;
        if (data instanceof Float32Array) {
            bufferData = data;
        } else {
            bufferData = Matrix.toFloat32Array(data);
        }

        this.GL.bindBuffer(bufferType, buffer);
        this.GL.bufferSubData(bufferType, 0, bufferData);
    }


    /**
     * 创建程序对象，从顶点和片段着色器源代码
     * @param vertexSource 顶点着色器源代码
     * @param fragmentSource 片段着色器源代码
     * @returns 创建的程序对象或 null
     */
    createProgramFromSources(vertexSource: Shader, fragmentSource: Shader): WebGLProgram | null {
        const vertexShader = this.createShader(vertexSource, this.GL.VERTEX_SHADER);
        const fragmentShader = this.createShader(fragmentSource, this.GL.FRAGMENT_SHADER);

        if (!vertexShader || !fragmentShader) {
            return null;
        }

        const program = this.createProgram(vertexShader, fragmentShader);

        // 可以在此处删除着色器，因为它们已经链接到程序中了
        if (vertexShader) this.GL.deleteShader(vertexShader);
        if (fragmentShader) this.GL.deleteShader(fragmentShader);

        return program;
    }
}

export default ShaderWebGL;