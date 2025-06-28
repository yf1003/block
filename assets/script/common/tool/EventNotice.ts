import BaseManager, { SystemType } from "../important/BaseManager";
import LogTool from "./LogTool";
import * as cc from "cc";
/**
 * 观察者
 */
class Observer {
    /** 回调函数 */
    private callback: Function = null;
    /** 上下文 */
    private context: any = null;

    constructor(callback: Function, context: any) {
        this.callback = callback;
        this.context = context;
    }

    /**
     * 发送通知
     * @param args 不定参数
     */
    public notify(...args: any[]): void {
        this.callback.call(this.context, ...args);
    }

    /**
    * 比较
    * @param context 上下文
    */
    public isEqual(callback: Function, context: any): boolean {
        return callback == this.callback && context == this.context;
    }

    /**
     * 上下文比较
     * @param context 上下文
     */
    public isContextEqual(context: any): boolean {
        return context == this.context;
    }

    /**
     * 上下文
     */
    public getContext() {
        return this.context;
    }

    /**
     * 上下文是否销毁
     */
    public isContextValid() {
        return cc.isValid(this.context);
    }
}

/**
 * 事件
 */
class EventNotice extends BaseManager {
    public static readonly instance = new EventNotice(SystemType.Notice);

    public override init(): boolean {
        LogTool.Log("EventNotice Init Scuessed");
        return true;
    }
    public override start(): void {
        LogTool.Log("EventNotice Start Scuessed");
    }
    public override close(): void {
        LogTool.Log("EventNotice Close Scuessed");
    }
    public override ready(): void {
        LogTool.Log("EventNotice Ready Scuessed");
    }

    /** 监听数组 */
    private listeners = {};
    /*用户取消消息下发*/
    private isStop = false;

    /** 
     * 注册事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public on(name: string, callback: Function, context: any) {
        let observers: Observer[] = this.listeners[name];
        if (observers) {
            let offList = [];
            for (const observer of observers) {
                if (!observer.isContextValid()) {
                    offList.push(observer.getContext())
                }
            }
            for (const iterator of offList) {/*关闭失效的引用*/
                this.off(name, iterator)
            }
        }
        observers = this.listeners[name];
        if (observers == undefined) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(new Observer(callback, context));
    }

    /**
     * 发送事件
     * @param name 事件名称
     */
    public emit(name: string, ...args: any[]) {
        let observers: Observer[] = this.listeners[name];
        if (!observers) return;

        this.isStop = false;
        let offList = [];
        for (const observer of observers) {
            if (observer.isContextValid()) {
                observer.notify(...args);
                if (this.isStop) break;/*当用户取消消息下发时*/
            } else {
                offList.push(observer.getContext())
            }
        }
        for (const iterator of offList) {/*关闭失效的引用*/
            this.off(name, iterator)
        }
    }

    /**
     * 移除事件
     * @param name 事件名称
     * @param context 上下文
     */
    public off(name: string, context: any) {
        let observers: Observer[] = this.listeners[name];
        if (!observers) return;
        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            if (observer.isContextEqual(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete this.listeners[name];
        }
    }

    /**
     * 移除事件
     * @param name 事件名称
     */
    public offAll(name: string) {
        delete this.listeners[name];
    }

    /*用户取消消息下发*/
    public stopPropagation() {
        this.isStop = true;
    }

    /*单独下发信息*/
    public alone(message: string) {
        this.emit(message);
    }
}
export default (EventNotice.instance);