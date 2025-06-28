import * as cc from "cc";
import GameCenter, { GameRaidoType } from "../important/GameCenter";
import LogTool from "./LogTool";
const { ccclass, property } = cc._decorator;
@ccclass
export default class FitNode extends cc.Component {
    /**
     *  默认比例
     */
    @property(cc.CCInteger)
    DefaultScale: number = 1;

    public onLoad(): void {
        let name = this.node.name;
        switch (GameCenter.GameRaidoType) {
            case GameRaidoType.RadioLang:
                LogTool.Log(name + "Fit Node 超长");
                this.node.getComponent(cc.UITransform).setContentSize(cc.size(720 * this.DefaultScale, 1560 * this.DefaultScale));
                break;
            case GameRaidoType.RadioNormal:
                LogTool.Log(name + "Fit Node 正常");
                this.node.getComponent(cc.UITransform).setContentSize(cc.size(720 * this.DefaultScale, 1280 * this.DefaultScale));
                break;
            case GameRaidoType.RadioApplePaid:
                LogTool.Log(name + "Fit Node 4:3");
                this.node.getComponent(cc.UITransform).setContentSize(cc.size(800 * this.DefaultScale, 1280 * this.DefaultScale));
                break;
            case GameRaidoType.RadioNormalPaid:
                LogTool.Log(name + "Fit Node 16:10");
                this.node.getComponent(cc.UITransform).setContentSize(cc.size(960 * this.DefaultScale, 1280 * this.DefaultScale));
                break;
            default:
                break;
        }
    }
}
