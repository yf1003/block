import * as cc from 'cc'
import EventNotice from "../common/tool/EventNotice";
import GameEvent from "./config/GameEvent";
import LocalCommon from "./config/LocalCommon";

export default class GameLevelData {
    /**
     * 等级
     */
    protected mLevel: number = 1;
    public set Level(level: number) {
        if (level <= 0)
            return;
        if (this.mLevel != level) {
            let old = this.mLevel;
            this.mLevel = level;

            EventNotice.emit(GameEvent.EVENT_REFERSH_LEVEL, old, this.mLevel);
        }
    }
    public get Level(): number {
        return this.mLevel;
    }

    public get NowLevelTarget(): number {
        return this.getTargetScore(this.mLevel);
    }

    public get NextLevelTarget(): number {
        return this.getTargetScore(this.mLevel + 1);
    }


    public levelUp(): void {
        this.Level = this.mLevel + 1;
    }

    public getTargetScore(level: number): number {
        return level * LocalCommon.LEVEL_TARGET_SCORE;
    }
}
