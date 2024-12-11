import {FC, useContext} from "react";
import {WebGLContext} from "@/contexts/WebGLContext.tsx";
import ShaderWebGL from "@/utils/ShaderWebGL.ts";
import vertexShader from "@/view/chat01/Sierpinski-colors/vertexShader.glsl";
import fragmentShader from "@/view/chat01/Sierpinski-colors/fragmentShader.glsl";
import {Vector} from "@/utils/Vector.ts";

import useRender from "@/hook/useRender.tsx";

/**
 * 将颜色以及点位数据写入缓存中
 * @constructor
 */
const SierpinskiColors: FC = () => {

    const GL =  useContext(WebGLContext) as WebGL2RenderingContext

    // 创建，编译，连接着色器程序
    const WebGL = new ShaderWebGL(GL)
    const program = WebGL.createProgramFromSources(vertexShader, fragmentShader) as WebGLProgram;

    // 生成待渲染的数据
    const vertices = [
        new Vector(-0.5, -0.5, -0.5),
        new Vector(0.5, -0.5, -0.5),
        new Vector(0.0, 0.5, 0.0),
        new Vector(0.0, -0.5, 0.5)
    ]

    const colors = [new Vector(0.0, 0.0, 0.0, 1.0)]

    const numPosition = 5000
    const positions = [new Vector(0.0, 0.0, 0.0)]

    for (let i = 0; i < numPosition - 1; i++) {
        const j = Math.floor(Math.random() * 4)
        positions.push(Vector.lerp(positions[i], vertices[j], 0.5));
        colors.push(
            new Vector(
                (1.0 + positions[i].get(0)) / 2.0,
                (1.0 + positions[i].get(1)) / 2.0,
                (1.0 + positions[i].get(2)) / 2.0,
                1.0
            )
        );
    }

    // 将数据写入缓冲区
    WebGL.setupAttribute(program, 'aPosition', positions, 3, GL.FLOAT, GL.STATIC_DRAW);
    WebGL.setupAttribute(program, 'aColor', colors, 4, GL.FLOAT, GL.STATIC_DRAW);

    const render = () => {
        // 清除颜色缓冲区
        GL.clearColor(0.0, 0.0, 0.0, 1.0);
        GL.clear(GL.COLOR_BUFFER_BIT);

        // 绘画
        GL.drawArrays(GL.POINTS, 0, numPosition)
    }

    // 渲染
    useRender(render)
    return <></>
}

export default SierpinskiColors