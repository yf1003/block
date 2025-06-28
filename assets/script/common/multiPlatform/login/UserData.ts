
import StringTool from "../../tool/StringTool";
export enum LoginType {
    /**
     * 脸书
     */
    FaceBook,
    /**
     * 谷歌
     */
    Google,
    /**
     * 推特
     */
    Twiter,
    /**
     * 亚马逊
     */
    Amazon,
    /**
     * 微信
     */
    Wechat,
    /**
     * 腾讯
     */
    QQ,
    /**
     * 华为
     */
    HuaWei,
    /**
     * Oppo
     */
    Oppo,
    /**
     * Vivo
     */
    Vivo,
    /**
     * 小米
     */
    Mi,
    /**
     * 邮件
     */
    Email,
    /**
     * 电话号码
     */
    Phone,
    /**
     *  AdJust
     */
    // --
    AdJust,
    /**
     * 密码账号
     */
    PassWord,
    /**
     * Idfa
     */
    Idfa,
    /**
     * 其他
     */
    Other,
}

export default class UserData {
    /**
     * 是否登录
     */
    private mIsLogin: boolean = false;
    public set IsLogin(value: boolean) {
        this.mIsLogin = value;
    }
    public get IsLogin(): boolean {
        return this.mIsLogin;
    }

    /**
     * 用户ID(唯一标识)
     */
    private mUserID: string = StringTool.Null;
    public set UserID(value: string) {
        this.mUserID = value;
    }
    public get UserID(): string {
        return this.mUserID;
    }

    /**
     * 登录类型
     */
    private mLoginType: LoginType = LoginType.Other;
    public set LoginType(value: LoginType) {
        this.mLoginType = value;
    }
    public get LoginType(): LoginType {
        return this.mLoginType;
    }

    /**
     *  头像路径
     */
    private mIconPath: string = StringTool.Null;
    public set IconPath(value: string) {
        this.mIconPath = value;
    }
    public get IconPath(): string {
        return this.mIconPath;
    }

    /**
     * 本地头像标识
     */
    private mLocalIconPath: string = StringTool.Null;
    public set LocalIconPath(value: string) {
        this.mLocalIconPath = value;
    }
    public get LocalIconPath(): string {
        return this.mLocalIconPath;
    }

    /**
     * 名字
     */
    private mName: string = StringTool.Null;
    public set Name(value: string) {
        this.mName = value;
    }
    public get Name(): string {
        return this.mName;
    }

    /**
     * 年龄
     */
    private mEge: number = 0;
    public set Ege(value: number) {
        this.mEge = value;
    }
    public get Ege(): number {
        return this.mEge;
    }

    /**
     * 登录标识
     */
    private mLoginKey: string = StringTool.Null;
    public set LoginKey(value: string) {
        this.mLoginKey = value;
    }
    public get LoginKey(): string {
        return this.mLoginKey;
    }

    /**
     * 最后活跃时间
     */
    private mLastAliveTime: Date = null;
    public set LastAliveTime(value: Date) {
        this.mLastAliveTime = value;
    }
    public get LastAliveTime(): Date {
        return this.mLastAliveTime;
    }

    /**
     * 国家标识
     */
    private mCountryCode: string = StringTool.Null;
    public set CountryCode(value: string) {
        this.mCountryCode = value;
    }
    public get CountryCode(): string {
        return this.mCountryCode;
    }

    public static CreateYF(jsonData: any): UserData {
        let useData = new UserData();
        if (!jsonData)
            return useData;
        useData.UserID = jsonData["userid"];
        useData.Name = jsonData["userName"];
        useData.IconPath = jsonData["userIcon"];
        useData.CountryCode = jsonData["countryCode"];
        useData.LoginType = UserData.ChangeString(jsonData["stype"]);
        useData.LoginKey = jsonData["saccount"];
    }


    public static ChangeString(value: string) {
        if (value.includes("FACEBOOK"))
            return LoginType.FaceBook;
        else if (value.includes("GOOGLE"))
            return LoginType.Google;
        else if (value.includes("TWITER"))
            return LoginType.Twiter;
        else if (value.includes("AMAZON"))
            return LoginType.Amazon;
        else if (value.includes("WECHAT"))
            return LoginType.Wechat;
        else if (value.includes("QQ"))
            return LoginType.QQ;
        else if (value.includes("HUAWEI"))
            return LoginType.HuaWei;
        else if (value.includes("OPPO"))
            return LoginType.Oppo;
        else if (value.includes("VIVO"))
            return LoginType.Vivo;
        else if (value.includes("MI"))
            return LoginType.Mi;
        else if (value.includes("EMAIL"))
            return LoginType.Email;
        else if (value.includes("PHONE"))
            return LoginType.Phone;
        else if (value.includes("ADJUST"))
            return LoginType.AdJust;
        else if (value.includes("PASSWORD"))
            return LoginType.PassWord;
        else if (value.includes("IDFA"))
            return LoginType.Idfa;
        else if (value.includes("OTHERS"))
            return LoginType.Other;
        else
            return LoginType.Other;
    }
}
