import CommonEvent from "../CommonEvent";
import EventNotice from "../tool/EventNotice";
import StringTool from "../tool/StringTool";
import BaseManager, { SystemType } from "./BaseManager";

export default abstract class MessageManager extends BaseManager {
    /**
     *  提示信息
     */
    protected mMessageArray: Array<string | number> = [];
    public get MessageArray(): Array<string | number> {
        return this.mMessageArray;
    }

    /**
     *  提示信息是否为空
     */
    public get IsEmpty(): boolean {
        return this.mMessageArray.length <= 0;
    }

    constructor(systemType: SystemType) {
        super(systemType);
    }

    /**
     * 是否包含
     * @param checkTip 提示标签 
     * @returns 结果
     */
    public isContainByKey(checkTip: string | number): boolean {
        for (let tipKey of this.mMessageArray) {
            if (tipKey === checkTip)
                return true;
        }
        return false;
    }

    /**
     * 清空消息
     */
    public clearMessage(): void {
        this.mMessageArray = [];
        EventNotice.emit(CommonEvent.COMMON_EVENT_NEW_MESSAGE, this.mType, StringTool.Null);
    }

    /**
     * 添加消息
     * @param key 消息标签 
     * @returns 添加结果
     */
    public pushMessage(key: string | number): boolean {
        for (let tipKey of this.mMessageArray) {
            if (tipKey == key)
                return false;
        }
        this.mMessageArray.forEach((tip) => {
            if (tip == key)
                return false;
        })
        this.mMessageArray.push(key);
        EventNotice.emit(CommonEvent.COMMON_EVENT_NEW_MESSAGE, this.mType, key);
        return true;
    }

    /**
     * 删除消息
     * @param key 消息标签
     * @returns 删除结果
     */
    public removeMessage(key: string | number): boolean {
        for (let i = this.mMessageArray.length - 1; i >= 0; i--) {
            let taskKey = this.mMessageArray[i];
            if (taskKey == key) {
                this.mMessageArray.splice(i, 1);
                EventNotice.emit(CommonEvent.COMMON_EVENT_NEW_MESSAGE, this.mType, key);
                return true;
            }
        }
        return false;
    }
}