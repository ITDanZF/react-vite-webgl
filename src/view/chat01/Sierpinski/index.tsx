import {FC, useContext} from "react";
import vertexShader from "@/view/chat01/Sierpinski/vertexShader.glsl"
import fragmentShader from "@/view/chat01/Sierpinski/fragmentShader.glsl"
import {Vector} from "@/utils/Vector.ts";
import {Matrix} from "@/utils/Matrix.ts";
import {WebGLContext} from "@/contexts/WebGLContext.tsx";

const Sierpinski: FC = () => {
    const GL = useContext(WebGLContext)
    if (!GL) return

    //第一步： 创建并编译顶点，片段着色器对象
    const vertexShaderObject = GL.createShader(GL.VERTEX_SHADER) as WebGLShader
    GL.shaderSource(vertexShaderObject, vertexShader)
    GL.compileShader(vertexShaderObject)
    if (!GL.getShaderParameter(vertexShaderObject, GL.COMPILE_STATUS)) {
        console.error(
            'vertexShader compile failed:',
            GL.getShaderInfoLog(vertexShaderObject)
        );
        GL.deleteShader(vertexShaderObject)
        return
    }

    const fragmentShaderObject = GL.createShader(GL.FRAGMENT_SHADER) as WebGLShader
    GL.shaderSource(fragmentShaderObject, fragmentShader)
    GL.compileShader(fragmentShaderObject)
    if (!GL.getShaderParameter(fragmentShaderObject, GL.COMPILE_STATUS)) {
        console.error(
            'fragmentShader compile failed:',
            GL.getShaderInfoLog(fragmentShaderObject)
        );
        GL.deleteShader(fragmentShaderObject)
        return
    }

    //第二步： 创建程序对象容器，完成着色器程序链接（在GPU中分配空间，用于管理着色器和相关资源）
    const program = GL.createProgram() as WebGLProgram
    GL.attachShader(program, vertexShaderObject)
    GL.attachShader(program, fragmentShaderObject)
    GL.linkProgram(program)
    if (
        !GL.getProgramParameter(program, GL.LINK_STATUS)
    ) {
        console.error(
            'Program link failed:',
            GL.getProgramInfoLog(program)
        );
        GL.deleteProgram(program);
        return
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    GL.useProgram(program)

    //第三步： 准备几何数据，把数据写入缓冲区
    // 点位数组
    const positions: Array<Vector> = [];

    // 点位数组的长度
    const numPosition = 500000;

    // 三角形顶点
    const vertices = [
        new Vector(-1, -1),
        new Vector(0, 1),
        new Vector(1, -1),
    ];

    const u = Vector.add(vertices[0], vertices[1]);
    const v = Vector.add(vertices[0], vertices[2]);
    const p = Vector.multiply(Vector.add(u, v), 0.5);
    // console.log(u.toString(), v.toString(), p.toString());
    positions.push(p);

    for (let i = 0; i < numPosition - 1; i++) {
        const j = Math.floor(Math.random() * 3);
        const temp = Vector.add(positions[i], vertices[j]);
        const pos = Vector.multiply(temp, 0.5);
        positions.push(pos);
    }

    const bufferId = GL.createBuffer()
    GL.bindBuffer(GL.ARRAY_BUFFER, bufferId)
    GL.bufferData(
        GL.ARRAY_BUFFER,
        Matrix.toFloat32Array(positions),
        GL.STATIC_DRAW
    )

    // 第四步：从gpu中读取数据，即从缓冲区中读取数据，并渲染到屏幕上
    const aPosition = GL.getAttribLocation(program, 'aPosition');
    GL.enableVertexAttribArray(aPosition);
    GL.vertexAttribPointer(aPosition, 2, GL.FLOAT, false, 0, 0);

    // 清除颜色缓冲区
    GL.clearColor(0.0, 0.0, 0.0, 1.0);
    GL.clear(GL.COLOR_BUFFER_BIT);

    // 绘画
    GL.drawArrays(GL.POINTS, 0, numPosition)

    return <></>
}

export default Sierpinski