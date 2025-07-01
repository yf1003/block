import * as cc from 'cc'
const { ccclass, property } = cc._decorator;
@ccclass
export default class DynamicAddScore extends cc.Component {
    @property(cc.Label)
    public LabelScore: cc.Label = null;

    private mSpanCount: number = 50;
    private mSpanMax: number = 500;


    protected mTargetScore: number = 0;
    public set TargetScore(value: number) {
        this.mTargetScore = value
    }
    public get TargetScore(): number {
        return this.mTargetScore;
    }

    public init(target: number) {
        this.mTargetScore = target;
        this.LabelScore.string = this.mTargetScore.toString();
    }

    public update(dt): void {
        let tempScore = parseInt(this.LabelScore.string);
        if (tempScore === this.mTargetScore)
            return;
        let beiCount = 1;
        if (Math.abs(tempScore - this.mTargetScore) > this.mSpanMax)
            beiCount = 2;
        if (tempScore > this.mTargetScore) {
            tempScore -= this.mSpanCount * beiCount;
            if (tempScore < this.mTargetScore) {
                tempScore = this.mTargetScore;
            }
            this.LabelScore.string = tempScore.toString();

        }
        else if (tempScore < this.mTargetScore) {
            tempScore += this.mSpanCount * beiCount;
            if (tempScore > this.mTargetScore) {
                tempScore = this.mTargetScore;
            }
            this.LabelScore.string = tempScore.toString();
        }
    }
}
