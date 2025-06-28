import * as cc from 'cc'
import LayerBase from "../../../expand/ui/LayerBase";
import GameWorld from "../../GameWorld";


const { ccclass, property } = cc._decorator;
@ccclass
export default class DialogWorld extends LayerBase {
    @property(GameWorld)
    public mGameWorld: GameWorld = null;
    public override  init(): boolean {
        return true;
    }
    public onKeyDown(): boolean {
        return false;
    }
}
