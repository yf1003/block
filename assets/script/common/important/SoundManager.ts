import IReadSave from "../../expand/interface/IReadSave";
import SaveManager from "../save/SaveManager";
import LogTool from "../tool/LogTool";
import StringTool from "../tool/StringTool";
import BaseManager, { SystemType } from "./BaseManager";
import * as cc from "cc";

class SoundManager extends BaseManager implements IReadSave {
    public static readonly SoundManagerMusicPath: string = "sound/music/";
    public static readonly SoundManagerEffectPath: string = "sound/effect/";

    public static readonly SaveMusicKey: string = "SaveMusiceKey";
    public static readonly SaveEffectKey: string = "SaveEffectKey";
    public static readonly SaveSharkKey: string = "SaveSharkKey";

    public static readonly instance = new SoundManager();

    private mSaveMusicID: string = StringTool.Null;
    private mIsMusicOn: boolean = false;
    public set IsMusicOn(value: boolean) {
        if (value == this.mIsMusicOn)
            return;
        this.mIsMusicOn = value;
        if (this.mIsMusicOn) {
            if (!StringTool.IsEmpty(this.mSaveMusicID)) {
                cc.loader.loadRes(this.mSaveMusicID, cc.AudioClip, function (err, clip) {
                    if (!err)
                        var audioID = cc.audioEngine.playMusic(clip, true);
                });
            }
        }
        else
            cc.audioEngine.stopMusic();
        SaveManager.getData(SoundManager.SaveMusicKey, this.mIsMusicOn);
    }
    /**
     *   背景音乐是否开启
     */
    public get IsMusicOn(): boolean {
        return this.mIsMusicOn;
    }

    private mIsEffectOn: boolean = false;
    public set IsEffectOn(value: boolean) {
        if (value == this.mIsEffectOn)
            return;
        if (!value)
            cc.audioEngine.stopAllEffects();
        this.mIsEffectOn = value;
        SaveManager.getData(SoundManager.SaveEffectKey, this.mIsEffectOn);
    }
    /**
     *  游戏音效是否开启
     */
    public get IsEffectOn(): boolean {
        return this.mIsEffectOn;
    }

    private mIsSharkOn: boolean = false;
    public set IsSharkOn(value: boolean) {
        if (value == this.mIsSharkOn)
            return;
        this.mIsSharkOn = value;
        SaveManager.getData(SoundManager.SaveSharkKey, this.mIsSharkOn);
    }

    /**
     *  游戏震动是否开启
     */
    public get IsSharkOn(): boolean {
        return this.mIsSharkOn;
    }

    constructor() {
        super(SystemType.Sound);
    }

    public onReadData(): void {
        this.mIsMusicOn = SaveManager.getData(SoundManager.SaveMusicKey, true);
        this.mIsEffectOn = SaveManager.getData(SoundManager.SaveEffectKey, true);
        this.mIsSharkOn = SaveManager.getData(SoundManager.SaveSharkKey, true);
    }
    public onSaveData(): void {
        SaveManager.setData(SoundManager.SaveMusicKey, this.mIsMusicOn);
        SaveManager.setData(SoundManager.SaveEffectKey, this.mIsEffectOn);
        SaveManager.setData(SoundManager.SaveSharkKey, this.mIsSharkOn);
    }

    public init(): boolean {
        return true;
    };
    public start(): void {
    }
    public ready(): void {
        this.onReadData();
    }
    public close(): void {
        this.onSaveData();
    };

    /**
     * 震动
     * @param time 
     * @returns 
     */
    public shark(time: number = 1): void {
        if (this.mIsSharkOn) {
            LogTool.Log("Shark is Close");
            return;
        }
    }

    /**
     * 播放音乐
     * @param id 文件名
     * @returns 
     */
    public playMusic(id: string): void {
        if (this.mIsMusicOn) {
            let path = SoundManager.SoundManagerMusicPath + id;
            if (this.mSaveMusicID == path)
                return;
            this.mSaveMusicID = path;
            cc.audioEngine.stopMusic();
            if (this.mIsMusicOn) {
                cc.loader.loadRes(path, cc.AudioClip, function (err, clip) {
                    if (!err)
                        var audioID = cc.audioEngine.playMusic(clip, true);
                });
            }
        }
    };

    /**
     * 播放音效
     * @param id 
     */
    public playEffect(id: string): void {
        if (this.mIsEffectOn) {
            let path = SoundManager.SoundManagerEffectPath + id;
            cc.loader.loadRes(path, cc.AudioClip, function (err, clip) {
                if (!err) {
                    let effectID = cc.audioEngine.playEffect(clip, false);
                }
            });
        }
    };

    /**
     *  Button 默认音效
     */
    public playButton(): void {
        this.playEffect("ButtonClick");
    };
}
export default (SoundManager.instance);

