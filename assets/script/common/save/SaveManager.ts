import BaseManager, { SystemType } from "../important/BaseManager";
import LogTool from "../tool/LogTool";
import IDataSave from "./IDataSave";
import SaveBase from "./SaveBase";
import SaveCreator from "./SaveCreator";
import SaveH5 from "./SaveH5";
import SaveWeiXin from "./SaveWeiXin";

class SaveManager extends BaseManager implements IDataSave {
    public static readonly instance = new SaveManager();
    public static readonly GameSaveData: string = "BlockSave";

    private mSaveData: SaveBase = null;
    public get SaveData(): SaveBase {
        return this.mSaveData;
    }

    constructor() {
        super(SystemType.Save);

        this.mSaveData = new SaveCreator(SaveManager.GameSaveData);
    }
    public init(): boolean {
        LogTool.Log("SaveManager Init Succeed");
        return true;
    }
    public start(): void {
        LogTool.Log("SaveManager Start Succeed");
    }
    public ready(): void {
        LogTool.Log("SaveManager Ready Succeed");
    }
    public close(): void {
        LogTool.Log("SaveManager Close Succeed");
    }

    public getData(key: string, defaultValue: any): any {
        return this.mSaveData.getData(key, defaultValue);
    }
    public getBool(key: string, defaultValue: boolean): boolean {
        return this.mSaveData.getData(key, defaultValue + "") as boolean;
    }
    public setData(key: string, value: any): boolean {
        return this.mSaveData.setData(key, value);
    }
    public setBool(key: string, value: boolean): boolean {
        return this.mSaveData.setData(key, value + "");
    }
    public removeData(key: string): boolean {
        return this.mSaveData.removeData(key);
    }
    public save(): boolean {
        return this.mSaveData.save();
    }
    public clear(): boolean {
        return this.mSaveData.clear();
    }
    public log(): void {
        this.mSaveData.log();
    }
}
export default (SaveManager.instance);