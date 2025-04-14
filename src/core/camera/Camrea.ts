/*
模型坐标系(本地) → 世界坐标系 → 相机坐标系 → 裁剪坐标系 → NDC → 屏幕坐标系
     ↑              ↑           ↑            ↑         ↑         ↑
  模型矩阵    世界矩阵     视图矩阵    投影矩阵   除以w     视口变换
 */

/**
 * 相机类
 * 
 * 负责定义3D场景中的观察视角参数，用于计算投影矩阵
 * 包含视场角(FOV)、近平面距离、远平面距离、宽高比和焦距等基本参数
 */
class Camrea {

    /** 视场角(Field of View)，以度为单位，控制视野范围大小 */
    private _fov: number;
    
    /** 近裁剪平面距离，定义可视范围的最近距离 */
    private _near: number;
    
    /** 远裁剪平面距离，定义可视范围的最远距离 */
    private _far: number;
    
    /** 视口宽高比(width/height)，用于适配不同屏幕尺寸 */
    private _aspect: number;
    
    /** 焦距，影响透视投影效果 */
    private _focus: number;

    /**
     * 创建相机实例，并初始化默认参数
     */
    constructor() {
        this._fov = 45;      // 默认45度视场角
        this._near = 0.1;    // 默认近平面为0.1单位
        this._far = 1000;    // 默认远平面为1000单位
        this._aspect = 1;    // 默认宽高比为1:1
        this._focus = 1;     // 默认焦距为1
    }

    /**
     * 设置视场角
     * @param fov 视场角，以度为单位
     */
    setFov(fov: number) {
        this._fov = fov;
    }

    /**
     * 设置近裁剪平面距离
     * @param near 近平面距离，必须为正数且小于far
     */
    setNear(near: number) {
        this._near = near;
    }

    /**
     * 设置远裁剪平面距离
     * @param far 远平面距离，必须大于near
     */
    setFar(far: number) {
        this._far = far;
    }

    /**
     * 设置宽高比
     * @param aspect 宽高比(width/height)
     */
    setAspect(aspect: number) {
        this._aspect = aspect;
    }

    /**
     * 设置焦距
     * @param focus 焦距值
     */
    setFocus(focus: number) {
        this._focus = focus;
    }

    /**
     * 获取视场角
     * @returns 当前视场角(度)
     */
    getFov() {
        return this._fov;
    }

    /**
     * 获取近裁剪平面距离
     * @returns 近平面距离
     */
    getNear() {
        return this._near;
    }

    /**
     * 获取远裁剪平面距离
     * @returns 远平面距离
     */
    getFar() {
        return this._far;
    }

    /**
     * 获取宽高比
     * @returns 当前宽高比
     */
    getAspect() {
        return this._aspect;
    }

    /**
     * 获取焦距
     * @returns 当前焦距
     */
    getFocus() {
        return this._focus;
    }
}

export { Camrea }