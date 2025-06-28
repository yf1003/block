
import CommonEvent from "../../../common/CommonEvent";
import EventNotice from "../../../common/tool/EventNotice";
import BaseBasicesData from "../../../expand/base/BaseBasicesData";
import { ItemType } from "../../config/LocalCommon";
import ISaveData from "../ISaveData";

export default class ItemSaveData implements ISaveData {
    /**
     * 元素类型
     */
    private mItemType: ItemType = ItemType.Null;
    public get ItemType(): ItemType {
        return this.mItemType;
    }

    /**
     * 数据
     */
    private mBasicesNumberData: BaseBasicesData = null;
    public get Data(): BaseBasicesData {
        return this.mBasicesNumberData;
    }

    /**
     * 数量
     */
    public get Number(): number {
        return this.mBasicesNumberData.Number;
    }

    public isSameType(other: ItemSaveData): boolean {
        if (other == null)
            return false;
        if (this.mItemType == other.ItemType)
            return true;
        return false;
    }

    public isSame(type: ItemType): boolean {
        if (this.mItemType == type)
            return true;
        return false;
    }

    constructor(type: ItemType, init: number) {
        this.mItemType = type;
        this.mBasicesNumberData = new BaseBasicesData(type.toString(), 0);
        this.mBasicesNumberData.init(init);
    }

    public init(init: number): void {
        this.mBasicesNumberData.init(init);
        EventNotice.emit(CommonEvent.COMMON_EVENT_REFRESH_ITEM, this);
    }

    public get(): number {
        return this.mBasicesNumberData.Number;
    }

    public add(add: number): boolean {
        if (this.mBasicesNumberData.add(add)) {
            EventNotice.emit(CommonEvent.COMMON_EVENT_REFRESH_ITEM, this);
            return true;
        }
        return false;
    }

    public reduce(reudce: number): boolean {
        if (this.mBasicesNumberData.reduce(reudce)) {
            EventNotice.emit(CommonEvent.COMMON_EVENT_REFRESH_ITEM, this);
            return true;
        }
        return false;
    }
    public change(change: number): boolean {
        if (this.mBasicesNumberData.change(change)) {
            EventNotice.emit(CommonEvent.COMMON_EVENT_REFRESH_ITEM, this);
            return true;
        }
        return false;
    }
    public isEnough(cost: number): boolean {
        return this.mBasicesNumberData.isEnough(cost);
    }

    public pack(): string {
        let data = { ItemType: this.mItemType, Number: this.Number };
        return JSON.stringify(data);

    }
    public unPack(json: string): boolean {
        let data = JSON.parse(json);
        this.mItemType = data.ItemType;
        this.mBasicesNumberData.set(data.Number);
        return false;
    }
}
