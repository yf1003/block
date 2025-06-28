import LogTool from "../tool/LogTool";
import BaseManager, { SystemType } from "./BaseManager";
import * as cc from "cc";

class MultiLanguageManager extends BaseManager {
    public static readonly instance = new MultiLanguageManager();
    private mTxtList: Array<any> = [];
    constructor() {
        super(SystemType.MultiLanguage);
    }
    public init(): boolean {
        switch (cc.sys.language) {
            case cc.sys.Language.CHINESE:
                break;
            case cc.sys.Language.ENGLISH:
                break;
            default:
                break;
        }
        return true;
    }
    public start(): void {
    }
    public ready(): void {
    }
    public close(): void {
    }
    public getValue(key: string): string {
        if (!key || key === "")
            return "error";
        if (this.mTxtList.length <= 0)
            return "not Found";
        for (let data of this.mTxtList) {
            if (key === data.key)
                return data.value;
        }
        LogTool.LogWarning("翻译表未找到Key = [" + key + "] 的内容");
        return "not Found in file";
    };
}
export default (MultiLanguageManager.instance);