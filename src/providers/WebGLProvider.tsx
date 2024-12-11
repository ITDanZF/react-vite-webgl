import { FC, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // 路由 hook
import { WebGLContext } from "@/contexts/WebGLContext";
import MainLayoutScss from "@/component/ManLayout.module.scss";


export const WebGLProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [gl, setGl] = useState<WebGL2RenderingContext | null>(null);
    const [canvasKey, setCanvasKey] = useState(0); // 用于重置 canvas 的唯一标识符
    const location = useLocation(); // 路由信息

    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (!canvas) return;

        const GL = canvas.getContext("webgl2");
        if (!GL) return;

        // 初始化 WebGL
        GL.clearColor(0.0, 0.0, 0.0, 1.0);
        GL.clear(GL.COLOR_BUFFER_BIT);
        GL.viewport(0, 0, canvas.width, canvas.height);

        // 更新 gl 状态，传递 WebGL 上下文
        setGl(GL);

        // 清理函数
        return () => {
            GL.clear(GL.COLOR_BUFFER_BIT);
            setGl(null);
        };
    }, [canvasKey]); // 每次 canvasKey 改变时重新初始化

    // 路由变化时重置 canvas
    useEffect(() => {
        setCanvasKey((prev) => prev + 1); // 每次路由变化时改变 key
    }, [location.pathname]); // 监听路径变化

    return (
        <>
            <canvas
                id="canvas"
                key={canvasKey} // 通过 key 触发 React 重新渲染
                className={MainLayoutScss.CANVAS}
                width={window.innerWidth}
                height={window.innerHeight}
            ></canvas>
            {gl && (
                <WebGLContext.Provider value={gl}>
                    {children}
                </WebGLContext.Provider>
            )}
        </>
    );
};
