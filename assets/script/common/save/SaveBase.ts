import LogTool from "../tool/LogTool";
import IDataSave from "./IDataSave";
export default abstract class SaveBase implements IDataSave {
    /**
     * 保存标签
     */
    protected mKey: string = "";
    public set Key(key: string) {
        this.mKey = key;
    }
    public get Key(): string {
        return this.mKey;
    }

    /**
     * 保存数据
     */
    protected mLocalData: any = null;
    public get LocalData(): any {
        return this.mLocalData;
    }

    /**
     *  准备完成
     *  异步加载结果
     */
    protected mIsReady: boolean = false;
    public set IsReady(value: boolean) {
        this.mIsReady = value;
    }
    public get IsReady(): boolean {
        return this.mIsReady;
    }

    /**
     *  存储文件路径
     *  这个不一定每个都有
     */
    protected mLocalPath: string = "unKnow";
    public get LocalPath(): string {
        return this.mLocalPath;
    }

    constructor(key: string) {
        this.mKey = key;
        this.mLocalData = {};
    }

    public log(): void {
        LogTool.Log("Local Data  =" + this.mLocalData);
    }

    public setData(key: string, value: any): boolean {
        if (this.isContainsData(key))
            this.mLocalData[key] = value;
        else
            this.mLocalData[key] = value;
        return true;
    }

    public getData(key: string, defaulValue: any): any {
        if (!this.isContainsData(key))
            this.setData(key, defaulValue);
        return this.mLocalData[key];
    }

    public removeData(key: any): boolean {
        if (!this.isContainsData(key))
            return true;
        this.mLocalData[key] = null;
        return true;
    }

    /**
     * 是否包含数据
     * @param key 
     * @returns 
     */
    public isContainsData(key: string): boolean {
        if (typeof this.mLocalData[key] === "undefined")
            return false;
        if (this.mLocalData[key] == undefined)
            return false;
        if (this.mLocalData[key] == null)
            return false;
        if (Number.isNaN(this.mLocalData[key]))
            return false;
        return true;
    }

    public clear(): boolean {
        this.mLocalData = {};
        return this.save();
    }
    public abstract save(): boolean;
}
