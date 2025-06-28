
import LogTool from "../../common/tool/LogTool";
import BasicesData from "./BasicesData";

export default class BaseBasicesData extends BasicesData {
    /**
     *  当前数值
     */
    protected mNumber: number = 0;
    public set Number(number: number) {
        this.set(number);
    }

    public get Number(): number {
        return this.mNumber;
    }

    /**
     * 初始数值
     */
    protected mInitNumber: number = 0;
    public get Init(): number {
        return this.mInitNumber;
    }

    /**
     * 记录数值
     */
    protected mOldNumber: number = 0;
    public get Old(): number {
        return this.mOldNumber;
    }

    /**
     * 下限数值
     */
    protected mMinNumber: number = Number.MIN_SAFE_INTEGER;
    public set Min(min: number) {
        this.mMinNumber = min;
    }

    public get Min(): number {
        return this.mMinNumber;
    }

    protected mMaxNumber: number = Number.MAX_SAFE_INTEGER;
    public set Max(max: number) {
        this.mMaxNumber = max;
    }
    public get Max(): number {
        return this.mMaxNumber;
    }

    constructor(key: string, min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER) {
        super(key);

        this.clear();
        if (min > max)
            LogTool.Log("Use BasicesNumberData Error!!!");
        else {
            this.mMinNumber = min;
            this.mMaxNumber = max;
        }
    }

    public clear(): void {
        this.mNumber = 0;
        this.mOldNumber = 0;
        this.mInitNumber = 0;
    }

    public getCorrectRange(value: number): number {
        let correctValue = value;
        if (correctValue > this.mMaxNumber)
            correctValue = this.mMaxNumber;
        if (correctValue < this.mMinNumber)
            correctValue = this.mMinNumber;
        return correctValue;
    }

    public resert(): void {
        this.set(this.Init);
    }

    public init(init: number): void {
        this.mInitNumber = init;
        this.set(init);
    }

    public set(set: number): void {
        this.mOldNumber = this.mNumber;
        this.mNumber = this.getCorrectRange(set);
    }

    public get(): number {
        return this.mNumber;
    }

    public add(add: number): boolean {
        if (add >= 0) {
            this.set(this.mNumber + add);
            return true;
        }
        return false;
    }

    public isEnough(cost: number): boolean {
        if (this.mNumber - cost >= this.mMinNumber)
            return true;
        return false;
    }

    public reduce(number: number): boolean {
        let cost = Math.abs(number);

        if (this.isEnough(cost)) {
            this.set(this.mNumber - cost);
            return true;
        }
        else {
            this.set(this.mMinNumber);
            return false;
        }
    }

    public change(change: number): boolean {
        if (change >= 0)
            return this.add(change);
        else
            return this.reduce(-change);
    }

    public log(): void {
        LogTool.Log(this.mKey, this.mNumber, this.mOldNumber);
    }

    public toString(): string {
        let message = this.mKey + ":{" + this.mNumber + "};";
        return message;
    }
}
