
import EventNotice from "../../common/tool/EventNotice";
import StringTool from "../../common/tool/StringTool";
import BaseBasicesData from "./BaseBasicesData";

export default class LockStatus extends BaseBasicesData {
    public static readonly EVENT_INCREAS_COUNT: string = "EVENT_INCREAS_COUNT";
    public static readonly EVENT_REDUCE_COUNT: string = "EVENT_REDUCE_COUNT";
    public static readonly EVENT_RESET_COUNT: string = "EVENT_RESET_COUNT";

    private mBookCount: number = 0;
    public set BookCount(count: number) {
        this.mBookCount = count;
    }
    public get BookCount(): number {
        return this.mBookCount;
    }

    constructor(key: string = StringTool.Null) {
        super(key);
        this.mKey = key;

        EventNotice.on(LockStatus.EVENT_INCREAS_COUNT, this.onIncreaseUpdateCounter, this);
        EventNotice.on(LockStatus.EVENT_REDUCE_COUNT, this.onReduceUpdateCount, this);
        EventNotice.on(LockStatus.EVENT_RESET_COUNT, this.onResetUpdateCount, this);
    }

    public destroy(): boolean {
        EventNotice.off(LockStatus.EVENT_INCREAS_COUNT, this);
        EventNotice.off(LockStatus.EVENT_REDUCE_COUNT, this);
        EventNotice.off(LockStatus.EVENT_RESET_COUNT, this);
        return true;
    }

    public isSameKey(key: string): boolean {
        if (this.mKey === key)
            return true;
        return false;
    }

    public isBusy(): boolean {
        if (this.mBookCount === 0)
            return false;
        return true;
    }

    public onIncreaseUpdateCounter(key: string): void {
        if (key === this.mKey)
            this.mBookCount++;
    }

    public onReduceUpdateCount(key: string): void {
        if (key === this.mKey)
            this.mBookCount--;
    }

    public onResetUpdateCount(key: string): void {
        if (key === this.mKey)
            this.mBookCount = 0;
    }


    /**
     * 增加
     * @param key 标识 
     */
    public static Increase(key: string): void {
        EventNotice.emit(LockStatus.EVENT_INCREAS_COUNT, key);
    }

    /**
     * 减少
     * @param key 标识
     */
    public static Reduce(key: string): void {
        EventNotice.emit(LockStatus.EVENT_REDUCE_COUNT, key);
    }

    /**
     * 重置
     * @param key 标识 
     */
    public static Resert(key: string): void {
        EventNotice.emit(LockStatus.EVENT_RESET_COUNT, key);
    }
}
