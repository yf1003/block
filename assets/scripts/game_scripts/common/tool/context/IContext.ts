import * as cc from "cc";

export interface IContext {
    /**
     * 正式加在完毕
     * 所有第一次插入内容池后触发
     */
    load(): void;

    /**
     * 插入
     */
    insertContent(instance: cc.CCObject, key: string): void;

    /**
     * 删除
     * @param instance 
     * @param key 
     */
    removeContext(instance: cc.CCObject, key: string): void;

    /**
     * 获取
     * @param type 
     */
    getContext<T extends cc.CCObject>(type: { prototype: T }, key: string): T;
}