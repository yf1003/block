import * as cc from "cc";
import CommonEvent from "../CommonEvent";
import MultiPlatformManager from "../multiPlatform/MultiPlatformManager";
import EventNotice from "../tool/EventNotice";
import LogTool from "../tool/LogTool";
import TimeManager from "./TimeManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class TimeManagerControl extends cc.Component {
    /**
     * 每10秒同步时间
     */
    public static readonly AUTO_SYNC_TIME = 10;
    private mIsPaue: boolean = false;
    private mBookSyncIndex = TimeManagerControl.AUTO_SYNC_TIME;
    private mBookMinuteIndex = 60;

    protected start(): void {

        /**
         * 处理切到后台的事件
        */
        cc.game.on(cc.Game.EVENT_HIDE, () => {
            this.mIsPaue = true;
            TimeManager.onSaveData();
            LogTool.LogWarning("游戏进入后台");
            EventNotice.emit(CommonEvent.COMMON_EVENT_GAME_HIDE);
        });

        /**
         * 处理切到前台的事件
        */
        cc.game.on(cc.Game.EVENT_SHOW, () => {
            this.mIsPaue = false;
            MultiPlatformManager.getTime();
            LogTool.LogWarning('游戏进入前台');
            EventNotice.emit(CommonEvent.COMMON_EVENT_GAME_SHOW);
        });

        var self = this;
        setInterval(() => {
            self.updateAutoSyncTime(0);
        }, 1000);
    }

    public updateAutoSyncTime(dt): void {
        if (this.mIsPaue)
            return;
        this.mBookSyncIndex--;
        this.mBookMinuteIndex--;
        let number = TimeManager.NowTime.getTime();
        TimeManager.NowTime = new Date(number + 1);;
        EventNotice.emit(CommonEvent.COMMON_EVENT_ADD_SECOND);
        if (this.mBookMinuteIndex <= 0) {
            EventNotice.emit(CommonEvent.COMMON_EVENT_ADD_MINUTE);
            this.mBookMinuteIndex = 60;
        }
        if (this.mBookSyncIndex <= 0) {
            LogTool.Log("Atuo Sync Time");
            this.mBookSyncIndex = TimeManagerControl.AUTO_SYNC_TIME;
            TimeManager.LoginSecond = TimeManager.LoginSecond + TimeManagerControl.AUTO_SYNC_TIME;
            MultiPlatformManager.getTime();
        }
    }
}
