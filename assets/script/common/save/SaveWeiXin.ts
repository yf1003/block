
import BaseSave from "./SaveBase";
import LogTool from "../tool/LogTool";

export default class SaveWeiXin extends BaseSave {
    public get JsonName(): string {
        return this.mKey + ".json";
    }
    protected mSystemManager: any = null;
    constructor(key: string) {
        super(key);
        this.mLocalPath = `${window.wx.env.USER_DATA_PATH}/` + this.JsonName;
        this.mSystemManager = window.wx.getFileSystemManager();


        let succesCallBack = (res) => {
            LogTool.Log("JWeiXinSave chenckHave res = ", res);
            this.mLocalData = this.read();
            LogTool.Log("JWeiXinSave init", this.mLocalData);
            this.mIsReady = true;
        };

        let failCallBack = (msg) => {
            LogTool.Log("JWeiXinSave chenckHave errMsg = ", msg);
            this.save();
        };

        this.mSystemManager.getFileInfo({
            filePath: this.mLocalPath,
            success: succesCallBack,
            fail: failCallBack,
        });

        LogTool.Log("使用微信存储数据 SaveWeiXin");
    }

    private read(): any {
        let data = this.mSystemManager.readFileSync(this.mLocalPath, 'utf8');
        LogTool.Log("JWeiXinPlugin readData =", data);
        return JSON.parse(data);
    }

    public save(): boolean {
        LogTool.Log("Save WxLocal Data Path = ", this.mLocalPath);
        let saveData = JSON.stringify(this.mLocalData);
        this.mSystemManager.writeFileSync(this.mLocalPath, saveData, 'utf8');
        return true;
    }
}
