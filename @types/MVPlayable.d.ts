/**
 *  @deprecated 这个是为了兼容旧的通信接口，新版不使用这些接口
 */
declare global {
    namespace MW_CONFIG {
        let channel: Channel;
        let disable_global_click: boolean;
        let disable_auto_click: boolean;
        let disable_yd_click: boolean;
    }
    var MW_LIVE_PREVIEW_LANGUAGE: boolean;
    function gameStart(startSounds?: boolean): void;
    function gameRetry(): void;
    function gameEnd(result: boolean): void;
    function stopAllSound(): void;
    function recoveryAllSound(): void;
    function retry(): void;
    /**
     * 开关声音
     * @param enable 开关，true是关声音，false是开声音
     */
    function forceMuted(enable: boolean): void;
    function gameReady(): void;
    function install(param: {}): void;
    namespace HttpAPI {
        function sendPoint(value: string): void;
    }
    /** 有一个全局MVPlayable入口 */
    var mvPlayable: MVPlayable;
}
type Channel = "m" | "dsp" | "fb" | "google" | "unity" | "vungle" | "applovin" | "csj" | "oceanengine" | "ironsource" | "adcolony" | "gdt" | "tapjoy" | "chartboost" | "pangle" | "ks" | "liftoff" | "kwai" | "ams" | "imobileimobile" | "moloco" | "snapchat" | "toutiao" | "wx" | "tiktok";
type ObjectInclude<T, E> = {
    [k in keyof T]: T[k] extends E ? k : never;
}[keyof T];
type PropertyModify = "add" | "remove" | "update";
interface CameraOrbit {
    polarAngle: number;
    azimuthAngle: number;
    radialDistance: number;
    viewOffsetX: number;
    viewOffsetY: number;
    viewOffsetZ: number;
    dampingFactor: number;
}
declare enum AdaptRatioType {
    IPhone6_Landscape = 17787,
    IPhone6_Portrait = 5622,
    IPhoneX_Landscape = 21653,
    IPhoneX_Portrait = 4618,
    IPad_Landscape = 13333,
    IPad_Portrait = 7500
}
/**
 * 这个是平台通知素材的事件，平台也只有这唯一一条与素材交互的通道。
 */
interface EventTypeObject {
    /**
     * 游戏开始
     */
    gameStart(startSounds?: boolean): void;
    /**
     * 游戏结束
     * @param result 游戏结果
     * @param args 项目特定参数
     */
    gameEnd(result: boolean, ...args: any[]): void;
    /**
     * 切换场景回调
     * @param sceneName 场景名
     * @returns 如果场景切换需要加载超过一帧，那就使用Promise返回。
     */
    switchScene(sceneName: string): Promise<void>;
    /**
     * 修改当前语言
     * @param name 语言名称
     */
    setLanguage(name: string): boolean;
    /**
     * 重新加载语言表
     */
    reloadLanguage(): void;
    /**
     * 开关所有声音
     * @param enable true 为打开，false为关闭
     */
    enableSounds(enable: boolean): void;
    /**
     * 替换声音资源
     * @param name 声音名称（只有名称，不带路径和后缀）
     * @param audioData 声音二进制资源
     */
    replaceAudioData(name: string, audioData: ArrayBuffer): void;
    /**
     * 相机屏幕适配
     * @param type 属性修改类型
     * @param ratio 屏幕类型
     * @param propertyName 属性名称
     * @param value 属性值
     */
    cameraAdapt(type: PropertyModify, ratio: AdaptRatioType, propertyName?: "fovOffset", value?: number): void;
    /**
     * 相机轨道参数
     * @param name 相机名称
     * @param propertyName 轨道属性名
     * @param value 轨道属性值
     */
    cameraOrbit<K extends keyof CameraOrbit>(name: string, propertyName: K, value: CameraOrbit[K]): void;
}
/**
 * 素材与平台的游戏事件通信，就是素材调用这些接口。
 */
declare class GameEvent {
    readonly platform: MVPlayable;
    constructor(platform: MVPlayable);
    gameReady(): void;
    gameEnd(result: boolean, ...args: any[]): void;
    gameRetry(): void;
}
declare class MVPlayable {
    /** 当前MVPlayble 的版本号 */
    static readonly version = "1.3.1";
    private readonly gameEvent;
    private eventMap;
    /** 是否启动playable功能 */
    enabled: boolean;
    /**
     * 当前渠道名称
     */
    get channel(): Channel;
    /**
     * 是否屏蔽素材内置全局可点
     * @description true: 屏蔽全局可点； false: 启动全局可点
     * @default false 默认为false, 只有头条、穿山甲、抖音、pangle渠道设置为true
     */
    get disable_global_click(): boolean;
    /**
     * 是否屏蔽素材内置自动跳转逻辑
     * @description true: 屏蔽自动跳转； false: 启动自动跳转
     * @default false 默认为false, 只有输出给DSP的渠道设置为true
     */
    get disable_auto_click(): boolean;
    /**
     * 是否屏蔽素材内置诱导跳转逻辑
     * @description true: 屏蔽诱导跳转； false: 启动诱导跳转
     * @default false 默认为false
     */
    get disable_induce_click(): boolean;
    /**
     * 获得当前语言
     */
    get languageName(): string;
    private getQueryString;
    constructor(legacy?: boolean);
    /**
     * 监听平台事件
     * @param type 事件类型
     * @param callback 事件触发时回调
     * @param thisArg callback的this对象
     * @param once 事件只触发一次就自动删除
     */
    addEventListener<T extends ObjectInclude<EventTypeObject, Function>>(type: T, callback: (...args: Parameters<EventTypeObject[T]>) => void, thisArg?: any, once?: boolean): void;
    /**
     * 删除监听事件
     * @param type 事件类型
     * @param callback 事件回调函数
     * @param thisArg callback的this对象
     */
    removeEventListener<T extends ObjectInclude<EventTypeObject, Function>>(type: T, callback: (...args: Parameters<EventTypeObject[T]>) => void, thisArg?: any): void;
    /**
     * 内部函数，请勿调用。
     * @param type 派发事件类型
     * @param args 该事件对应的参数
     * @returns 该事件返回的参数
     */
    dispatchEventListener<T extends ObjectInclude<EventTypeObject, Function>>(type: T, ...args: Parameters<EventTypeObject[T]>): ReturnType<EventTypeObject[T]> | void;
    /**
     * 给平台发送游戏事件
     * @param type 事件类型
     * @param params 该事件对应的参数
     * @returns 该事件返回的参数
     */
    sendGameEvent<T extends ObjectInclude<GameEvent, Function>>(type: T, ...params: Parameters<GameEvent[T]>): ReturnType<GameEvent[T]> | void;
    /**
     * 跳转安装接口
     * @param type 跳转类型
     * @param index 策划要求的跳转索引
     */
    install(type?: string, index?: number): void;
    /**
     * 发送埋点接口
     * @param action 埋点标识
     */
    sendAction(action: string): void;
}
declare global {
    var MV_PLAYABLE: boolean;
}
export {};
