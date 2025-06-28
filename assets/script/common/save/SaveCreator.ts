import * as cc from "cc";
import LogTool from "../tool/LogTool";
import SaveBase from "./SaveBase";

export default class SaveCreator extends SaveBase {
    constructor(key: string) {
        super(key);
        this.mLocalData = JSON.parse(cc.sys.localStorage.getItem(this.Key));
        if (!this.mLocalData)
            this.mLocalData = {};
        this.mIsReady = true;
        this.mLocalPath = cc.sys.localStorage.toString();
        LogTool.Log("使用原生存储 MobileSave ");
    }

    public save(): boolean {
        cc.sys.localStorage.setItem(this.Key, JSON.stringify(this.mLocalData));
        return true;
    }

}
