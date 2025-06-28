
import { ItemType } from "../../game/config/LocalCommon";
export default class SItem {
    private mID: number;
    public set ID(value: number) {
        this.mID = value;
    }
    public get ID(): number {
        return this.mID;
    }
    public mCount: number;
    public set Count(value: number) {
        this.mCount = value;
    }
    public get Count(): number {
        return this.mCount;
    }
    public get ItemType(): ItemType {
        return this.mID;
    }

    constructor(id: number = ItemType.Null, count: number = 0) {
        this.mID = id;
        this.mCount = count;
    }

    public isWrong(): boolean {
        if (this.mID <= ItemType.Null)
            return true;
        return false;
    }

    public clone(): SItem {
        return new SItem(this.mID, this.mCount);
    }

    public isSameType(type: ItemType): boolean {
        if (this.mID === type)
            return true;
        return false;
    }
}
