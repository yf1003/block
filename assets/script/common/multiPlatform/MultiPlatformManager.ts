/*********************************************************/
//  用途: SDK 中心
//  备注：如后续新增额外平台，需要适配本地端。
/*********************************************************/
import { PayResult, SDKResult } from "./MultiPlatformBase";
import { IMultiPlatform } from "./IMultiPlatform";
import MultiPlatformBase from "./MultiPlatformBase";
import MultiPlatformWeiXin from "./MultiPlatformWeiXin";
import MultiPlatformAndroid from "./MultiPlatformAndroid";
import MultiPlatformEmpty from "./MultiPlatformEmpty";
import MultiPlatformFaceBook from "./MultiPlatformFaceBook";
import UserData from "./login/UserData";
import LogTool from "../tool/LogTool";
import { IManager } from "../../expand/interface/IManager";
import * as cc from "cc";

class MultiPlatformManager implements IMultiPlatform, IManager {
    public static readonly MultiPlatformManagerKey: string = "MultiPlatformManager";

    public static readonly instance = new MultiPlatformManager();
    private mPlatform: MultiPlatformBase = null;
    constructor() {
        this.mPlatform = new MultiPlatformEmpty();
    }
    public init(): boolean {
        LogTool.Log("MultiPlatformManager Init Succeed");
        return true;
    }
    public start(): void {
        LogTool.Log("MultiPlatformManager Start Succeed");
    }
    public ready(): void {
        LogTool.Log("MultiPlatformManager Ready Succeed");
    }
    public close(): void {
        LogTool.Log("MultiPlatformManager Close Succeed");
    }

    public initSDK(key: string): boolean {
        return this.mPlatform.initSDK(key);
    }
    public closeSDK(): boolean {
        return this.mPlatform.closeSDK();
    }
    public getVersion(): string {
        return this.mPlatform.getVersion();
    }
    public login(key: string): boolean {
        return this.mPlatform.login(key);
    }
    public loginCallBack(result: SDKResult, data: UserData): void {
        this.mPlatform.loginCallBack(result, data);
    }
    public loginOut(): boolean {
        return this.mPlatform.loginOut();
    }
    public submitScore(key: string, score: number): boolean {
        return this.mPlatform.submitScore(key, score);
    }
    public share(shareKey: string): boolean {
        return this.mPlatform.share(shareKey);
    }
    public shareCallBack(shareResult: SDKResult, shareKey: string): void {
        this.mPlatform.shareCallBack(shareResult, shareKey);
    }
    public moreGame(): boolean {
        return this.mPlatform.moreGame();
    }
    public updateGame(): boolean {
        return this.mPlatform.updateGame();
    }
    public bookAdJust(key: string): boolean {
        return this.mPlatform.bookAdJust(key);
    }
    public book(key: string, value: string): boolean {
        return this.mPlatform.book(key, value);
    }
    public rate(key: string): boolean {
        return this.mPlatform.rate(key);
    }
    public getTime(): boolean {
        return this.mPlatform.getTime();
    }
    public getTimeCallBack(result: SDKResult, time: string): void {
        this.mPlatform.getTimeCallBack(result, time);
    }
    public exit(): boolean {
        return this.mPlatform.exit();
    }
    public showBanner(): boolean {
        return this.mPlatform.showBanner();
    }
    public hideBanner(): boolean {
        return this.mPlatform.hideBanner();
    }
    public canShowBanner(): boolean {
        return this.mPlatform.canShowBanner();
    }
    public showVideo(videoKey: string): boolean {
        return this.mPlatform.showVideo(videoKey);
    }
    public canShowVideo(videoKey: string): boolean {
        return this.mPlatform.canShowVideo(videoKey);
    }
    public videoCallBack(result: SDKResult, videoKey: string) {
        this.mPlatform.videoCallBack(result, videoKey);
    }
    public showInterstitial(page: string): boolean {
        return this.mPlatform.showInterstitial(page);
    }
    public canShowInterstitial(page: string): boolean {
        return this.mPlatform.canShowInterstitial(page);
    }
    public hideInterstitial(page: string): boolean {
        return this.mPlatform.hideInterstitial(page);
    }
    public pay(key: string): boolean {
        return this.mPlatform.pay(key);
    }
    public payCallBack(payResult: PayResult, key: string): void {
        this.mPlatform.payCallBack(payResult, key);
    }
    public queryPay(key: string): boolean {
        return this.mPlatform.queryPay(key);
    }
    public sub(key: string): boolean {
        return this.mPlatform.sub(key);
    }
    public subCallBack(payResult: PayResult, key: string): void {
        this.mPlatform.subCallBack(payResult, key);
    }
    public querySub(): boolean {
        return this.mPlatform.querySub();
    }
}
export default (MultiPlatformManager.instance);