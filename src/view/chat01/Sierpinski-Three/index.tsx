import {FC, useContext} from "react";
import {WebGLContext} from "@/contexts/WebGLContext.tsx";
import {Vector} from "@/utils/Vector.ts";
import ShaderWebGL from "@/utils/ShaderWebGL.ts";
import vertexShader from '@/view/chat01/Sierpinski-Three/vertexShader.glsl';
import fragmentShader from '@/view/chat01/Sierpinski-Three/fragmentShader.glsl'
import {Matrix} from "@/utils/Matrix.ts";
import useRender from "@/hook/useRender.tsx";

/**
 * 使用具有三维坐标的数据进行渲染,在顶点着色器其中基于顶点计算出每个顶点的颜色
 * @constructor
 */
const SierpinskiThree: FC = () => {
    const GL = useContext(WebGLContext) as WebGL2RenderingContext;

    // 创建，编译，连接着色器程序
    const WebGL = new ShaderWebGL(GL)
    const vertexShaderObject = WebGL.createShader(vertexShader, GL.VERTEX_SHADER) as WebGLShader;
    const fragmentShaderObject = WebGL.createShader(fragmentShader, GL.FRAGMENT_SHADER) as WebGLShader;
    const program = WebGL.createProgram(vertexShaderObject, fragmentShaderObject) as WebGLProgram;

    // 生成待渲染的数据
    const vertices = [
        new Vector(-0.5, -0.5, -0.5),
        new Vector(0.5, -0.5, -0.5),
        new Vector(0.0, 0.5, 0.0),
        new Vector(0.0, -0.5, 0.5)
    ]

    const numPosition = 5000
    const positions = [new Vector(0.0, 0.0, 0.0)]

    for (let i = 0; i < numPosition - 1; i++) {
        const j = Math.floor(Math.random() * 4)
        positions.push(Vector.lerp(positions[i], vertices[j], 0.5));
    }

    // 将数据写入缓冲区
    const bufferId = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, bufferId);
    GL.bufferData(GL.ARRAY_BUFFER, Matrix.toFloat32Array(positions), GL.STATIC_DRAW)

    // 设置顶点属性指针
    const aPosition = GL.getAttribLocation(program, 'aPosition');
    GL.vertexAttribPointer(aPosition, 3, GL.FLOAT, false, 0, 0)
    GL.enableVertexAttribArray(aPosition)

    // 定义渲染函数
    const render = () => {

        // 清除颜色缓冲区
        GL.clearColor(0.0, 0.0, 0.0, 1.0);
        GL.clear(GL.COLOR_BUFFER_BIT);

        // 绘画
        GL.drawArrays(GL.POINTS, 0, numPosition)
    }

    // 使用hook函数完成渲染
    useRender(render)

    return <></>
}

export default SierpinskiThree