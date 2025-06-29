import * as cc from "cc";
import StringTool from "../StringTool";
import ContextPool from "./ContextPool";
import { IContext } from "./IContext";
const { ccclass, property } = cc._decorator;
@ccclass
export default class ContextComponent extends cc.Component implements IContext {
    protected mContextPool: ContextPool = null;
    public get ContextPool(): ContextPool {
        return this.mContextPool;
    }
    public init(content: ContextPool): boolean {
        this.mContextPool = content;
        return true;
    }
    public load() {
    }
    public insertContent(instance: cc.CCObject, key: string = ""): void {
        if (StringTool.IsEmpty(key))
            this.mContextPool.insert(instance);
        else
            this.mContextPool.insertByKey(instance, key);
    }
    public getContext<T extends cc.CCObject>(type: { prototype: T }, key: string = ""): T {
        if (StringTool.IsEmpty(key))
            return this.mContextPool.getInstance(type);
        else
            return this.mContextPool.getInstanceByKey(type, key);
    }
    public removeContext(instance: any, key: string): void {
        if (StringTool.IsEmpty(key))
            return this.mContextPool.remove(instance);
        else
            return this.mContextPool.removeByKey(instance, key);
    }
}
