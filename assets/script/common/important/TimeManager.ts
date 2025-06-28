import IReadSave from "../../expand/interface/IReadSave";
import CommonEvent from "../CommonEvent";
import MultiPlatformManager from "../multiPlatform/MultiPlatformManager";
import SaveManager from "../save/SaveManager";
import EventNotice from "../tool/EventNotice";
import LogTool from "../tool/LogTool";
import StringTool from "../tool/StringTool";
import BaseManager, { SystemType } from "./BaseManager";
export enum WeekFirstDay {
    /**
     * 星期一
     */
    Monday,
    /**
     * 星期四
     */
    Thursday,
}

class TimeManager extends BaseManager implements IReadSave {
    /**
     * 保存登录天数Key
     */
    public static readonly SAVE_LOGIN_DAY_KEY: string = "SAVE_LOGIN_DAY_KEY";
    /**
     * 保存上次登录时间Key
     */
    public static readonly SAVE_LAST_LOGIN_TIME: string = "SAVE_LAST_LOGIN_TIME";
    /**
     * 保存首次登录时间Key
     */
    public static readonly SAVE_FIRST_LOGIN_DAY_KEY: string = "SAVE_FIRST_LOGIN_DAY_KEY";
    /**
     * 保存连续登录时间Key
     */
    public static readonly SAVE_CONTINUOUS_LOGIN_DAY: string = "SAVE_CONTINUOUS_LOGIN_DAY";
    /**
     * 保存玩家游玩时间(秒)
     */
    public static readonly SAVE_LOGIN_SECOND_KEY: string = "SAVE_LOGIN_SECOND_KEY";
    /**
     * 今日玩家游戏时间(秒)
     */
    public static readonly SAVE_DAY_LOGIN_SECOND_KEY: string = "SAVE_DAY_LOGIN_SECOND_KEY";


    public static readonly instance = new TimeManager(SystemType.Time);
    /**
     * 是否同一天(相较上次登录数据)
     */
    private isSameDay: boolean = false;
    public get SameDay(): boolean {
        return this.isSameDay;
    }
    /**
     * 是否同一周(相较上次登录数据)
     */
    private isSameWeek: boolean = false;
    public get SameWeek(): boolean {
        return this.isSameWeek;
    }
    /**
     * 当前时间
     */
    private mNowTime: Date = new Date();
    public set NowTime(date: Date) {
        this.mNowTime = date;
    }
    public get NowTime(): Date {
        return this.mNowTime;
    }
    /**
     * 第一次登录时间
     */
    private mFirstDateTime: Date = new Date();
    public get FirstDateTime(): Date {
        return this.mFirstDateTime;
    }

    /**
     * 今日第一次登录
     */
    private mLoginStartTime: Date = new Date();
    public get LoginStartTime(): Date {
        return this.mLoginStartTime;
    }

    /**
     * 最后登录时间
     */
    private mLastDateTime: Date = new Date();
    public get LastDateTime(): Date {
        return this.mLastDateTime;
    }

    /**
     * 登录天数
     */
    private mLoginDay: number = 1;
    public set LoginDay(value: number) {
        this.mLoginDay = value;
        SaveManager.setData(TimeManager.SAVE_LOGIN_DAY_KEY, this.mLoginDay);
    }
    public get LoginDay(): number {
        return this.mLoginDay;
    }
    /**
     * 连续登录天数
     */
    private mContinuousLoginDay: number = 0;
    public set ContinuousLoginDay(value: number) {
        this.mContinuousLoginDay = value;
        SaveManager.setData(TimeManager.SAVE_CONTINUOUS_LOGIN_DAY, this.mContinuousLoginDay);
    }
    public get ContinuousLoginDay(): number {
        return this.mContinuousLoginDay;
    }
    /**
     * 玩家登录时长(秒)
     */
    private mLoginSecond: number = 0;
    public get LoginSecond(): number {
        return this.mLoginSecond;
    }
    public set LoginSecond(value: number) {
        this.mLoginSecond = value;
        SaveManager.setData(TimeManager.SAVE_LOGIN_SECOND_KEY, this.mLoginSecond);
    }
    /**
     *  玩家登录时长(分钟)
     */
    public get LoginMinute(): number {
        let minute = parseInt(this.mLoginSecond / 60 + "");
        if (minute <= 1)
            minute = 1;
        return minute;
    }
    /**
     * 玩家今日时常(秒)
     */
    private mDayLoginSecond: number = 0;
    public get DayLoginSecond(): number {
        return this.mDayLoginSecond;
    }
    public set DayLoginSecond(value: number) {
        this.mDayLoginSecond = value;
        SaveManager.setData(TimeManager.SAVE_DAY_LOGIN_SECOND_KEY, this.mDayLoginSecond);
    }

    /**
     * 玩家进入游戏时常(分钟)
     */
    public get DayLoginMinute(): number {
        let minute = parseInt(this.mDayLoginSecond / 60 + "");
        if (minute <= 1)
            minute = 1;
        return minute;
    }

    /**
     * 距离上次登录的离线时间(毫秒)
     */
    public get OfflineTime(): number {
        return this.mLoginStartTime.getTime() - this.mLastDateTime.getTime();
    }

    public init(): boolean {
        return true;
    }

    public ready(): void {
    }

    public start(): void {
        this.onReadData();
        MultiPlatformManager.getTime();
    }

    public close() {
        this.onSaveData();
    }

    public onReadData(): void {

        // -- 这次登录时间
        this.mLoginStartTime = new Date();

        // -- 上次登录时间
        let lastDateTime = SaveManager.getData(TimeManager.SAVE_LAST_LOGIN_TIME, this.mLastDateTime.toUTCString());
        this.mLastDateTime = new Date(lastDateTime);

        // -- 连续登录天数
        this.mContinuousLoginDay = parseInt(SaveManager.getData(TimeManager.SAVE_CONTINUOUS_LOGIN_DAY, this.mContinuousLoginDay));
        // -- 累计登录天数
        this.mLoginDay = parseInt(SaveManager.getData(TimeManager.SAVE_LOGIN_DAY_KEY, this.mLoginDay));

        // -- 第一次登录时间
        let fistLogin = SaveManager.getData(TimeManager.SAVE_FIRST_LOGIN_DAY_KEY, '');
        if (StringTool.IsEmpty(fistLogin)) {
            this.mFirstDateTime = new Date();
            SaveManager.getData(TimeManager.SAVE_FIRST_LOGIN_DAY_KEY, this.mFirstDateTime.toUTCString());
        }
        else
            this.mFirstDateTime = new Date(fistLogin);

        // -- 玩家登录时长
        this.mLoginSecond = SaveManager.getData(TimeManager.SAVE_LOGIN_SECOND_KEY, this.mLoginSecond);
        // -- 进入登录时长
        this.mDayLoginSecond = SaveManager.getData(TimeManager.SAVE_DAY_LOGIN_SECOND_KEY, this.mDayLoginSecond);
    }

    public onSaveData(): void {
        SaveManager.setData(TimeManager.SAVE_LOGIN_DAY_KEY, this.mLoginDay);
        SaveManager.setData(TimeManager.SAVE_LOGIN_SECOND_KEY, this.mLoginSecond);
        SaveManager.setData(TimeManager.SAVE_DAY_LOGIN_SECOND_KEY, this.mDayLoginSecond);
        SaveManager.setData(TimeManager.SAVE_CONTINUOUS_LOGIN_DAY, this.mContinuousLoginDay);
        SaveManager.setData(TimeManager.SAVE_LAST_LOGIN_TIME, this.NowTime.toUTCString());
    }

    /**
     * 获取今日剩余时间
     * @param time 
     * @returns 
     */
    public getLastTime(time: number): number {
        if (!time)
            return (24 * 60 * 60);
        this.refreshStateByTime(time);

        let timeData = new Date(time);
        let hours = timeData.getHours();
        let min = timeData.getMinutes();
        let se = timeData.getSeconds();
        let last = (24 * 60 * 60) - (hours * 60 * 60 + min * 60 + se);
        return last;
    }

    // 刷新每天上线领取状态
    public refreshStateByTime(nowTime: number): void {
        if (!nowTime)
            return;
        let time = parseInt(nowTime + "");
        let timeData = new Date(time);

        let curYear = timeData.getUTCFullYear();
        let curMonth = timeData.getUTCMonth();
        let curDay = timeData.getUTCDate();

        let lastTime = SaveManager.getData(TimeManager.SAVE_LAST_LOGIN_TIME, time);
        let lastData = new Date(parseInt(lastTime));

        let lastYear = lastData.getUTCFullYear();
        let lastMonth = lastData.getUTCMonth();
        let lastDay = lastData.getUTCDate();
        this.isSameWeek = false;
        if (this.chenckSameWeek(lastData, timeData)) {
            this.isSameWeek = true;
            if (!this.isSameWeek)
                EventNotice.emit(CommonEvent.MY_COMMON_EVENT_REFRESH_WEEK);
        }

        this.isSameDay = false;
        if (lastYear && lastYear == curYear) {
            if (lastMonth && lastMonth == curMonth) {
                if (lastDay && lastDay == curDay) {
                    this.isSameDay = true;
                }

                let dayCha = curDay - lastDay;
                if (dayCha === 1)
                    this.ContinuousLoginDay = this.mContinuousLoginDay + 1;
                else
                    this.ContinuousLoginDay = 0;
            }
        }

        if (this.isSameDay == false) {
            this.DayLoginSecond = 0;
            this.LoginDay = this.mLoginDay + 1;
            EventNotice.emit(CommonEvent.MY_COMMON_EVENT_REFRESH_DAY_LINK);
        }
        SaveManager.setData(TimeManager.SAVE_LAST_LOGIN_TIME, time);
        EventNotice.emit(CommonEvent.MY_COMMON_EVENT_SYNC_TIME);

        this.logAll();
    }


    private chenckSameWeek(old: Date, now: Date): boolean {
        let oneDayTime = 1000 * 60 * 60 * 24;
        let oldAllDay = parseInt(old.getTime() / oneDayTime + "");
        let nowAllDay = parseInt(now.getTime() / oneDayTime + "");

        // 1970/1月1/周四 /周一为一周起始
        let oldWeek = parseInt(oldAllDay + 4 + "") / 7;
        let nowWeek = parseInt(nowAllDay + 4 + "") / 7;

        // 1970/1月1/周四 /周日为一周起始
        // let oldWeek = parseInt(oldAllDay - 3) / 7;
        // let nowWeek = parseInt(nowAllDay - 3) / 7;
        return oldWeek == nowWeek;
    }

    /**
     * 测试用:立刻新的一天
     */
    public resertDay(): void {
        this.isSameDay = false;
        this.DayLoginSecond = 0;
        EventNotice.emit(CommonEvent.MY_COMMON_EVENT_REFRESH_DAY_LINK);
    }

    /**
     * 测试用:立刻新的一周
     */
    public resertWeek() {
        this.isSameWeek = true;
        EventNotice.emit(CommonEvent.MY_COMMON_EVENT_REFRESH_WEEK);
    }

    public logAll() {
        LogTool.Log("当前时间:", this.NowTime.toString());
        LogTool.Log("第一次登录游戏时间:" + this.FirstDateTime.toString());
        LogTool.Log("今日登录游戏时间" + this.LoginStartTime.toString());
        LogTool.Log("最后登录时间:" + this.LastDateTime.toString());
        LogTool.Log("登录总天数:" + this.LoginDay);
        LogTool.Log("连续登录天数" + this.ContinuousLoginDay);
        LogTool.Log("游戏时常:" + this.LoginSecond + "秒");
        LogTool.Log("游戏时常:" + this.LoginMinute + "分钟");
        LogTool.Log("今日游戏时常:" + this.DayLoginSecond + "秒");
        LogTool.Log("上次离线时长:" + this.OfflineTime + "秒");
    }
}
export default (TimeManager.instance);