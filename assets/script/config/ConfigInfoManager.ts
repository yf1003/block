import BaseManager, { SystemType } from "../common/important/BaseManager";
import List from "../common/tool/List";
import InfoData from "../game/config/excel/InfoData";
import LoadConfig from "../game/config/excel/LoadConfig";
import * as cc from "cc";


class ConfigInfoManager extends BaseManager {
    public static readonly CONFIG_PATH = "";

    public static readonly instance: ConfigInfoManager = new ConfigInfoManager();
    private mInfoDataList: List<InfoData> = new List<InfoData>();
    constructor() {
        super(SystemType.Config);

    }
    public init(): boolean {
        LoadConfig.loadLocalConfig();
        return true;
    }
    public start(): void {
    }
    public ready(): void {
    }
    public close(): void {
        this.mInfoDataList.clear();
    }

    public addData(data: InfoData) {
        this.mInfoDataList.add(data);
    }
    public getData<T extends cc.CCObject>(type: { prototype: T }): T {
        for (let i = 0; i < this.mInfoDataList.length; i++) {
            let data = this.mInfoDataList[i];
            let any = <any>type;
            if (data instanceof any) {
                return data as unknown as T;
            }
            if (Object.getPrototypeOf(data) === type) {
                return data as unknown as T;
            }
        }
        return null;
    }
}
export default (ConfigInfoManager.instance);