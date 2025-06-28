import * as cc from 'cc'
import ExtendButton from "../../../common/extend/ExtendButton";
import DataManager from "../../../common/important/DataManager";
import ValueData from "../../../expand/base/ValueData";
import LayerBase from "../../../expand/ui/LayerBase";
import GameUi from "../../GameUi";
import LocalCommon from "../../config/LocalCommon";
import { SceneType } from "../scene/SceneType";
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


        return true;
    }

    public onClickReplay(): void {
        cc.director.loadScene(SceneType.GameScene.toString());
    }


    public initOver(gameui: GameUi) {
        let score = DataManager.Score;
        this.LabelNowScore.string = gameui.Score.toString();
        this.LabelBestScore.string = "Best:" + score;
    }
}
