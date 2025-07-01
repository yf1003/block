import * as cc from 'cc'
import ExtendButton from "../../../common/extend/ExtendButton";
import LayerBase from "../../../expand/ui/LayerBase";
import GameUi from "../../GameUi";
import { SceneType } from "../scene/SceneType";
import { XTween } from 'mvplayable';
const { ccclass, property } = cc._decorator;
@ccclass
export default class LayerGameOver extends LayerBase {
    @property(cc.Label)
    public LabelNowScore: cc.Label = null;
    @property(cc.Label)
    public LabelBestScore: cc.Label = null;

    @property(cc.Button)
    public ButtonReplay: cc.Button = null;

    public init(): boolean {
        ExtendButton.AddOnClick(this.ButtonReplay, this.onClickReplay, this);

        this.playEnterEffect()
        return true;
    }

    private playEnterEffect() {
        const op = this.node.getComponent(cc.UIOpacity)
        op.opacity = 0
        XTween
            .to(op, 0.3, { opacity: 255 })
            .play()
    }

    public onClickReplay(): void {
        cc.director.loadScene(SceneType.GameScene.toString());
    }


    public initOver(gameui: GameUi) {
        this.LabelNowScore.string = gameui.Score.toString();
        // this.LabelBestScore.string = "Best:" + ;
    }
}
