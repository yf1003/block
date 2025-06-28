
import LogTool from "../tool/LogTool";
import SaveBase from "./SaveBase";

export default class SaveH5 extends SaveBase {
    constructor(key: string) {
        super(key);
        this.mLocalData = localStorage.mjCreatRoomConfig12 ? JSON.parse(localStorage.mjCreatRoomConfig12) : {};
        this.mIsReady = true;
        LogTool.Log("使用H5存储数据 H5Save");
    }

    public save(): boolean {
        localStorage.mjCreatRoomConfig12 = JSON.stringify(this.mLocalData);
        return true;
    };
}
