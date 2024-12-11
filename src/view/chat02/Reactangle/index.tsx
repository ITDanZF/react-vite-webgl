import {FC, useContext} from "react";
import {Vector} from "@/utils/Vector.ts";
import {Matrix} from "@/utils/Matrix.ts";
import vertexShader from '@/view/chat02/Reactangle/vertexShader.glsl'
import fragmentShader from '@/view/chat02/Reactangle/fragmentShader.glsl'
import shaderWebGL from "@/utils/ShaderWebGL.ts";
import {WebGLContext} from "@/contexts/WebGLContext.tsx";
import useRender from "@/hook/useRender.tsx";
/**
 * 使用动画让正方形进行旋转
 * 思路：cpu将初始数据发送给gpu,然后在每一次的绘制中将旋转角度传递给gpu,gpu依据旋转矩阵计算出新的旋转位置
 * @param GL
 * @constructor
 */
const Rectangle: FC = ( ) => {

    const GL = useContext(WebGLContext) as WebGL2RenderingContext;
    const WebGL = new shaderWebGL(GL)

    const vertexShaderObject = WebGL.createShader(vertexShader, GL.VERTEX_SHADER) as WebGLShader;
    const fragmentShaderObject = WebGL.createShader(fragmentShader, GL.FRAGMENT_SHADER) as WebGLShader;
    const program = WebGL.createProgram(vertexShaderObject, fragmentShaderObject) as WebGLProgram;

    const vertices = [
        new Vector(0, 1),
        new Vector(-1, 0),
        new Vector(1, 0),
        new Vector(0, -1)
    ]

    let theta = 0.0

    // 将初始数据写入缓冲区中
    const bufferId = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, bufferId);
    GL.bufferData(GL.ARRAY_BUFFER, Matrix.toFloat32Array(vertices), GL.STATIC_DRAW)

    // Uniform变量是可以在渲染过程中动态改变的数据
    const thetaLoc = GL.getUniformLocation(program, 'u');

    // 设置顶点属性指针
    GL.vertexAttribPointer(thetaLoc as number, 2, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(thetaLoc as number);
    GL.uniform1f(thetaLoc, theta) // uniform1f函数用于设置一个浮点型的uniform变量

    // 绘制

    // 方法一：setInterval 是固定时间间隔触发,不考虑屏幕实际的刷新时机。这可能导致一个屏幕刷新周期内执行多次渲染,造成"掉帧"现象。
    // const render = () => {
    //     GL.clear(GL.COLOR_BUFFER_BIT)
    //     theta += 0.1;
    //     GL.uniform1f(thetaLoc, theta)
    //     GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4)
    // }
    // setInterval(render, 10);
    // setInterval(render, 10);

    // 方法二： requestAnimationFrame 会自动与显示器的刷新率(通常是60Hz)同步，会显示的更加平滑
    // const render = () => {
    //     GL.clear(GL.COLOR_BUFFER_BIT)
    //     theta += 0.1
    //     GL.uniform1f(thetaLoc, theta)
    //     GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4)
    //     requestAnimationFrame(render)
    // }
    // render()

    // 方法三： 动画帧率被强制限制在约 10fps
    // fps: 每秒多少帧
    // 每帧间隔：100ms = 0.1s
    // FPS = 1秒/每帧间隔 = 1/0.1 = 10fps
    // const render = () => {
    //     setTimeout(() => {
    //         requestAnimationFrame(render)
    //         GL.clear(GL.COLOR_BUFFER_BIT)
    //         theta += 0.1
    //         GL.uniform1f(thetaLoc, theta)
    //         GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4)
    //     }, 100)
    // }
    // render()

    // 手动控制屏幕刷新率为60HZ，即帧率为60FPS, 即每帧16.7ms
    // 1秒=1000ms
    // 60HZ=每秒刷新60次
    // 每帧时间 = 1s/60 = 1000ms / 60 =16.7ms
    // const render = () => {
    //     setTimeout(() => {
    //         requestAnimationFrame(render)
    //         GL.clear(GL.COLOR_BUFFER_BIT)
    //         theta += 0.1
    //         console.log(theta, 'th')
    //         GL.uniform1f(thetaLoc, theta)
    //         GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4)
    //     }, 1000 / 60)
    // }
    // render()

    // 推荐：使用useRender hook
    const render = () => {
        GL.clear(GL.COLOR_BUFFER_BIT)
        theta += 0.1
        GL.uniform1f(thetaLoc, theta)
        GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4)
    }

    // 渲染 120fps
    useRender(render, 120)

    /**
     * 总结：
     *  FPS: 每秒多少帧，60FPS表示每秒60帧
     *  HZ: 执行的频率，这里指每秒刷新屏幕次数。
     *      1. 60HZ表示每秒刷新屏幕60次，刷新一次屏幕则需要16.7ms, 计算过程：
     *          每刷新一次屏幕，则完成一帧的渲染，而60HZ则表示完成一帧（完成一次屏幕刷新）需要时间是 1/60 = 0.0166...秒 ≈ 16.7ms
     *      2. 60HZ显示器帧率为60FPS 即每秒完成60帧的渲染，计算过程：
     *          1000ms(1秒) / 16.7ms(一帧时间) ≈ 60FPS
     */
    return null
}

export default Rectangle;