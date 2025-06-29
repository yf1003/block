import * as cc from "cc";
import StringTool from "../StringTool";
import ContextComponent from "./ContextComponent";
import ContextObject from "./ContextObject";
export interface SContext {
    instance: cc.CCObject;
    key: string | number;
}

export default class ContextPool extends cc.CCObject {
    private mKey: string | number = "";
    private mInstanceList: Array<SContext> = [];

    constructor(key: string | number) {
        super();
        this.mKey = key;
    }

    public getKey(): string | number {
        return this.mKey;
    }

    public insert(instance: cc.CCObject): void {
        this.insertByKey(instance, StringTool.Null);
    };

    public insertByKey(instance: cc.CCObject, key: string | number): void {
        let contentStruct = <SContext>{};
        contentStruct.instance = instance;
        contentStruct.key = key;
        this.mInstanceList.push(contentStruct);
    }

    public remove(instance: cc.CCObject): void {
        this.removeByKey(instance, StringTool.Null);
    }

    public removeByKey(instance: any, key: string | number): void {
        for (let i = this.mInstanceList.length - 1; i >= 0; i--) {
            let struct = this.mInstanceList[i];
            if (struct.instance == instance && key == struct.key) {
                this.mInstanceList.splice(i, 1);
                break;
            }
        }
    }

    public getInstanceByKey<T extends cc.CCObject>(type: { prototype: T }, key: string | number): T {
        for (let i = 0; i < this.mInstanceList.length; i++) {
            let objStruct = this.mInstanceList[i];
            if (objStruct.key == key) {
                let obj = objStruct.instance;
                let any = <any>type;
                if (obj instanceof any)
                    return obj as T;
                if (Object.getPrototypeOf(obj) === type)
                    return obj as T;
            }
        }
        return null;
    }

    public getInstance<T extends cc.CCObject>(type: { prototype: T }): T {
        return this.getInstanceByKey(type, StringTool.Null);
    }


    public clear(): void {
        this.mInstanceList = [];
    }

    public load(): void {
        this.mInstanceList.forEach(data => {

            let context = data.instance;
            if (context instanceof ContextObject) {
                (context as ContextObject).load();
            }
            if (context instanceof ContextComponent) {
                (context as ContextComponent).load();
            }
        });
    }
}
