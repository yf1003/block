import * as cc from 'cc'
import CommonEvent from "../common/CommonEvent";
import EventNotice from "../common/tool/EventNotice";
import IRegisterEvent from "../expand/interface/IRegisterEvent";
import LayerBase from "../expand/ui/LayerBase";
import ContextPool from "../common/tool/context/ContextPool";
import LockStatus from "../expand/base/LockStatus";
import GameUi from "./GameUi";
import { IGameState } from "./IGameState";
import List from "../common/tool/List";
import LogTool from "../common/tool/LogTool";
import MatrixCube from "./matrix/MatrixCube";
import { UserData } from './UserData';

export enum GameState {
    /**
     *   开始
     */
    Start,
    /**
     *   暂停
     */
    Pause,
    /**
     *   胜利
     */
    Win,
    /**
     *   结束
     */
    Over,
}

const { ccclass, property } = cc._decorator;
@ccclass
export default class GameWorld extends LayerBase implements IGameState, IRegisterEvent {
    /**
 *  游戏世界状态锁标签
 */
    public static readonly GAME_WORLD_STATUS = "GAME_WORLD_STATUS";

    @property(cc.Node)
    public NodeTouch: cc.Node = null;

    @property(MatrixCube)
    public MatrixCube: MatrixCube = null;

    private mContextPool: ContextPool = null;
    private mLockStatus: LockStatus = null;
    private mIsTouch: boolean = false;
    public get IsTouch(): boolean {
        return this.mIsTouch;
    }
    private mGameUi: GameUi = null;
    public get GameUi(): GameUi {
        return this.mGameUi;
    }

    /**
   *   状态池
   */
    private mGameStateList: List<GameState> = new List<GameState>();
    public get GameStateList(): List<GameState> {
        return this.mGameStateList;
    }
    public isGameState(state: GameState): boolean {
        return this.mGameStateList.contains(state);
    }
    public addGameState(...states: GameState[]) {

        for (let state of states) {
            if (!this.isGameState(state)) {
                this.mGameStateList.add(state);
            }
        }
        return true;
    }
    public removeGameState(...states: GameState[]) {
        for (let i = states.length - 1; i >= 0; i--) {
            if (this.mGameStateList.contains(states[i]))
                this.mGameStateList.remove(states[i]);
        }
    }

    protected start(): void {
        this.init();
    }

    public init(): boolean {
        UserData.randCount = 0
        this.mContextPool = new ContextPool(this.name);
        this.mContextPool.insert(this);

        this.mGameUi = this.node.getComponent(GameUi);
        this.mGameUi.init(this.mContextPool);
        this.mContextPool.insert(this.mGameUi);

        this.MatrixCube.init(this.mContextPool);
        this.mContextPool.insert(this.MatrixCube);

        this.mLockStatus = new LockStatus(GameWorld.GAME_WORLD_STATUS);

        this.schedule(this.updateWorld, 0.1);
        this.scheduleOnce(this.onContextLoad, 0.1);

        this.onRegisterEvent();
        return true;
    }

    public onContextLoad(): void {
        this.mContextPool.load();
        this.onGameStart();
    }

    protected onDestroy(): void {
        this.onCancelEvent();
    }

    public onRegisterEvent(): void {
        cc.macro.ENABLE_MULTI_TOUCH = false;
        this.NodeTouch.on(cc.Node.EventType.TOUCH_START, (event) => {
            if (this.mLockStatus.isBusy() || this.isGameBusy())
                return;
            let touches = event.getTouches();
            this.mIsTouch = true;
            this.MatrixCube.onTouchBegin(event);
        });

        this.NodeTouch.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            if (this.mLockStatus.isBusy() || this.isGameBusy())
                return;
            let touches = event.getTouches();
            this.mIsTouch = true;
            this.MatrixCube.onTouchMove(event);
        });

        this.NodeTouch.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (this.mLockStatus.isBusy() || this.isGameBusy())
                return;
            let touches = event.getTouches();
            this.mIsTouch = false;
            this.MatrixCube.onTouchEnd(event);
        });

        this.NodeTouch.on(cc.Node.EventType.TOUCH_CANCEL, (event) => {
            if (this.mLockStatus.isBusy() || this.isGameBusy())
                return;
            let touches = event.getTouches();
            this.mIsTouch = false;
            this.MatrixCube.onTouchEnd(event);
        });

        EventNotice.on(CommonEvent.COMMON_EVENT_GAME_WIN, this.onGameWin, this);
        EventNotice.on(CommonEvent.COMMON_EVENT_GAME_OVER, this.onGameOver, this);
        EventNotice.on(CommonEvent.COMMON_EVENT_GAME_PAUSE, this.onGamePause, this);
        EventNotice.on(CommonEvent.COMMON_EVENT_GAME_RESUME, this.onGameResume, this);
        EventNotice.on(CommonEvent.COMMON_EVENT_SAVE_GAME_DATA, this.onSaveGameData, this);
    }

    public onCancelEvent(): void {
        EventNotice.off(CommonEvent.COMMON_EVENT_GAME_WIN, this);
        EventNotice.off(CommonEvent.COMMON_EVENT_GAME_OVER, this);
        EventNotice.off(CommonEvent.COMMON_EVENT_GAME_PAUSE, this);
        EventNotice.off(CommonEvent.COMMON_EVENT_GAME_RESUME, this);
        EventNotice.off(CommonEvent.COMMON_EVENT_SAVE_GAME_DATA, this);

        this.mLockStatus.destroy();
        this.mContextPool.destroy();
    }

    public updateWorld(dt): void {
        if (this.isGameBusy())
            return;
    }

    public update(dt): void {
        if (this.isGameBusy())
            return;
        this.MatrixCube.onUpdate(dt);
    }

    public isBusy(): boolean {
        if (!this.isGameState(GameState.Start))
            return true;
        if (this.isGameState(GameState.Over))
            return true;
        if (this.isGameState(GameState.Pause))
            return true;
        if (this.isGameState(GameState.Win))
            return true;
        return false;
    }

    public isGameBusy(): boolean {
        if (this.isBusy())
            return true;
        if (this.mLockStatus.isBusy())
            return true;
        return false;
    }


    public onGameStart(): void {
        this.addGameState(GameState.Start);
        this.removeGameState(GameState.Pause, GameState.Win, GameState.Over);
        this.GameUi.onGameStart();
    }

    public onGameWin(): void {
        if (this.isGameState(GameState.Win)) {
            LogTool.LogWarning("重复胜利!!!");
            return;
        }
        this.addGameState(GameState.Win);
        this.GameUi.onGameWin();
    }

    public onGameOver(): void {
        if (this.isGameState(GameState.Over)) {
            LogTool.LogWarning("重复失败!!!");
            return;
        }
        this.addGameState(GameState.Over);
        this.GameUi.onGameOver();
    }

    public onGamePause(): void {
        if (this.isGameState(GameState.Pause))
            return;
        this.addGameState(GameState.Pause);
        this.GameUi.onGamePause();
    }

    public onGameResume(): void {
        if (!this.isGameState(GameState.Pause))
            return;
        this.removeGameState(GameState.Pause);
        this.GameUi.onGameResume();
    }

    public onGameRestart(): void {
        this.removeGameState(GameState.Pause, GameState.Win, GameState.Over);
        this.addGameState(GameState.Start);
        this.GameUi.onGameRestart();
    }

    public onGameRevive(): void {
        this.removeGameState(GameState.Over);
        this.GameUi.onGameRevive();
    }


    /**
     * 保存游戏数据
     */
    public onSaveGameData() {
    }

    /**
   *  游戏世界进程锁增加
   */
    public static IncreaseLock(): void {
        LockStatus.Increase(GameWorld.GAME_WORLD_STATUS);
    }

    /**
     *  游戏世界进程锁减少
     */
    public static ReduceLock(): void {
        LockStatus.Reduce(GameWorld.GAME_WORLD_STATUS);
    }

    /**
     *  游戏世界进程锁减少
     */
    public static ResertLock(): void {
        LockStatus.Resert(GameWorld.GAME_WORLD_STATUS);
    }

    /**
     * 游戏结束
     */
    public static GameOver(): void {
        EventNotice.emit(CommonEvent.COMMON_EVENT_GAME_OVER);
    }
}
