import { useEffect, useRef, useCallback } from "react";

/**
 * useRender Hook
 * - 动画渲染：传递帧率参数时启用动画模式
 * - 静态渲染：不传递帧率时仅调用一次
 * - 动画模式支持动态暂停与播放
 *
 * @param render - 渲染的回调函数
 * @param fps - 每秒帧率（默认 60fps），小于等于 0 时视为静态模式
 * @param isPlaying - 是否播放动画（仅动画模式下有效，默认 true）
 * @returns 控制函数：start、stop
 */
const useRender = (
    render: () => void,
    fps: number = 60,
    isPlaying: boolean = true
) => {
    const requestRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);
    const isRunningRef = useRef(false);

    const frameInterval = fps > 0 ? 1000 / fps : null;

    const animate = useCallback(
        (time: number) => {
            if (!isPlaying || !frameInterval || !isRunningRef.current) {
                return; // 停止动画
            }

            if (lastTimeRef.current === null) {
                lastTimeRef.current = time;
            }

            if (time - lastTimeRef.current >= frameInterval) {
                lastTimeRef.current = time;
                render();
            }

            requestRef.current = requestAnimationFrame(animate);
        },
        [isPlaying, frameInterval, render]
    );

    useEffect(() => {
        if (!frameInterval) {
            // 静态模式
            render();
            return;
        }

        // 动画模式
        isRunningRef.current = true;
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
                requestRef.current = null;
            }
            lastTimeRef.current = null;
            isRunningRef.current = false;
        };
    }, [fps, animate, render]);

    // 返回控制方法
    const start = () => {
        if (!frameInterval) {
            console.warn("Cannot start animation in static mode.");
            return;
        }
        isRunningRef.current = true;
        if (requestRef.current === null) {
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    const stop = () => {
        isRunningRef.current = false;
        if (requestRef.current !== null) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = null;
        }
    };

    return { start, stop };
};

export default useRender;
