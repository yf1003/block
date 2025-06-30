import * as cc from "cc";

import StringTool from "../../common/tool/StringTool";
const { ccclass, property } = cc._decorator;
@ccclass
export default class ItemBase extends cc.Component {
    protected mTag: string | number = StringTool.Null;
    public set Tag(tag: string | number) {
        this.mTag = tag;
    }
    public get Tag(): string | number {
        return this.mTag;
    }
    public isSameTag(checkTag: string | number): boolean {
        if (this.mTag === checkTag)
            return true;
        return false;
    }
}
