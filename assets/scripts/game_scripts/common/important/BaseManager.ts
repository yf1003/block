import { IManager } from "../../expand/interface/IManager";
export enum SystemType {
    /**
     * 未知
     */
    Known = -1,
    ImportantMin,
    /**
     * 数据
     */
    Data,
    /**
     * 消息
     */
    Notice,
    /**
     * 游戏中心
     */
    GameCenter,
    /**
     * 声音
     */
    Sound,
    /**
     * 时间
     */
    Time,
    /**
     * 配置数据
     */
    Config,
    /**
     * 多语言
     */
    MultiLanguage,
    /**
     * 引导
     */
    Guide,
    /**
     * 本地储存
     */
    Save,


    ImportantMax,

    GameMin,
    /**
     * 游戏数据转运中心
     */
    GameManager,
    /**
     * 瓦片
     */
    TiledMap,
    /**
     * 游戏内共有数据
     */
    GameDataManager,
    /**
     * Scut
     */
    Scut,
    GameMax,
}

export default abstract class BaseManager implements IManager {
    /**
     *  类型
     */
    protected mType: SystemType = SystemType.Known;
    public get Type(): SystemType {
        return this.mType;
    }

    /**
     * 构造函数
     * @param type 系统类型 
     */
    constructor(type: SystemType = SystemType.Known) {
        this.mType = type;
    }

    /**
     * 系统类型是否相同
     * @param systemType 
     * @returns 
     */
    public isSame(systemType: SystemType | number): boolean {
        if (systemType === this.mType)
            return true;
        return false;
    }

    /**
     * 重要管理
     * @returns 
     */
    public isImportant(): boolean {
        if (this.mType > SystemType.ImportantMin && this.mType < SystemType.ImportantMax)
            return true;
        return false;
    }

    /**
     * 游戏管理
     * @returns 
     */
    public isGame(): boolean {
        if (this.mType > SystemType.GameMin && this.mType < SystemType.GameMax)
            return true;
        return false;
    }

    public abstract init(): boolean;
    public abstract start(): void;
    public abstract ready(): void;
    public abstract close(): void;
}