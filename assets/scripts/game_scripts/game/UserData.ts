import * as cc from 'cc'
import { GroupType } from './config/LocalCommon';
import RandTool from '../common/tool/RandTool';

export class UserData  {
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
        this._maxScore = cc.sys.localStorage.getItem('maxScore') || 0;
        if (!cc.sys.localStorage.getItem('needGuide')) {
            this._needGuide = true
        } else {
            this._needGuide = false
        }
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

    static randCount: number = 0;

    static getGroupType(): GroupType {
        if (++this.randCount <= 6) {
            const index = RandTool.RandIncludeMin(0, this.randPool.length - 1);
            return this.randPool[index];
        } else {
            return RandTool.RandIncludeMin(GroupType.Z, GroupType.Max - 1) as GroupType
        }
    }
}

