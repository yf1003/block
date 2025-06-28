import * as cc from "cc";
import { DEBUG } from "cc/env";
const { ccclass, property } = cc._decorator;

const trace = function (...args) {
    // Log.trace("audio", ...args);
};

class AudioState {
    path: string;
    loop: boolean;
    params: any;
    /**
     * 0 : waitToPlay / 1：playing / 2: stoped / 3: paused
     */
    state: number;
    constructor(spath: string, param: any) {
        this.path = spath;
        this.params = param;
        this.state = 0;
    }
}


export enum EAudioType {
    bgm = "audio/bm_bgm",
    click = "audio/sm_click",
    great = "audio/sm_great",
    put = "audio/sm_put",
    synthesis1 = "audio/sm_synthesis1",
    synthesis2 = "audio/sm_synthesis2",
    wow = "audio/sm_wow",
}


@ccclass
export class AudioManager extends cc.Component {

    static ins: AudioManager = null;

    onLoad() {
        if (AudioManager.ins) return

        AudioManager.ins = this;
        cc.director.addPersistRootNode(this.node)
        this.playAudio(EAudioType.bgm, true)
    }

    onDestroy(): void {
        this.stopAudio(EAudioType.bgm)
    }

    private _states = new Map<string, AudioState>(); //只存储循环播放的音频

    private _resMap = new Map<string, cc.AudioSource>(); //只存储循环播放的音频
    private _sourceList: cc.AudioSource[] = [];
    private _volume: number = 1;

    private _getOrCreateState(spath: string) {
        let audioState = this._states.get(spath);
        if (!audioState) {
            audioState = new AudioState(spath, null);
            this._states.set(spath, audioState);
        }
        return audioState;
    }
    /**
     * 加载所有的音频
     * @param audioDirPath 音频文件夹在resources后的路径
     */
    public loadAllAudio(audioDirPath: string, callback?: () => void) {
        cc.resources.loadDir(audioDirPath, (err) => {
            if (err || !cc.isValid(this, true)) {
                trace(`loadAllAudio`, err);
                return;
            }
            trace(audioDirPath, "loadAllAudio complete.");
            callback && callback();
        });
    }

    /**
     * 播放音频
     * @param audioResourcePath `string` 资源路径，或者前缀分包名的资源路径地址，如spx|audios/balabala
     * @param loop `boolean` 可选传参，是否循环播放，若不传，则为不循环
     * @param volume `boolean` 可选传参，指定本音效的音量，若不传，则为_volume
     * @param params `obj` 可选传参
     * 
     * 可传入`callback`播完回调，仅对单次音频有效，调用方式：
     * ```
     *  let callFunc = () => {console.log(`audio ${path} 播放完毕`)};
     * // 不指定volume的情况下, volume传null
     * // 只有单次播放的音频会执行播完回调
        engine.audioManager.playAudio(path, false, null, { callback: callFunc });
     * ```
     * @returns
     */
    public playAudio(audioResourcePath: string, loop?: boolean, volume?: number, params?: any) {
        DEBUG && trace(`加载音频资源：${audioResourcePath}`);
        let audioState = this._getOrCreateState(audioResourcePath);
        audioState.state = 0;

        cc.resources.load(audioResourcePath, cc.AudioClip, (err, audioRes) => {
            if (err || !cc.isValid(this, true)) {
                trace(`playAudio, loadAsset error`, err);
                return;
            }
            let audioState = this._states.get(audioResourcePath);
            if (audioState.state == 2) {
                DEBUG && trace(`${audioResourcePath} 已经被设置为停止状态!`);
                return;
            }
            audioState.params = params;
            // trace(`加载音频资源 audioRes: `, audioRes);
            const _isLoop: boolean = loop ? true : false;
            //获取到资源,播放音频
            this._playAudioByRes(audioRes, audioResourcePath, _isLoop, volume, params);
        });
    }

    /**根据给定的资源播放音频 */
    private _playAudioByRes(audioRes: cc.AudioClip, audioResourcePath: string, loop?: boolean, volume?: number, params?: any) {
        if (this._resMap.has(audioResourcePath) && loop) {
            DEBUG && trace("播放了两个相同的循环音频！");
            return;
        }
        const AudioSource = this._sourceList.length > 0 ? this._sourceList.shift() : this.node.addComponent(cc.AudioSource);
        AudioSource.clip = audioRes;
        AudioSource.playOnAwake = false;
        AudioSource.volume = typeof volume === "number" ? volume : this._volume;
        AudioSource.loop = !!loop;
        let audioState = this._getOrCreateState(audioResourcePath);
        audioState.params = params;
        audioState.state = 1;
        if (loop) {
            this._resMap.set(audioResourcePath, AudioSource);
            AudioSource.play();
        } else {
            AudioSource.playOneShot(audioRes);
            const duration = audioRes.getDuration();
            const call = params && params.callback ? params.callback : null;
            this.scheduleOnce(() => {
                this._sourceList.push(AudioSource);
                audioState.state = 0;
                call && call();
            }, duration);
        }
    }

    /**
     * 停止播放音频
     * @param audioResourcePath string 音频在resources后面的路径
     */
    public stopAudio(audioResourcePath: string) {
        this._getOrCreateState(audioResourcePath).state = 2;
        const AudioSource = this._resMap.get(audioResourcePath);
        if (AudioSource) {
            AudioSource.stop();
            this._sourceList.push(AudioSource);
            this._resMap.delete(audioResourcePath);
        }
    }

    /**
     * 恢复音效
     * @param audioResourcePath string 音频在resources后面的路径
     */
    public resumeAudio(audioResourcePath: string) {
        this._getOrCreateState(audioResourcePath).state = 1;
        const AudioSource = this._resMap.get(audioResourcePath);
        if (AudioSource) {
            AudioSource.play();
        }
    }

    /**
     * 暂停音效
     * @param audioResourcePath string 音频在resources后面的路径
     */
    public pauseAudio(audioResourcePath: string) {
        this._getOrCreateState(audioResourcePath).state = 3;
        const AudioSource = this._resMap.get(audioResourcePath);
        if (AudioSource) {
            AudioSource.pause();
        }
    }

    /**
     * 获取一个有loop属性的音频是否正在播放
     * 注意playAudio时如果没有传loop，本函数一定会返回false！
     * @param audioResourcePath string 音频在resources后面的路径
     * @returns
     */
    public isAudioPlaying(audioResourcePath: string) {
        const AudioSource = this._resMap.get(audioResourcePath);
        return !!(AudioSource && AudioSource.playing);
    }

    /**
     * 获取一个有loop属性的音频是否正在存在
     * 注意playAudio时如果没有传loop，本函数一定会返回false！
     * @param audioResourcePath string 音频在resources后面的路径
     * @returns
     */
    public hasAudio(audioResourcePath: string) {
        return this._resMap.has(audioResourcePath);
    }

    /**设置默认音量，当调用playAudio并且没传入volume时，使用这个音量 */
    public set volume(volume: number) {
        this._volume = Math.floor(volume * 100) / 100;
    }

    /**获取当前音量 */
    public get volume() {
        return this._volume;
    }

    /**
     * 获取一个loop属性的音频
     * 注意playAudio时如果没有传loop，本函数一定会返回null
     * @param audioResourcePath 
     * @returns 
     */
    public getAudio(audioResourcePath: string) {
        return this._resMap.get(audioResourcePath);
    }
}
