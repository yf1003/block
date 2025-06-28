import * as cc from 'cc'
import GameManager from "../../manager/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    public NodeLabel: cc.Label = null;

    start() {
        this.NodeLabel.color = GameManager.GameThemeData.getScoreColor();
    }


    removeSelf() {
        this.node.destroy();
    }
}
