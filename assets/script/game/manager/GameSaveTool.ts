import * as cc from "cc";
import IDataSave from "../../common/save/IDataSave";
import SaveBase from "../../common/save/SaveBase";
import SaveCreator from "../../common/save/SaveCreator";
import SaveH5 from "../../common/save/SaveH5";
import SaveWeiXin from "../../common/save/SaveWeiXin";
import LogTool from "../../common/tool/LogTool";
import { IManager } from "../../expand/interface/IManager";

export default class GameSaveTool implements IManager, IDataSave {
    private mSaveData: SaveBase = null;
    public get SaveData(): SaveBase {
        return this.mSaveData;
    }

    private mKey: string = "";
    public set Key(key: string) {
        this.mKey = key;
    }
    public get Key(): string {
        return this.mKey;
    }
    constructor(key: string) {
        this.mKey = key;
    }

    public init(): boolean {
        this.mSaveData = new SaveCreator(this.mKey);
        return true;

    }
    public start(): void {

    }
    public ready(): void {

    }
    public close(): void {

    }

    public getData(key: string, defaultValue: any): any {
        return this.mSaveData.getData(key, defaultValue);
    }
    public getBool(key: string, defaultValue: boolean): boolean {
        return this.mSaveData.getData(key, defaultValue) as boolean;
    }
    public setData(key: string, value: any): boolean {
        return this.mSaveData.setData(key, value);
    }
    public setBool(key: string, value: boolean): boolean {
        return this.mSaveData.setData(key, value);
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
