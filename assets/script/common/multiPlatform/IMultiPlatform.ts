import { PayResult, SDKResult } from "./MultiPlatformBase";
import UserData from "./login/UserData";
export interface IMultiPlatform {
    /**
     * 初始化SDK
     * @param key 初始化平台标识
     */
    initSDK(key: string): boolean;
    /**
     * 关闭SDK
     */
    closeSDK(): boolean;
    /**
     * 获取版本号
     */
    getVersion(): string;
    /**
     * 游戏登录
     * @param key 登录标识
     */
    login(key: string): boolean;
    /**
     * 登录回调
     * @param result 登录结果
     * @param data 用户数据
     */
    loginCallBack(result: SDKResult, data: UserData): void;
    /**
     *  游戏登出
     */
    loginOut(): boolean;
    /**
     *  提交分数
     * @param key 分数标识
     * @param score 分数
     */
    submitScore(key: string, score: number): boolean;
    /**
     *  分享
     * @param shareKey 标识
     */
    share(shareKey: string): boolean;
    /**
     * 分享回调
     * @param shareResult 分享结果
     * @param shareKey 标识
     */
    shareCallBack(shareResult: SDKResult, shareKey: string): void;
    /**
     * 更多游戏
     */
    moreGame(): boolean;
    /**
     * 更新游戏
     */
    updateGame(): boolean;
    /**
     * ADJust统计
     * @param key 标识
     */
    bookAdJust(key: string): boolean;
    /**
     * 统计
     * @param key 标识
     * @param value 参数
     */
    book(key: string, value: string): boolean;
    /**
     * 评价
     * @param key 标识
     */
    rate(key: string): boolean;
    /**
     * 获取时间 
     */
    getTime(): boolean;
    /**
     * 获取时间回调
     * @param result 获取时间结果
     * @param time 
     */
    getTimeCallBack(result: SDKResult, time: string): void;
    /**
     * 游戏退出
     */
    exit(): boolean;
    //------------------------------------广告-------------------------------------
    /**
     * 展示Banner
     */
    showBanner(): boolean;
    /**
     * 隐藏Banner
     */
    hideBanner(): boolean;
    /**
     * 是否能展示Banner
     */
    canShowBanner(): boolean;
    /**
     * 展示视频广告
     * @param videoKey 标识
     */
    showVideo(videoKey: string): boolean;
    /**
     * 视频广告能否展示
     * @param videoKey 
     */
    canShowVideo(videoKey: string): boolean;
    /**
     * 视频回调
     * @param result 视频回调结果
     * @param videoKey 标识
     */
    videoCallBack(result: SDKResult, videoKey: string);
    /**
     * 展示插屏广告
     * @param page 标识
     */
    showInterstitial(page: string): boolean;
    /**
     * 插屏广告能否展示
     * @param page 标识
     */
    canShowInterstitial(page: string): boolean;
    /**
     * 隐藏插屏广告
     * @param page 标识
     */
    hideInterstitial(page: string): boolean;
    //--------------------------------------支付-------------------------------------
    /**
     * 支付
     * @param key 
     */
    pay(key: string): boolean;
    /**
     * 支付回调
     * @param payResult 支付结果
     * @param key 标识
     */
    payCallBack(payResult: PayResult, key: string): void;
    /**
     * 查询支付
     * @param key 标识
     */
    queryPay(key: string): boolean;
    /**
     * 订阅
     * @param key 标识
     */
    sub(key: string): boolean;
    /**
     * 订阅回调
     * @param payResult 订阅结果
     * @param key 标识
     */
    subCallBack(payResult: PayResult, key: string): void;
    /**
     * 查询订阅
     */
    querySub(): boolean;
}