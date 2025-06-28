
import BasicesData from "../base/BasicesData";
import SaveManager from "../../common/save/SaveManager";
import StringTool from "../../common/tool/StringTool";

export default class IntervalTime extends BasicesData {
    private mSaveTime: string = StringTool.Null;
    constructor(saveKey: string) {
        super(saveKey);

        let date = new Date();
        let nowTime = date.toString();

        this.mSaveTime = SaveManager.getData(this.mKey, StringTool.Null);
        if (StringTool.IsEmpty(this.mSaveTime))
            this.mSaveTime = nowTime;
    }

    /**
     * 获取到现在的差值
     * @returns 
     */
    public getIntervalTime(): number {
        let nowDate = new Date();
        let nowTimeCount = nowDate.getTime();

        let saveDate = new Date(this.mSaveTime);
        let saveTimeCount = saveDate.getTime();

        let value = (nowTimeCount - saveTimeCount);
        if (value <= 0)
            value = 0;
        return value;
    }
    public getSecond(): number {
        let value = this.getIntervalTime();
        let second = (value / 10 / 60).toFixed(0);
        return parseInt(second);
    }

    public save(): void {
        let nowDate = new Date();
        let nowTime = nowDate.toString();
        this.mSaveTime = nowTime;
        SaveManager.setData(this.mKey, this.mSaveTime);
    }

    public override  log(): void {

    }

    public override toString(): string {
        return "";
    }
}
