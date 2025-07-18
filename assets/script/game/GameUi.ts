import * as cc from 'cc'
import ExtendButton from "../common/extend/ExtendButton";
import DataManager from "../common/important/DataManager";
import ContextPool from "../common/tool/context/ContextPool";
import LayerBase from "../expand/ui/LayerBase";
import GameLevelData from "./GameLevelData";
import GameWorld from "./GameWorld";
import { IGameState } from "./IGameState";
import GameManager from "./manager/GameManager";
import DynamicAddScore from "./ui/DynamicAddScore";
import LayerGameOver from "./ui/layer/LayerGameOver";
import { SceneType } from "./ui/scene/SceneType";
import { AudioManager, EAudioType } from './audio/AudioManager';
import { UserData } from './UserData';
const { ccclass, property } = cc._decorator;
@ccclass
export default class GameUi extends cc.Component implements IGameState {
    @property(cc.Prefab)
    public LayerGameOver: cc.Prefab = null;

    @property(DynamicAddScore)
    public DynamicAddScore: DynamicAddScore = null;
    // @property(cc.Label)
    // public LabelTargetScore: cc.Label = null;
    @property(cc.Label)
    public LabelMaxScore: cc.Label = null;
    @property(cc.Button)
    public ButtonReplay: cc.Button = null;
    @property(cc.Node)
    private loveEffect: cc.Node = null;


    protected mScore: number = 0;
    public get Score(): number {
        return this.mScore;
    }

    public addScore(add: number): void {
        this.mScore += add;
        if (this.mScore > UserData.maxScore) {
            UserData.maxScore = this.mScore;
            this.LabelMaxScore.string = UserData.maxScore.toString();
        }
        DataManager.Score = this.mScore;
        this.DynamicAddScore.TargetScore = this.mScore;
    }


    private mGameLevelData: GameLevelData = null;
    public get GameLevelData(): GameLevelData {
        return this.mGameLevelData;
    }

    private mContent: ContextPool = null;
    public init(content: ContextPool) {
        this.mContent = content;
        this.mGameLevelData = new GameLevelData();

        ExtendButton.AddOnClick(this.ButtonReplay, this.onClickReplay, this);
        this.refershScore();
    }

    public playLoveEffect() {
        this.loveEffect.active = true

        this.loveEffect.getComponent(cc.ParticleSystem).play()
        this.loveEffect.children[0].getComponent(cc.ParticleSystem).play()
        this.scheduleOnce(() => {
            this.loveEffect.active = false
        }, 1)
    }

    public onClickHome(): void {
        cc.director.loadScene(SceneType.GameScene.toString());
    }

    public onClickReplay(): void {
        cc.director.loadScene(SceneType.GameScene.toString());
    }

    public onGameStart(): void {
    }

    public onGameWin(): void {
    }

    public onGameOver(): void {
        let layer = LayerBase.Create(LayerGameOver, this.LayerGameOver);
        layer.initOver(this);
    }

    public onGamePause(): void {

    }

    public onGameResume(): void {

    }

    public onGameRestart(): void {

    }

    public onGameRevive(): void {

    }

    public isCompleteTarget(): boolean {
        return this.mScore >= this.mGameLevelData.NowLevelTarget;
    }

    public levelUp() {
        this.mGameLevelData.levelUp();
        this.refershScore();
        this.showLevelUp();
    }

    public refershScore(): void {
        // this.LabelTargetScore.string = this.GameLevelData.NowLevelTarget.toString();
        this.LabelMaxScore.string = UserData.maxScore.toString();
    }


    public showLevelUp() {
        return
        // let levelup = cc.instantiate(this.EffectLevelUp);
        // this.node.addChild(levelup);

        // GameWorld.IncreaseLock();

        // // 使用新的 tween API 替代旧的 Action API
        // this.scheduleOnce(() => {
        //     GameWorld.ReduceLock();

        //     // 闪烁效果
        //     const duration = 0.3;
        //     const times = 4;
        //     const interval = duration / times / 2;

        //     let count = 0;
        //     const blink = () => {
        //         if (count >= times * 2) return;

        //         // this.LabelTargetScore.node.active = count % 2 === 0;
        //         count++;
        //         this.scheduleOnce(blink, interval);
        //     };

        //     blink();
        // }, 1.2);
    }
}
