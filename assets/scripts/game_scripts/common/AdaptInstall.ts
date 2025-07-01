import * as cc from "cc";
import { AdaptCanvas } from "./AdaptCanvas";
const { ccclass, property, menu } = cc._decorator;

@ccclass
export default class AdaptInstall extends cc.Component {
    @property(cc.CCBoolean)
    private showInFitHeight: boolean = false

    protected onLoad(): void {
        const isFitHeight = AdaptCanvas.fitValue === cc.ResolutionPolicy.FIXED_HEIGHT
        if (isFitHeight === this.showInFitHeight) {
            this.node.active = true
        } else {
            this.node.active = false
        }
    }

}