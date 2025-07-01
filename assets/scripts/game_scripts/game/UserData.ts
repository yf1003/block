import * as cc from 'cc'
import { GroupType } from './config/LocalCommon';
import RandTool from '../common/tool/RandTool';

export class UserData {
    private static _maxScore: number = 0;
    static get maxScore(): number {
        return this._maxScore;
    }
    static set maxScore(value: number) {
        this._maxScore = value;
        this.save();
    }

    private static _needGuide: boolean = false
    static get needGuide() {
        return this._needGuide
    }
    static set needGuide(value: boolean) {
        this._needGuide = value
        this.save()
    }

    static init() {
        this._maxScore = 0;
        if (!cc.sys.localStorage.getItem('needGuide')) {
            this._needGuide = true
        } else {
            this._needGuide = false
        }

        this.stepN = 6;
        this._stepCount = 0;
        this._clickCount = 0;
    }

    static save() {
        cc.sys.localStorage.setItem('maxScore', this.maxScore.toString());
        cc.sys.localStorage.setItem('needGuide', this._needGuide);
    }

    static randPool: GroupType[] = [
        GroupType.LineSmall1,
        GroupType.LineSmall2,
        GroupType.Line,
        GroupType.LineDouble,
        GroupType.Stone,
        GroupType.Stone2,
        GroupType.Stone3,
        GroupType.Stone4
    ]

    /** 配置拖动次数 */
    public static stepN: number = 0;

    /** 玩家步数 */
    private static _stepCount: number = 0;
    static get stepCount(): number {
        return this._stepCount;
    }
    static set stepCount(value: number) {
        this._stepCount = value;
    }

    /** 点击次数 */
    private static _clickCount: number = 0;
    static get clickCount(): number {
        return this._clickCount;
    }
    static set clickCount(value: number) {
        this._clickCount = value;
    }

    /** 增加点击次数 */
    static addClickCount() {
        if (this.stepCount < this.stepN) return
        this.clickCount++
    }

    /** 创建次数 */
    private static _createCount: number = 0;
    static getGroupType(): GroupType {
        this._createCount++
        
        if (this._createCount === 1) {
            return GroupType.Line
        } else if (this._createCount <= 6) {
            const index = RandTool.RandIncludeMin(0, this.randPool.length - 1);
            return this.randPool[index];
        } else {
            return RandTool.RandIncludeMin(GroupType.Z, GroupType.Max - 1) as GroupType
        }
    }
}

