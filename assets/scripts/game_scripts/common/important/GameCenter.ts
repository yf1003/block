import LogTool from "../tool/LogTool";
import BaseManager, { SystemType } from "./BaseManager";
import * as cc from "cc";
/**
 *  游戏适配类型
 */
export enum GameRaidoType {
    /**
     * 未知
     */
    UnKnow,
    /**
     * 超长
     */
    RadioLang,
    /**
     * 正常
     */
    RadioNormal,
    /**
     * Andorid 16:10
     */
    RadioNormalPaid,
    /**
     *  Apple 3:2 
     */
    RadioApplePaid,
}

class GameCenter extends BaseManager {
    public static readonly IsFristOpenAppKey: string = "IsFristOpenApp";

    public static readonly instance = new GameCenter();
    /**
     * 屏幕比例
     */
    private mWindowScreenScale: number = 1;
    public get WindowScreenScale(): number {
        return this.mWindowScreenScale;
    }

    /**
     * 屏幕比例方案
     */
    private mGameRaidoType: GameRaidoType = GameRaidoType.RadioNormal;
    public get GameRaidoType(): GameRaidoType {
        return this.mGameRaidoType;
    }


    /**
     * 是否第一次打开App
     */
    private mIsFirstOpenApp: boolean = true;
    public get IsFirstOpenApp(): boolean {
        return this.mIsFirstOpenApp;
    }


    constructor() {
        super(SystemType.GameCenter);
    }

    public init(): boolean {
        this.checkScreen();
        LogTool.Log("GameCenter Init Succeed");
        return true;
    }
    public start(): void {
        LogTool.Log("GameCenter Start Succeed");
    }
    public ready(): void {
        LogTool.Log("GameCenter Ready Succeed");
    }
    public close(): void {
        LogTool.Log("GameCenter Close Succeed");
    }

    public checkScreen(): void {
        const winSize = cc.view.getVisibleSize()
        let winWidth = Math.max(winSize.width, winSize.height);
        let height = Math.min(winSize.width, winSize.height);
        this.mWindowScreenScale = winWidth / height;

        LogTool.Log("屏幕 winWidth = " + winWidth + "height = " + height);
        LogTool.Log("长宽比 s = " + this.mWindowScreenScale);

        if (this.mWindowScreenScale >= 1.9) {
            LogTool.Log("屏幕 比例超出正规值");
            this.mGameRaidoType = GameRaidoType.RadioLang;
        }
        else if (this.mWindowScreenScale >= 1.7 && this.mWindowScreenScale < 1.9) {
            LogTool.Log("屏幕 正常比例");
            this.mGameRaidoType = GameRaidoType.RadioNormal;
        }
        else if (this.mWindowScreenScale > 1.4 && this.mWindowScreenScale < 1.7) {
            LogTool.Log("屏幕比例接近 16:10 ipaid");
            this.mGameRaidoType = GameRaidoType.RadioNormalPaid;
        }
        else if (this.mWindowScreenScale <= 1.4) {
            LogTool.Log("屏幕 比例接近ipaid");
            this.mGameRaidoType = GameRaidoType.RadioApplePaid;
        }
    }

}
export default (GameCenter.instance);