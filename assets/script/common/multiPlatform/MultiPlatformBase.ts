
import LogTool from "../tool/LogTool";
import { IMultiPlatform } from "./IMultiPlatform";
import UserData from "./login/UserData";

/**
 *  多平台类型 枚举
 */
export enum MultiPlatformType {
    /**
     *  空
     */
    Empty,
    /**
     *  安卓
     */
    Android,
    /**
     * Ios
     */
    Ios,
}

/**
 *  SDK结果 枚举
 */
export enum SDKResult {
    /**
     *  成功
     */
    Succeed = 0,
    /**
     *  失败
     */
    Fail = 1,
    /**
     *  错误
     */
    Error = 2,
    /**
     * 取消
     */
    Cancel = 3,
}

/**
 *  支付结果 枚举
 */
export enum PayResult {
    /**
     * 成功
     */
    Succeed = 0,
    /**
     * 失败
     */
    Fail = 1,
    /**
     * 错误
     */
    Error = 2,
    /**
     * 取消
     */
    Cancel = 3,
}


export enum BookSendType {
    // -- 未知
    UnKnow = 0,
    // -- 事件
    Event = 1,
    // -- 人物
    User = 2,
}

export default class MultiPlatformBase implements IMultiPlatform {
    public static LogKey: string = "MultiPlatformBase";

    protected mIsLogin: boolean = false;
    public get IsLogin(): boolean {
        return this.mIsLogin;
    }
    public initSDK(key: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "initSDK", key);
        return true;
    }
    public closeSDK(): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "closeSDK");
        return true;
    }
    public getVersion(): string {
        return '';
    }
    public login(key: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "login", key);
        return false;
    }
    public loginCallBack(result: SDKResult, data: UserData): void {
        LogTool.Log(MultiPlatformBase.LogKey, "loginCallBack", result, data);
    }
    public loginOut(): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "loginOut");
        return false;
    }
    public submitScore(key: string, score: number): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "submitScore", key, score);
        return false;
    }
    public share(shareKey: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "share", shareKey);
        return false;
    }
    public shareCallBack(shareResult: SDKResult, shareKey: string): void {
        LogTool.Log(MultiPlatformBase.LogKey, "shareCallBack", shareResult, shareKey);
    }
    public moreGame(): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "moreGame");
        return false;
    }
    public updateGame(): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "updateGame");
        return false;
    }
    public bookAdJust(key: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "bookAdJust", key);
        return false;
    }
    public book(key: string, value: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "book", key, value);
        return false;
    }
    public rate(key: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "rate", key);
        return false;
    }
    public getTime(): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "getTime");
        return false;
    }
    public getTimeCallBack(result: SDKResult, time: string): void {
        LogTool.Log(MultiPlatformBase.LogKey, "getTimeCallBack", result, time);
    }
    public exit(): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "exit");
        return false;
    }
    public showBanner(): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "showBanner");
        return false;
    }
    public hideBanner(): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "hideBanner");
        return false;
    }
    public canShowBanner(): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "canShowBanner");
        return false;
    }
    public showVideo(videoKey: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "showVideo", videoKey);
        return false;
    }
    public canShowVideo(videoKey: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "canShowVideo", videoKey);
        return false;
    }
    public videoCallBack(result: SDKResult, videoKey: string) {
        LogTool.Log(MultiPlatformBase.LogKey, "videoCallBack", result, videoKey);
        return false;
    }
    public showInterstitial(page: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "showInterstitial", page);
        return false;
    }
    public canShowInterstitial(page: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "canShowInterstitial", page);
        return false;
    }
    public hideInterstitial(page: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "hideInterstitial", page);
        return false;
    }
    public pay(key: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "pay", key);
        return false;
    }
    public payCallBack(payResult: PayResult, key: string): void {
        LogTool.Log(MultiPlatformBase.LogKey, "payCallBack", payResult, key);
    }
    public queryPay(key: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "queryPay", key);
        return false;
    }
    public sub(key: string): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "sub", key);
        return false;
    }
    public subCallBack(payResult: PayResult, key: string): void {
        LogTool.Log(MultiPlatformBase.LogKey, "subCallBack", payResult, key);
    }
    public querySub(): boolean {
        LogTool.Log(MultiPlatformBase.LogKey, "querySub");
        return false;
    }
}
