
import SaveManager from "../../common/save/SaveManager";
import BasicesData from "../base/BasicesData";

export default class ClockData extends BasicesData {
    private mIsOpen: boolean = false;
    public set IsOpen(value: boolean) {
        this.mIsOpen = value;
    }
    public get IsOpen(): boolean {
        return this.mIsOpen;
    }

    private mClockCount: number = 0;
    constructor(key: string) {
        super(key);
        this.mClockCount = SaveManager.getData(this.mKey, 0);
        if (this.mClockCount > 0)
            this.mIsOpen = true;
        else
            this.mIsOpen = false;
    }

    public start(future: number): void {
        this.mClockCount = future;
        SaveManager.setData(this.mKey, this.mClockCount);
    }

    public getLastTime(): number {
        return this.mClockCount;
    }

    public refresh(count: number): void {
        this.mClockCount = count;
        if (this.mClockCount <= 0)
            this.mClockCount = 0;
        if (this.mClockCount > 0)
            this.mIsOpen = true;
        else
            this.mIsOpen = false;
        SaveManager.setData(this.mKey, this.mClockCount);
    }
}
