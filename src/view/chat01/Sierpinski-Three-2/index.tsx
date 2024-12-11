import {FC, useContext} from "react";
import {WebGLContext} from "@/contexts/WebGLContext.tsx";
import ShaderWebGL from "@/utils/ShaderWebGL.ts";
import vertexShader from "@/view/chat01/Sierpinski-Three-2/vertexShader.glsl";
import fragmentShader from "@/view/chat01/Sierpinski-Three-2/fragmentShader.glsl";
import {Vector} from "@/utils/Vector.ts";
import useRender from "@/hook/useRender.tsx";

/**
 * 绘画四面体
 * @constructor
 */
const SierpinskiThree2: FC = () => {
    const GL = useContext(WebGLContext) as WebGL2RenderingContext;

    // 创建，编译，连接着色器程序
    const WebGL = new ShaderWebGL(GL)
    const program = WebGL.createProgramFromSources(vertexShader, fragmentShader) as WebGLProgram;


    // 准备待渲染的数据
    const vertices = [
        new Vector(-0.5, -0.5, -0.5),
        new Vector(0.5, -0.5, -0.5),
        new Vector(0.0, 0.5, 0.0),
        new Vector(0.0, -0.5, 0.5)
    ]

    const baseColors = [
        new Vector(1.0, 0.0, 0.0),
        new Vector(0.0, 1.0, 0.0),
        new Vector(0.0, 0.0, 1.0),
        new Vector(0.0, 0.0, 0.0)
    ]

    const positions: Array<Vector> = []
    const colors: Array<Vector> = []

    function triangle(a: Vector, b: Vector, c: Vector, colorIndex: number) {
        colors.push(baseColors[colorIndex])
        positions.push(a)

        colors.push(baseColors[colorIndex])
        positions.push(b)

        colors.push(baseColors[colorIndex])
        positions.push(c)
    }

    function tetra(a: Vector, b: Vector, c: Vector, d: Vector) {
        triangle(a, c, b, 0)
        triangle(a, c, d, 1)
        triangle(a, b, d, 2)
        triangle(b, c, d, 3)
    }

    function divideTetra(a: Vector, b: Vector, c: Vector, d: Vector, count: number) {
        if (count === 0) {
            tetra(a, b, c, d)
        } else {
            const ab = Vector.lerp(a, b, 0.5)
            const ac = Vector.lerp(a, c, 0.5)
            const ad = Vector.lerp(a, d, 0.5)
            const bc = Vector.lerp(b, c, 0.5)
            const bd = Vector.lerp(b, d, 0.5)
            const cd = Vector.lerp(c, d, 0.5)

            --count

            divideTetra(a, ab, ac, ad, count)
            divideTetra(ab, b, bc, bd, count)
            divideTetra(ac, c, bc, cd, count)
            divideTetra(ad, d, cd, bd, count)
        }
    }

    divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], 5)

    WebGL.setupAttribute(program, 'aPosition', positions, 3, GL.FLOAT, GL.STATIC_DRAW)
    WebGL.setupAttribute(program, 'aColor', colors, 3, GL.FLOAT, GL.STATIC_DRAW)

    GL.enable(GL.DEPTH_TEST)

    const render = () => {
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT)
        GL.drawArrays(GL.TRIANGLES, 0, positions.length)
    }

    useRender(render)



    return <></>
}

export default SierpinskiThree2;