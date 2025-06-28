import * as cc from "cc";
import StringTool from "../../common/tool/StringTool";
export default class BasicesData extends cc.CCObject {
    /**
     *  标签
     */
    protected mKey: string = StringTool.Null;
    public set Key(key: string) {
        this.mKey = key;
    }
    public get Key(): string {
        return this.mKey;
    }

    constructor(key: string) {
        super();
        this.mKey = key;
    }

    /**
     * 标签是否相等
     * @param key  标签
     * @returns 
     */
    public isSameKey(key: string): boolean {
        if (this.mKey == key)
            return true;
        return false;
    }

    public toString(): string {
        return StringTool.Null;
    }

    public log(): void {
    }
}
